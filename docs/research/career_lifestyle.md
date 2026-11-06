# Career / Values / Lifestyle tests for testik: scientific basis, open items, scoring, norms

Files produced (all valid JSON, checked with `node JSON.parse`, plus a custom checker: contiguous bands, ranges match item counts, every bilingual field non-empty, outcome profiles reference real dimensions):

| id | file | category / kind / seriousness | items | dimensions | outcomes |
|---|---|---|---|---|---|
| career-riasec | `/home/user/research_notes/Научная база тестов для сайта/tests/career-riasec.json` | career / likert / scientific | 60 | 6 | 6 |
| career-klimov | `/home/user/research_notes/Научная база тестов для сайта/tests/career-klimov.json` | career / choice / fun | 20 pairs | 5 | 5 |
| chronotype | `/home/user/research_notes/Научная база тестов для сайта/tests/chronotype.json` | wellbeing / choice / scientific | 5 | 1 | 5 |
| values-schwartz | `/home/user/research_notes/Научная база тестов для сайта/tests/values-schwartz.json` | personality / likert / scientific | 21 | 10 + 4 higher-order (facets) | 4 |
| love-languages | `/home/user/research_notes/Научная база тестов для сайта/tests/love-languages.json` | relationships / likert / fun | 25 | 5 | 6 |
| leadership-style | `/home/user/research_notes/Научная база тестов для сайта/tests/leadership-style.json` | career / likert / fun | 30 | 6 | 7 |

Generator scripts (Python, re-runnable): `/tmp/claude-0/-home-user/ead60077-fab3-50f6-a4af-d6aa3f9985ec/scratchpad/gen/{riasec,klimov,chronotype,values,love,leadership}.py` with the shared checker in `helpers.py` in the same folder.

## 1. career-riasec: which open items, scoring, psychometrics and licence for Holland RIASEC?

### Takeaway
The O\*NET Interest Profiler Short Form (60 items, 10 per RIASEC type) is the best fit. It has good psychometrics: mean α ≈ .81, retest ≈ .82, r = .90–.95 with the long form. It is **not public domain**, though. It is under CC BY-ND 4.0 for unmodified copies, and a translation or modification has to use the free **O\*NET Tools Developer License**, which comes with mandatory attribution and a disclaimer. No norms on the 0–40 computerized scale are published, so the JSON has no `norms` and uses approximate bands.

