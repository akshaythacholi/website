import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aiswarya Unni — Career Transition Consultant for Indian Medical Professionals";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1D1D1F",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 100px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top label */}
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 16,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: 32,
            margin: "0 0 32px 0",
          }}
        >
          Career Transition Consultant · India
        </p>

        {/* Name */}
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: 80,
            fontWeight: 800,
            lineHeight: 0.95,
            margin: "0 0 32px 0",
          }}
        >
          Aiswarya Unni
        </h1>

        {/* Divider */}
        <div
          style={{
            width: 60,
            height: 2,
            background: "rgba(255,255,255,0.25)",
            margin: "0 0 32px 0",
          }}
        />

        {/* Tagline */}
        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 28,
            lineHeight: 1.5,
            maxWidth: 700,
            margin: "0 0 60px 0",
          }}
        >
          Helping doctors, dentists & pharmacists land high-paying corporate careers in pharma, MedTech & consulting.
        </p>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 60 }}>
          {[
            { n: "50+", label: "Placed" },
            { n: "90", label: "Days to offer" },
            { n: "4×", label: "Salary growth" },
          ].map((s) => (
            <div key={s.n} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ color: "#FFFFFF", fontSize: 40, fontWeight: 800 }}>{s.n}</span>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Domain */}
        <p
          style={{
            position: "absolute",
            bottom: 60,
            right: 100,
            color: "rgba(255,255,255,0.2)",
            fontSize: 18,
            letterSpacing: "0.05em",
            margin: 0,
          }}
        >
          aiswaryaunni.com
        </p>
      </div>
    ),
    { ...size }
  );
}
