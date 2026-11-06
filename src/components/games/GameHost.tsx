"use client";

import type { Locale, TestDef, TestResult } from "@/lib/types";
import type { Dict } from "@/i18n/dict";
import { ReactionGame } from "./ReactionGame";
import { StroopGame } from "./StroopGame";
import { SpanGame } from "./SpanGame";
import { NBackGame } from "./NBackGame";

export type GameProps = { test: TestDef; lang: Locale; dict: Dict; onDone: (r: TestResult) => void };

export function GameHost(props: GameProps) {
  switch (props.test.id) {
    case "reaction-time":
      return <ReactionGame {...props} />;
    case "stroop":
      return <StroopGame {...props} />;
    case "working-memory":
      return <SpanGame {...props} />;
    case "n-back":
      return <NBackGame {...props} />;
    default:
      return <p className="py-20 text-center text-muted">Coming soon</p>;
  }
}
