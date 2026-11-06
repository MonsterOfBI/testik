# Mental-health screening tests for testik: GAD-7, PHQ-9, PSS-10, CBI, ASRS v1.1, AQ-10

How to read the status tags in these notes:
- **[V]**: verified this session against the linked page.
- **[P]**: from the original publication or the standard form. I'm confident it is right but did not re-open it this session, because the shared WebFetch budget ran out (100 calls per hour) and the proxy blocked direct downloads with 403. Check every [P] item before launch.

Deliverables (all parse with `node` and pass a structural check: bands are contiguous and cover [min, max], each band has 3–5 bullets, every question maps to a dimension, the computed score range matches the declared one):
- `tests/anxiety-gad7.json`: likert, 7 items, 4 bands, norms
- `tests/depression-phq9.json`: likert, 9 items, 5 bands, norms, item-9 crisis rule (machine-readable `"crisisIfAtLeast": 1` on question `phq9-9`)
- `tests/stress-pss10.json`: likert, 10 items (4 reverse-scored), 4 bands based on the norms, norms
- `tests/burnout-cbi.json`: choice (two answer scales), 13 items, personal and work-related scales (client-related scale left out), 4 bands each, PUMA norms with SDs (from the NFA manual, verified on the second pass)

Second pass (after the rate limit reset), now [V]: the Pfizer PHQ-9 Russian-for-Russia wording (matches the JSON word for word), the CBI manual (item order, answer scales, reverse item, PUMA means/SDs, the 50+ "high degree" convention), the ASRS 0–24 scoring update, and Moscow 051 / 8-495-051 (24/7, free).
- `tests/adhd-asrs.json`: choice, **Part A only (6 items)** because of licensing, 2 official bands
- `tests/autism-aq.json`: choice, AQ-10 adult, 2 bands, norms. **License restricted: needs ARC permission**

---

## 1. Exact items, answer options, instructions, scoring algorithm, official cut-offs and accuracy

### Takeaway
PHQ-9, GAD-7, PSS-10, CBI and the 6-item ASRS screener all have published wording and scoring that can be implemented exactly. The PSS has **no official cut-offs**, so I built bands from the norms (±1 and ±2 SD from the mean). The CBI cut-off of 50 is a research convention. ASRS Part B and the 18-item scale need permission, so the JSON contains Part A only.

