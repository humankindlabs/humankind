// src/components/marketing/marketing-footer.tsx
//
// Marketing site footer — links + copyright.

import Link from "next/link";
import { SITE, FOOTER_LINKS } from "@/config/site";

export function MarketingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        marginTop: "5rem",
        padding: "3rem 1.5rem 2rem",
        borderTop: "1px solid var(--hk-border)",
        background: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "2rem",
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <Link
              href="/"
              style={{
                fontSize: "1.0625rem",
                fontWeight: 700,
                color: "var(--hk-text)",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              humankind
            </Link>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--hk-text-muted)",
                marginTop: "0.625rem",
                lineHeight: 1.55,
                maxWidth: "260px",
              }}
            >
              A conscious community for live events, streams, and connection.
              Based in Sedona, AZ.
            </p>
          </div>

          <FooterColumn label="Product" links={FOOTER_LINKS.product} />
          <FooterColumn label="Company" links={FOOTER_LINKS.company} />
          <FooterColumn label="Legal" links={FOOTER_LINKS.legal} />
        </div>

        <div
          style={{
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--hk-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.75rem",
            color: "var(--hk-text-muted)",
          }}
        >
          <span>© {year} humankind. All rights reserved.</span>
          <a
            href={SITE.appUrl}
            style={{
              color: "var(--hk-text-muted)",
              textDecoration: "none",
            }}
          >
            app.humankind.center →
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  label,
  links,
}: {
  label: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h4
        style={{
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--hk-text-muted)",
          margin: "0 0 0.875rem",
        }}
      >
        {label}
      </h4>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: "0.5rem",
        }}
      >
        {links.map((l) => {
          const isExternal = l.href.startsWith("http");
          return (
            <li key={l.href}>
              {isExternal ? (
                <a
                  href={l.href}
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--hk-text-sec)",
                    textDecoration: "none",
                  }}
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  href={l.href}
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--hk-text-sec)",
                    textDecoration: "none",
                  }}
                >
                  {l.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
