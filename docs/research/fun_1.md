# Fun personality quizzes, batch 1: spirit-animal, element, archetype, superpower, cosmic-object

## What was delivered, and how do the five quizzes work (schema, scoring, calibration)?

### Takeaway
Five ready-to-use bilingual JSON test definitions following SCHEMA.md are in `tests/`. All are `kind: "choice"`, `category: "fun"`, `seriousness: "fun"`, with 15–18 original situational questions of 5–6 options each, and 6–16 outcomes chosen by nearest profile on 0..1-normalised dimensions. Every outcome is reachable. With purely random answers each outcome comes up within 5.2–17.8%, inside the required 2–20% band.

### Cited Findings
- The schema requires: `choice` options carry `scores`; type results come from "the outcome whose profile is nearest to the user's normalized dimension scores (0..1)"; fun outcomes carry `funnyExamples` (3–5), `imagePrompt`, `compatibleWith`, and optionally `famous` phrased as "often compared to" — [SCHEMA.md](file:///home/user/research_notes/Научная%20база%20тестов%20для%20сайта/SCHEMA.md)
- Files written, each validated with `node -e "JSON.parse(...)"`:
  - `/home/user/research_notes/Научная база тестов для сайта/tests/spirit-animal.json`: 18 questions × 5 options, dimensions O C E A N, 16 animals (≈148 KB)
  - `/home/user/research_notes/Научная база тестов для сайта/tests/element.json`: 15 questions × 5–6 options, dimensions E N O C, 6 elements (≈95 KB)
  - `/home/user/research_notes/Научная база тестов для сайта/tests/archetype.json`: 16 questions × 6 options, 4 motivation dimensions, 12 archetypes, with `famous` (fictional characters only) (≈133 KB)
  - `/home/user/research_notes/Научная база тестов для сайта/tests/superpower.json`: 16 questions × 6 options, 6 VIA-virtue dimensions, 12 superpowers (≈134 KB)
  - `/home/user/research_notes/Научная база тестов для сайта/tests/cosmic-object.json`: 16 questions × 5–6 options, dimensions O C E A N, 12 objects (≈130 KB)
  - (local files; no external URL)
- An independent checker (separate code reading only the JSON files) confirmed: no keys outside the schema; `id`, `kind`, `category` and `seriousness` are correct; each dimension's `min`/`max` equals the theoretical range recomputed from the options; bands are contiguous and cover [min, max]. Its 100k random-answer re-simulation gave per-outcome shares of 5.2–7.3% (spirit-animal), 15.4–17.5% (element), 7.4–9.0% (archetype), 7.1–9.6% (superpower) and 6.7–9.9% (cosmic-object) — (local verification run)

### Inferences
**Scoring the site must implement (it matches `scoringNotes` in each file):**
1. `raw[d] = Σ option.scores[d]` over the chosen options.
2. `norm[d] = (raw[d] − dim.min) / (dim.max − dim.min)`, using `min`/`max` from the JSON.
3. The winner is the outcome minimising `Σ_d (norm[d] − profile[d])²`, summed over the profile's keys (all profiles list every dimension).
4. Dimension `bands` split the theoretical range into thirds for optional "trait bars". There are no `norms` (none exist for these fun scales), so no percentiles.

**Why the stored profiles look "compressed".** Each outcome first got a design profile (the theory pattern, e.g. owl = high O, high C, low E). The tuner then kept each pattern's direction (design − 0.5) but rescaled its distance from the centre of the simulated response cloud, iterating until shares evened out. Random answers cluster around the middle of every scale, so the calibrated profiles sit closer together than the design ones (e.g. owl O 0.75 → 0.49). The design profiles are listed in the calibration section below; the JSON holds the calibrated ones, which the site must use as-is.

**Two simulations were run:**
- **Random**: every option equally likely, 200k runs. This is the required check.
- **Persona**: a latent trait vector z ~ U[0,1]^D, with options picked by softmax(1.5 · Σ score·(2z−1)), 50k runs. It mimics consistent respondents and is a stricter, extra check.

Reachability was confirmed by coordinate ascent: for each outcome, the search found an answer set where that outcome wins.

The build and simulation scripts are in the scratchpad: `/tmp/claude-0/-home-user-testik/ead60077-fab3-50f6-a4af-d6aa3f9985ec/scratchpad/fun1/` (`common.js`, `build-fun1.js`, one source file per quiz). The raw report is in `fun1-reports.json` in the same folder.

**Copywriting notes:**
- Russian copy is written natively, not translated. Jokes rest on Russian everyday culture: «в цирке не выступает», оливье по бабушкиному рецепту, «зажигалка», Чебурашка, Карлсон, Шурик, Левша.
- Russian wording avoids gendered past-tense forms addressed to the user (no «сделал(а)»), keeping verbs in the present or impersonal. Adjectives agree with the outcome noun («Ты — сова: наблюдательная»).
- English copy is written independently, not back-translated, so some jokes differ between languages on purpose.
- Every `imagePrompt` ends with a shared style tail: "soft pastel colors, glossy flat-3D style, smooth gradient background, cute, minimal, high detail, no text".

### Gaps
- No real-user data exists, so test–retest reliability, internal consistency and the actual outcome distribution among real visitors are unknown. Recommend logging outcome shares after launch and re-tuning profiles with the same script if any outcome drifts below 2% or above 20%.
- The web-fetch budget for the session (shared, 100/hour) ran out during research. Several citations below come from established literature known before this session and were **not re-opened this session**; they are flagged in the relevant Gaps sections.

## spirit-animal: how is "Какое ты животное?" grounded in animal-personality research?

### Takeaway
Animal personality is a legitimate research field. Extraversion-, neuroticism- and agreeableness-like dimensions recur across many species, while conscientiousness appears as a separate factor only in chimpanzees. The quiz therefore scores humans on the Big Five and maps them to animals whose profiles are playful, folklore-informed images, explicitly **not** measured species averages.

### Cited Findings
- Gosling & John (1999) reviewed factor analyses across species: Extraversion, Neuroticism and Agreeableness "showed the strongest cross-species generality", Openness next, and "a separate Conscientiousness dimension appeared only in chimpanzees". They found modest evidence for Dominance and little for Activity — [Gosling & John 1999 (CZAW summary)](https://czaw.org/resources/personality-dimensions-in-nonhuman-animals-a-cross-species-review); journal page [APS Current Directions](https://www.psychologicalscience.org/journals/current-directions/1467-8721.00017/)
- Gosling (2001, Psychological Bulletin) concluded that animal trait ratings are generally reliable and show some validity. He noted that some dimensions recur across species, but that non-standard descriptors make systematic synthesis hard — [Gosling 2001 (CZAW summary)](https://czaw.org/?p=3881)
- The Gosling lab says impressions of animal personality "do not merely reflect anthropomorphic projections". Its cross-species review covered octopuses, guppies, rats, pigs, dogs, cats, donkeys, hyenas, monkeys, gorillas and chimpanzees, and found conscientiousness evidence only in humans and chimpanzees — [Gosling lab: Animal Personality](https://gosling.psy.utexas.edu/?p=63)

### Inferences
- The JSON's methodology says plainly that the animal profiles are stylised, not measured (the "wise owl" is folklore).
- Other species-specific studies are cited inside outcome texts as fun facts:
  - dogs: Gosling, Kwan & John 2003, *JPSP* 85(6) — raters agree about dogs about as well as about humans
  - spotted hyenas: Gosling 1998, *J Comp Psych* 112(2)
  - chimpanzees: King & Figueredo 1997, *JRP* 31(2)
  - octopuses: Mather & Anderson 1993, *J Comp Psych* 107(3) — activity, reactivity and avoidance dimensions
  - cats: Litchfield et al. 2017, *PLoS ONE* — the "Feline Five": neuroticism, extraversion, dominance, impulsiveness, agreeableness
- The 16 outcomes (owl, fox, dolphin, cat, wolf, otter, bear, raccoon, capybara, penguin, eagle, octopus, elephant, honey badger, sloth, golden retriever) each get a 5-trait design profile. They were spread so that every Big Five region has at least one animal, e.g. honey badger = low A + low N + high E; elephant = high A + high C + higher N; capybara = very low N + high A.
- The wolf text deliberately debunks the "lone alpha wolf" meme (real packs are usually families) while nodding to the Russian meme «волк в цирке не выступает».

### Gaps
- Not re-opened this session; recommend an editorial check before publishing:
  - the dog, hyena, chimpanzee, octopus and cat citations above
  - Litchfield 2017 DOI 10.1371/journal.pone.0183455
  - Gosling 2001's volume/pages (127(1), 45–86)
  - Gosling, Kwan & John 2003's DOI
- The same applies to the animal fun facts in outcome texts, all standard natural history from prior knowledge:
  - owls turn their heads ~270°
  - dolphin signature whistles (Janik et al. 2006)
  - sea otters use stone tools and hold paws
  - emperor penguin huddle rotation
  - raccoon latch experiments (Cole 1907)
  - elephants' interest in conspecific remains (McComb et al. 2006)
  - algae and moths in sloth fur (Pauli et al. 2014)
  - honey badgers' loose skin
- No study measures "which animal a human resembles". The human-to-animal mapping is design, not data.

## element: how does the four-temperament → element lineage map onto modern E × N?

### Takeaway
The quiz follows the historical chain honestly: Empedocles' four roots → Hippocratic humours → Galenic temperament theory → Kant/Wundt → Pavlov (prominent in Russian textbooks) → Eysenck's E × N quadrants. It uses the **classical** pairings (melancholic = black bile = earth; phlegmatic = phlegm = water), states that humoral physiology is disproven, and openly labels aether (Aristotle) and metal (Chinese wuxing) as add-ons tied to Openness and Conscientiousness.

### Cited Findings
- Eysenck's quadrants are "sometimes compared with the four temperaments": choleric = extraverted + unstable; sanguine = extraverted + stable; phlegmatic = introverted + stable; melancholic = introverted + unstable — [Lumen Learning, Eysenck personality dimensions](https://content.one.lumenlearning.com/introductiontopsychology/chapter/learn-it-eysenck-personality-dimensions/)
- Galen (c. AD 130–200) described temperaments linked to the humours (sanguine, phlegmatic, choleric, melancholic), and his writings were the medical authority until the 16th century. The humoral classification is scientifically incorrect — [Heineman, Galen page (personality-project.org)](https://personality-project.org/others/heineman/GALEN.HTM)
- Stelmack & Stalikas, "Galen and the humour theory of temperament", *Personality and Individual Differences* (1991), is a real, indexed paper on this lineage — [library catalogue record](https://katalog.lib.cas.cz/KNAV/EdsRecord/edsair,edsair.doi...........2dcd949ac86a66fa9a4e40890fa90020)

### Inferences
- **Design:** 15 questions score E and N on almost every item, plus O and C on some. Calibrated quadrant profiles are fire E 0.83 / N 0.72, air 0.78 / 0.20, earth 0.14 / 0.74 and water 0.17 / 0.16. Aether = high O, metal = high C.
- **Easter egg:** q6 ("which season") echoes the humour–season pairings: spring/blood/air, summer/yellow bile/fire, autumn/black bile/earth, winter/phlegm/water.
- **Pop-site discrepancy:** many sites pair phlegmatic with earth and melancholic with water. The quiz follows the classical qualities (black bile is cold and dry like earth; phlegm is cold and moist like water) and says so in the methodology. This can be a talking point on the page.
- **Pavlov's types** (strong-unbalanced = choleric; strong-balanced-mobile = sanguine; strong-balanced-inert = phlegmatic; weak = melancholic) are included because Russian readers know them from the Ilyin textbook tradition.

### Gaps
- These points come from established history-of-psychology knowledge (Kagan 1994/1998; Stelmack & Stalikas 1991; Strelau 1998; Ильин 2004), not from a page fetched this session:
  - the qualities and seasons per humour
  - Galen's nine temperaments (vs the later canonical four)
  - Wundt's two-axis arrangement (strength × speed of emotion)
  - Pavlov's mapping
  - Aristotle's aether / quinta essentia
  - the pseudo-Aristotelian *Problems* XXX.1 linking melancholy to eminence
  - wuxing metal ↔ autumn/west

  Recommend a quick editorial check against Kagan's *Galen's Prophecy* or Ilyin's textbook.
- The Stelmack & Stalikas volume/pages (12(3), 255–263) were not verified on the publisher page.
- Persona simulation puts earth at 20.7%, just above 20%. Random shares are 15.7–17.8% (meeting the requirement). Two options were already softened to reduce this; it is a 6-outcome quiz, so ~17% is the natural share.

## archetype: what can honestly be said about the 12 Mark & Pearson archetypes?

### Takeaway
The 12 archetypes are a branding/literary framework built on Jungian ideas, not a validated personality model. The quiz says so plainly. It scores Mark & Pearson's four motivations (Stability/Control, Belonging/Enjoyment, Risk/Mastery, Independence/Fulfilment), places the archetypes on a 12-point "motivation wheel", and draws on the one solid empirical anchor, Faber & Mayer (2009), plus values research only as clearly labelled conceptual parallels.

### Cited Findings
- Faber & Mayer (2009), *Journal of Research in Personality* 43, 307–322, DOI 10.1016/j.jrp.2008.11.003. They built the Rich Culture Archetype Scale from media examples, found clusters of archetypes people resonate with, and showed that resonance predicted life themes and media preferences — [UNH Scholars record](https://scholars.unh.edu/psych_facpub/350)
- The UNH press release describes qualitative links: people resonating with Caregiver archetypes were "agreeable and accommodating"; a "Striver" cluster was outgoing but low in conscientiousness; a "Conflictor" cluster was low in agreeableness. Named archetypes include caregiver, innocent, hero, ruler and shadow — [UNH press release (CORE)](https://core.ac.uk/download/72056214.pdf)
- A secondary summary of *The Hero and the Outlaw* groups the archetypes in four orientations, matching Mark & Pearson's quadrants:
  - Order/Stability: Caregiver, Creator, Ruler
  - Social/Belonging: Jester, Lover, Regular Guy ("Member")
  - Ego/Mastery: Hero, Magician, Outlaw
  - Freedom/Independence: Explorer, Innocent, Sage

  It also lists each archetype's "fatal flaw" (used here as the "shadow") — [Medium guide to the 12 archetypes](https://medium.com/personalitypsychology/guide-12-jungian-archetypes-as-popularized-by-the-hero-and-the-outlaw-6acd5c6888be). That source gives the year as 2002, probably the paperback; the McGraw-Hill first edition is 2001.

### Inferences
- **Motivation wheel.** The two axes are Stability↔Mastery and Belonging↔Independence. Each quadrant's core archetype (Ruler, Lover, Hero, Sage) scores +2 on its own motive. Border archetypes score +2 own, +1 neighbour:
  - Caregiver → belonging; Creator → independence
  - Everyman → stability; Jester → mastery
  - Magician → belonging; Rebel → independence
  - Explorer → mastery; Innocent → stability
- **Option design.** Every option is written in one archetype's "voice", and each archetype appears exactly 8 times across 16 questions (4 rotating six-archetype subsets). That gives symmetric dimension ranges (0–32 on all four).
- **Values parallels (labelled in the JSON as our mapping, not measured correlations):** Stability ≈ Schwartz conservation/security; Mastery ≈ achievement/stimulation; Belonging ≈ benevolence/hedonism; Independence ≈ self-direction. Roccas et al. (2002) link values to the Big Five (e.g., agreeableness–benevolence, openness–self-direction).
- **Russian naming.** Archetype names follow the Russian edition («Герой и бунтарь», Питер, 2005) where natural. "Lover" is rendered «Романтик» (the literal «Любовник» has the wrong connotation), and "Regular Guy/Gal" as «Свой человек» with a note on «Славный малый».
- **`famous`** uses fictional characters only (Гарри Поттер, Гэндальф, Карлсон, Чебурашка, Молли Уизли, Левша…), avoiding real people and brands.

### Gaps
- Faber & Mayer's full factor structure and Big Five correlation coefficients could not be retrieved; only the abstract and press-release level were available.
- Not re-fetched this session: the Roccas et al. 2002 and Schwartz 1992 findings and DOIs; the Russian edition details (Марк & Пирсон, Питер, 2005); Pearson 1991.
- No validated psychometric instrument for these 12 archetypes was reviewed (the commercial Pearson–Marr Archetype Indicator exists but was deliberately not used or copied).

## superpower: how do VIA character strengths map onto superpowers and onto the Big Five?

### Takeaway
Each of 12 superpowers is a metaphor for one or two VIA strengths and is scored on the six VIA virtues. The empirical literature supports the Big Five overlaps described in the texts, which mostly come from McGrath et al.'s facet-level work. No VIA-IS items were used (they are copyrighted); the quiz states that the six-virtue grouping is theoretical, since factor analyses find fewer factors.

### Cited Findings
- McGrath, Hall-Simmonds & Goldberg, "Are measures of character and personality distinct?", *Assessment*, DOI 10.1177/1073191117738047. Facet-level correlations (HEXACO, Study 2):
  - Zest–Liveliness .82, Hope–Liveliness .75, Curiosity–Liveliness .64, Gratitude .60, Humor .52
  - Bravery–Social Boldness .64; Social Intelligence–Sociability .61
  - Forgiveness–Forgivingness .79, Kindness–Altruism .63, Fairness–Altruism .62
  - Perseverance–Diligence .76, Honesty .56, Leadership .50, Self-Regulation .47; Prudence–Prudence .70
  - Creativity–Creativity .68, Beauty–Aesthetic Appreciation .59, Love of Learning–Inquisitiveness .52

  Appreciation of Beauty was the only strength judged "largely redundant" with Five-Factor facets. Neuroticism content is "particularly absent" from character strengths. Spirituality and Teamwork are least represented in personality measures — [McGrath et al. preprint PDF](https://library.scottbarrykaufman.com/uploads/2017/10/McGrath-et-al.-in-press-Assessment-Character-vs-Personality.pdf)
- The same paper reports Noftle et al. (2011): the five domains explained 14–46% of variance in each strength. Furnham & Ahmetoglu (2014): largest strength–domain correlation .34, mean .14 — [McGrath et al. preprint PDF](https://library.scottbarrykaufman.com/uploads/2017/10/McGrath-et-al.-in-press-Assessment-Character-vs-Personality.pdf)
- The VIA Institute states that strengths overlap with the Big Five but add predictive value beyond it (McGrath et al., 2020). It names kindness (Lefevor & Fowers 2016), creativity (Grohman et al. 2017), humility (Exline & Hill 2012) and gratitude/forgiveness (Hill & Mathias 2011) as predicting outcomes beyond the Big Five — [VIA Institute: VIA and Big 5](https://www.viacharacter.org/topics/articles/a-comparison-of-personality-models-via-and-big-5)
- The VIA classification document (24 strengths, 6 virtues) — [VIA Classification 2020 PDF](https://viacharacter.org/pdf/VirtuesClassification-2020.pdf) (found via search; not opened)

### Inferences
- **Superpower ↔ strength (virtue) mapping:**

  | Superpower | Strengths (virtues) |
  |---|---|
  | Telepathy | social intelligence (humanity) + perspective (wisdom) |
  | Healing | kindness/love (humanity) + forgiveness (temperance) |
  | Time control | self-regulation (temperance) + perseverance (courage) |
  | Invisibility | humility/prudence (temperance) + wisdom |
  | Super strength | bravery/honesty (courage) + fairness (justice) |
  | Teleportation | curiosity (wisdom) + zest (courage) |
  | Shapeshifting | creativity (wisdom) + humour (transcendence) |
  | Precognition | perspective/judgment/love of learning (wisdom) + prudence (temperance) |
  | Force field | teamwork/fairness (justice) + kindness (humanity) |
  | Magnetism | leadership (justice) + courage |
  | Flight | hope (transcendence) + zest (courage) |
  | Light bender | beauty/gratitude/spirituality (transcendence) + love (humanity) |

- Courage's raw range is 0–24 while the other virtues run 0–32, because only one superpower has courage as its main virtue. Normalisation and calibration absorb this.
- Big Five statements in outcome texts were kept to what McGrath et al. report (e.g., zest/hope ↔ liveliness; perseverance ↔ diligence; beauty ↔ aesthetic appreciation). The texts never invent coefficients.
- Each outcome's "how to level up" tip draws on the "use a signature strength in a new way" intervention (Seligman et al. 2005) and the "three good things" exercise, both standard positive-psychology practices.

### Gaps
- Not re-fetched this session; recommend verifying volume/pages before publishing:
  - Park, Peterson & Seligman 2004 (*J Soc Clin Psych* 23(5)): hope, zest, gratitude, love and curiosity most linked to life satisfaction
  - Seligman, Steen, Park & Peterson 2005 (*Am Psychologist* 60(5)): new-way-of-using-strengths effect lasting six months
  - McGrath 2015 (*J Positive Psych* 10(5)): hierarchical structure, fewer than six factors
  - Noftle, Schug & Robins 2011 (book chapter)
  - Exline & Hill 2012
- The final published citation of McGrath et al. is given as *Assessment* 27(1), 117–135 (2020). Only the DOI and the 2017 in-press PDF were seen this session.
- Official Russian VIA strength names were not checked against the VIA Institute's Russian survey; the quiz uses natural Russian equivalents.

## cosmic-object: Big Five mapping and verified astronomy facts

### Takeaway
Twelve cosmic objects are metaphorical Big Five profiles (star, black hole, comet, nebula, Earth, Saturn, Moon, pulsar, galaxy, supernova, red dwarf, quasar). Each carries one "🔭" astronomy fact in its summary and a fact paragraph in `detailed`. The pulsar, comet and black-hole facts were verified on NASA/ESA pages this session; the methodology says explicitly that this is not astrology.

### Cited Findings
- **Pulsar:** a neutron star is a tiny, ultra-dense remnant; "a teaspoon of matter from a neutron star weighs as much as Mount Everest". Neutron stars spin 7 to 40,000 times a minute, and millisecond pulsars hundreds of times a second. Their beams "sweep the sky like a lighthouse" — [NASA SVS: What is a pulsar?](https://svs.gsfc.nasa.gov/vis/a010000/a010800/a010861/10861_What_Is_A_Pulsar_Revised_HTML_Transcript.html)
- **Comet:** Fred Whipple's late-1940s "dirty snowball" model of a mostly icy nucleus is supported by Giotto and Rosetta. Nuclei are usually several km across, and comets are ~4.6 billion years old. The ion tail points directly away from the Sun and the dust tail is fan-shaped. Comet dust causes meteor showers such as the Perseids (August) and Leonids (November) — [ESA: Comets, an overview](https://www.esa.int/Science_Exploration/Space_Science/Rosetta/Comets_An_overview)
- **Black hole:** black holes are "objects so dense that not even light can escape their gravity" — [NASA: Introduction to black holes](https://www.nasa.gov/stem-content/introduction-to-black-holes)
- **Moon:** the Moon is receding from Earth by a few centimetres a year (search-result level only) — [Space.com article](https://www.space.com/astronomy/moon/the-moon-is-getting-slightly-farther-away-from-the-earth-each-year-a-physicist-explains-why)
- **Saturn:** Saturn's density is lower than water's, the "floats in a bathtub" claim (search-result level only) — [BBC Sky at Night](https://www.skyatnightmagazine.com/space-science/saturn-could-float-on-water)

### Inferences
- The metaphors map object behaviour onto traits:
  - quasar (outshines its galaxy) = high E + C + O, low A
  - red dwarf (dim, extremely long-lived) = low E, very low N, high C
  - Moon (always the same face, reflects light) = low E, high A
  - supernova = high E + high N
  - pulsar (clock-like) = very high C
- In the persona simulation, galaxy (the "high on everything social" profile) was the hardest outcome to reach (1.7% at first). Two "connector" options (introducing friends from different circles; a festival to meet people from all over) were added, and the design profile was sharpened, bringing it to 2.3% while random answering stays 7.6–9.4%.
- Saturn's text avoids a fixed moon count ("by the latest counts, more known moons than any other planet") because the count changed in 2023–2025.

### Gaps
- These facts in the outcome texts come from prior knowledge, not from pages fetched this session. All are textbook astronomy with real primary citations included in the JSON `sources`, but an editorial check is recommended:
  - Sunlight takes ~8 minutes to reach Earth; the Sun is a yellow dwarf
  - Black holes do not "vacuum up" orbits; first EHT image 2019 (EHT Collaboration 2019, *ApJL* 875, L1)
  - Pillars of Creation imaged by Hubble 1995 and JWST 2022
  - Earth is slightly oblate
  - Saturn's rings are mostly water-ice chunks
  - Moon recession ≈3.8 cm/yr measured by Apollo laser retroreflectors (Dickey et al. 1994, *Science* 265)
  - First pulsar 1967, Jocelyn Bell Burnell, "LGM-1" (Hewish et al. 1968, *Nature* 217)
  - Milky Way has hundreds of billions of stars; galactic year ≈230 Myr
  - Supernovae outshine galaxies; Crab Nebula from the 1054 supernova
  - Red dwarfs ≈3/4 of stars, lifetimes of trillions of years (Laughlin et al. 1997, *ApJ* 482); Proxima Centauri is a red dwarf
  - First quasar 3C 273 identified by Maarten Schmidt in 1963 (*Nature* 197)
- The DOIs for Whipple 1950, Hewish 1968, Schmidt 1963, Dickey 1994 and Laughlin 1997 were written from memory and should be clicked through once.

## Calibration: are all outcomes reachable and is the distribution balanced?

### Takeaway
Yes. For every quiz, all outcomes are reachable and random answering yields shares well inside the 2–20% band: spirit-animal 5.4–7.2%, element 15.7–17.8%, archetype 7.6–9.0%, superpower 7.5–9.1%, cosmic-object 7.6–9.4%. The stricter persona check stays within 2–20% everywhere except element/earth at 20.7%.

### Cited Findings
- All numbers below come from the build simulation (200k random + 50k persona runs per quiz) and were cross-checked with the independent JSON-only re-simulation described in the first section — (local computation; `fun1-reports.json` in the scratchpad folder)

### Inferences
"Design profile" = theory pattern before tuning; "calibrated profile" = what is stored in the JSON.

#### spirit-animal (18 questions; raw ranges: O −3…25, C −13…27, E −13…26, A −7…23, N −14…21)

| outcome | design profile (O, C, E, A, N) | calibrated profile | random % | persona % | reachable |
|---|---|---|---|---|---|
| owl | 0.75 / 0.75 / 0.25 / 0.5 / 0.45 | 0.49 / 0.56 / 0.27 / 0.4 / 0.41 | 5.4 | 4.1 | yes |
| fox | 0.8 / 0.45 / 0.6 / 0.3 / 0.35 | 0.55 / 0.37 / 0.5 / 0.26 / 0.33 | 6.1 | 7.3 | yes |
| dolphin | 0.75 / 0.45 / 0.85 / 0.75 / 0.3 | 0.45 / 0.38 / 0.58 / 0.51 / 0.35 | 5.6 | 2.9 | yes |
| cat | 0.55 / 0.35 / 0.25 / 0.3 / 0.6 | 0.38 / 0.27 / 0.2 / 0.22 / 0.53 | 5.8 | 11.4 | yes |
| wolf | 0.4 / 0.75 / 0.55 / 0.7 / 0.3 | 0.27 / 0.56 / 0.46 / 0.53 / 0.31 | 5.7 | 3 | yes |
| otter | 0.6 / 0.3 / 0.8 / 0.8 / 0.35 | 0.38 / 0.31 / 0.57 / 0.54 / 0.37 | 7.2 | 4 | yes |
| bear | 0.35 / 0.55 / 0.25 / 0.6 / 0.25 | 0.24 / 0.44 / 0.27 / 0.46 / 0.28 | 7.2 | 4.1 | yes |
| raccoon | 0.8 / 0.2 / 0.55 / 0.5 / 0.6 | 0.54 / 0.2 / 0.46 / 0.4 / 0.51 | 6.5 | 7.4 | yes |
| capybara | 0.4 / 0.45 / 0.5 / 0.85 / 0.1 | 0.29 / 0.38 / 0.43 / 0.55 / 0.27 | 6.7 | 2.4 | yes |
| penguin | 0.3 / 0.8 / 0.5 / 0.75 / 0.55 | 0.19 / 0.62 / 0.43 / 0.58 / 0.48 | 6.4 | 13.8 | yes |
| eagle | 0.55 / 0.85 / 0.7 / 0.3 / 0.2 | 0.36 / 0.59 / 0.53 / 0.3 / 0.29 | 6.4 | 8.7 | yes |
| octopus | 0.9 / 0.55 / 0.2 / 0.4 / 0.5 | 0.55 / 0.43 / 0.26 / 0.34 / 0.44 | 6.7 | 3.4 | yes |
| elephant | 0.55 / 0.7 / 0.45 / 0.85 / 0.65 | 0.37 / 0.53 / 0.39 / 0.63 / 0.54 | 6.1 | 4.7 | yes |
| honey-badger | 0.5 / 0.4 / 0.75 / 0.15 / 0.15 | 0.34 / 0.36 / 0.55 / 0.22 / 0.27 | 6.2 | 4.9 | yes |
| sloth | 0.45 / 0.15 / 0.25 / 0.6 / 0.25 | 0.31 / 0.22 / 0.3 / 0.45 / 0.31 | 6.5 | 7.7 | yes |
| golden-retriever | 0.45 / 0.5 / 0.85 / 0.9 / 0.5 | 0.31 / 0.41 / 0.61 / 0.61 / 0.44 | 5.5 | 10.2 | yes |

Random range 5.4–7.2%; persona range 2.4–13.8%.

#### element (15 questions; raw ranges: E −16…22, N −18…23, O 0…18, C −6…23)

| outcome | design profile (E, N, O, C) | calibrated profile | random % | persona % | reachable |
|---|---|---|---|---|---|
| fire | 0.85 / 0.75 / 0.55 / 0.5 | 0.83 / 0.72 / 0.25 / 0.37 | 17.2 | 17.6 | yes |
| air | 0.85 / 0.2 / 0.6 / 0.35 | 0.78 / 0.2 / 0.29 / 0.24 | 16.2 | 16.9 | yes |
| earth | 0.2 / 0.75 / 0.5 / 0.65 | 0.14 / 0.74 / 0.2 / 0.54 | 16.1 | 20.7 | yes |
| water | 0.2 / 0.2 / 0.45 / 0.5 | 0.17 / 0.16 / 0.15 / 0.37 | 17.8 | 15.4 | yes |
| ether | 0.5 / 0.5 / 0.9 / 0.25 | 0.47 / 0.46 / 0.6 / 0.12 | 15.7 | 15.3 | yes |
| metal | 0.5 / 0.3 / 0.3 / 0.9 | 0.47 / 0.27 / 0.03 / 0.75 | 17 | 14.2 | yes |

Random range 15.7–17.8%; persona range 14.2–20.7%. With 6 outcomes the even share is 16.7%.

#### archetype (16 questions; raw ranges: stability, mastery, belonging, independence all 0…32)

| outcome | design profile (stability, mastery, belonging, independence) | calibrated profile | random % | persona % | reachable |
|---|---|---|---|---|---|
| hero | 0.1 / 0.9 / 0.5 / 0.5 | 0.22 / 0.45 / 0.33 / 0.33 | 7.9 | 11.6 | yes |
| sage | 0.5 / 0.5 / 0.1 / 0.9 | 0.33 / 0.33 / 0.22 / 0.44 | 8.9 | 9.7 | yes |
| explorer | 0.3 / 0.7 / 0.15 / 0.85 | 0.28 / 0.39 / 0.24 / 0.43 | 8 | 8 | yes |
| rebel | 0.15 / 0.85 / 0.3 / 0.7 | 0.24 / 0.43 / 0.28 / 0.39 | 8.8 | 6.3 | yes |
| magician | 0.15 / 0.85 / 0.7 / 0.3 | 0.23 / 0.43 / 0.39 / 0.28 | 7.9 | 8.1 | yes |
| lover | 0.5 / 0.5 / 0.9 / 0.1 | 0.33 / 0.33 / 0.44 / 0.22 | 8.5 | 9.9 | yes |
| jester | 0.3 / 0.7 / 0.85 / 0.15 | 0.28 / 0.39 / 0.43 / 0.24 | 8.8 | 7.4 | yes |
| caregiver | 0.85 / 0.15 / 0.7 / 0.3 | 0.43 / 0.24 / 0.39 / 0.28 | 9 | 5.7 | yes |
| ruler | 0.9 / 0.1 / 0.5 / 0.5 | 0.45 / 0.22 / 0.33 / 0.33 | 7.6 | 12.3 | yes |
| creator | 0.85 / 0.15 / 0.3 / 0.7 | 0.43 / 0.24 / 0.28 / 0.39 | 8.8 | 7.3 | yes |
| innocent | 0.7 / 0.3 / 0.15 / 0.85 | 0.39 / 0.28 / 0.24 / 0.43 | 7.9 | 6.5 | yes |
| everyman | 0.7 / 0.3 / 0.85 / 0.15 | 0.39 / 0.28 / 0.43 / 0.24 | 7.7 | 7.4 | yes |

Random range 7.6–9.0%; persona range 5.7–12.3%.

#### superpower (16 questions; raw ranges: wisdom 0…32, courage 0…24, humanity/justice/temperance/transcendence 0…32)

| outcome | design profile (wis, cour, hum, just, temp, trans) | calibrated profile | random % | persona % | reachable |
|---|---|---|---|---|---|
| telepathy | 0.65 / 0.4 / 0.85 / 0.4 / 0.4 / 0.4 | 0.43 / 0.27 / 0.48 / 0.14 / 0.18 / 0.14 | 8.8 | 5.7 | yes |
| healing | 0.4 / 0.4 / 0.85 / 0.4 / 0.65 / 0.4 | 0.26 / 0.26 / 0.5 / 0.14 / 0.36 / 0.14 | 8.1 | 10.7 | yes |
| time-control | 0.4 / 0.65 / 0.4 / 0.4 / 0.85 / 0.4 | 0.26 / 0.44 / 0.18 / 0.14 / 0.5 / 0.14 | 8.2 | 9.4 | yes |
| invisibility | 0.65 / 0.4 / 0.4 / 0.4 / 0.85 / 0.4 | 0.43 / 0.27 / 0.18 / 0.14 / 0.48 / 0.14 | 8.6 | 6.2 | yes |
| super-strength | 0.4 / 0.85 / 0.4 / 0.65 / 0.4 / 0.4 | 0.26 / 0.61 / 0.17 / 0.33 / 0.17 / 0.13 | 8.2 | 10.3 | yes |
| teleportation | 0.85 / 0.65 / 0.4 / 0.4 / 0.4 / 0.4 | 0.56 / 0.43 / 0.19 / 0.14 / 0.19 / 0.14 | 8.5 | 4.9 | yes |
| shapeshifting | 0.85 / 0.4 / 0.4 / 0.4 / 0.4 / 0.65 | 0.57 / 0.26 / 0.18 / 0.14 / 0.18 / 0.31 | 8.4 | 8.8 | yes |
| precognition | 0.85 / 0.4 / 0.4 / 0.4 / 0.65 / 0.4 | 0.56 / 0.27 / 0.19 / 0.14 / 0.35 / 0.14 | 7.5 | 6.6 | yes |
| force-field | 0.4 / 0.4 / 0.65 / 0.85 / 0.4 / 0.4 | 0.26 / 0.26 / 0.36 / 0.47 / 0.18 / 0.13 | 8.7 | 8.7 | yes |
| magnetism | 0.4 / 0.65 / 0.4 / 0.85 / 0.4 / 0.4 | 0.26 / 0.45 / 0.17 / 0.47 / 0.17 / 0.13 | 7.6 | 9.4 | yes |
| flight | 0.4 / 0.65 / 0.4 / 0.4 / 0.4 / 0.85 | 0.26 / 0.44 / 0.18 / 0.13 / 0.18 / 0.47 | 9.1 | 9.1 | yes |
| light | 0.4 / 0.4 / 0.65 / 0.4 / 0.4 / 0.85 | 0.26 / 0.26 / 0.36 / 0.13 / 0.17 / 0.47 | 8.1 | 10.2 | yes |

Random range 7.5–9.1%; persona range 4.9–10.7%.

#### cosmic-object (16 questions; raw ranges: O −3…28, C −8…25, E −11…26, A −5…27, N −11…23)

| outcome | design profile (O, C, E, A, N) | calibrated profile | random % | persona % | reachable |
|---|---|---|---|---|---|
| star | 0.45 / 0.6 / 0.8 / 0.75 / 0.3 | 0.26 / 0.45 / 0.58 / 0.5 / 0.28 | 7.6 | 7.6 | yes |
| black-hole | 0.8 / 0.5 / 0.2 / 0.35 / 0.65 | 0.49 / 0.39 / 0.19 / 0.24 / 0.5 | 8.9 | 12 | yes |
| comet | 0.8 / 0.2 / 0.7 / 0.5 / 0.4 | 0.47 / 0.21 / 0.51 / 0.34 / 0.34 | 7.9 | 9.7 | yes |
| nebula | 0.9 / 0.2 / 0.3 / 0.65 / 0.65 | 0.5 / 0.23 / 0.29 / 0.42 / 0.48 | 7.7 | 7 | yes |
| earth | 0.35 / 0.75 / 0.45 / 0.8 / 0.35 | 0.19 / 0.55 / 0.36 / 0.54 / 0.3 | 7.9 | 6.5 | yes |
| saturn | 0.7 / 0.6 / 0.65 / 0.4 / 0.3 | 0.44 / 0.46 / 0.5 / 0.27 / 0.25 | 9.4 | 3.8 | yes |
| moon | 0.55 / 0.5 / 0.2 / 0.75 / 0.55 | 0.33 / 0.39 / 0.15 / 0.54 / 0.44 | 8.5 | 12.5 | yes |
| pulsar | 0.4 / 0.9 / 0.55 / 0.4 / 0.3 | 0.22 / 0.65 / 0.42 / 0.28 / 0.27 | 8.7 | 13 | yes |
| galaxy | 0.85 / 0.45 / 0.8 / 0.85 / 0.4 | 0.44 / 0.37 / 0.52 / 0.49 / 0.36 | 8.4 | 2.3 | yes |
| supernova | 0.65 / 0.3 / 0.85 / 0.4 / 0.75 | 0.39 / 0.26 / 0.62 / 0.28 / 0.56 | 8.9 | 14.3 | yes |
| red-dwarf | 0.3 / 0.7 / 0.2 / 0.6 / 0.2 | 0.18 / 0.5 / 0.22 / 0.4 / 0.23 | 8.5 | 5.8 | yes |
| quasar | 0.7 / 0.8 / 0.8 / 0.25 / 0.3 | 0.39 / 0.53 / 0.54 / 0.22 / 0.3 | 7.6 | 5.7 | yes |

Random range 7.6–9.4%; persona range 2.3–14.3%.

**Adjustments made during calibration:**
- element: two earth-heavy options were softened (N +2 → +1) to bring earth's persona share down from 21.5% to 20.7%.
- cosmic-object: galaxy got two connector options and a sharper design profile (persona share 1.7% → 2.3%); star's design O was lowered from 0.55 to 0.45.
- Mixing persona samples into the tuning was tried and rejected: for spirit-animal it worsened the random spread (to 2.1–10.6%), and for cosmic-object it pushed galaxy's random share to 14.3% without fixing its persona share. Final calibration therefore uses random answers only, which is the stated requirement.

### Gaps
- The persona model (uniform latent traits, softmax β = 1.5) is a heuristic stand-in for real respondents. Real visitors are not uniformly distributed on traits, so live outcome shares will differ. Re-tune with the scratchpad scripts once logs exist.
- Low-persona outcomes (cosmic galaxy 2.3%, spirit-animal capybara 2.4% / dolphin 2.9%) may feel "rare" to consistent answerers. The site could lean into this ("rare result!") or re-tune with real data.