### Cited Findings
**GAD-7**
- Instruction: "Over the last 2 weeks, how often have you been bothered by the following problems?" Answers: Not at all (0), Several days (1), More than half the days (2), Nearly every day (3). Total 0–21. Cut-points 5, 10 and 15 mean mild, moderate and severe. [P] — [Spitzer et al., 2006, Arch Intern Med, doi:10.1001/archinte.166.10.1092](https://doi.org/10.1001/archinte.166.10.1092)
- Accuracy at a cut-off of 10 for GAD: sensitivity 89%, specificity 82%. α = 0.92, test–retest ICC = 0.83. Developed with 2,740 primary-care patients in 15 US clinics, 965 of whom had a mental-health professional interview. [P] — [Spitzer et al., 2006](https://doi.org/10.1001/archinte.166.10.1092)
- Also a reasonable screener for panic disorder, social anxiety disorder and PTSD. [P] — [Kroenke et al., 2007, Ann Intern Med, doi:10.7326/0003-4819-146-5-200703060-00004](https://doi.org/10.7326/0003-4819-146-5-200703060-00004)

**PHQ-9**
- Same 2-week frame and the same 0–3 scale. Total 0–27. Cut-points 5, 10, 15 and 20 mean mild, moderate, moderately severe and severe. A score of 10 or more gives 88% sensitivity and 88% specificity for major depression. α = 0.89 in primary care and 0.86 in OB-GYN clinics. 48-hour test–retest r = 0.84. The sample was 6,000 patients (8 primary-care and 7 OB-GYN clinics), with 580 interviewed by a mental-health professional. [P] — [Kroenke, Spitzer & Williams, 2001, J Gen Intern Med, doi:10.1046/j.1525-1497.2001.016009606.x](https://doi.org/10.1046/j.1525-1497.2001.016009606.x)
- Item 10 (how difficult the problems make life) is not scored, so the JSON leaves it out. [P] — same source

**PSS-10**
- Verbatim instruction and the 10 items: "The questions in this scale ask you about your feelings and thoughts during the last month…". Answers 0 = Never, 1 = Almost Never, 2 = Sometimes, 3 = Fairly Often, 4 = Very Often. **Items 4, 5, 7 and 8 are reverse-scored**, then all items are summed (0–40). [V] — [Official PSS form (SLU copy)](https://slu.edu/medicine/family-medicine/-pdf/perceived-stress-scale.pdf)
- The commonly seen bands 0–13 / 14–26 / 27–40 do **not** appear on the official form [V] — [SLU PSS form](https://slu.edu/medicine/family-medicine/-pdf/perceived-stress-scale.pdf). As I remember Cohen's lab FAQ, it says the PSS is not diagnostic and has no cut-offs. [P: the FAQ .doc could not be read (binary)] — [CMU PSS FAQ](https://www.cmu.edu/dietrich/psychology/stress-immunity-disease-lab/scales/.doc/pssfaqs.doc)
- The full instruction also tells people not to count episodes but to give "a reasonable estimate". The JSON paraphrases this. [P] — [Cohen et al., 1983, doi:10.2307/2136404](https://doi.org/10.2307/2136404)

**CBI (Copenhagen Burnout Inventory)**
- Personal items (6): tired; physically exhausted; emotionally exhausted; "I can't take it anymore"; worn out; weak and susceptible to illness. Work items (7) and client items (6) are verbatim on the page. Scoring is 100/75/50/25/0 and each scale is the mean of its items. Reported alphas: personal 0.87, work 0.87, client 0.85. Bands are 50–74 moderate, 75–99 high and 100 severe, attributed to Creedy et al. 2017. PUMA means: personal 35.9, work 33.0, client 30.9. [V, secondary source] — [Embrace Autism CBI page](https://embrace-autism.com/copenhagen-burnout-inventory/)
- **Resolved on the second pass from the official CBI manual (NFA, 1st ed., Feb 2004):** work items in order: (1) "Is your work emotionally exhausting?", (2) "Do you feel burnt out because of your work?", (3) "Does your work frustrate you?" use the intensity scale (To a very high degree … To a very low degree). (4) "Do you feel worn out at the end of the working day?", (5) "Are you exhausted in the morning at the thought of another day at work?", (6) "Do you feel that every working hour is tiring for you?", (7) "Do you have enough energy for family and friends during leisure time?" use the frequency scale (Always … Never/almost never). **Item 7 is reverse-scored.** The manual defines **50 or more as a "high degree of burnout"**. Missing-data rule: personal and client scales need at least 3 answered items, the work scale at least 4. The JSON order and keys match exactly. [V] — [NFA CBI manual, 1st ed.](https://nfa.dk/media/hl5nbers/cbi-first-edition.pdf)
- **Earlier conflict (now resolved):** that page labels work items 1–3 (end of day, morning, every hour) with the "degree" answer scale and items 4–7 with the "frequency" scale, which doesn't fit the grammar. The Russian blank on psytests.org has 19 items in the order "items 1–10 frequency, 11–17 degree, 18–19 frequency" [V] — [psytests CBI blank](https://psytests.org/stress/cbi-bl.html). That means work items "worn out at end of day / exhausted in morning / every working hour tiring / enough energy for family and friends" use the **frequency** scale, and "emotionally exhausting / burnt out because of work / frustrate" use the **degree** scale. The JSON follows this. The reverse-scored item is "enough energy for family and friends during leisure time" (the only positively worded one; [P] Kristensen 2005 appendix).
- Client-related items, verbatim, for an optional future module (only for people who work with clients). Items 1–4 use the degree scale and 5–6 the frequency scale: "Do you find it hard to work with clients?"; "Does it drain your energy to work with clients?"; "Do you find it frustrating to work with clients?"; "Do you feel that you give more than you get back when you work with clients?"; "Are you tired of working with clients?"; "Do you sometimes wonder how long you will be able to continue working with clients?" [V, secondary] — [Embrace Autism CBI page](https://embrace-autism.com/copenhagen-burnout-inventory/)
- Original paper: [Kristensen, Borritz, Villadsen & Christensen, 2005, Work & Stress 19(3):192–207, doi:10.1080/02678370500297720](https://doi.org/10.1080/02678370500297720). Also: [NFA CBI page](https://nfa.dk/da/Vaerktoejer/Sporgeskemaer/Sporgeskema-til-maaling-af-udbraendthed/Copenhagen-Burnout-Inventory-CBI) and the [NFA "CBI first edition" PDF](https://nfa.dk/media/hl5nbers/cbi-first-edition.pdf) (found but not readable this session).
- Source for the cut-off: [Creedy et al., 2017, BMC Pregnancy Childbirth 17:13, doi:10.1186/s12884-016-1212-5](https://doi.org/10.1186/s12884-016-1212-5) [P for the details]. MBI is background only. It is sold by Mind Garden [P].

**ASRS v1.1 (Part A screener)**
- In the original study the 6-question screener did better than the 18-question ASRS on every measure: sensitivity 68.7% vs 56.3%, specificity 99.5% vs 98.3%, total classification accuracy 97.9% vs 96.2%, kappa 0.76 vs 0.58. [V] — [Kessler et al., 2005, Psychol Med 35(2):245–56, PubMed 15841682](https://pubmed.ncbi.nlm.nih.gov/15841682/)
- Harvard's terms say the instrument must not be altered: "the scoring algorithm is not altered"; "the two levels of shading within the response categories are included". [V] — [Harvard NCS ASRS page](https://www.hcp.med.harvard.edu/ncs/asrs.php)
- Items, answers (Never / Rarely / Sometimes / Often / Very Often), the 6-month frame and the shading rule are taken from the official screener form [P]. Items 1–3 count as shaded at Sometimes or higher, items 4–6 at Often or higher. Four or more shaded answers means "symptoms highly consistent with ADHD in adults and further investigation is warranted".
- **0–24 scoring update (verified on the second pass):** "0 points for a response of 'never,' 1 point for 'rarely,' 2 points for 'sometimes,'" 3 for "often" and 4 for "very often". Total 0–24, screen positive at "14 or more". Strata: "0-9=low negative, 10-13=high negative, 14-17=low positive range, and 18-24=high positive range." The original 0–6 rule ("1 point for items scored above a certain threshold", cut-point 4+) "was designed for primary care and clinical use". The 0–24 scoring is recommended for research. Based on Kessler et al. 2007, Int J Methods Psychiatr Res 16(2):52–65. [V] — [Harvard ASRS scoring update PDF](https://www.hcp.med.harvard.edu/ncs/ftpdir/adhd/ASRS_v1.1_screener(6Q)_scoring_update.pdf); [doi:10.1002/mpr.208](https://zendy.io/title/10.1002/mpr.208). The JSON keeps the official clinical 0–6 rule as the result and describes the 0–24 option in `methodology`. Putting both in would risk two conflicting verdicts, e.g. 4 shaded answers but 12/24.
- Part A items verbatim and the 5 options (Never / Rarely / Sometimes / Often / Very often) [V] — [psychdb copy of the ASRS v1.1 Symptom Checklist](https://www.psychdb.com/_media/child/adult_adhd_self_report_scale.pdf) (marked "© 2003 World Health Organization. Reprinted with permission."). **Wording difference:** this copy's clinician instructions say "If four or more marks appear under Often/Very Often". The standard screener says "in the darkly shaded boxes within Part A". The well-known shading puts Sometimes and higher as shaded for items 1–3 and Often and higher for items 4–6. The text extraction couldn't show the shading. The JSON uses the shaded-box key [P]. Check it against the official screener PDF.

**AQ-10 (adult)**
- The 10 items are verbatim from Allison et al. 2012, Table 2: small sounds; whole picture; more than one thing at once; switch back after an interruption; read between the lines; tell if a listener is bored; characters' intentions; collect information about categories; read thoughts or feelings from a face; people's intentions. Answer options are strongly/slightly agree and slightly/strongly disagree. A "slight" or "strong" answer in the autistic direction scores 1. **Cut-off 6+: sensitivity 0.88, specificity 0.91, PPV 0.85 (in an enriched sample), α = 0.85.** r = 0.92 with AQ-50. [V] — [Allison, Auyeung & Baron-Cohen, 2012, JAACAP 51(2):202–212, doi:10.1016/j.jaac.2011.11.003](https://docs.autismresearchcentre.com/papers/2012_Allisonetal_JAACAP_RedFlags.pdf)
- The paper doesn't list the scoring direction per item. The JSON uses the standard AQ-10 form key: agree scores on items 1, 7, 8 and 10; disagree scores on 2, 3, 4, 5, 6 and 9. This also follows the logic of the item wording. The example list in item 8 ("types of car, types of bird, types of train, types of plant etc") comes from the AQ-10 form. Answer labels use "Definitely" as on the form and in AQ-50 (the paper says "strongly"). [P]
- Background: the AQ-50 has 5 subscales of 10 items each. The 32+ cut-off and the means (16.4 for controls vs 35.8 for AS/HFA) are from [Baron-Cohen et al., 2001, J Autism Dev Disord 31(1):5–17, doi:10.1023/A:1005653411471](https://doi.org/10.1023/A:1005653411471) [P, not put in the JSON]. NICE CG142 recommends AQ-10 for adults [P] — [NICE CG142](https://www.nice.org.uk/guidance/cg142). An evidence appendix exists: [NICE CG142 appendix 14b](https://www.nice.org.uk/guidance/cg142/evidence/appendix-14b-case-identification-instruments-clinical-study-characteristics-pdf-186587681).
- In people referred for diagnosis, the AQ had poor predictive value. [P] — [Ashwood et al., 2016, Psychol Med 46(12):2595–2604, doi:10.1017/S0033291716001082](https://doi.org/10.1017/S0033291716001082). A 2025 paper argues that the AQ-10 cut-off choice matters (title only verified) — [PubMed 39964454](https://pubmed.ncbi.nlm.nih.gov/39964454/).

### Inferences
- **PSS bands** are based on the norms (Cohen & Williamson 1988: M ≈ 13.0, SD ≈ 6.4): 0–6 below average (< −1 SD), 7–19 average (±1 SD), 20–25 above average (+1 to +2 SD), 26–40 well above average (> +2 SD). They are labelled honestly in `methodology` and `scoringNotes`.
- **CBI bands** are 0–49 / 50–74 / 75–99 / 100. With 6 or 7 items no mean can fall between the integer bounds (personal means move in steps of 4.17, work means in steps of 3.57), so the integer bands are exact. The JSON tells the site to apply bands to the unrounded mean.
- **CBI reverse scoring** is built into the option scores of `cbi-w7`. I removed the `reverse` flag on purpose, so a renderer that applies `reverse` can't reverse the item twice in a choice test.
- I set `dimension` on choice questions too (optional field) so the `mean` scoring for CBI knows which items to average.
- ASRS: a sensitivity of 68.7% means about 1 in 3 adults with ADHD screen negative. The low band says so.
- Instructions: I adjusted the paper-form wording for the web, e.g. "place an X" became "choose". The item text is unchanged.

### Gaps
- The ASRS form wording, the shading and the "highly consistent" sentence were not re-fetched [P]. Check them against the official PDF on the Harvard page.
- The shading per Part A item could not be read from a text extraction. Check it visually on the official PDF.

---

## 2. Russian translations: published or validated versions

### Takeaway
Validated or official Russian wording exists and was used for **PSS-10** (Ababkov et al. 2016, wording verified) and **PHQ-9 / GAD-7** (official Pfizer "Russian for Russia" translations, wording from memory, consistent with search hits). **CBI, ASRS and AQ-10 use my own careful translations.** ASRS must be swapped for the official Russian translation listed by Harvard. Translating the AQ-10 needs permission from ARC.

### Cited Findings
- **PSS-10 RU:** Ababkov V. A., Barisnikov K., Vorontzova-Wenger O. V., Gorbunov I. A., Kapranova S. V., Pologaeva E. A., Stuklov K. A. (2016). *Validation of the Russian version of the questionnaire "Scale of perceived stress–10"*. Vestnik SPbU, Series 16, issue 2, pp. 6–15, doi:10.21638/11701/spbu16.2016.202. It gives the Russian wording of all 10 items. The answers are coded **1–5** (Никогда / Почти никогда / Иногда / Довольно часто / Часто), and items 4, 5, 7 and 8 are reverse-scored. [V] — [Ababkov et al., 2016 PDF](https://dspace.spbu.ru/bitstream/11701/2551/1/Ababkov_Barishnikov_et_al.pdf); [record](https://dspace.spbu.ru/handle/11701/2551)
  - Wording was used verbatim except for punctuation and capitalisation of "Вы/Ваш" (commas restored in items 9–10). The top answer label "Часто" was changed to "Очень часто" to match the original "Very often" and the 0–4 scoring.
- **PHQ-9 RU (verified word for word on the second pass):** the official Pfizer "PHQ9_Russian for Russia" form. Instruction: «Как часто за последние 2 недели Вас беспокоили следующие проблемы?». The JSON items 1–9 match the form exactly. Answers: Ни разу / Несколько дней / Более недели / Почти каждый день. Footer: «Разработано докторами Робертом Л. Шпицем (Robert L. Spitzer), Джанет Б.У. Уилльямс …, Куртом Кронке … в рамках образовательного гранта компании Pfizer Inc. Воспроизведение, перевод, показ и распространение разрешены.» [V] — [ECFS mirror of the Pfizer PHQ-9 RU-RU](https://www.ecfs.eu/sites/default/files/general-content-files/working-groups/Mental%20Health/PHQ9_Russian%20for%20Russia.pdf)
- **GAD-7 RU:** I couldn't find a copy of the official "Russian for Russia" GAD-7. The JSON wording (e.g. «Вы нервничали, тревожились или испытывали сильный стресс», «…тяжело усидеть на месте», answer «Более недели») is from memory of that version. An exact-phrase search for both phrases does return Russian GAD-7 pages (e.g. [sostav.ru](https://www.sostav.ru/blogs/292185/99435)), which corroborates it [P]. The official Pfizer **"Russian for Ukraine"** version was verified word for word and differs slightly [V] — [ECFS GAD7 RU-UA](https://www.ecfs.eu/sites/default/files/general-content-files/working-groups/Mental%20Health/GAD7_Russian%20for%20Ukraine.pdf):
  - Instruction: «За последние 2 недели как часто Вас беспокоили следующие проблемы?»
  - Items: 1 «Вы нервничали, тревожились или были очень напряжены»; 2 «Вы были неспособны успокоить или контролировать свои волнения»; 3 «Вы слишком сильно волновались по различным поводам»; 4 «Вам было трудно расслабиться»; 5 «Вы были настолько взбудоражены, что Вам было тяжело сидеть спокойно»; 6 «Вы легко сердились или раздражались»; 7 «Вы испытывали страх, словно должно произойти нечто ужасное»
  - Answers: Ни разу / Несколько дней / Более половины всех дней / Почти каждый день
  - If the RU-RU form can't be obtained, swap in this verified official text.
- There is also a Russian GAD-7 adaptation study: Zolotareva A. A. (2023), *Adaptation of the Russian version of the Generalized Anxiety Disorder-7*, Консультативная психология и психотерапия, 2023 № 4 [V for title, journal and year; details not read] — [psyjournals](https://psyjournals.ru/en/journals/cpp/archive/2023_n4/Zolotareva)
- **CBI RU:** a Russian student version (R-CBI-S) was tested on 771 medical students at Astana Medical University (Kazakhstan). Test–retest ICC 0.81; α: total 0.94, personal 0.896, studies-related 0.884, colleague-related 0.874, teacher-related 0.926; 4-factor CFA with RMSEA 0.061, CFI 0.940. [V] — [PubMed 36810989](https://www.pubmed.gov/36810989/); related [PMC9939042](https://pmc.ncbi.nlm.nih.gov/articles/PMC9939042). Psytests.org hosts a Russian CBI blank with Russian answer anchors (Всегда / Часто / Иногда / Редко / Никогда, почти никогда; В очень высокой степени … В очень малой степени) but gives no translator and says it is not for redistribution [V] — [psytests CBI](https://psytests.org/stress/cbi-bl.html). An Oldenburg Burnout Inventory Russian validation also exists (not used) — [CyberLeninka](https://cyberleninka.ru/article/n/adaptation-and-validation-of-the-russian-version-of-the-oldenburg-burnout-inventory-among-medical-students).
- **ASRS RU:** Harvard lists Russian among the translations of the ASRS v1.1 6-question screener. [V] — [Harvard ASRS page](https://www.hcp.med.harvard.edu/ncs/asrs.php)
- **AQ RU:** the ARC tests page doesn't list Russian, and translations fall under separate ARC terms [V] — [ARC tests](https://www.autismresearchcentre.com/tests/)

### Inferences
- The ASRS Russian items in `adhd-asrs.json` are **placeholders**. Harvard forbids altering the instrument, so replace them with the official Russian screener text before launch.
- The AQ-10 Russian items are my own translation. ARC says "You may not adapt or modify", so a translation needs ARC permission.
- CBI Russian: I used anchor wording close to psytests ("В некоторой степени" instead of "Нечто среднее"). The items are translated directly from the English.
- Gendered Russian forms use the "(-ая)/(согласна)" pattern. The site could swap in gender-specific forms if it collects gender.

### Gaps
- The GAD-7 "Russian for Russia" form text is still unverified (see above). PHQ-9 RU is verified.
- I found no Russian-population norms for PHQ-9 or GAD-7. The Zolotareva 2023 paper may report Russian means; it couldn't be read.
- I found no validated Russian version of the CBI work-related scale for adult employees, apart from the student version and an unattributed psytests blank.

---

## 3. Population norms and reliability (for percentiles)

### Takeaway
Usable norms (mean and SD on the same raw scale) exist for GAD-7, PHQ-9, PSS-10, CBI (personal and work) and AQ-10. For GAD-7 and PHQ-9 the overall mean and SD were **pooled from verified sex-specific values**. ASRS has no norms on the shaded-count scale.

### Cited Findings
- **GAD-7, Löwe et al. 2008 (Med Care 46(3):266–274, doi:10.1097/MLR.0b013e318160d093):** n = 5,030, German representative household survey (May–June 2006), 53.6% women, mean age 48.4 (SD 18.0). α = 0.89. One-factor structure, invariant across sex and age. **Women 3.2 (SD 3.5), men 2.7 (SD 3.2).** About 5% score ≥10 and about 1% score ≥15. r = 0.64 with PHQ-2. Percentile tables by sex and age exist in the paper (not reproduced). [V] — [PubMed 18388841](https://pubmed.ncbi.nlm.nih.gov/18388841/)
- **PHQ-9, Kocalevent et al. 2013 (General Hospital Psychiatry, Sept 2013):** n = 5,018, German representative surveys 2003–2008, 53.6% women, mean age 48.9 (SD 18.1). **Women 3.1 (SD 3.5), men 2.7 (SD 3.5).** 5.6% had moderate-to-high severity. One-factor model. [V] — [QxMD abstract](https://read.qxmd.com/read/23664569/standardization-of-the-depression-screener-patient-health-questionnaire-phq-9-in-the-general-population). Volume and pages (35(5):551–555), authors (Kocalevent, Hinz, Brähler) and the DOI are [P].
  - Note: BMC Psychiatry 13:91 (Kocalevent, Hinz & Brähler 2013) is the **PHQ-15** paper, not the PHQ-9 one. It reports PHQ-9 α = 0.88 in that sample [V] — [BMC Psychiatry PHQ-15](https://bmcpsychiatry.biomedcentral.com/track/pdf/10.1186/1471-244X-13-91)
- **PSS-10, Cohen & Williamson 1988:** US Harris Poll sample, n = 2,387. Men (n = 926) 12.1 (SD 5.9); women (n = 1,406) 13.7 (SD 6.6); age 18–29: 14.2 (6.2), 30–44: 13.0 (6.2), 45–54: 12.6 (6.1), 55–64: 11.9 (6.9), 65+: 12.0 (6.3). [V] — [official PSS form](https://slu.edu/medicine/family-medicine/-pdf/perceived-stress-scale.pdf). The overall 13.02 (SD 6.35) used in the JSON is the figure usually cited [P]. Pooling the sex-specific rows gives 13.06 / 6.38, which agrees.
- **PSS-10 Russian (Ababkov 2016):** n = 175 (110 men, 65 women). On the 1–5 coding: total M = 24.44, SD = 6.58 (≈ 14.4 on the 0–40 scale). Subscales: overstrain 13.62 (2.75), coping 10.82 (4.29). α total 0.827 (subscales 0.838 / 0.673). 2-week retest r = 0.51. EFA found 2 factors explaining 57% of variance; item 6 loads on both. The paper has some inconsistencies (an implausible p = 0.85 for t = 1.387; an "M + σ = 30" cut-off that doesn't match the table). [V] — [Ababkov et al., 2016](https://dspace.spbu.ru/bitstream/11701/2551/1/Ababkov_Barishnikov_et_al.pdf)
- **PSS reliability:** a review found α > 0.70 in every PSS-10 study and judged the PSS-10 better than the PSS-14 and PSS-4. [P] — [Lee, 2012, Asian Nursing Research 6(4):121–127, doi:10.1016/j.anr.2012.08.004](https://doi.org/10.1016/j.anr.2012.08.004). Higher PSS scores were linked to failing to quit smoking and to more colds [V] — [PSS form](https://slu.edu/medicine/family-medicine/-pdf/perceived-stress-scale.pdf)
- **CBI PUMA reference values (official manual):** personal 35.9 (SD 16.5, n = 1,898); work 33.0 (SD 17.7, n = 1,910); client 30.9 (SD 17.6, n = 1,752). PUMA had 1,917 human-service workers, 83% women. Share scoring ≥50: personal 22.2%, work 19.8%, client 15.9%. [V] — [NFA CBI manual, 1st ed.](https://nfa.dk/media/hl5nbers/cbi-first-edition.pdf). The means match the secondary source [V] — [Embrace Autism](https://embrace-autism.com/copenhagen-burnout-inventory/). These are now in `burnout-cbi.json` → `dimensions[].norms`.
- **AQ-10 norms:** controls 2.77 (SD 2.00, n = 838); autistic adults 7.93 (SD 1.93, n = 449). [V] — [Allison et al., 2012](https://docs.autismresearchcentre.com/papers/2012_Allisonetal_JAACAP_RedFlags.pdf)

### Inferences
- **Percentile caveat:** GAD-7 and PHQ-9 population scores are heavily skewed to the right (mean about 3, SD about 3.4, ~5% at 10 or more). A normal-curve percentile from mean and SD will mislead. For example, a score of 0 would come out near the 19th percentile, when really a large share of people score 0. Better options: show "higher than X%" only for scores at or above the mean, use the published percentile tables (Löwe 2008, Kocalevent 2013) if the schema is extended, or label the percentile clearly as approximate (already done in `scoringNotes`).
- AQ-10 controls (2.77 ± 2.0) were volunteers recruited by ARC, so they're not a population sample. The percentile is only a rough comparison.
- The PSS norms come from the US in 1983. The Russian 0–40 equivalent mean of about 14.4 comes from a small convenience sample and is close to the US figure.

### Gaps
- I didn't verify Russian-population norms for PHQ-9, GAD-7, ASRS or AQ.
- ASRS: I didn't find population prevalence of screen-positive results in this session.

---

## 4. License terms (with URLs)

### Takeaway
**PHQ-9 and GAD-7:** free, no permission needed. **CBI:** free (distributed by NFA). **ASRS 6-item screener:** free without permission, but the 18-item checklist and ASRS-5 need permission. **PSS:** free for research and education; for commercial use, ask the CMU lab. **AQ/AQ-10:** **only research or clinical, non-commercial use; no adaptation without permission.** A public website needs written permission from ARC.

### Cited Findings
- **PHQ-9 / GAD-7:** the exact-phrase search "No permission required to reproduce, translate, display or distribute" returned many official PHQ-9/GAD-7 PDFs (e.g. [ND HHS PDF](https://www.hhs.nd.gov/sites/www/files/documents/BH/BHC/PHQ-9-and-GAD-7.pdf), [ANQ PDF](https://www.anq.ch/wp-content/uploads/2020/05/ANQrea_Questionnaires_PHQ-15_PHQ-9_GAD-7_NEU.pdf)). There is also a 2010 news item: [Pfizer announces unrestricted access to patient assessment aids](https://www.news-medical.net/news/20100723/Pfizer-announces-unrestricted-access-to-patient-assessment-aids-for-mental-disorders.aspx). [V for search hits; the documents themselves weren't opened]. The phqscreeners.com front page doesn't state the terms [V] — [phqscreeners.com](https://www.phqscreeners.com/)
- **ASRS:** "Use of the ASRS v1.1 6-question screener is free and does not require any formal permission or approval". Cite Kessler 2005 and include the copyright notice "Copyright © New York University and President and Fellows of Harvard College". **The 18-question Symptoms Checklist and the ASRS-5 6-question screener need a permission request.** The site "prefers that others link to its PDF rather than repost". Don't alter the items, the scoring or the shading. Commercial use isn't addressed. [V] — [Harvard NCS ASRS](https://www.hcp.med.harvard.edu/ncs/asrs.php)
- **AQ (ARC):** tests are "freely available to the research community or for clinicians … provided that they are used for research purposes and not for commercial use". Users must give "due acknowledgement of ARC as the source". "You may not adapt or modify any of these tests, unless permission has been given by the Autism Research Centre." Hosting on websites isn't addressed. Translations have separate terms. [V] — [ARC tests](https://www.autismresearchcentre.com/tests/)
- **PSS:** the form says "Copyright © 1994. By Sheldon Cohen. All rights reserved." and "Please feel free to use the Perceived Stress Scale for your research." It is reprinted with permission of the ASA [V] — [PSS form](https://slu.edu/medicine/family-medicine/-pdf/perceived-stress-scale.pdf). Mind Garden: "Download the PSS Form free of charge"; "Mind Garden does not publish the PSS"; it refers questions to Cohen's Laboratory for the Study of Stress, Immunity, and Disease [V] — [Mind Garden PSS](https://mindgarden.com/132-perceived-stress-scale)
- **CBI:** NFA hosts the questionnaire [V for the page title] — [NFA CBI](https://nfa.dk/da/Vaerktoejer/Sporgeskemaer/Sporgeskema-til-maaling-af-udbraendthed/Copenhagen-Burnout-Inventory-CBI). That it is free or in the public domain is widely reported, but I didn't read the exact NFA wording [P].
- **MBI:** copyrighted, sold by Mind Garden. Background only. [P]

### Inferences
- I chose **AQ-10** over AQ-50 because both are under the same ARC terms, the AQ-10 is shorter, NICE endorses it for adults, and it has a verified cut-off and norms. But the license is the bottleneck for both. Recommendation: email ARC for permission (web use plus Russian translation). If they refuse, hold the test back or replace it with an openly licensed autistic-traits measure. (One candidate is the CATI by English et al. 2021 in *Molecular Autism*. I did **not** verify it this session.)
- ASRS: launch with Part A, link to the official Harvard PDF, and request permission if Part B is wanted.
- PSS: if testik is commercial (ads or paid features), get written permission from the CMU lab. If it is non-commercial and educational, it fits the stated free use.

### Gaps
- I couldn't read the CMU PSS FAQ (binary .doc, proxy blocked), which states the lab's exact terms for commercial and web use.
- I didn't read NFA's exact license wording for the CBI.

---

## 5. Disclaimer text, crisis resources, and the PHQ-9 item-9 rule

### Takeaway
Every JSON carries a two-language `disclaimer`. It says the test is not a diagnosis and lists help resources: 112; Moscow 051 (8-495-051 from a mobile); children's helpline 8-800-2000-122; US 988; UK and Ireland Samaritans 116 123; findahelpline.com. PHQ-9 adds the item-9 crisis rule. **The numbers are only partly verified.** Check them before launch.

### Cited Findings
- **8-800-2000-122** (Детский телефон доверия — for children, teens and their parents; Фонд поддержки детей, находящихся в трудной жизненной ситуации) shows up in the titles of many official regional and school documents on gosuslugi.ru, e.g. "O Detskom telefone doveriya 8 800 2000 122". [V for the number's existence; free and anonymous status is P] — [gosuslugi PDF](https://sh10-elec-r42.gosweb.gosuslugi.ru/netcat_files/194/2909/O_Detskom_telefone_doveriya_8_800_2000_122.pdf); [Фонд поддержки детей leaflet](https://test-edu.tatar.ru/upload/storage/org4224/files/Фонд%20поддержки%20детей,%20находящихся%20в%20трудной%20жизненной%20ситуации.pdf)
- **051 from a landline / 8-495-051 from a mobile** (Moscow Psychological Emergency Phone, run by Московская служба психологической помощи населению): **24/7, free, confidential**, staffed by psychologists, for anyone (topics include anxiety, depression, suicide, self-harm, grief and abuse), covering Moscow and Moscow Province. [V] — [findahelpline.com listing](https://findahelpline.com/organizations/moscow-psychological-emergency-phone). The mos.ru page on emergency suicide-prevention help exists but its body wouldn't load — [mos.ru](https://www.mos.ru/otvet-ekstrennie-situacii/kak-poluchit-ekstrennuyu-suicidologicheskuyu-pomosch)
- **112, 911, 988 (US Suicide & Crisis Lifeline), Samaritans 116 123, findahelpline.com:** general knowledge, not checked this session [P].

### PHQ-9 item-9 rule (for developers)
- **Rule:** if the answer to `phq9-9` is above 0 ("Several days" or more), show a gentle crisis-help message on the results screen, above or next to the score, **whatever the total**. This is documented in the PHQ-9 `disclaimer`, `methodology` and `scoringNotes`.
- **Machine-readable flag (added at the coordinator's request):** question `phq9-9` carries `"crisisIfAtLeast": 1`. Front-end rule: if the raw answer value for any question with `crisisIfAtLeast` is at least that number, show the crisis message below. The field is an addition to SCHEMA.md and should be added to the schema as `crisisIfAtLeast?: number` on `questions[]`. The message text itself isn't in the JSON. It can live in site-wide i18n, or be added as a `crisisMessage: L` field.
- Suggested message text:
  - **RU:** «Вы отметили, что за последние две недели у вас бывали мысли о том, что лучше было бы умереть, или о том, чтобы причинить себе вред. Спасибо, что ответили честно — это непросто. Такие мысли — знак того, что вам сейчас очень тяжело, и вы не обязаны справляться с этим в одиночку. Пожалуйста, поговорите с кем-нибудь уже сегодня — с близким человеком, врачом или психологом. Если вы чувствуете, что можете не справиться с этими мыслями или вам небезопасно прямо сейчас, позвоните 112 или на линию психологической помощи: Москва — 051 (с мобильного 8-495-051), круглосуточно и бесплатно; для детей, подростков и родителей — 8-800-2000-122. В других странах — findahelpline.com.»
  - **EN:** "You mentioned that in the last two weeks you have had thoughts that you would be better off dead, or of hurting yourself. Thank you for answering honestly — that isn't easy. Thoughts like these are a sign that you are carrying a lot right now, and you don't have to carry it alone. Please talk to someone today — a person you trust, a doctor or a psychologist. If you feel you might not be able to stay safe with these thoughts, call 112 or a crisis line now: Moscow — 051 (from a mobile 8-495-051), 24/7 and free; children, teenagers and parents in Russia — 8-800-2000-122; US — 988; UK & Ireland — Samaritans 116 123; anywhere else — findahelpline.com."
- Clinical rationale: item 9 is a known safety item. Guidance from the developers and in clinical practice is to follow up any positive answer, whatever the total. A positive answer is not the same as acute risk. [P] — [Kroenke et al., 2001](https://doi.org/10.1046/j.1525-1497.2001.016009606.x)

### Inferences
- Each disclaimer also carries a test-specific sentence. **CBI:** burnout is an "occupational phenomenon" in ICD-11 (QD85), not a medical condition [P] — [WHO 2019](https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases). **PSS:** not diagnostic. **ASRS and AQ:** a screen is not a diagnosis, plus neurodiversity-affirming framing.
- Tone across all tests: warm and de-stigmatising, with no humour. Every high band gives concrete self-help steps and says when to see a specialist and which kind. Moderate and higher bands for PHQ-9, GAD-7, PSS and CBI point to the crisis lines.
- Neurodiversity-affirming choices for AQ: "autistic traits" and "autistic adults" (identity-first), autism described as a difference rather than a defect, masking and camouflaging acknowledged (especially in women), and a reminder that self-understanding is a valid goal. The emoji is ♾️ (the neurodiversity infinity symbol), not 🧩, because many autistic advocates reject the puzzle piece.

### Gaps
- 051 / 8-495-051 is now verified via findahelpline. 112, 988, 116 123 and the free and anonymous status of 8-800-2000-122 come from general knowledge and weren't checked against primary sites.
- I didn't verify a federal adult crisis line for all of Russia. Consider adding one after checking.
