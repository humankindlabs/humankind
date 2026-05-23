"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EmailGateModal } from "./EmailGateModal";

type Meditation = {
  id: string;
  title: string;
  description: string | null;
  audio_url: string;
  thumbnail_url: string | null;
  duration_seconds: number | null;
};

type LoopMode = "off" | "track" | "soft";

const SOFT_LOOP_SKIP_SECONDS = 10;
const SOFT_LOOP_FADE_SECONDS = 4;

export function MeditationsList({
  meditations,
  userEmail,
}: {
  meditations: Meditation[];
  userEmail: string | null;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const softAudioRef = useRef<HTMLAudioElement | null>(null);
  const softLoopingRef = useRef(false);
  const softLoopTimerRef = useRef<number | null>(null);
  const [pendingDownload, setPendingDownload] = useState<Meditation | null>(null);
  const [activeId, setActiveId] = useState<string | null>(meditations[0]?.id ?? null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loopMode, setLoopMode] = useState<LoopMode>("off");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"popular" | "duration" | "title">("popular");

  const activeTrack = useMemo(
    () => meditations.find((m) => m.id === activeId) ?? meditations[0] ?? null,
    [activeId, meditations],
  );

  const visibleMeditations = useMemo(() => {
    const query = search.trim().toLowerCase();
    const rows = query
      ? meditations.filter((m) =>
          `${m.title} ${m.description ?? ""}`.toLowerCase().includes(query),
        )
      : [...meditations];

    if (sort === "title") rows.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "duration") {
      rows.sort((a, b) => (a.duration_seconds ?? 0) - (b.duration_seconds ?? 0));
    }
    return rows;
  }, [meditations, search, sort]);

  useEffect(() => {
    if (!activeTrack || !audioRef.current) return;
    const audio = audioRef.current;
    const shouldResume = isPlaying;
    audio.src = activeTrack.audio_url;
    audio.currentTime = 0;
    setCurrentTime(0);
    setDuration(activeTrack.duration_seconds ?? 0);
    audio.loop = loopMode === "track";
    audio.volume = 1;
    stopSoftLoopLayer();
    if (shouldResume) {
      audio.play().catch(() => setIsPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTrack?.id]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = loopMode === "track";
      audioRef.current.volume = 1;
    }
    stopSoftLoopLayer();
  }, [loopMode]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function onLoaded() {
      setDuration(audio?.duration && Number.isFinite(audio.duration)
        ? audio.duration
        : activeTrack?.duration_seconds ?? 0);
    }

    function onTime() {
      if (!audio) return;
      setCurrentTime(audio.currentTime);

      if (
        loopMode === "soft" &&
        audio.duration &&
        audio.duration > SOFT_LOOP_SKIP_SECONDS * 2 + SOFT_LOOP_FADE_SECONDS &&
        audio.currentTime >= audio.duration - SOFT_LOOP_SKIP_SECONDS &&
        !softLoopingRef.current
      ) {
        startSoftLoopCrossfade();
      }
    }

    function onEnded() {
      if (loopMode === "track") return;
      playNext();
    }

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  });

  useEffect(() => {
    return () => stopSoftLoopLayer();
  }, []);

  if (meditations.length === 0) {
    return (
      <div className="hk-empty">
        <p>No meditations available yet. Check back soon.</p>
        <style jsx>{styles}</style>
      </div>
    );
  }

  function toggleTrack(track: Meditation) {
    const audio = audioRef.current;
    if (!audio) return;

    if (activeId !== track.id) {
      setActiveId(track.id);
      setIsPlaying(true);
      return;
    }

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      audio.pause();
      stopSoftLoopLayer();
      setIsPlaying(false);
    }
  }

  function playNext() {
    if (!activeTrack) return;
    const idx = meditations.findIndex((m) => m.id === activeTrack.id);
    const next = meditations[(idx + 1) % meditations.length];
    setActiveId(next.id);
    setIsPlaying(true);
  }

  function playPrevious() {
    if (!activeTrack) return;
    const idx = meditations.findIndex((m) => m.id === activeTrack.id);
    const previous = meditations[(idx - 1 + meditations.length) % meditations.length];
    setActiveId(previous.id);
    setIsPlaying(true);
  }

  function seek(percent: number) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = duration * percent;
    setCurrentTime(audio.currentTime);
  }

  function handleDownloadClick(m: Meditation) {
    if (userEmail) triggerDownload(m);
    else setPendingDownload(m);
  }

  function triggerDownload(m: Meditation) {
    const a = document.createElement("a");
    a.href = m.audio_url;
    a.download = `${m.title}.${m.audio_url.split(".").pop() ?? "mp3"}`;
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function stopSoftLoopLayer() {
    if (softLoopTimerRef.current !== null) {
      window.clearInterval(softLoopTimerRef.current);
      softLoopTimerRef.current = null;
    }
    softLoopingRef.current = false;
    const softAudio = softAudioRef.current;
    if (softAudio) {
      softAudio.pause();
      softAudio.removeAttribute("src");
      softAudio.load();
      softAudio.volume = 0;
    }
    if (audioRef.current) audioRef.current.volume = 1;
  }

  function startSoftLoopCrossfade() {
    const audio = audioRef.current;
    const softAudio = softAudioRef.current;
    if (!audio || !softAudio || !activeTrack || !audio.src) return;

    softLoopingRef.current = true;
    softAudio.src = audio.src;
    softAudio.currentTime = SOFT_LOOP_SKIP_SECONDS;
    softAudio.volume = 0;
    softAudio.play().catch(() => {
      softLoopingRef.current = false;
      audio.currentTime = SOFT_LOOP_SKIP_SECONDS;
      audio.volume = 1;
    });

    const startedAt = performance.now();
    const fadeMs = SOFT_LOOP_FADE_SECONDS * 1000;

    softLoopTimerRef.current = window.setInterval(() => {
      const primary = audioRef.current;
      const overlay = softAudioRef.current;
      if (!primary || !overlay) return;

      const elapsed = performance.now() - startedAt;
      const mix = Math.min(1, elapsed / fadeMs);
      primary.volume = Math.max(0, 1 - mix);
      overlay.volume = mix;

      if (mix >= 1) {
        if (softLoopTimerRef.current !== null) {
          window.clearInterval(softLoopTimerRef.current);
          softLoopTimerRef.current = null;
        }
        primary.pause();
        primary.currentTime = overlay.currentTime;
        primary.volume = 1;
        primary.play().catch(() => setIsPlaying(false));
        overlay.pause();
        overlay.removeAttribute("src");
        overlay.load();
        overlay.volume = 0;
        softLoopingRef.current = false;
      }
    }, 60);
  }

  const progress = duration ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <>
      <audio ref={audioRef} preload="metadata" />
      <audio ref={softAudioRef} preload="auto" />

      <div className="hk-library">
        <div className="hk-toolbar">
          <div className="hk-filters" aria-label="Meditation library filters">
            <span>All {meditations.length}</span>
            <span>Continuous play</span>
            <span>Soft loop</span>
          </div>

          <div className="hk-tools">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search meditations..."
              aria-label="Search meditations"
            />
            <label>
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
              >
                <option value="popular">Most popular</option>
                <option value="duration">Duration</option>
                <option value="title">Title</option>
              </select>
            </label>
          </div>
        </div>

        <div className="hk-list" style={{ paddingBottom: activeTrack ? 132 : 0 }}>
          {visibleMeditations.map((m) => {
            const active = activeTrack?.id === m.id;
            const playing = active && isPlaying;
            return (
              <div key={m.id} className={`hk-track ${active ? "active" : ""}`}>
                <button
                  type="button"
                  className="hk-art"
                  onClick={() => toggleTrack(m)}
                  aria-label={`${playing ? "Pause" : "Play"} ${m.title}`}
                >
                  {m.thumbnail_url ? <img src={m.thumbnail_url} alt="" /> : <span />}
                  <span className={`hk-play ${playing ? "pause" : ""}`} />
                </button>

                <div className="hk-title">
                  <strong>{m.title}</strong>
                  <span>humankind meditation</span>
                </div>

                <p className="hk-description">{m.description || "Meditation, ambient, peaceful"}</p>

                <div className="hk-time">
                  <strong>{formatDuration(m.duration_seconds)}</strong>
                  <span>continuous play</span>
                </div>

                <div className="hk-actions">
                  <button type="button" title="Play next" onClick={() => setActiveId(m.id)} aria-label={`Play ${m.title} next`}>
                    <span className="hk-plus" />
                  </button>
                  <button type="button" title="Copy link" onClick={() => navigator.clipboard?.writeText(window.location.href)} aria-label="Copy page link">
                    <span className="hk-link" />
                  </button>
                  <button type="button" title="Download" onClick={() => handleDownloadClick(m)} aria-label={`Download ${m.title}`}>
                    <i className="fi fi-rr-download" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeTrack && (
        <div className="hk-player" role="region" aria-label="Audio player">
          <button
            className="hk-player-art"
            type="button"
            onClick={() => toggleTrack(activeTrack)}
            aria-label={isPlaying ? "Pause current track" : "Play current track"}
          >
            {activeTrack.thumbnail_url ? <img src={activeTrack.thumbnail_url} alt="" /> : <span />}
            <span className={`hk-play ${isPlaying ? "pause" : ""}`} />
          </button>

          <div className="hk-player-main">
            <button
              type="button"
              className="hk-progress"
              onClick={(e) => seek(e.nativeEvent.offsetX / e.currentTarget.clientWidth)}
              aria-label="Seek track"
            >
              <span style={{ width: `${progress}%` }} />
            </button>
            <div className="hk-player-copy">
              <div>
                <strong>{activeTrack.title}</strong>
                <span>humankind meditation</span>
              </div>
              <p>{formatClock(currentTime)} / {formatClock(duration || activeTrack.duration_seconds || 0)}</p>
            </div>
          </div>

          <div className="hk-player-controls">
            <button type="button" onClick={playPrevious} aria-label="Previous track" title="Previous">
              <span className="hk-prev-icon" />
            </button>
            <button type="button" onClick={() => toggleTrack(activeTrack)} aria-label={isPlaying ? "Pause" : "Play"}>
              <span className={`hk-control-play ${isPlaying ? "pause" : ""}`} />
            </button>
            <button type="button" onClick={playNext} aria-label="Next track" title="Next">
              <span className="hk-next-icon" />
            </button>
            <button
              type="button"
              className={loopMode !== "off" ? "on" : ""}
              onClick={() => setLoopMode(loopMode === "off" ? "track" : loopMode === "track" ? "soft" : "off")}
              title={loopMode === "off" ? "Loop off" : loopMode === "track" ? "Loop track" : "Soft loop"}
              aria-label={loopMode === "off" ? "Loop off" : loopMode === "track" ? "Loop track" : "Soft loop"}
            >
              <span className={`hk-loop-icon ${loopMode}`} />
            </button>
            <button type="button" onClick={() => handleDownloadClick(activeTrack)} aria-label="Download track" title="Download">
              <i className="fi fi-rr-download" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {pendingDownload && (
        <EmailGateModal
          meditation={pendingDownload}
          onClose={() => setPendingDownload(null)}
          onSuccess={() => {
            const m = pendingDownload;
            setPendingDownload(null);
            setTimeout(() => triggerDownload(m), 150);
          }}
        />
      )}

      <style jsx>{styles}</style>
    </>
  );
}

function formatDuration(seconds: number | null) {
  if (!seconds || seconds <= 0) return "--";
  return formatClock(seconds);
}

function formatClock(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

const styles = `
  .hk-library {
    width: 100%;
  }

  .hk-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .hk-filters,
  .hk-tools,
  .hk-actions,
  .hk-player-controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .hk-filters span,
  .hk-tools select,
  .hk-actions button,
  .hk-player-controls button {
    border: 0;
    background: transparent;
    color: #fff;
    font: inherit;
    font-size: 0.8125rem;
    font-weight: 700;
    cursor: pointer;
  }

  .hk-filters span {
    display: inline-flex;
    min-height: 2rem;
    align-items: center;
    border-radius: 999px;
    background: rgba(12,176,1,0.1);
    border: 1px solid rgba(12,176,1,0.2);
    color: #0CB001;
    padding: 0 0.85rem;
  }

  .hk-tools input,
  .hk-tools select {
    height: 2.25rem;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.035);
    border-radius: 999px;
    color: #fff;
    padding: 0 0.85rem;
    outline: none;
  }

  .hk-tools label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255,255,255,0.5);
    font-size: 0.8125rem;
    font-weight: 700;
  }

  .hk-list {
    display: grid;
    gap: 0.85rem;
  }

  .hk-track {
    display: grid;
    grid-template-columns: 72px minmax(180px, 1.1fr) minmax(220px, 1.6fr) 96px auto;
    align-items: center;
    gap: 1.5rem;
    min-height: 80px;
    padding: 0.5rem;
    background: rgba(255,255,255,0.035);
    border: 1px solid transparent;
    border-radius: 8px;
    transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
  }

  .hk-track:hover,
  .hk-track.active {
    border-color: rgba(12,176,1,0.72);
    background: rgba(12,176,1,0.055);
  }

  .hk-track:hover {
    transform: translateY(-1px);
  }

  .hk-art,
  .hk-player-art {
    position: relative;
    overflow: hidden;
    border: 0;
    padding: 0;
    background: #111;
    cursor: pointer;
  }

  .hk-art {
    width: 64px;
    height: 64px;
    border-radius: 6px;
  }

  .hk-art img,
  .hk-player-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .hk-art::after,
  .hk-player-art::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0,3,28,0.18);
    opacity: 0;
    transition: opacity 160ms ease;
  }

  .hk-track.active .hk-art::after,
  .hk-art:hover::after,
  .hk-player-art:hover::after {
    opacity: 1;
  }

  .hk-play {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    transform: translate(-38%, -50%);
    width: 0;
    height: 0;
    border-top: 11px solid transparent;
    border-bottom: 11px solid transparent;
    border-left: 16px solid #fff;
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
  }

  .hk-play.pause {
    transform: translate(-50%, -50%);
    width: 18px;
    height: 22px;
    border: 0;
  }

  .hk-play.pause::before,
  .hk-play.pause::after {
    content: "";
    position: absolute;
    top: 0;
    width: 6px;
    height: 22px;
    background: #fff;
    border-radius: 2px;
  }

  .hk-play.pause::before { left: 0; }
  .hk-play.pause::after { right: 0; }

  .hk-title strong,
  .hk-time strong,
  .hk-player-copy strong {
    display: block;
    color: #fff;
    font-size: 0.9375rem;
    line-height: 1.2;
  }

  .hk-title span,
  .hk-time span,
  .hk-player-copy span {
    display: block;
    color: rgba(255,255,255,0.38);
    font-size: 0.8125rem;
    font-weight: 700;
    margin-top: 0.25rem;
  }

  .hk-description {
    color: #fff;
    font-size: 0.8125rem;
    font-weight: 700;
    line-height: 1.35;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }

  .hk-actions {
    justify-content: flex-end;
  }

  .hk-actions button {
    position: relative;
    color: #0CB001;
    min-width: 36px;
    min-height: 36px;
    border-radius: 999px;
  }

  .hk-plus,
  .hk-link {
    display: inline-block;
    position: relative;
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }

  .hk-plus::before,
  .hk-plus::after {
    content: "";
    position: absolute;
    left: 8px;
    top: 2px;
    width: 2px;
    height: 14px;
    background: #0CB001;
    border-radius: 999px;
  }

  .hk-plus::after {
    transform: rotate(90deg);
  }

  .hk-link::before,
  .hk-link::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 7px;
    border: 2px solid #0CB001;
    border-radius: 999px;
    transform: rotate(-35deg);
  }

  .hk-link::before {
    left: 1px;
    top: 7px;
  }

  .hk-link::after {
    right: 1px;
    top: 3px;
  }

  .hk-actions i,
  .hk-player-controls i {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #0CB001;
    font-size: 1.05rem;
    line-height: 1;
  }

  .hk-actions button:hover,
  .hk-player-controls button:hover,
  .hk-player-controls button.on {
    background: rgba(12,176,1,0.13);
    color: #0CB001;
  }

  .hk-player {
    position: fixed;
    left: 50%;
    bottom: 18px;
    z-index: 80;
    transform: translateX(-50%);
    width: min(920px, calc(100vw - 2rem));
    min-height: 88px;
    display: grid;
    grid-template-columns: 58px minmax(0, 1fr) auto;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    background: rgba(18,22,25,0.96);
    border: 1px solid rgba(12,176,1,0.18);
    border-radius: 8px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    backdrop-filter: blur(18px);
  }

  .hk-player-art {
    width: 52px;
    height: 52px;
    border-radius: 6px;
  }

  .hk-player-main {
    min-width: 0;
  }

  .hk-progress {
    width: 100%;
    height: 6px;
    border: 0;
    border-radius: 999px;
    padding: 0;
    overflow: hidden;
    background: rgba(0,0,0,0.45);
    cursor: pointer;
  }

  .hk-progress span {
    display: block;
    height: 100%;
    background: #0CB001;
    border-radius: inherit;
  }

  .hk-player-copy {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 0.7rem;
  }

  .hk-player-copy p {
    margin: 0;
    color: rgba(255,255,255,0.7);
    font-size: 0.8125rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .hk-player-controls button {
    min-width: 34px;
    min-height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.72);
    border-radius: 999px;
    padding: 0.45rem;
  }

  .hk-control-play,
  .hk-prev-icon,
  .hk-next-icon,
  .hk-loop-icon {
    position: relative;
    display: inline-block;
    width: 18px;
    height: 18px;
  }

  .hk-control-play::before {
    content: "";
    position: absolute;
    left: 5px;
    top: 2px;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left: 10px solid currentColor;
  }

  .hk-control-play.pause::before,
  .hk-control-play.pause::after {
    content: "";
    position: absolute;
    top: 2px;
    width: 5px;
    height: 14px;
    background: currentColor;
    border-radius: 1px;
    border: 0;
  }

  .hk-control-play.pause::before { left: 4px; }
  .hk-control-play.pause::after { right: 4px; }

  .hk-prev-icon::before,
  .hk-next-icon::before {
    content: "";
    position: absolute;
    top: 2px;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
  }

  .hk-prev-icon::before {
    left: 2px;
    border-right: 10px solid currentColor;
  }

  .hk-next-icon::before {
    right: 2px;
    border-left: 10px solid currentColor;
  }

  .hk-prev-icon::after,
  .hk-next-icon::after {
    content: "";
    position: absolute;
    top: 3px;
    width: 2px;
    height: 12px;
    background: currentColor;
    border-radius: 999px;
  }

  .hk-prev-icon::after { left: 1px; }
  .hk-next-icon::after { right: 1px; }

  .hk-loop-icon::before {
    content: "";
    position: absolute;
    inset: 3px 1px;
    border: 2px solid currentColor;
    border-left-color: transparent;
    border-radius: 999px;
  }

  .hk-loop-icon::after {
    content: "";
    position: absolute;
    right: 0;
    top: 3px;
    width: 6px;
    height: 6px;
    border-top: 2px solid currentColor;
    border-right: 2px solid currentColor;
    transform: rotate(45deg);
  }

  .hk-loop-icon.off {
    opacity: 0.55;
  }

  .hk-loop-icon.track::before {
    box-shadow: inset 0 0 0 999px rgba(12,176,1,0.08);
  }

  .hk-loop-icon.soft::before {
    border-style: dashed;
  }

  .hk-loop-icon.soft::after {
    box-shadow: -8px 8px 0 -3px currentColor;
  }

  .hk-empty {
    padding: 4rem 1.5rem;
    background: rgba(255,255,255,0.025);
    border: 1px dashed rgba(255,255,255,0.08);
    border-radius: 1.25rem;
    text-align: center;
    color: rgba(255,255,255,0.5);
  }

  @media (max-width: 860px) {
    .hk-toolbar,
    .hk-player-copy {
      align-items: flex-start;
      flex-direction: column;
    }

    .hk-track {
      grid-template-columns: 64px minmax(0, 1fr);
      gap: 0.85rem;
    }

    .hk-description,
    .hk-time,
    .hk-actions {
      grid-column: 2;
    }

    .hk-actions {
      justify-content: flex-start;
    }

    .hk-player {
      grid-template-columns: 52px minmax(0, 1fr);
    }

    .hk-player-controls {
      grid-column: 1 / -1;
    }
  }
`;
