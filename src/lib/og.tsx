import fs from "node:fs/promises";
import path from "node:path";

let fonts: { name: string; data: Buffer; weight: 500 | 600; style: "normal" }[] | null = null;
export async function ogFonts() {
  if (fonts) return fonts;
  const dir = path.join(process.cwd(), "src/assets/fonts");
  const [u, o] = await Promise.all([fs.readFile(path.join(dir, "Unbounded.ttf")), fs.readFile(path.join(dir, "Onest.ttf"))]);
  fonts = [
    { name: "Unbounded", data: u, weight: 600, style: "normal" },
    { name: "Onest", data: o, weight: 500, style: "normal" },
  ];
  return fonts;
}

export function OgFrame({
  colors,
  emoji,
  kicker,
  title,
  footer,
}: {
  colors: string[];
  emoji: string;
  kicker: string;
  title: string;
  footer: string;
}) {
  const [a, b, c] = [colors[0] ?? "#c4b2ff", colors[1] ?? "#ffb3cc", colors[2] ?? "#ffc7a6"];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#16112a",
        position: "relative",
        fontFamily: "Onest",
        color: "#f4efff",
      }}
    >
      <div style={{ position: "absolute", right: -120, top: -140, width: 760, height: 760, borderRadius: 9999, background: `radial-gradient(circle at 40% 40%, ${a} 0%, ${a}00 62%)`, display: "flex" }} />
      <div style={{ position: "absolute", right: 60, top: 160, width: 560, height: 560, borderRadius: 9999, background: `radial-gradient(circle at 50% 50%, ${b} 0%, ${b}00 60%)`, display: "flex" }} />
      <div style={{ position: "absolute", right: 260, top: 300, width: 480, height: 480, borderRadius: 9999, background: `radial-gradient(circle at 50% 50%, ${c} 0%, ${c}00 60%)`, display: "flex" }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%", position: "relative" }}>
        <div style={{ display: "flex", fontFamily: "Unbounded", fontSize: 34 }}>testik</div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
          <div style={{ fontSize: 120, display: "flex" }}>{emoji}</div>
          <div style={{ fontSize: 30, color: "#d9d0f5", marginTop: 18, display: "flex" }}>{kicker}</div>
          <div style={{ fontFamily: "Unbounded", fontSize: title.length > 28 ? 58 : 74, lineHeight: 1.05, marginTop: 10, letterSpacing: -2, display: "flex" }}>{title}</div>
        </div>
        <div style={{ fontSize: 24, color: "#a69dca", display: "flex" }}>{footer}</div>
      </div>
    </div>
  );
}