### Cited Findings
- The IP-SF has 60 work activities, 10 per type. The paper version is "check the activities you would like to do", the score is the count per section (0–10), and the code is the top three ("If there are ties, choose the interest with activities that you think are the best fit for you"). The full item list for R/I/A/S/E/C was extracted verbatim from Appendix B — [IPSF_PP.pdf](https://www.onetcenter.org:443/dl_files/IPSF_PP.pdf)
- Psychometric report: Rounds, Su, Lewis & Rivkin (Feb 2010). Development sample N = 1,061 (41% male, 4 states: MI, NY, NC, UT); stability sample N = 132 (retest tables N = 125) — [IPSF_Psychometric.pdf](https://www.onetcenter.org:443/dl_files/IPSF_Psychometric.pdf); summary page — [onetcenter.org report page](https://www.onetcenter.org/reports/IPSF_Psychometric.html)
- Computerized Short Form scale: 5 points, 0 = strongly dislike … 4 = strongly like, giving 0–40 per scale. Paper version: like / dislike / unsure — [IPSF_Psychometric.pdf](https://www.onetcenter.org:443/dl_files/IPSF_Psychometric.pdf)
- α (development sample): R .78, I .82, A .78, S .78, E .87, C .83 (mean .81). Test–retest: R .79, I .78, A .82, S .85, E .82, C .86 (mean .82) — [IPSF_Psychometric.pdf](https://www.onetcenter.org:443/dl_files/IPSF_Psychometric.pdf)
- Same-scale correlations with the long form are .90–.95. Correspondence index is .69 (long form .40), circular unidimensional scaling explains 86.5% of variance, and 2-D MDS explains 99% (stress .03) — [IPSF_Psychometric.pdf](https://www.onetcenter.org:443/dl_files/IPSF_Psychometric.pdf)
- Gender differences in the short form (d, positive = men higher): R .86, I .26, A .00, S −.59, E −.07, C −.36 — [IPSF_Psychometric.pdf](https://www.onetcenter.org:443/dl_files/IPSF_Psychometric.pdf)
- Published means are proportions on a 0–1 scale (stability sample T1): R .25 (SD .25), I .41 (.32), A .44 (.32), S .53 (.31), E .40 (.28), C .46 (.35). A gender table uses a 0–10 range, so the report is internally inconsistent about the scale — [IPSF_Psychometric.pdf](https://www.onetcenter.org:443/dl_files/IPSF_Psychometric.pdf)
- Licence: unmodified copies may be shared under CC BY-ND 4.0. Modifying or extending requires the O\*NET Tools Developer License with this attribution: "This page includes information from the O\*NET Career Exploration Tools by the U.S. Department of Labor, Employment and Training Administration (USDOL/ETA). Used under the O\*NET Tools Developer License. [Name] has modified all or some of this information. USDOL/ETA has not approved, endorsed, or tested these modifications. O\*NET® is a trademark of USDOL/ETA." "O\*NET" must be used as an adjective, and developers are asked to "validate" products — [license_tools.html](https://www.onetcenter.org/license_tools.html)
- The tools pages say they "may be redistributed or used to develop other assessments under a choice of licenses". A Spanish version exists; there is no Russian one — [dev_tools.html](https://www.onetcenter.org/dev_tools.html); [IPSF.html](https://www.onetcenter.org/IPSF.html)
- Supporting meta-analyses cited in the JSON: Nye, Su, Rounds & Drasgow (2012) on interests and performance — [doi:10.1177/1745691612449021](https://doi.org/10.1177/1745691612449021); Su, Rounds & Armstrong (2009) on sex differences in interests — [doi:10.1037/a0017364](https://doi.org/10.1037/a0017364)

### Inferences
- In the JSON I used the 0–4 computerized scale (the "unsure" midpoint is kept as 2) and interleaved the items R, I, A, S, E, C to reduce response sets. Bands are 0–14 low, 15–26 moderate, 27–40 strong. These cut points are testik's own, since no norms exist on that scale.
- Outcomes: one per type (`profile {type: 1}`), so the highest type wins. The site should show the top three letters as the Holland code. Each outcome has a rich RU/EN description plus 13 example professions adapted to the Russian market (1C/ERP accounting, 44-ФЗ/223-ФЗ procurement, МЧС, drone operator, and so on).
- The `license` field contains the full Developer-License attribution. The site footer for this test must reproduce it, and the test should not be called "O\*NET Interest Profiler" as a product name.

### Gaps
- No Russian validated version of the IP-SF was found. The Russian translation is testik's own and unvalidated.
- No adult norms on the 0–40 scale were found, so percentiles are not possible.
- The "validate all products" clause of the Developer License is not defined on the licence page. Someone should check the linked validation page before launch.

## 2. career-klimov: is Klimov's ДДО openly usable, and what can be built instead?

### Takeaway
The ДДО (E. A. Klimov, 20 paired activities, 5 types × 8 appearances) is a copyrighted work. Klimov died in 2014, so Russian copyright runs 70 years post mortem, and current sources call its wording outdated. Copying it verbatim is therefore not clearly free. I built `career-klimov` as an **original 20-pair forced-choice test** that keeps Klimov's typology and the balanced format: every pair of types appears exactly twice, and each type appears 8 times, which the checker verified. Its seriousness is "fun".

### Cited Findings
- Psytests.org attributes the ДДО to E. A. Klimov (1984) and describes a 30-item modernisation by A. A. Azbel (2012), noting "Исходный вариант опросника за прошедшие 40 лет порядком устарел". The cited literature is Klimov, *Как выбирать профессию* (Просвещение, 1990) and Грецов & Азбель (Питер, 2012) — [psytests.org/work/ddo.html](https://psytests.org/work/ddo.html)
- Klimov's dates (1930–2014) and his role in Russian work psychology — [znanierussia.ru](https://znanierussia.ru/articles/%D0%9A%D0%BB%D0%B8%D0%BC%D0%BE%D0%B2,_%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9_%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%BE%D0%B2%D0%B8%D1%87_(%D0%BF%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3)); biography — [psyjournals.ru](https://psyjournals.ru/nonserialpublications/moscow_psychologists/contents/moscow_psychologists_klimov.pdf) (search results only; page contents not fetched)

### Inferences
- Bands are 0–2 weak, 3–5 moderate, 6–8 strong. Many Russian sources interpret the ДДО as 0–2 / 3–6 / 7–8, but I could not verify that from a primary source, so the bands are testik's own.
- Scores are ipsative: they always sum to 20. They show relative preference only, and the methodology says so.
- The Klimov→Holland mapping in the methodology (Nature/Tech→R/I, Person→S/E, Sign→C/I, Art→A) is an interpretive bridge, not a published crosswalk.

### Gaps
- I did not get the primary source for the traditional ДДО interpretation thresholds, the original pairs, or any reliability data. Psytests gives none. Morozova's textbook PDF (nzdr.ru) was found but not fetched.
- I found no explicit licence or permission statement for the ДДО. My copyright conclusion comes from general Russian law (ГК РФ art. 1281: 70 years post mortem), which is a well-known rule but was not fetched this session.

## 3. chronotype: MEQ/rMEQ items, scoring, cut-offs, norms, licence, and social-jetlag advice

### Takeaway
The 5-item rMEQ (Adan & Almirall, 1991) uses MEQ items 1, 7, 10, 18 and 19. It scores 4–25, with five verified cut-offs: 4–7 definitely evening, 8–11 moderately evening, 12–17 neither, 18–21 moderately morning, 22–25 definitely morning. It correlates .87–.90 with the full MEQ and has student norms of M = 13.3, SD = 3.6 (N = 849). There is no formal open licence; it is widely reproduced free for research and clinical use.

### Cited Findings
- rMEQ score range is 4 (extreme eveningness) to 25. Item 1 wording: "Considering only your own 'feeling best' rhythm, at what time would you get up if you were entirely free to plan your day?" The 5 items come from Adan & Almirall's (1991) M/E factor (3 open-ended time items and 2 multiple-choice items) — [Tonetti, Adan & Natale (UB repository)](https://diposit.ub.edu/dspace/bitstream/2445/220392/1/844004.pdf)
- Norms, university students: total N = 849, M = 13.3, SD = 3.6 (men 13.0/3.8; women 13.4/3.5). Italy (n = 428): men 13.57/3.87, women 14.21/3.60. Spain (n = 421): men 12.21/3.44, women 12.70/3.24. Mean age is 21–23 — [Tonetti, Adan & Natale](https://diposit.ub.edu/dspace/bitstream/2445/220392/1/844004.pdf)
- Reliability (Di Milia et al., 2013, as cited): .69–.73; test–retest .76–.79; r with full MEQ .87–.90. The rMEQ has been validated against actigraphy, body temperature and alertness, and it discriminates extreme chronotypes — [Tonetti, Adan & Natale](https://diposit.ub.edu/dspace/bitstream/2445/220392/1/844004.pdf)
- Five-category cut-offs (4–7 / 8–11 / 12–17 / 18–21 / 22–25). Second norm: STAGES cohort (sleep-clinic patients), N = 1,770, M = 14.5 ± 4.0, median 15 — [sleepdata.org STAGES cir_0700](https://sleepdata.org/datasets/stages/variables/cir_0700)
- Alternative Italian 3-category cut-offs: evening 4–10, intermediate 11–18, morning 19–25 (Tonetti et al., 2006) — [Tonetti et al. 2024, J Sleep Res 33(3) e13948](https://cris.unibo.it/retrieve/5865d7d9-a91d-43a8-a77c-25455a48d180/Tonetti%20et%20al.%202024_JOSR.pdf)
- Social jetlag (Wittmann, Dinich, Merrow & Roenneberg, 2006, Chronobiology International 23(1–2), 497–509) is the misalignment between biological and social time — [PubMed 16687322](https://pubmed.ncbi.nlm.nih.gov/16687322/)

### Inferences
- The JSON uses the rMEQ options and points as I recalled them from the standard MEQ form. Item 1: 5:00–6:30 = 5 … 11:00–12:00 = 1. Item 7: very tired = 1 … very refreshed = 4. Item 10: 20:00–21:00 = 5 … 2:00–3:00 = 1. Item 18: 5–8 = 5, 8–10 = 4, 10–17 = 3, 17–22 = 2, 22–5 = 1. Item 19: 6/4/2/0. The sum range 4–25 matches the published range, which is consistent with this key.
- I used five outcomes with profiles at 0.05/0.25/0.5/0.75/0.95 on the normalized score. I checked all 22 possible scores (4–25), and the nearest-profile outcome equals the Adan–Almirall band for every one.
- Advice text draws on: social jetlag; the age trend (latest chronotype around age 20, Roenneberg et al., 2004); the Facer-Childs et al. (2019) owl-shifting trial; and Brown et al. (2022) PLOS Biology lighting recommendations. These are cited with DOIs in the JSON.

### Gaps
- I could not fetch the MEQ items from the original Horne & Östberg (1976) paper or a primary rMEQ form, because the UPenn and ATS pages hit the fetch budget. Item wording and option points are from memory of the standard form and should be spot-checked against Adan & Almirall (1991), [doi:10.1016/0191-8869(91)90110-W](https://doi.org/10.1016/0191-8869(91)90110-W).
- Licence: I found no explicit statement. Commercial use status is unverified (the JSON flags "low-to-moderate risk").
- Russian rMEQ/MEQ adaptations exist on sleep sites (e.g., [sleep.euzona.cz](https://sleep.euzona.cz/en/meq/) lists a Russian version), but none were fetched. The Russian translation is testik's own.
- Not fetched this session, cited from memory with DOIs: Roenneberg et al. (2012) social jetlag & obesity; Roenneberg et al. (2004); Facer-Childs et al. (2019); Brown et al. (2022).

## 4. values-schwartz: PVQ-21 (ESS) items, centring, higher-order values, Russian data

### Takeaway
The 21-item ESS Human Values Scale (PVQ-21) is openly published in the ESS questionnaires. It has 2 items per value (universalism has 3), a 6-point "like me" scale, and Schwartz-style centring. I implemented 10 value dimensions plus 4 higher-order dimensions (as `facets`), and the outcome is the leading higher-order cluster. In Russian ESS data, security and self-enhancement are higher than in most of Europe, and the "Growth" profile is rare (~2% vs 24–36% in Northern/Western Europe).

### Cited Findings
- ESS intro: "Here we briefly describe some people. Please read each description and tick the box on each line that shows how much each person is like or is not like you." Item IPCRTIV: "Thinking up new ideas and being creative is important to him/her. He/She likes to do things in his/her own original way." Categories: Very much like me / Like me / Somewhat like me / A little like me / Not like me / Not like me at all — [ESS 2002 via ARK](https://www.ark.ac.uk/sol/surveys/gen_social_att/ESS/2002/website/Human_Values/IPCRTIV.html)
- The revised ESS Human Values Scale (Round 12) moves to single-statement, gender-neutral items starting "It is important to this person…". It has 20 items for 19 refined values, can be scored for the 10 basic values, and adds "now" to the intro. Sommer, Dorer, Efu Nkong, Hanson, Zinn & Schwartz (2025), Survey Practice 18, doi:10.29115/SP-2025-0017. Its R12 source questionnaire and translations were due on the ESS site in Jan 2026 — [Survey Practice](https://www.surveypractice.org/article/147276)
- Davidov, Schmidt & Schwartz (2008) assessed the ESS values scale across 20 countries — [HUJI record](https://cris.huji.ac.il/en/publications/bringing-values-back-in-the-adequacy-of-the-european-social-surve/)
- Magun & Rudnev (2010), "Базовые ценности россиян и других европейцев (по материалам опросов 2008 года)", Вопросы экономики 12:107–130, doi:10.32609/0042-8736-2010-12-107-130. They compare Russia with 31 European countries on ESS-2008 PVQ data and conclude that some value "barriers" may hinder development — [IDEAS/RePEc](https://ideas.repec.org/a/nos/voprec/y2010id1111.html)
- Magun & Rudnev, latent-class typology (ESS 2012): Russia's "Growth" class (high openness + self-transcendence) is ~2% versus ~24–36% in Scandinavia and Western Europe (Europe-wide 16–18%). Russia resembles post-socialist and Mediterranean countries. Between 2008 and 2012 Russians shifted toward openness and self-enhancement, and individualistic orientation reached 54% vs 44% social orientation by 2012 — [HSE PDF](https://www.hse.ru/data/2015/04/03/1096440477/Magun_Rudnev.pdf)
- Russian validation of the refined theory: Шварц, Бутенко, Седова & Липатова (2012), Психология. Журнал ВШЭ — [publications.hse.ru](https://publications.hse.ru/articles/66442752); [journal page](https://law-journal.hse.ru/index.php/psychology/article/view/876)
- An R implementation of PVQ-21 scoring exists (MRAT centring) — [persval::pvq21](https://rdrr.io/cran/persval/src/R/pvq21.R); [LittleHelpers ess_values](https://rdrr.io/github/MaksimRudnev/LittleHelpers/src/R/ess_values.R)

### Inferences
- The item→value key and the English wordings come from the ESS R1 questionnaire (variables ipcrtiv … impfun, in standard order), rewritten in gender-neutral "this person/they" form, which follows the direction of the 2025 revision. Russian translations are testik's own. The official ESS Russian translation exists but was not retrieved.
- Coding: 6 = very much like me … 1 = not like me at all (the ESS raw data is reversed, 1 = very much like me). Value scores are means (1–6). Bands are 1–2.99 / 3–4.49 / 4.5–6, which no achievable mean falls between.
- Higher-order clusters: openness = SD+ST+HE, conservation = SE+CO+TR, self-enhancement = AC+PO, self-transcendence = BE+UN. Hedonism is placed under openness, a common ESS convention. Outcome = highest cluster; centring does not change the winner because the same constant is subtracted from every score.
- Site note: if the engine computes a parent as the mean of facet means, the result differs slightly from the mean of items (universalism has 3 items). The scoringNotes describe the item-mean approach.

### Gaps
- I found no published PVQ-21 means for Russia vs Europe on the raw 1–6 scale in a fetched source, so there are no `norms` in the JSON. The ESS data portal could provide them via a custom analysis.
- The Magun & Rudnev 2010 abstract was only summarized by the tool, not quoted. The claim "higher security & self-enhancement, lower openness & self-transcendence" is consistent with the 2012 typology PDF, but the exact 2010 wording is not verified.
- ESS terms of use for commercial reuse of the questionnaire items were not checked; the ZIS/GESIS entry did not render.
- Not fetched this session, cited from memory with DOIs: Schwartz (2012) ORPC overview, Schwartz (1992), Schwartz & Bardi (2001); the reliability statement "often α < .70".

## 5. love-languages: original items and an honest summary of the evidence

### Takeaway
Chapman's quiz is copyrighted and "The 5 Love Languages®" is a trademark, so the testik test uses 25 **original Likert items** (5 per expression) and is rated **fun**. The evidence is mixed to weak. There is some factor support (Egbert & Polk, 2006). Matching languages did not predict satisfaction in Bunt & Hazelwood (2017), but responsiveness to a partner's preferences did in Mostova et al. (2022). The 2024 CDPS review concludes the core assumptions are poorly supported and proposes a "balanced diet" metaphor.

### Cited Findings
- Impett, Park & Muise (2024), "Popular Psychology Through a Scientific Lens: Evaluating Love Languages From a Relationship Science Perspective", Current Directions in Psychological Science, doi:10.1177/09637214231217663 — [SAGE](https://journals.sagepub.com/doi/10.1177/09637214231217663); [APS](https://www.psychologicalscience.org/journals/current-directions/09637214231217663/)
- University of Toronto press release: "Little evidence linking five 'love languages' to healthy relationships, researchers say" — [U of T News](https://www.utoronto.ca/news/little-evidence-linking-five-love-languages-healthy-relationships-researchers-say); [UTM](https://www.utm.utoronto.ca/main-news/changing-conversation-around-love-languages-and-positive-relationships)
- Mostova, Stolarski & Matthews (2022), PLOS ONE: partners who better matched each other's love-language preferences reported higher relationship and sexual satisfaction — [PMC9216579](https://pmc.ncbi.nlm.nih.gov/articles/PMC9216579/); [PsyPost summary](https://www.psypost.org/2022/08/romantic-partners-who-better-match-each-others-love-language-preferences-are-more-satisfied-with-their-relationship-and-sexual-life-63754); [EurekAlert](https://www.eurekalert.org/news-releases/956244)
- Bunt & Hazelwood (2017), "Walking the walk, talking the talk: Love languages, self-regulation, and relationship satisfaction", Personal Relationships — [MetaTOC](https://metatoc.com/papers/100052-walking-the-walk-talking-the-talk-love-languages-self-regulation-and-relationship-satisfaction)
- Egbert & Polk (2006) tested the validity of Chapman's typology. A follow-up Ohio University study revisits Chapman's 2015 typology — [Ohio University PDF](https://www.ohio.edu/scripps-college/sites/ohio.edu.scripps-college/files/sites/scripps-college/comm-studies/files/Revisiting%20the%20Languages%20of%20Love%20An%20Empirical%20Test%20of%20the%20Validity%20Assumptions%20Underlying%20Chapman%20s%202015%20Five%20Love%20Languages%20Typology.pdf) (found but not fetched)

### Inferences
- I chose a Likert format instead of forced choice on purpose. It allows several high scores, in line with the review's critique that most people value all forms of love. A sixth outcome, "Love Polyglot" (all dimensions ≈ 0.85), captures uniformly high profiles. In a 5,000-response simulation, outcomes spread evenly: polyglot ≈ 21%, each single language ≈ 15–16%.
- Each outcome has `funnyExamples` for the light tone. There is a disclaimer with Russian hotlines (8-800-7000-600 for domestic violence, ANNA Centre; nasiliu.net; 8-800-2000-122 for teens and parents) and findahelpline.com, because of the relationship-abuse caveat. These numbers are from prior knowledge and were not verified this session.

### Gaps
- Sample sizes (Bunt & Hazelwood 67 couples; Mostova et al. 100 couples), the CDPS volume/pages (33(2), 87–92), and the Egbert & Polk details (Communication Research Reports 23(1), 19–26) are from memory. The PMC and press pages were found but blocked or not fetched. Verify before quoting numbers on the site.
- No Russian peer-reviewed study of love languages was searched.

## 6. leadership-style: open frameworks, original items, evidence base

### Takeaway
The MLQ is proprietary (Mind Garden), and IPIP has no leadership-*style* scales. Its "leadership" items measure emergence or assertiveness. So `leadership-style` uses 30 **original items** on 6 scales grounded in Lewin's styles, the Ohio State dimensions and Bass's Full Range model: Visionary, Coach, Democratic, Organizer, Commander, and Hands-off (a risk scale). It has 7 nearest-profile outcomes, including Full-Range and Hands-off, and is rated **fun** because the items are not validated.

### Cited Findings
- Judge & Piccolo (2004), "Transformational and transactional leadership: A meta-analytic test of their relative validity", J Applied Psychology 89(5), 755–768 — [record](https://academicnewsletter.sufe.edu.cn/info/372429); [doi:10.1037/0021-9010.89.5.755](https://doi.org/10.1037/0021-9010.89.5.755)
- Supporting works cited in the JSON with DOIs: Lewin, Lippitt & White (1939); Judge, Piccolo & Ilies (2004) on consideration and initiating structure; Skogstad et al. (2007) on the destructiveness of laissez-faire; DeRue et al. (2011) on traits vs behaviours — [doi:10.1080/00224545.1939.9713366](https://doi.org/10.1080/00224545.1939.9713366); [doi:10.1037/0021-9010.89.1.36](https://doi.org/10.1037/0021-9010.89.1.36); [doi:10.1037/1076-8998.12.1.80](https://doi.org/10.1037/1076-8998.12.1.80); [doi:10.1111/j.1744-6570.2010.01201.x](https://doi.org/10.1111/j.1744-6570.2010.01201.x)

### Inferences
- The scale design maps onto established constructs. Visionary ≈ inspirational motivation + idealized influence. Coach ≈ individualized consideration. Democratic ≈ Lewin's democratic style + intellectual stimulation. Organizer ≈ initiating structure + contingent reward. Commander ≈ Lewin's autocratic style + active management by exception. Hands-off ≈ laissez-faire/passive.
- Outcome profiles were tuned by simulation. With realistic correlated responses: Full-Range ≈ 28%, Organizer 19%, Inspirer 15%, Democrat 11%, Hands-off 11%, Commander 9%, Coach 8%.
- "fun" is a conservative label. If the site would rather have a "self-reflection" badge for framework-grounded but unvalidated tests, the coordinator may switch leadership-style and career-klimov to another value. The schema allows only scientific/screening/fun.

### Gaps
- These effect sizes are from memory of the abstracts and were not re-fetched this session: Judge & Piccolo (2004) transformational ρ ≈ .44, contingent reward ≈ .39, laissez-faire ≈ −.37; Judge, Piccolo & Ilies (2004) consideration ≈ .48, initiating structure ≈ .29; the Lewin–Lippitt–White descriptive findings; Skogstad et al. (2007) on links to role conflict, ambiguity and bullying. They are widely reported, but verify them against the abstracts before publishing numbers.
- The Russian tradition (директивный / коллегиальный / либеральный styles; А. Л. Журавлёв's work on leadership style) is mentioned only generically, with no citation, because no source was fetched.
- The IPIP site was not checked this session for the absence of leadership-style scales; this rests on prior knowledge.
