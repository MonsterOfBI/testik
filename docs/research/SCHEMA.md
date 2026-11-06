# Test data schema (for the testik website)

Every test is ONE JSON file at `<notes dir>/tests/<id>.json`, UTF-8, valid JSON (validate with `node -e "JSON.parse(require('fs').readFileSync(process.argv[1]))" file`).
All human-facing text is bilingual: `{ "ru": "...", "en": "..." }` (type `L` below).
English may be copied verbatim from the original open-licensed source; Russian must be a natural, careful translation
(prefer an existing published/validated Russian adaptation of the items if one is openly available, and cite it).
Markdown is allowed inside `methodology`, `detailed`, and `description` strings.

```ts
type L = { ru: string; en: string };

interface TestDef {
  id: string;                    // kebab-case, e.g. "big-five"
  category: "personality" | "cognitive" | "mental-health" | "wellbeing" | "relationships" | "career" | "fun";
  kind: "likert" | "choice" | "cognitive" | "game";
  seriousness: "scientific" | "screening" | "fun";
  title: L; tagline: L;          // tagline: one catchy line for the catalog card
  description: L;                // 2-4 sentences: what you'll learn
  emoji: string;
  durationMin: number;
  popularity: 1 | 2 | 3 | 4 | 5; // how searched/popular the test is (5 = huge, like IQ/Big Five)
  tags: L[];
  methodology: L;                // markdown: what is measured, theory, history, how it's administered & scored, validity/reliability numbers (alpha, retest), limitations
  sources: { citation: string; url?: string; doi?: string }[];   // APA-style; real, verifiable papers/textbooks only
  license: string;               // e.g. "Public domain (IPIP)", with link; explain why it's OK to use
  disclaimer?: L;                // required for screening tests (not a diagnosis + where to get help, RU & international hotlines)
  instructions: L;               // shown before the test starts
  timeLimitSec?: number;         // whole-test limit if the original protocol has one

  likert?: { anchors: L[]; values: number[] };   // shared answer scale for kind=likert, e.g. 5 anchors, values [1..5] (or [0..3] for PHQ/GAD)

  dimensions: {
    id: string; name: L; description: L;
    lowLabel: L; highLabel: L;   // what low/high scores mean, 2-5 words each
    color?: string;              // optional pastel hex suggestion
    facets?: string[];           // ids of sub-dimensions (also listed in dimensions) for hierarchical models like Big Five facets
    scoring: "sum" | "mean";
    min: number; max: number;    // theoretical raw-score range for this dimension
    norms?: { mean: number; sd: number; n?: number; population: string; source: string };  // published norms on the SAME raw scale, for percentile ("better than X%")
    bands: { min: number; max: number; label: L; summary: L[]; detailed: L }[];  // contiguous ranges covering [min,max]; summary = 3-5 short bullet points; detailed = 1-3 paragraphs incl. practical advice
  }[];

  questions: {
    id: string;
    text: L;
    dimension?: string;          // for likert: which dimension it scores
    reverse?: boolean;           // for likert reverse-keyed items
    options?: { text: L; scores?: Record<string, number>; correct?: boolean }[];  // for choice/cognitive
    explanation?: L;             // for cognitive items: why the answer is correct (shown after test)
    visual?: any;                // for cognitive items needing a picture: a precise machine-readable spec (see cognitive notes) instead of an image file
    timeLimitSec?: number;
  }[];

  // For type-based results (temperament, animal, 16 types, fun tests): the outcome whose profile is nearest
  // to the user's normalized dimension scores (0..1) wins. For simple fun tests, use one dimension per
  // outcome and set profile {thatDim: 1}; then highest dimension = result.
  outcomes?: {
    id: string; title: L; emoji: string;
    profile: Record<string, number>;   // dimension id -> target normalized score 0..1
    summary: L[];                      // 3-6 bullets
    detailed: L;                       // 2-4 paragraphs
    strengths?: L[]; growth?: L[];
    funnyExamples?: L[];               // fun tests: 3-5 humorous relatable situations ("You at a party: ..."); mix wholesome and light meme/ironic humour, no swearing
    famous?: L[];                      // optional: well-known people/archetypes often associated (fun tests only; phrase as "often compared to")
    compatibleWith?: string[];         // outcome ids
    imagePrompt?: string;              // English prompt for an AI illustration in a soft pastel, cute flat-3D style
  }[];

  scoringNotes: L;               // plain explanation of how the score is computed (shown on demand)
  resultIntro?: L;               // optional text shown at top of results
}
```

Kinds:
- `likert`: every question has `dimension` (+ optional `reverse`), answered on the shared `likert` scale.
- `choice`: every option has `scores` (dimension id -> points).
- `cognitive`: options with exactly one `correct: true`; dimensions = item types (e.g. "verbal", "matrix"), score = number correct.
- `game`: interactive task implemented in code (reaction time, Stroop, digit span...). `questions` may be empty; put the exact protocol (trials, timings, stimuli, scoring formula) in `methodology` and a machine-readable `"protocol": {...}` object at top level; norms in `dimensions[].norms` on the scale of the outcome metric (e.g. ms).
