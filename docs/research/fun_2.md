# Fun quizzes, batch 2 (testik): dessert, city, weather, drink, dog-breed, brainrot-meme-energy

Deliverables (all written, all valid JSON per `node -e "JSON.parse(...)"`, all pass a schema check):

| id | file | questions | options | outcomes | random-answer share per outcome |
|---|---|---|---|---|---|
| `dessert` | `tests/dessert.json` | 15 | 76 | 12 | 7.8–8.8% |
| `city` | `tests/city.json` | 15 | 79 | 12 | 7.5–9.3% |
| `weather` | `tests/weather.json` | 15 | 83 | 12 | 7.7–9.1% |
| `drink` | `tests/drink.json` | 15 | 79 | 12 | 7.8–9.2% |
| `dog-breed` | `tests/dog-breed.json` | 15 | 81 | 12 | 7.9–8.8% |
| `brainrot-meme-energy` | `tests/brainrot-meme-energy.json` | 15 | 80 | 12 | 7.9–8.8% |

All have `category: "fun"`, `kind: "choice"`, `seriousness: "fun"`. Every option has `scores`. Every outcome has a title, emoji, profile (0..1), 4 summary bullets, 2 paragraphs of detailed text, strengths, growth, 4 `funnyExamples`, `compatibleWith` (all ids valid) and an English `imagePrompt` (soft pastel, glossy flat-3D, gradient background). Each test also has a disclaimer, `resultIntro`, `scoringNotes` and 3-band `dimensions` covering [min, max]. All text is bilingual RU/EN. Questions and outcomes are original, written for testik, with no items copied from questionnaires (HSQ, C-BARQ, MEQ, etc.) or from quiz sites.

Citation status: a source marked **(verified)** was opened or checked this session. One marked **(from knowledge)** is a well-known paper whose DOI I did not open this session. Spot-check those before launch.

---

## 1. Dessert quiz: what real research links taste preferences to personality?

### Takeaway
There is real but small evidence. Sweet liking relates weakly to agreeableness, a replication found the link much weaker, and general bitter liking relates weakly to "dark" traits. The strongest link is spicy-food liking with sensation seeking (r ≈ .50). The quiz uses these as metaphors and states plainly that the effects are small.

