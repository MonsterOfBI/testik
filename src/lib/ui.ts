import type { Category } from "./types";

export const CAT_COLOR: Record<Category, string> = {
  personality: "var(--lilac)",
  cognitive: "var(--sky)",
  "mental-health": "var(--mint)",
  wellbeing: "var(--butter)",
  relationships: "var(--rose)",
  career: "var(--peach)",
  fun: "var(--rose)",
};

export const CAT_GRADIENT: Record<Category, string> = {
  personality: "linear-gradient(135deg, var(--lilac), var(--sky))",
  cognitive: "linear-gradient(135deg, var(--sky), var(--mint))",
  "mental-health": "linear-gradient(135deg, var(--mint), var(--sky))",
  wellbeing: "linear-gradient(135deg, var(--butter), var(--peach))",
  relationships: "linear-gradient(135deg, var(--rose), var(--lilac))",
  career: "linear-gradient(135deg, var(--peach), var(--butter))",
  fun: "linear-gradient(135deg, var(--rose), var(--peach) 50%, var(--butter))",
};

export const PALETTE = ["#c4b2ff", "#ffb3cc", "#ffc7a6", "#9fe6cb", "#a3c9ff", "#ffe6a3", "#d6b8ff", "#8fd8e8"];

export const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ");
