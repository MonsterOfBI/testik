# Cognitive tests for testik: IQ (ICAR-style), CRT, reaction time, Stroop, digit span, n-back

Deliverables (all parse with `node -e "JSON.parse(...)"`, all bilingual RU/EN, schema per SCHEMA.md):

| id | kind | file | items / protocol | dimensions (↓ = `lowerIsBetter`, * = has `norms`) |
|---|---|---|---|---|
| `iq` | cognitive | `tests/iq.json` | 34 items: 10 verbal, 12 series (8 number + 4 letter), 12 original matrices with `visual` spec; 25 min | g* (facets verbal*, series*, matrix*) |
| `crt` | cognitive | `tests/crt.json` | 11 items: Frederick 3 + CRT-2 4 + Toplak 4; each has correct option + intuitive lure | total, crt-classic*, crt-verbal, crt-extended, intuitive |
| `reaction-time` | game | `tests/reaction-time.json` | `protocol`: 3+20 simple, 4+40 four-choice, foreperiod 1–3 s | simple_rt↓*, choice_rt↓, consistency↓, choice_accuracy |
| `stroop` | game | `tests/stroop.json` | `protocol`: 12 practice + 48 (16 congruent/incongruent/neutral), 4 colours, RU/EN words | interference↓, congruent_rt↓, incongruent_rt↓, accuracy |
| `working-memory` | game | `tests/working-memory.json` | `protocol`: forward from 3, backward from 2, 2 trials/length, stop when both fail; optional Corsi spec | forward_span*, backward_span* |
| `n-back` | game | `tests/n-back.json` | `protocol`: 1-back practice, 2-back 2+30 trials, 33% targets, 500+2000 ms, log-linear d′ | dprime*, accuracy, hit_rate, false_alarm_rate↓ |

Generator/validator scripts (re-runnable): `/tmp/claude-0/-home-user/ead60077-fab3-50f6-a4af-d6aa3f9985ec/scratchpad/gen_iq.js` (+ `iq_meta.js`), `.../gen_crt.js`, `.../gen_games.js`; ICAR statistics: `.../icar_stats.py`, `.../icar_extrap.py`.

Integration notes for the site (from reading `/home/user/testik/src/lib/scoring.ts` and `src/components/games/*`):
- The game dimension ids are exactly the ones the site components emit, and `lowerIsBetter` is set where lower raw is better.
- `crt`: the cognitive scorer only counts correct answers per `question.dimension` plus `total`/`g`. So `total`, `crt-classic`, `crt-verbal` and `crt-extended` work as they are. **`intuitive` will always be 0 until `rawScores` (kind `cognitive`) also adds up `option.scores` for the chosen option.** Lure options carry `scores: {intuitive: 1}` for this.
- `iq`: the site computes `res.iq` from `g.norms` and clamps it to 55–145. With the provisional norms (20.8 ± 8.4) the reachable range is about 63–124, so phrase extremes as "below 75" or "above 120".
- `n-back`: the component reports `hit_rate` and `false_alarm_rate` from the log-linear-corrected H′/F′. Display raw rates instead. It also places targets at random (p = .33), so fix 10 targets per 30 trials.
- `reaction-time`: the component uses 10 simple and 16 choice trials. The JSON protocol recommends the Deary–Liewald counts (20/40), but both work.

## Q1. Exact public items, protocols, scoring formulas and time limits

### Takeaway
ICAR publishes only two text items in public (one verbal reasoning item and one letter series), and these are used verbatim. The ICAR16 Sample Test and the item bank sit behind a password, so the other 32 IQ items are original items in ICAR formats, and the 12 matrices follow Carpenter et al.'s rule taxonomy. A script checks that every matrix has exactly one option matching its stated rule. The CRT items (3 + 4 + 4) are published verbatim in the literature. The four games use standard published protocols (Deary–Liewald RT, Stroop 1935/MacLeod, WAIS-style digit span, Kirchner/Jaeggi n-back), with exact timings in each JSON's `protocol`.

