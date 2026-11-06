export type Locale = "ru" | "en";
export type L = { ru: string; en: string };

export type Category =
  | "personality"
  | "cognitive"
  | "mental-health"
  | "wellbeing"
  | "relationships"
  | "career"
  | "fun";

export interface Band {
  min: number;
  max: number;
  label: L;
  summary: L[];
  detailed: L;
}

export interface Norms {
  mean: number;
  sd: number;
  n?: number;
  population: string;
  source: string;
}

export interface Dimension {
  id: string;
  name: L;
  description: L;
  lowLabel: L;
  highLabel: L;
  color?: string;
  facets?: string[];
  scoring: "sum" | "mean";
  min: number;
  max: number;
  norms?: Norms;
  /** for game metrics where lower raw values are better (e.g. reaction time in ms) */
  lowerIsBetter?: boolean;
  bands: Band[];
}

export interface Option {
  text: L;
  scores?: Record<string, number>;
  correct?: boolean;
  value?: number;
}

export interface Question {
  id: string;
  text: L;
  dimension?: string;
  reverse?: boolean;
  options?: Option[];
  explanation?: L;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visual?: any;
  timeLimitSec?: number;
}

export interface Outcome {
  id: string;
  title: L;
  emoji: string;
  profile: Record<string, number>;
  summary: L[];
  detailed: L;
  strengths?: L[];
  growth?: L[];
  funnyExamples?: L[];
  famous?: L[];
  compatibleWith?: string[];
  imagePrompt?: string;
  image?: string;
}

export interface Source {
  citation: string;
  url?: string;
  doi?: string;
}

export interface TestDef {
  id: string;
  category: Category;
  kind: "likert" | "choice" | "cognitive" | "game";
  seriousness: "scientific" | "screening" | "fun";
  title: L;
  tagline: L;
  description: L;
  emoji: string;
  durationMin: number;
  popularity: number;
  tags?: L[];
  methodology: L;
  sources: Source[];
  license: string;
  disclaimer?: L;
  instructions: L;
  timeLimitSec?: number;
  likert?: { anchors: L[]; values: number[] };
  dimensions: Dimension[];
  questions: Question[];
  outcomes?: Outcome[];
  scoringNotes: L;
  resultIntro?: L;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protocol?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [extra: string]: any;
}

/** Light catalog entry (no questions) for lists and search */
export interface TestMeta {
  id: string;
  category: Category;
  kind: TestDef["kind"];
  seriousness: TestDef["seriousness"];
  title: L;
  tagline: L;
  description: L;
  emoji: string;
  durationMin: number;
  popularity: number;
  tags: L[];
  questionCount: number;
}

/** answers: question id -> chosen option index (choice/cognitive) or likert value */
export type Answers = Record<string, number>;

export interface DimensionResult {
  id: string;
  raw: number;
  /** 0..1 position within theoretical range */
  norm: number;
  /** 0..100, from published norms if available */
  percentile?: number;
  bandIndex: number;
}

export interface TestResult {
  testId: string;
  at: number;
  dims: DimensionResult[];
  outcomeId?: string;
  /** for cognitive tests */
  correct?: number;
  total?: number;
  iq?: number;
  flags?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extra?: Record<string, any>;
}