### Cited Findings
- Meier, Moeller, Riemer-Peltz & Robinson (2012), *JPSP* 102(1):163–174, doi 10.1037/a0025253: in a series of studies, sweet-taste liking predicted prosocial inferences, personality and helping. **(verified)** — [FORRT Replication Atlas](https://forrt.org/flora-replication-atlas/doi/10.1037/a0025253/)
- The FORRT atlas lists one replication, Ashton et al. (2014, *J. Research in Personality*), as **failed**: "prosocial personality is not substantially associated with sweet taste preferences." **(verified)** — [FORRT](https://forrt.org/flora-replication-atlas/doi/10.1037/a0025253/)
- The replication had 600+ students rated by themselves and by a friend. Sweet preference correlated with Big Five agreeableness at r = .19 (self-report) and .06 (friend report), and with HEXACO prosocial traits at r = .15 (self) and < .10 (friend). That is less than half the original effect. **(verified)** — [BPS Research Digest](https://www.bps.org.uk/research-digest/are-sweet-toothed-people-also-sweet-nature)
- Sagioglou & Greitemeyer (2016), *Appetite* 96:299–308, doi 10.1016/j.appet.2015.09.031, combined N = 953 (MTurk). **(verified)** — [PDF](https://gwern.net/doc/psychology/personality/psychopathy/2015-sagioglou.pdf)
  - General bitter-taste liking correlated with everyday sadism (r = .14 in Study 1, .20 in Study 2) and psychopathy (.14 / .17). Machiavellianism and narcissism correlated only in Study 2 (.18 / .17).
  - Liking specific bitter **foods** (coffee, tonic, radish, celery, beer) showed no Dark Tetrad correlations and related to openness and extraversion instead.
  - Food-specific sweet liking correlated with agreeableness (r = .16 in Study 1), which the authors describe as replicating Meier et al.
- Byrnes & Hayes (2013), *Food Quality and Preference* 28(1):213–221, doi 10.1016/j.foodqual.2012.09.008, N = 97. **(verified)** — [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC3607321/)
  - Arnett sensation seeking correlated with spicy-meal liking (r = .50) and chili intake frequency (r = .39, about 15% of variance).
  - It did not correlate with non-spicy control foods.
  - Sensitivity to reward was weakly related (r = .23).
- Other sources used in the quiz methodology **(from knowledge)**:
  - Pliner & Hobden (1992), food neophobia scale, *Appetite* 19(2):105–120.
  - Troisi & Gabriel (2011), comfort food and the need to belong, *Psychological Science* 22(6):747–753.
  - Steel, Schmidt & Shultz (2008), personality and subjective well-being meta-analysis, *Psychological Bulletin* 134(1):138–161.

### Inferences
- Five Big-Five-like scales are used: O (taste curiosity), C (neatness), E (sparkle), A (softness), N (sensitivity).
- The outcomes are tiramisu, cheesecake, macaron, éclair, medovik, ice cream, brownie, panna cotta, baklava, mochi, donut and Napoleon cake.
- The methodology deliberately does **not** link dark chocolate or bitterness to a "dark" personality. The general-bitter effect is small, and it reverses into openness for specific foods.
- Mochi and the "chili chocolate" options draw on the Byrnes & Hayes sensation-seeking result, the best-supported link in this area.

### Gaps
- I could not confirm the exact volume and pages of Ashton et al. (2014), or that its full author list is "Ashton, Pilkington & Lee". The `sources` entry gives these from memory and links the FORRT page instead of a DOI.
- No dessert-specific personality studies (e.g., "tiramisu lovers are X") exist that I found. Mapping individual desserts to traits is purely metaphorical.

---

## 2. City quiz: what does geographical psychology say about city "personalities"?

### Takeaway
Personality traits do cluster geographically, and person–place fit modestly predicts well-being. However, stereotypes about national character largely do **not** match measured traits. The quiz therefore presents city profiles as affectionate cultural images ("vibes") and says so explicitly.

### Cited Findings
- Jokela, Bleidorn, Lamb, Gosling & Rentfrow (2015), *PNAS*, about 56,000 Londoners (BBC Big Personality Test, 2009–2011), 216 postal districts. **(verified via BPS summary)** — [BPS Research Digest](https://www.bps.org.uk/research-digest/people-may-be-happier-when-their-neighbourhood-fits-their-personality)
  - Openness was highest in central London (Islington, King's Cross), which also had low conscientiousness and agreeableness. Extraversion was higher and neuroticism lower in south-west London (e.g., Richmond).
  - Openness predicted life satisfaction more strongly in dense, diverse areas.
  - Agreeableness predicted happiness in areas with more families.
  - The data are cross-sectional, and evidence that people move to fit their personality was tentative.
- Levine & Norenzayan (1999), *J. Cross-Cultural Psychology* 30(2):178–205, compared pace of life in 31 countries on walking speed, postal speed and clock accuracy. **(verified)** — [Deep Blue PDF](https://deepblue.lib.umich.edu/bitstream/handle/2027.42/67419/10.1177_0022022199030002003.pdf;jsessionid=306D05F6723425761A771EE326B26693?sequence=2)
  - Fastest: Switzerland, Ireland, Germany, Japan, Italy. Slowest: Mexico, Indonesia, Brazil, El Salvador, Syria.
  - Ranks of other countries used in the quiz: England 6, France 11, US 16, South Korea 18. **Russia was not in the sample.**
  - Pace correlated with GDP per capita at r = .74, with hotter climate at r = −.58 and with individualism. The climate and individualism links lost significance once economics was controlled.
- Rentfrow et al. (2013), *JPSP* 105(6):996–1012, doi 10.1037/a0034434, found three US psychological regions: "Friendly & Conventional", "Relaxed & Creative" and "Temperamental & Uninhibited" (the Northeast, including NY). **(title and cluster names seen in search results; details from knowledge)** — [typeset.io](https://typeset.io/pdf/divided-we-stand-three-psychological-regions-of-the-united-273nuwrjez.pdf)
- Other sources used in the quiz methodology **(from knowledge)**:
  - Rentfrow, Gosling & Potter (2008), theory of geographic variation (selective migration, social influence, environment), *Perspectives on Psychological Science* 3(5):339–369.
  - Bleidorn et al. (2016), person–city personality fit and self-esteem, *Psychological Science* 27(3):419–427.
  - Gelfand et al. (2011), tight vs. loose cultures in 33 nations, *Science* 332:1100–1104.
  - Terracciano et al. (2005), national character does not reflect mean trait levels in 49 cultures, *Science* 310:96–100.

### Inferences
- Six scales are used: O, C, E, A, N plus P (pace of life, from Levine & Norenzayan).
- The 12 cities are Moscow, Saint Petersburg, New York, Tokyo, Paris, Barcelona, Berlin, Reykjavík, Rio, London, Seoul and Kazan.
- The texts cite real data only where it exists: London districts, the NY cluster, the pace ranks for Japan, Germany, France, Brazil and England, and tightness for Japan and Korea.
- For Moscow, Saint Petersburg and Kazan the texts say explicitly that no comparable published data was found.
- Russian humor beats include "поребрик/шаверма"-style SPb identity jokes, the Moscow escalator, "Буду через 15 минут" and Kazan hospitality.

### Gaps
- I found no large peer-reviewed study of Big Five differences between Russian cities. The Moscow, SPb and Kazan profiles are cultural images only.
- I found no peer-reviewed personality data for Reykjavík, Barcelona, Rio, Seoul or Berlin at city level.

---

## 3. Weather quiz: how do emotion models and weather–mood studies ground a "which weather are you" quiz?

### Takeaway
Russell's circumplex model (valence × arousal) gives a real backbone for the V and R scales. Weather–mood research shows that average weather effects on daily mood are tiny but that people differ in how they react. About half are "unaffected", and the others fall into stable reactivity types.

### Cited Findings
- Klimstra et al. (2011), "Come rain or come shine", *Emotion* 11(6):1495–1499, doi 10.1037/a0024649. **(verified)** — [VU Amsterdam record](https://research.vu.nl/en/publications/come-rain-or-come-shine-individual-differences-in-how-weather-aff/)
  - 497 adolescents kept 30 days of mood diaries matched to objective weather, and the pattern replicated in their mothers.
  - Four types were found: Summer Lovers, Unaffected, Summer Haters and Rain Haters.
  - Two types showed intergenerational concordance.
- The shares of each Klimstra type differ between sources:
  - CurrentResults gives Unaffected 48%, Summer Lovers about 23%, Summer Haters 19% and Rain Haters about 10% **(secondary source)** — [CurrentResults](https://www.currentresults.com/Weather-Science/4-weather-mood-personality-types.php).
  - I recall 17% / 27% / 9% for the other three from the original paper but could not verify this. The quiz text only uses "almost half (48%) unaffected", on which both versions agree.
- Denissen, Butalid, Penke & van Aken (2008), *Emotion* 8(5):662–667, doi 10.1037/a0013497, N = 1,233 German online diarists. **(verified)** — [PDF](https://www.rethemnosnews.gr/sites/default/files/2020-07/Denissen_Weather_Mood_2008.pdf)
  - Weather explained very little day-to-day mood; the largest standardized coefficient was about |.07|.
  - Sunlight reduced tiredness.
  - There was significant between-person variation in weather sensitivity.
  - Big Five traits did **not** moderate weather effects after Bonferroni correction.
- Other sources used in the quiz methodology **(from knowledge)**:
  - Russell (1980), circumplex model of affect, *JPSP* 39(6):1161–1178.
  - Keller et al. (2005), warm weather improves mood and broadens cognition only when people spend time outside, in spring, *Psychological Science* 16(9):724–731.
  - Lucas & Lawless (2013), weather barely affects life-satisfaction judgments, *JPSP* 104(5):872–884.
  - Rosenthal et al. (1984), seasonal affective disorder, *Archives of General Psychiatry* 41:72–80.

### Inferences
- Five scales are used: V (light/valence) and R (energy/arousal) from Russell, plus W (warmth), S (steadiness, the inverse of changeability) and O (mystery/imagination).
- The 12 outcomes are thunderstorm, sunny day, fog, snowfall, warm summer rain, northern lights, rainbow, blizzard, crisp frosty morning, cozy overcast day, hot July noon and spring wind.
- The "overcast" outcome explicitly invokes Klimstra's "Unaffected" type and Denissen's small effects. The "sunny" and "heat" outcomes invoke "Summer Lovers".
- The disclaimer mentions SAD and gives RU helplines: 8-800-2000-122 (children's/parents' helpline), and in Moscow 051 from a landline or 8-495-051 from a mobile. It also points to findahelpline.com.

### Gaps
- The original Klimstra percentages for the non-"Unaffected" types are unverified (conflict noted above).
- Weather does not reliably reflect personality. Denissen found no Big Five moderation, so the "you are a weather" mapping rests on the emotion-style metaphor, not on weather-reactivity data.

---

## 4. Drink quiz: what research grounds chronotype, sensation-seeking and taste-based drink types?

### Takeaway
Chronotype has solid, moderate personality correlates: morningness goes with conscientiousness at ρ ≈ .37. Sensation seeking predicts liking for spicy and intense flavors. Bitter liking is weakly and inconsistently linked to traits. "Warm drink → warm person" priming failed to replicate. The quiz builds on the robust findings and flags the weak ones.

### Cited Findings
- Meta-analysis in *JPSP* 112(3):491–509 (2017), doi 10.1037/pspp0000099: 44 samples, N = 16,647, 620 correlations. **(verified)** — [PubMed](https://www.ncbi.nlm.nih.gov/pubmed/27977220)
  - Conscientiousness was the strongest correlate of morningness (ρ = .37; unique β = .32).
  - Eveningness had a unique β of .23 with extraversion and .17 with openness.
  - Neuroticism had a modest negative relation to morningness (β = −.16), and agreeableness was largely unrelated.
  - Personality explained 10.9–16.4% of the variance in circadian preference.
  - The PubMed page did not list the authors. The JSON lists them as Lipnevich, Credè, Hahn, Spinath, Roberts & De Fruyt **(from knowledge)**.
- Byrnes & Hayes (2013): sensation seeking × spicy liking r = .50 **(verified, see §1)**. This grounds masala chai and bubble tea (high SS).
- Sagioglou & Greitemeyer (2016): bitter-food liking relates to openness and extraversion, while general bitter liking relates weakly to dark traits **(verified, see §1)**. It grounds espresso, which the texts explicitly do **not** frame as "dark".
- Other sources used in the quiz methodology **(from knowledge)**:
  - Adan et al. (2012), circadian typology review, *Chronobiology International* 29(9):1153–1175.
  - Zuckerman (1994), sensation seeking, Cambridge University Press.
  - Ong et al. (2018), Mendelian randomization: greater perceived bitterness of caffeine goes with *more* coffee drinking, *Scientific Reports* 8:16414.
  - Williams & Bargh (2008), warmth priming, *Science* 322:606–607, and its failed replication by Lynott et al. (2014), *Social Psychology* 45(3):216–222.
  - Smith (2002), caffeine and behavior review, *Food and Chemical Toxicology* 40(9):1243–1255.
  - Owen et al. (2008), L-theanine plus caffeine improves attention switching, *Nutritional Neuroscience* 11(4):193–198.

### Inferences
- Five scales are used: Ow (night owl), SS (sensation seeking), C (routine), E (sociability) and W (comfort/sweetness).
- The 12 outcomes are espresso, raf, matcha, cappuccino, cocoa, mint tea, lemonade, berry smoothie, cold brew, bubble tea, masala chai and "3-in-1" instant coffee.
- 3-in-1 is a Russian-internet-native ironic outcome.
- Raf's Moscow-1990s origin is given as a "popular legend" with no citation, because I found no scholarly source.
- The smoothie (lark) and cold brew (owl) outcomes cite the chronotype meta-analysis directly.

### Gaps
- I found no published study linking specific coffee or tea drinks (e.g., "latte drinkers are X") to personality. The drink-to-trait mapping is metaphorical.
- The Lipnevich et al. author list and the DOIs for Adan, Ong, Owen, Smith and Lynott were not opened this session.

---

## 5. Dog-breed quiz: what do dog personality, breed-behavior and owner-dog similarity research say?

### Takeaway
Dogs have measurable personalities on axes close to human traits, and owners resemble their dogs on all Big Five dimensions. However, breed explains only about 9% of individual behavior. The quiz uses breed "characters" as popular images and warns users not to choose a real dog by quiz result.

### Cited Findings
- Morrill et al. (2022), *Science* 376(6592):eabk0639, doi 10.1126/science.abk0639. **(verified)** — [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC9675396)
  - Owner surveys covered 18,385 dogs (about 49% purebred), and 2,155 dogs were genotyped or sequenced.
  - Breed explained about 9% of behavioral variation, "little predictive value for individuals". Breed's effect on physical traits was about 5 times larger.
  - Most behaviors are heritable (h² > 25%). Retrieving was about 52.5% heritable and human sociability about 67%.
  - Biddability is among the more breed-differentiated traits, while agonistic threshold is nearly uninformative by breed.
  - Most dogs fell within 1 SD of the cohort mean.
- Turcsán, Range, Virányi, Miklósi & Kubinyi (2012), *Applied Animal Behaviour Science* 140(3–4):154–160. **(verified)** — [REAL repository](https://real.mtak.hu/29704/)
  - Owner and dog personality correlated positively on all five dimensions.
  - Four dimensions stayed significant when an independent peer rated the dog.
  - Length of ownership did not matter, and patterns differed between Austria and Hungary.
- Kis, Turcsán, Miklósi & Gácsi (2012), *Interaction Studies* 13(3):371–383, N = 78 dyads: owner neuroticism and openness went with giving more commands, and owner neuroticism with slower obedience. **(verified, background only; not cited in JSON)** — [REAL](https://real.mtak.hu/3557/)
- Other sources used in the quiz methodology **(from knowledge)**:
  - Hsu & Serpell (2003), C-BARQ development, *JAVMA* 223(9):1293–1300.
  - Gosling, Kwan & John (2003), dog personality judgments are as reliable as human ones and map onto E/N/A/O, *JPSP* 85(6):1161–1169.
  - Jones & Gosling (2005), review, *Applied Animal Behaviour Science* 95:1–53.
  - Ley, Bennett & Coleman (2008), five dog dimensions (MCPQ-R), *Applied Animal Behaviour Science* 110:305–317.
  - Roy & Christenfeld (2004), purebred dogs resemble their owners, *Psychological Science* 15(5):361–363.
  - Turcsán, Kubinyi & Miklósi (2011), trainability and boldness by breed cluster, *Applied Animal Behaviour Science* 132:61–70.
  - Mehrkam & Wynne (2014), review of breed behavioral differences, *Applied Animal Behaviour Science* 155:12–27.

### Inferences
- Five scales are used: E, A, C (focus/trainability), N and O, which follows Gosling and Ley et al.
- The 12 breeds are golden retriever, border collie, corgi, Shiba Inu, French bulldog, husky, German shepherd, chihuahua, dachshund, Bernese mountain dog, poodle and greyhound.
- Each breed has a Big-Five-style profile. For example, golden is high A and low N, border collie high E/C/O with slight N, and Shiba low A and E.
- Questions ask about the *human*, matching the owner–dog similarity framing.
- The "golden retriever energy" internet meme is used in both the dog and meme quizzes. The two are distinct outcomes in separate tests.

### Gaps
- The Turcsán et al. (2012) DOI was not shown on the repository page, so the JSON uses the REAL URL.
- Breed profiles are not taken from C-BARQ breed norms, which I did not access. They are popular images, flagged as such in the disclaimer and methodology.

---

## 6. Meme-energy quiz: how can humor-style and online-behavior research ground an ironic Gen-Z "vibe" quiz?

### Takeaway
Martin et al.'s four humor styles (affiliative, self-enhancing, aggressive, self-defeating) are well established and meta-analytically linked to the Big Five. Digital footprints predict personality. The quiz combines the four styles with "terminally online" and "chaos" scales and gives 12 original archetypes. Harm-aware notes are added for the self-defeating and aggressive styles.

### Cited Findings
- Martin, Puhlik-Doris, Larsen, Gray & Weir (2003), *J. Research in Personality* 37:48–75 (DOI in the JSON is from knowledge). **(verified)** — [ISHS Test Bank](https://humorstudies.org/ISHS%20Test%20Bank/TestCat_HSQ.htm)
  - The HSQ has 32 items, 8 per style: affiliative, self-enhancing, aggressive and self-defeating.
  - Scale alphas are .77–.81 and test-retest .80–.85.
  - Validity was shown via correlations with well-being, self-esteem, intimacy and the five-factor model.
  - No license terms were stated, and no Russian version is listed on that page.
- Mendiburo-Seguel, Páez & Martínez-Sánchez (2015), *Scandinavian J. Psychology* 56(3):335–340, doi 10.1111/sjop.12209: a meta-analysis of humor styles and the Big Five. **(bibliographic data verified; results not accessed)** — [Univ. Murcia record](https://portalinvestigacion.um.es/documentos/5ed324d22999526aa741417d?lang=gl)
- Plessen et al. (2020), *Personality and Individual Differences* 154:109676, doi 10.1016/j.paid.2019.109676 (existence and DOI confirmed by search results), synthesized 24 studies with 11,791 adults. **(verified via secondary summary)** — [Psychology Today summary](https://psychologytoday.com/au/blog/humor-sapiens/201912/the-relationship-between-humor-styles-and-personality)
  - Affiliative and self-enhancing humor were positively related to E, A and O.
  - Aggressive humor was strongly negative with A and negative with C.
  - Self-defeating humor was negative with C.
  - High N went with less use of the healthy styles.
- Oxford University Press named "brain rot" its 2024 Word of the Year. **(verified via news coverage)** — [ABC News/AP](https://abcnews.go.com/Lifestyle/wireStory/sum-2024-oxford-university-press-word-year-brain-116366300)
- Other sources used in the quiz methodology **(from knowledge)**:
  - Kosinski, Stillwell & Graepel (2013), Facebook likes predict traits, *PNAS* 110(15):5802–5805.
  - Youyou, Kosinski & Stillwell (2015), computer judgments of personality beat friends', *PNAS* 112(4):1036–1040.
  - Seidman (2013), personality and Facebook self-presentation and belonging, *Personality and Individual Differences* 54(3):402–407.
  - Buckels, Trapnell & Paulhus (2014), trolling and sadism, *Personality and Individual Differences* 67:97–102.

### Inferences
- Six scales are used: AF (chat glue = affiliative), SE (irony armor = self-enhancing), AG (roast = aggressive, friendly-only framing), SD (self-roast = self-defeating), TO (online status) and CH (chaos/absurdism).
- The 12 original archetypes are: main character, side-quest NPC, the cat who broke everything, sigma philosopher, golden retriever energy, 3 a.m. energy, tired group-chat mom, grandpa reading the news aloud, veteran clown, meme archivist, roast master and silent lurker.
- No copyrighted characters are used. The "This is fine" dog, for example, was avoided on purpose.
- The "clown" outcome carries gentle well-being advice and a talk-to-someone line, because self-defeating humor relates to worse well-being.
- The "roast master" outcome stresses consent and checking that everyone is laughing (Buckels et al.).

### Gaps
- I could not access the numeric coefficients in Mendiburo-Seguel et al. (2015) or Plessen et al. (2020). The quiz states directions only.
- The Plessen author list in the JSON is from memory.
- I did not find a verifiable open Russian adaptation of the HSQ. It isn't needed, because no HSQ items are used.
- The HSQ license is unstated, which is another reason items were not reused.

---

## 7. How were the quizzes scored, balanced and checked?

### Takeaway
Every quiz uses the schema's nearest-profile method on normalized (0..1) dimension sums. Outcome profiles were placed by an iterative calibration on 120,000 simulated uniform-random runs per test, so every outcome is reachable and lands between 7.5% and 9.3% (the target was 2–20%). Persona checks confirm that 12/12 archetypal answer patterns get their own outcome in every test.

### Cited Findings
- Method:
  - Raw sum per dimension is normalized as (sum − theoretical min) / (max − min). The min and max come from the per-question minimum and maximum option scores, and the `dimensions[].min/max` fields hold exactly these.
  - The result is the outcome with the minimum Euclidean distance between profile and normalized vector.
  - Bands are set at roughly the 30th and 70th percentiles of the random-answer raw distribution and are contiguous over [min, max].
  - This is a build-script result, with no external source.
- Each profile = the random-answer mean + (spread × per-outcome scale × direction × SD), clipped to [0.02, 0.98] and rounded to 2 decimals. The per-outcome scale was tuned for 120 iterations toward an equal 1/12 share.
- Random-answer distributions (N = 120,000 each):
  - **dessert:** tiramisu 8.6, cheesecake 8.2, macaron 8.8, éclair 7.8, medovik 8.8, ice cream 8.1, brownie 8.7, panna cotta 7.8, baklava 8.2, mochi 8.4, donut 8.3, napoleon 8.2.
  - **city:** Moscow 7.8, SPb 7.7, NYC 8.6, Tokyo 7.5, Paris 8.0, Barcelona 7.8, Berlin 8.6, Reykjavík 9.1, Rio 8.7, London 8.6, Seoul 9.3, Kazan 8.2.
  - **weather:** thunderstorm 8.1, sunny 9.0, fog 8.1, snowfall 7.9, warm rain 8.3, aurora 8.2, rainbow 8.0, blizzard 8.9, frost 8.1, overcast 8.6, heat 7.7, spring wind 9.1.
  - **drink:** espresso 7.8, raf 8.3, matcha 8.4, cappuccino 8.2, cocoa 7.9, mint tea 9.2, lemonade 8.6, smoothie 8.3, cold brew 8.5, bubble tea 8.1, chai 8.1, 3-in-1 8.7.
  - **dog-breed:** golden 8.3, border collie 8.4, corgi 8.1, shiba 8.4, frenchie 8.0, husky 8.2, German shepherd 8.8, chihuahua 8.4, dachshund 8.2, Bernese 7.9, poodle 8.4, greyhound 8.8.
  - **brainrot-meme-energy:** main character 8.1, NPC 8.1, chaos cat 8.6, sigma 8.2, golden retriever 8.1, 3 a.m. 7.9, chat mom 8.6, grandpa 8.4, clown 8.2, meme archivist 8.2, roast master 8.8, lurker 8.8.
- Persona check: a simulated respondent always picks the option most aligned with an outcome's intended trait direction. After a few added options and profile tweaks, every outcome in all six tests gets itself (12/12 each).
- Noisy persona check: the same respondent answers 65% in character and 35% at random. Hit rates mostly fall between 54% and 98%.
  - The weakest are weather "spring wind" (42%) and drink "raf" (54%), because these sit between neighbouring outcomes.
  - Next weakest are meme "golden retriever" (54%) and city "Seoul" (56%).
  - These are acceptable for fun quizzes, because a near-neighbour result is still thematically close.

### Inferences
- Calibration is against *random* answering. Real users answer systematically, so live distributions will be less uniform; e.g., socially desirable "warm" options may inflate golden retriever or medovik. Monitor real result frequencies after launch and re-run the calibration on real answer data if any outcome goes above 20% or below 2%.
- Because the profiles are calibrated near the typical normalized vector (values roughly 0.12–0.67), the profile numbers are not literal "trait percentages". The UI should not display them as such.

### Gaps
- No real-user data exists yet to check the live outcome distribution or test-retest stability.
- Builder scripts (bilingual source files, calibration and validator) are in the session scratchpad at `/tmp/claude-0/-home-user-testik/ead60077-fab3-50f6-a4af-d6aa3f9985ec/scratchpad/fun2/` (`lib.js`, `build.js`, `validate.js`, `src/*.js`). That location is temporary. If testik wants to regenerate or rebalance, these should be copied into the repo.