### Cited Findings
**ICAR / IQ**
- ICAR has four item types: Letter & Number Series (choose the next element from 6 options), Matrix Reasoning (3×3 arrays of geometric shapes, one cell missing, 6 options), Verbal Reasoning (logic, vocabulary, general knowledge) and 3D Rotation (cube renderings). The paper itself prints no item text. — [Condon & Revelle 2014 (PDF)](https://personality-project.org/revelle/publications/condon.icar.14.pdf)
- Public sample items in the ICAR Catalogue: VR: "IF the day after tomorrow is two days before Thursday, then what day is it today?" Options: Friday, Monday, Wednesday, Saturday, Tuesday, Sunday (key: Sunday). LN: "In the following alphanumeric series, what letter comes next? I J L O S" Options: T U V X Y Z (key: X). Matrix and 3D-rotation samples are images only. — [ICAR Catalogue](https://icar-project.com/ICAR_Catalogue.pdf)
- The item pages give "unrestricted access to the psychometric data … and password-protected access to the items themselves; … contact us through ICAR-project.com". The sample-test URL redirects to `secure.php`. — [ICAR item types](https://icar-project.org/types/index.html); [ICAR home](https://icar-project.org/)
- ICAR items were untimed online. The authors see no reason they could not be timed. — [Condon & Revelle 2014](https://personality-project.org/revelle/publications/condon.icar.14.pdf)
- The ICAR Number Series generator is available as the R package "NumGen", and the number-series items are untimed. — [ICAR Catalogue](https://icar-project.com/ICAR_Catalogue.pdf)
- ICAR16 consists of reason.4/16/17/19, letter.7/33/34/58, matrix.45/46/47/55 and rotate.3/4/6/8 (data set `ability`, 1 525 SAPA participants, collected 8–31 Aug 2012). Two matrix items have non-monotone trace lines. — [psychTools `ability.Rd` (GitHub CRAN mirror)](https://raw.githubusercontent.com/cran/psychTools/master/man/ability.Rd)
- Carpenter, Just & Shell (1990), Psychological Review 97(3):404–431, give the Raven rule taxonomy used for the matrices: constant in a row, quantitative pairwise progression, figure addition/subtraction, distribution of three values, distribution of two values (XOR). — [doi:10.1037/0033-295X.97.3.404](https://doi.org/10.1037/0033-295X.97.3.404) (the paper was not re-fetched in this session; this is the standard citation)

**Design of the iq items (site's own work, verified by script)**
- 12 matrices: m01 constant shape in each row + count +1 per column; m02 size progression s→m→l; m03 distribution of three shapes; m04 shape constant per column + distribution of three fills; m05 rotation +90° per step; m06 count arithmetic (col3 = col1 + col2); m07 figure addition; m08 distribution of three + 2-D count progression; m09 figure subtraction; m10 XOR; m11 three rules (shape, fill, count); m12 two components with four rules.
- Each `visual` holds `cells` (cell 9 = null), `options` (6–8 cell specs), `rule` (RU/EN), `rules` (machine-readable), `taxonomy` and `render` conventions. Options are in a fixed order. Correct positions are 2,4,0,3,1,5,4,6,1,3,0,5 (0-based), so they are balanced.
- The validator rebuilds cell 9 from the rule function and checks: exactly one option matches it (order-insensitive), there are no duplicate options, there are 6–8 options, and the shape, fill and size enums are valid. It also checks the logic of v10 ("exactly one statement is true") and every series answer.
- Russian letter series use the same ordinal positions in the 32-letter alphabet without Ё. For example, I J L O S → X becomes И Й Л О Т → Ч. Every letter item shows the alphabet strip in both languages.
- If every item is answered at random, the expected score is about 5.8 of 34.

**CRT**
- CRT-2 items: race ("pass the person in second place" → second; lure first), sheep ("15 sheep, all but 8 died" → 8; lure 7), Emily ("April, May, …" → Emily; lure June), hole (3′×3′×3′ → none; lure 27). — [Thomson & Oppenheimer 2016, JDM](https://dlab.sauder.ubc.ca/sjdm/journal/15/151029/jdm151029.html)
- The original three CRT items (bat & ball, machines, lily pads) are reproduced in Table 1 of Stupple et al. 2017. The 7-item expansion is by Toplak, West & Stanovich (2014), Thinking & Reasoning 20:147–168. — [Stupple et al. 2017, PLoS ONE](https://pmc.ncbi.nlm.nih.gov/articles/PMC5669478/)
- The four Toplak 2014 items (barrel of water, Jerry 15th highest/lowest, pig, Simon's stocks) are in crt.json in their standard wording. Their exact text could not be fetched from the original in this session (see Gaps).
- Adaptation choices: $1.10 became 110 rubles, so the answer is 5 rubles. Cubic feet became cubic metres. "Emily / April, May → June" became "Маша / Вера, Надежда → Любовь", the culturally equivalent name triplet (Faith, Hope, Love) with the same logic. The Toplak items use rubles and Russian names.

**Games**
- Deary–Liewald RT task: simple RT 8 practice + 20 test trials; four-choice RT 8 practice + 40 test trials. The inter-stimulus interval is a random 1–3 s, now regenerated for each participant. The stimulus is a diagonal cross in a white square on blue (simple) or in one of four squares (choice). Choice keys are z x , . (index and middle fingers). Errors are recorded. A 60 Hz monitor or better with ≤ 5 ms pixel response is recommended. — [Deary, Liewald & Nissan 2011](https://www.doi.org/10.3758/S13428-010-0024-1)
- Woods et al. 2015 SRT: 20 practice + 120 test trials, SOA 1 000–1 800 ms, gaming-mouse response. Responses outside 110–1 000 ms counted as false alarms. Measured hardware delay was about 17.8 ms (display 11 + mouse 6.8). — [Woods et al. 2015, Front Hum Neurosci](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2015.00131/full)
- Online Stroop (Crump et al. 2013): 96 trials (48 congruent / 48 incongruent), red/green/blue/yellow, 500 ms fixation + 500 ms blank, item shown until response, 500 ms accuracy feedback. Responses were typed colour names. Only correct trials were analysed, and outlier removal dropped 3%. — [Crump, McDonnell & Gureckis 2013](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0057410)
- Digit span (Millisecond library): 1 digit/s, forward starts at 3 and backward at 2. The classic score is TEML, the last span mastered before a double failure, with two attempts per level. Alternative scores are ML (max length) and MeanSpan (Woods et al. 2011). — [Millisecond Digit Span](https://www.millisecond.com/library/digitspan)
- Visual backward digit span (Ebaid & Crewther 2019): digits 1–9 at one per second, length starts at 2 and rises every two trials, the task stops after two consecutive errors, and the score is the last correct length. This is almost identical to the site protocol. — [Ebaid & Crewther 2019](https://www.frontiersin.org/journals/aging-neuroscience/articles/10.3389/fnagi.2019.00116/full)
- eCorsi (tablet): 9 squares; each block flashes 500 ms with a 1 000 ms onset interval; start at 2. The participant advances after at least 1 correct sequence of a length, and span is the last length with ≤ 1 error. — [Brunetti et al. 2014](https://public-pages-files-2025.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2014.00939/pdf)
- n-back (Jaeggi et al. 2010): 500 ms stimulus, 2 500 ms ISI, 1/2/3-back, 40–66 trials per load, 33% targets. Accuracy was scored as Pr = hits − false alarms. — [Jaeggi et al. 2010 (PDF)](https://Www.Gwern.net/doc/dual-n-back/2010-jaeggi-2.pdf)
- n-back (Hepdarcan & Can 2025): consonants D G K M T V or Attneave shapes; 500 ms stimulus + 2 000 ms blank; 30 stimuli per condition (10 targets / 20 non-targets); 0–3-back. — [Hepdarcan & Can 2025, Current Psychology](https://link.springer.com/article/10.1007/s12144-025-07318-9)
- n-back for children (Pelegrina et al. 2015): 20 consonants, 500 ms + 3 000 ms, two blocks of 20 trials per level, about 30% targets, with the first 3 trials always non-targets. — [Pelegrina et al. 2015](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2015.01544/full)

### Inferences
- Scoring formulas used in the JSON:
  - IQ ≈ 100 + 15·(g − 20.8)/8.4.
  - CRT reflection = number correct; intuitive = number of lures chosen.
  - simple_rt = median of trials within 100–1 500 ms; choice_rt = median of correct choice trials within 100–2 000 ms; consistency = SD of simple RT.
  - Stroop interference = mean RT of correct incongruent trials − mean RT of correct congruent trials, after 200–3 000 ms and 2.5-SD trimming.
  - span = longest length with ≥ 1 perfect trial.
  - d′ = z(H′) − z(F′) with the Hautus log-linear correction.
- The site's 4-colour Stroop with buttons is a manual-response Stroop. Its absolute RTs will not match the typed (Crump) or vocal versions.
- The original CRT is open-ended. Multiple choice was chosen so that the lure can be captured. The validation of MC CRT formats by Sirota & Juanchich (2018, BRM 50:2511–2522) is cited from memory and was not fetched in this session.

### Gaps
- The verbatim text of the remaining ICAR16 items (VR.04/16/17/19, LN.07/33/34/58) could not be obtained. They are password-protected and their public reproduction is not authorised, so they were deliberately not reproduced.
- Frederick 2005 (AEA PDF) and Toplak et al. 2014 could not be fetched. The wording of the three classic items and the four Toplak items is the standard published wording, but it was not re-checked against the PDFs here.
- Kessels et al. 2000's Corsi block coordinates were not available. The `optionalCorsi` layout is the site's own design.

## Q2. Published norms (mean, SD, sample, age) on the metric the site computes

### Takeaway
Norms on exactly the site's metrics exist for the classic CRT (meta-analysis), forward and backward digit span (WAIS-IV; a visual backward version) and roughly for 2-back d′. The ICAR-based IQ norm and the simple-RT norm are provisional values derived from published data, and they are labelled as such inside `norms.population`. No published browser norms in a matching format were found for choice RT SDs, RT consistency, Stroop button RTs/interference, n-back hit/FA/accuracy, or the CRT 0–11 total. Those dimensions carry rule-of-thumb bands marked as such, with no `norms` object, so the site shows no percentile for them.

### Cited Findings
**ICAR / IQ**
- ICAR16 in SAPA Study 1: N = 96 958 (66% female, 199 countries, 78% US), mean age 26 (SD 10.6, median 22, range 14–90). Item proportions correct: VR .61–.73; LN .42–.62; MR .36–.62; R3D .17–.29. α = .81, ω_h = .66, ω_t = .83. — [Condon & Revelle 2014](https://personality-project.org/revelle/publications/condon.icar.14.pdf)
- Validity: the ICAR16 composite correlates .59 with self-reported SAT and .52 with ACT (corrected; Study 2, N = 34 229, ages 18–22). With Shipley-2 (N = 137 students) the raw correlations are .40–.44 and the corrected correlations .81–.82. — [Condon & Revelle 2014](https://personality-project.org/revelle/publications/condon.icar.14.pdf)
- **Own computation from the open data set** `psychTools::ability` (N = 1 525 SAPA, 2012; 1 248 complete cases), using `icar_stats.py`:
  - ICAR16 total M = 8.37 of 16, SD = 3.93, α = .83.
  - Percentiles of the total: 10th = 3, 25th = 5, 50th = 8, 75th = 11, 90th = 14.
  - Item means: reason .64–.74; letter .47–.64; matrix .39–.64; rotate .19–.31.
  - The 12-item version without rotation: M = 7.41, SD = 3.16. — [psychTools data (GitHub CRAN mirror)](https://raw.githubusercontent.com/cran/psychTools/master/data/ability.rda); [package DESCRIPTION, v2.6.4, GPL ≥ 2](https://raw.githubusercontent.com/cran/psychTools/master/DESCRIPTION)
- **Extrapolation to the 34-item site form** (`icar_extrap.py`). This used the mean item p, the mean item variance and the within- and between-type inter-item covariances of the ICAR VR/LN/MR items, scaled to 10 + 12 + 12 items.
  - Predicted total M = 20.8, SD = 8.4, α ≈ .92.
  - Predicted subscales: verbal 7.1 ± 2.8 (α ≈ .82); series 7.2 ± 3.7 (α ≈ .86); matrix 6.6 ± 3.2 (α ≈ .77).
  - These are the `norms` in iq.json, flagged PROVISIONAL. They assume the new items behave like ICAR items of the same type, which is unverified.
- ICAR16 factor structure is invariant across sex and age. The authors recommend using only the ICAR16 total score, because the subscales have weak internal consistency. — [Young, Keith & Bond 2019 (abstract)](https://ideas.repec.org/a/eee/intell/v77y2019ics0160289619301813.html)

**CRT**
- Frederick 2005: 3 428 respondents in 35 studies, mean 1.24/3. About a third scored 0 and 17% scored 3. MIT 2.18, Princeton 1.63, Carnegie Mellon 1.51. — [RiotIQ summary of Frederick 2005](https://www.riotiq.com/articles/specific-iq-tests-and-formats/what-is-the-cognitive-reflection-test) (secondary source; the primary [JEP article](https://www.aeaweb.org/articles?id=10.1257/089533005775196732) could not be fetched)
- Meta-study: 118 studies, 44 558 participants, 21 countries, 2007–2015. Score 0/1/2/3 = 37.54/23.18/21.12/18.17%. Item correct rates: bat & ball 31.75%, machines 40.24%, lily pads 47.78%. Women scored lower. Monetary incentives had no effect. Computerised administration was marginally better. Taking the CRT after the experiment lowered scores. Students scored higher. About 42% of observations were students. — [Brañas-Garza, Kujal & Lenkei, MPRA 68049](https://mpra.ub.uni-muenchen.de/68049/1/MPRA_paper_68049.pdf); published as J Behav Exp Econ 82:101455 (2019) — [Middlesex repository](https://repository.mdx.ac.uk/item/8861v)
- From that distribution I computed M = 1.20 and SD = 1.13. This is the `crt-classic` norm.
- CRT-2 (UCLA undergraduates, 134 completers): 56.2% correct (CRT 46.3%). By item: race 62.9%, sheep 83.2%, Emily 62.4%, hole 16.1%. α: CRT-2 .51, CRT .62, the 7 items together .71. CRT–CRT-2 r = .51 (disattenuated .91). Prior exposure on MTurk was 72%; exposed vs naive scored 1.90 vs 1.29. — [Thomson & Oppenheimer 2016](https://dlab.sauder.ubc.ca/sjdm/journal/15/151029/jdm151029.html)

**Reaction time**
- Deary–Liewald (N = 150: 18–25 / 45–60 / 61–80, 50 each; overall age 47.7 ± 20.9): SRT mean 274.4 ms, intra-individual SD 45.3 ms; 4-choice RT mean 474.5 ms, intra-individual SD 100.1 ms; 2.4 errors of 40. The "SRT SD" figure is the intra-individual SD. Between-person SDs and age-group values are only in Table 1, which was not accessible. Correlations with the HALS "numbers box": SRT .68, CRT .82. — [Deary et al. 2011](https://link.springer.com/article/10.3758/s13428-010-0024-1?code=4933e939-df2a-4352-94a5-fc2902efbc12&error=cookies_not_supported)
- Woods et al. 2015 (N = 1 469, 18–65, gaming mouse):
  - SRT M = 231 ms, SD = 27 ms (Exp 2, N = 189, 18–82: 238 ± 28). Hardware-corrected ≈ 213/220 ms.
  - Age effect +0.55 ms/yr (Exp 1) and +0.45 ms/yr (Exp 2); 18–24 = 217.9 ms vs 59–65 = 239.1 ms.
  - Intra-individual SD 40.0 / 52.7 ms; no sex difference; education had no effect. — [Woods et al. 2015](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2015.00131/full)
- HALS reanalysis (N = 7 130): simple RT changes little until about 50; choice RT slows across adulthood; choice-RT variability is tied to its mean and to error rate; there are significant sex differences, most notably in choice-RT variability. — [Der & Deary 2006 (abstract)](https://www.research.ed.ac.uk/en/publications/age-and-sex-differences-in-reaction-time-in-adulthood-results-fro/)
- Web offset: about 37 ms from web technology alone and about 87 ms for online recording versus the lab. Between-subject SDs for web vs lab Stroop mean RT were 76.6 vs 59.4 (ratio about 1.3). Error rates did not differ by setting. — [Semmelmann & Weigelt 2017](https://link.springer.com/article/10.3758/s13428-016-0783-4)
- **Site norm for simple_rt: 270 ± 35 ms (PROVISIONAL composite).** The mean is close to Deary–Liewald's 274 and to Woods 231 + 37. The SD is Woods' 27 × 1.3.

**Stroop**
- Online colour Stroop with typed responses (MTurk N = 40): congruent 859 ms, incongruent 1 152 ms, effect 293 ms (η²p = .82); errors 4.5% / 5.9%. Lab comparison (Logan & Zbrodoff): 809 / 1 023 ms. — [Crump et al. 2013](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0057410)
- Numeric (counting) Stroop with keypress: mean RT lab 506 ms (SD 59), web-in-lab 552 (63), web 606 (77); errors about 4–5%. — [Semmelmann & Weigelt 2017](https://link.springer.com/article/10.3758/s13428-016-0783-4)
- No `norms` are given for the Stroop dimensions, because no button-response colour-Stroop browser norms were found.

**Digit span / Corsi**
- US WAIS-IV forward span by age (as tabulated by Sebastián & Mediavilla): 35–44 6.8 (1.4); 45–54 6.8 (1.4); 55–64 6.5 (1.3); 70–74 6.2 (1.4); 80–84 6.1 (1.3); 85–90 6.0 (1.2).
- The Spanish sample in the same paper (N = 987, ages 35–90, 1 digit/s, 2-of-3 criterion) scored lower: 5.62 (.94) at 35–44 and 4.25 (.74) at 85–90. Men scored 5.19 and women 5.00. Secondary education gave 5.33 vs 4.86 for primary. The authors attribute the lower Spanish scores partly to word length. — [Sebastián & Mediavilla 2015, Psicothema](https://www.psicothema.com/pdf/4240.pdf)
- **Site forward_span norm: 6.8 ± 1.4** (WAIS-IV, 35–54).
- Visual backward digit span: young adults (N = 67, 18–29, M age 19.6, 59 female) 5.72 ± 1.23; older adults (N = 33, 60–81) 5.27 ± 1.28. Auditory backward: 5.88 ± 1.87 and 5.06 ± 1.12. The authors say both groups exceeded the suggested norms. — [Ebaid & Crewther 2019](https://www.frontiersin.org/journals/aging-neuroscience/articles/10.3389/fnagi.2019.00116/full)
- **Site backward_span norm: 5.7 ± 1.2.**
- Italian norms (N = 362, ages 20–90) for forward/backward digit and Corsi span show a decline with age on all four tasks and an education effect on all except backward Corsi. Correction grids exist, but the means were not accessible. — [Monaco et al. 2013](https://link.springer.com/doi/10.1007/s10072-012-1130-x)
- eCorsi (N = 107; young n = 73, aged 21.6 ± 1.7): forward 6.11 ± 0.80 and backward 5.29 ± 1.20 in the young group. All participants: forward 5.68 ± 1.13, backward 4.99 ± 1.31. Older adults (n = 34, about 57.6): 4.76 ± 1.19 forward and 4.35 ± 1.30 backward. — [Brunetti et al. 2014](https://public-pages-files-2025.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2014.00939/pdf)
- Kessels et al. 2000 give an average Corsi span of "about 5–6" in healthy adults (via Wikipedia). — [Wikipedia: Corsi block-tapping test](https://en.wikipedia.org/wiki/Corsi_block-tapping_test)

**n-back**
- Hepdarcan & Can 2025 (N = 54; young n = 30, aged 18–24; older n = 25, aged 50–78):
  - d′ by load: 0-back 3.11 (.48); 1-back 2.49 (.71); 2-back 1.62 (.76); 3-back 0.73 (.60). Pooled across age and stimulus type.
  - d′ by age group: young 2.22 vs older 1.76.
  - Target RT for 2-back: 655 ms (young) vs 892 ms (older).
  - Reliability: split-half target accuracy .64, test–retest .63 (3 weeks). — [Hepdarcan & Can 2025](https://link.springer.com/article/10.1007/s12144-025-07318-9)
- **Site dprime norm: 1.62 ± 0.76 (PROVISIONAL).**
- Jaeggi et al. 2010, Pr (hits − FA), M (SD) in Experiments 1/2/3:
  - visual 2-back .91 (.13) / .91 (.10) / .92 (.09); visual 3-back .66 / .75 / .60
  - auditory 2-back .89 / .91 / .85; auditory 3-back .47 / .67 / .45
  - dual 2-back .72 / .63 / .62
- In the same paper, split-half reliability of 2-back accuracy ranged from .26 to .85. Correlation with Raven APM was r = .32 for visual 3-back and .48 for dual 3-back (N = 50). Correlation with reading span was near zero. — [Jaeggi et al. 2010](https://Www.Gwern.net/doc/dual-n-back/2010-jaeggi-2.pdf)
- Children aged 7–13 (N = 3 722), 2-back: hits 50.6%, FA 13.8%, d′ 1.29 (.99). Children only, so not used as a norm. — [Pelegrina et al. 2015](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2015.01544/full)

### Inferences
- The Hepdarcan d′ norm probably underestimates letter-only 2-back d′ in young adults. Jaeggi's Pr ≈ .9 would mean something like H ≈ .94 and F ≈ .03, i.e. d′ ≈ 3.4, though H and F were not reported separately. Expect many site users above the 80th percentile. Replace the norm with site data early.
- With 10 targets and 20 non-targets, the maximum corrected d′ is about 3.67 (H′ = 10.5/11, F′ = 0.5/21). This is a hard ceiling.
- Russian vs English versions (Stroop words; digit names "семь/seven", "восемь/eight") differ in length. Keep site norms separate by language and by device class. The word-length explanation comes from the Spanish digit-span paper above.
- When the site has ≥ 1 000 unique completions per test and device, replace every provisional norm with empirical percentiles.

### Gaps
- Between-person SDs for Deary–Liewald choice RT and intra-SD, and the HALS age-group means, were not accessible (Table 1, paywalled PDF). So choice_rt, consistency and choice_accuracy have no `norms`.
- No published norms were found for browser colour-Stroop with 4 buttons, nor for its interference SD. Hedge et al. 2018's numbers were not retrieved; only their qualitative conclusion is cited.
- WAIS-IV longest digit span backward norms were not found in an accessible source, so a small visual-DSB student sample is used instead.
- Kessels 2000 numeric Corsi norms were not accessible. Haatveit et al. 2010 (Bergen n-back) d′ values were not accessible because of a firewall.
- No norms exist for the 11-item CRT total or for the Toplak items in an MC format.
- Russian adaptations: no published Russian ICAR or CRT-2 validation was searched for or found in this session.

## Q3. History, theory, validity, limitations, and the online-IQ controversy

### Takeaway
The IQ test follows the g / CHC tradition: Spearman's positive manifold, Cattell's Gf/Gc split, and Carroll's three strata merged into CHC. Matrices and series are Gf markers. ICAR provides open validity evidence (α ≈ .8, corrected r ≈ .8 with Shipley-2, invariance across age and sex). Its norms come from self-selected online volunteers, so the site's IQ is an approximate rank, not a clinical IQ. The CRT reflects dual-process theory and is vulnerable to item familiarity. Speed tasks (RT, Stroop, n-back) are robust at the group level but only moderately reliable as individual-difference measures.

### Cited Findings
- ICAR was created as a public-domain alternative to proprietary short ability measures, inside the online SAPA project. — [Condon & Revelle 2014](https://personality-project.org/revelle/publications/condon.icar.14.pdf); [ICAR home](https://icar-project.org/)
- ICAR subscales have weak internal consistency, so researchers interested in subscales should use the ICAR60. — [Young, Keith & Bond 2019](https://ideas.repec.org/a/eee/intell/v77y2019ics0160289619301813.html)
- Open-source ability measures in everyday-life research. — [Revelle, Dworak & Condon 2020, doi:10.1177/0963721420922178](https://doi.org/10.1177/0963721420922178); [Dworak et al. 2021, doi:10.1016/j.paid.2020.109906](https://doi.org/10.1016/j.paid.2020.109906)
- Theory references used in `methodology` (standard works, cited by DOI, not re-fetched in this session):
  - [Spearman 1904, doi:10.2307/1412107](https://doi.org/10.2307/1412107)
  - [Cattell 1963, doi:10.1037/h0046743](https://doi.org/10.1037/h0046743)
  - [McGrew 2009 (CHC), doi:10.1016/j.intell.2008.08.004](https://doi.org/10.1016/j.intell.2008.08.004)
  - [Carpenter et al. 1990, doi:10.1037/0033-295X.97.3.404](https://doi.org/10.1037/0033-295X.97.3.404)
  - [Raven 2000, doi:10.1006/cogp.1999.0735](https://doi.org/10.1006/cogp.1999.0735)
  - [Neisser et al. 1996, doi:10.1037/0003-066X.51.2.77](https://doi.org/10.1037/0003-066X.51.2.77)
  - [Deary 2012, doi:10.1146/annurev-psych-120710-100353](https://doi.org/10.1146/annurev-psych-120710-100353)
  - Carroll 1993 and Wechsler 1939 (books)
  - Russian textbooks (print): Анастази & Урбина «Психологическое тестирование» (СПб.: Питер, 2007); Бурлачук «Психодиагностика» (СПб.: Питер); Холодная «Психология интеллекта» (СПб.: Питер, 2002); Лурия «Основы нейропсихологии» (М.: МГУ, 1973).
- CRT: prior exposure raises scores, but the validity differences by exposure were not significant (Thomson & Oppenheimer 2016). Reliability is low (α .51–.62). CRT-2 correlates less with numeracy than the CRT (.31 vs .58). — [Thomson & Oppenheimer 2016](https://dlab.sauder.ubc.ca/sjdm/journal/15/151029/jdm151029.html)
- Response-time evidence suggests a limited role for "miserly processing" in the CRT. Slower is not always better. — [Stupple et al. 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5669478/)
- n-back is "not a useful measure of individual differences in WM capacity" because of low reliability, yet it predicts Gf at higher loads. — [Jaeggi et al. 2010](https://Www.Gwern.net/doc/dual-n-back/2010-jaeggi-2.pdf)
- Robust experimental effects have low between-subject variability, which limits their reliability as individual-difference measures (the "reliability paradox"; Stroop is among the tasks discussed). — [Hedge et al. 2018 (abstract via OmicsDI)](https://omicsdi.org/dataset/biostudies-literature/S-EPMC5990556)
- Digit span forward relies mainly on the phonological loop and visuospatial sketchpad, backward span on the central executive. — [Monaco et al. 2013](https://link.springer.com/doi/10.1007/s10072-012-1130-x)
- "7 ± 2" is the commonly cited consensus span (5–9). — [Millisecond Digit Span (citing Miller 1956)](https://www.millisecond.com/library/digitspan); Cowan 2001's estimate of about 4 chunks is cited by DOI ([10.1017/S0140525X01003922](https://doi.org/10.1017/S0140525X01003922)) and was not re-fetched.
- Online RT data replicate lab effects with an additive offset, and online psychophysics is "a suitable complement – or even substitute". — [Semmelmann & Weigelt 2017](https://link.springer.com/article/10.3758/s13428-016-0783-4)
- MTurk replicates classic Stroop and other RT effects. — [Crump et al. 2013](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0057410)

### Inferences
- The online-IQ controversy (stated in the JSON as limitations, not as cited facts):
  - Commercial "free IQ tests" usually publish no norms or reliability and inflate scores.
  - Self-selected online samples are younger and more educated than the population.
  - Retaking and item leakage inflate scores.
  - Clinical IQ requires individually administered, normed batteries.
- The site mitigates this by framing the result as a profile, giving a ±8-point band, flagging norms as provisional, and capping the reported range.
- Subscale differences should be shown only when they exceed about 1 SD, consistent with ICAR's advice against interpreting short subscales.
- The CRT measures a mix of numeracy, reflection and familiarity. Asking users whether they had seen the items is advisable (the instructions already say this). Storing that answer would need a small UI addition.

### Gaps
- No peer-reviewed source was retrieved that specifically criticises commercial online IQ tests (e.g. score inflation). The points above are reasoning, not cited findings.
- Russian-language validity data for these tasks (e.g. Russian Stroop norms or a Russian CRT-2 adaptation) were not found or checked.

## Q4. Licenses

### Takeaway
All items and procedures used are either public-domain or open sources, or are original to the site. The deliberate exclusions are the password-protected ICAR items, WAIS-IV digit sequences, and commercial Stroop forms.

### Cited Findings
- The authors describe ICAR as "a public-domain assessment tool" and the Sample Test as "a public-domain alternative", but access requires registration by email. No formal licence text is given. — [ICAR home](https://icar-project.org/); [ICAR item types](https://icar-project.org/types/index.html); [Condon & Revelle 2014 title: "…a public-domain measure"](https://personality-project.org/revelle/publications/condon.icar.14.pdf)
- The two public ICAR sample items are printed in the ICAR Catalogue. — [ICAR Catalogue](https://icar-project.com/ICAR_Catalogue.pdf)
- The psychTools `ability` data (used for norms) is GPL ≥ 2 R-package data. — [DESCRIPTION](https://raw.githubusercontent.com/cran/psychTools/master/DESCRIPTION)
- The CRT-2 article is CC BY 3.0. — [Thomson & Oppenheimer 2016](https://dlab.sauder.ubc.ca/sjdm/journal/15/151029/jdm151029.html)
- Hepdarcan & Can 2025 is CC BY 4.0, with data on OSF (osf.io/taqz4). — [Current Psychology](https://link.springer.com/article/10.1007/s12144-025-07318-9)

### Inferences
- The CRT items are short puzzles used freely in research with citation. Copyright covers the papers, not the procedures. The JSON says this and reproduces only the items.
- The games are generic paradigms: Stroop 1935, Jacobs 1887 digit span, Corsi 1972, Kirchner 1958, Donders/Hick RT. Implementing them is fine. The JSON licenses explicitly exclude WAIS-IV sequences/forms and commercial Stroop forms (Golden, D-KEFS).
- To use ICAR16 verbatim, e.g. for direct norm comparability, register at icar-project.com and ask permission for public web use.

### Gaps
- No explicit ICAR terms of use about public web posting of items were found. This is why only the two Catalogue sample items are used.
- Note on process: the WebFetch budget ran out once mid-session, and several hosts (PMC, CRAN, T&F, Bohrium) were blocked or behind captchas. This is why some primary tables (Frederick 2005 Table 1, Deary 2011 Table 1, Kessels 2000, Haatveit 2010) are missing.
