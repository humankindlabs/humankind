// src/components/marketing/mobile-splash.tsx
import Link from "next/link";
import Image from "next/image";

/**
 * Mobile splash screen — shown only on screens <768px via .hk-mobile-splash CSS class.
 * Sits as the first element on the homepage. Tablet/desktop sees the full homepage instead.
 * No JS required — pure CSS show/hide.
 */
export function MobileSplash() {
  return (
    <div className="hk-mobile-splash" style={{ position: "relative" }}>

      {/* Background glow */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "-100px", left: "50%",
        transform: "translateX(-50%)",
        width: "420px", height: "420px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(12,176,1,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
        filter: "blur(40px)",
      }} />

      {/* Center content */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.75rem",
        paddingBottom: "2rem",
        position: "relative",
        zIndex: 1,
      }}>

        {/* Lotus logo */}
        <div style={{
          width: "240px", height: "240px",
          borderRadius: "50%",
          background: "rgba(12,176,1,0.06)",
          border: "1px solid rgba(12,176,1,0.18)",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }}>
          <Image
            src="/avatars/humankind_avatar.svg"
            alt="Humankind"
            width={180}
            height={180}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Wordmark */}
        <div style={{ textAlign: "center" }}>
          <p className="hk-brand" style={{
            fontSize: "2.5rem",
            letterSpacing: "0.04em",
            color: "#fff",
          }}>
            humankind
          </p>
          <p style={{ marginTop: "0.5rem", fontSize: "1rem", color: "rgba(255,255,255,0.45)" }}>
            Conscious community · Sedona, AZ
          </p>
        </div>

        {/* CTAs */}
        <div className="hk-mobile-splash__actions" style={{ marginTop: "1rem", maxWidth: "380px" }}>
          <Link href="https://app.humankind.center/register" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "100%", padding: "1.125rem",
            background: "#0CB001", color: "#fff",
            borderRadius: "99px", fontSize: "1.125rem", fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 0 28px rgba(12,176,1,0.35)",
          }}>
            Join Free
          </Link>

          <Link href="https://app.humankind.center/login" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "100%", padding: "1.125rem",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "99px", fontSize: "1.125rem", fontWeight: 500,
            color: "rgba(255,255,255,0.8)", textDecoration: "none",
          }}>
            Sign In
          </Link>
        </div>

      </div>

    </div>
  );
}