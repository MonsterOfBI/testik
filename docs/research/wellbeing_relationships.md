# Wellbeing / Self / Relationship tests for testik: scientific basis, open items, scoring, norms

Six test definitions were written to `/home/user/research_notes/Научная база тестов для сайта/tests/`:
`self-esteem.json`, `life-satisfaction.json`, `attachment-style.json`, `empathy.json`, `emotional-intelligence.json`, `grit.json`.
All six parse with `node -e "JSON.parse(...)"`. They also pass a structural check: bands are contiguous and cover [min,max], 3–5 summary bullets per band, every question maps to a dimension, facet ids exist, outcome profiles use real dimension ids, and min/max match items × answer range.

Method caveat: the shared WebFetch budget ran out twice during this session, and direct `curl` to ipip.ori.org / openpsychometrics.org was refused by the egress proxy (403). A few facts (noted as such below) are therefore taken from the original papers as I know them, or from secondary summaries such as Testable/PsyToolkit, rather than re-read from the primary source.

## 1. `self-esteem`: Rosenberg Self-Esteem Scale (RSES)

### Takeaway
The RSES is in the public domain. The site uses 10 items on a 4-point scale with 1–4 coding, giving a total of 10–40, the same metric as the 53-nation norm (M = 30.85, SD = 4.82, N = 16,998). The Russian wording follows Zolotareva (2020) with light edits.

### Cited Findings
- **License:** the UMD Sociology Department, which holds Rosenberg's materials, says the scale "is now in the public domain, meaning you may use it without charge". No notice to the department is needed, and the permission covers translations and adaptations — [UMD: Using the RSES](https://socy.umd.edu/about-us/using-rosenberg-self-esteem-scale)
- **Format and scoring:** 10 items rated on a 4-point scale from strongly agree to strongly disagree. Items 1, 2, 4, 6, 7 are positively keyed and items 3, 5, 8, 9, 10 reverse-keyed, using UMD's own item order. With 0–3 coding the range is 0–30; with 1–4 coding it is 10–40 — [UMD](https://socy.umd.edu/about-us/using-rosenberg-self-esteem-scale)
  - Note: UMD's item order differs from the common order used by Zolotareva and by the site, where the negatively worded items are 2, 5, 6, 8, 9. The JSON uses the common order: 1 satisfied, 2 no good, 3 good qualities, 4 as well as others, 5 not much to be proud of, 6 useless, 7 person of worth, 8 more respect, 9 failure, 10 positive attitude. Reverse items are 2, 5, 6, 8, 9. Keying was checked against item content.
- **Norms (10–40 metric):** the cross-national grand mean is 30.85 (SD 4.82), N = 16,998, across 53 nations and 28 languages. The US mean is 32.21 (SD 5.01). Every nation scored above the midpoint of 25, and Japan was lowest at 25.50. Negatively worded items behave differently across cultures — [Testable summary of Schmitt & Allik 2005](https://www.testable.org/scale/rses-rosenberg-self-esteem-scale); [APA Monitor 2005](https://www.apa.org/monitor/dec05/cultures)
- **Reliability:** the mean α across nations is .81 (range .45 to about .90). A US college sample gave α = .88 (Robins et al., 2001). Two-week test–retest was r = .85 (Silber & Tippett, 1965) — [Testable](https://www.testable.org/scale/rses-rosenberg-self-esteem-scale)
- **Validity:** in nearly all nations, self-esteem correlated negatively with neuroticism and positively with extraversion — [APA Monitor](https://www.apa.org/monitor/dec05/cultures)
- **Russian adaptation:** Золотарева А. А. (2020). «Валидность и надежность русскоязычной версии шкалы самооценки М. Розенберга». *Вестник Омского университета. Серия Психология*, (2), 52–57. DOI 10.24147/2410-6364.2020.2.52-57.
  - Sample: N = 213 students aged 16–24. α = .82.
  - 0–3 coding; reverse items 2, 5, 6, 8, 9.
  - Women scored lower than men (t = 4.87). Self-esteem correlated with age (r = .37).
  - The paper reports no total-score M/SD and no retest; its cut-off is ≤15 on the 0–30 metric.
  - The full Russian item text is in its appendix — [HSE PDF](https://publications.hse.ru/pubs/share/direct/383400468.pdf)

### Inferences
- **Bands used:** 10–25 low (at or below the midpoint, about the 15th percentile), 26–30 moderate/fragile, 31–35 healthy, 36–40 high (about the 86th percentile and above). These are interpretive bands built on the norms and the midpoint. They are not official cut-offs; none exist.
- The 53-nation norms are mostly student samples. Since Russian self-esteem norms on 10–40 are not published, the international norm is the best available reference.

### Gaps
- No published Russian M/SD for RSES totals was found (Zolotareva 2020 gives only α and group comparisons).
- The exact Schmitt & Allik figures (30.85 / 4.82) come from Testable's summary of the paper. I could not open the JPSP PDF itself because the fetch budget was exhausted.

## 2. `life-satisfaction`: Satisfaction With Life Scale (SWLS)

### Takeaway
The SWLS is free to use with credit. It has 5 items on a 1–7 scale, no reverse items, and a sum of 5–35. It ships with Diener's official six interpretation bands, and the percentile uses a large Russian norm (Osin & Leontiev 2020: M = 20.81, SD = 6.24, N = 5,054).

### Cited Findings
- **License:** "The scale is copyrighted but you are free to use it without permission or charge by all professionals (researchers and practitioners) as long as you give credit to the authors of the scale: Ed Diener, Robert A. Emmons, Randy J. Larsen and Sharon Griffin" — [Diener lab SWLS page](https://labs.psychology.illinois.edu/~ediener/SWLS.html)
- **Population norms on a 5-point version:** Diener's page refers to Kobau et al. (2010), *Applied Psychology: Health and Well-Being*, 2(3), 272–297 — [Diener lab](https://labs.psychology.illinois.edu/~ediener/SWLS.html)
- **Russian items and anchors:** Осин Е. Н., Леонтьев Д. А. (2020). «Краткие русскоязычные шкалы диагностики субъективного благополучия…». *Мониторинг общественного мнения*, (1), 117–142. DOI 10.14515/monitoring.2020.1.06 — [HSE PDF](https://publications.hse.ru/pubs/share/direct/345577179.pdf)
  - Items: «В основном моя жизнь близка к идеалу» … «Если бы мне пришлось жить еще раз, я бы оставил все как есть».
  - Anchors run from 1 «Полностью не согласен» to 7 «Полностью согласен».
- **Russian norms (same paper):** N = 5,054, M = 20.81, SD = 6.24, skew −0.13, quartiles 16 and 25. Men 19.69 (6.36), women 20.85 (5.99), d = 0.19.
  - α = .82, ω = .82. One-factor CFA: CFI = .995, RMSEA = .041.
  - Sample: convenience (psychology-website visitors, students, volunteers); 70% women; mean age 23.3.
  - Suggested guides: ≤16 low, ≥25 high — [HSE PDF](https://publications.hse.ru/pubs/share/direct/345577179.pdf)
- **Facts used from the original paper and reviews (from my knowledge of the papers; not re-fetched this session):**
  - Diener et al. (1985, *J Pers Assess* 49(1), 71–75): N = 176 undergraduates, M = 23.5, SD = 6.43, α = .87, 2-month retest r = .82.
  - Pavot & Diener (1993, *Psychol Assess* 5(2), 164–172): α typically .79–.89.
  - Official interpretation bands from "Understanding Scores on the SWLS": 30–35 highly satisfied, 25–29 high, 20–24 average, 15–19 slightly below average, 10–14 dissatisfied, 5–9 extremely dissatisfied, 20 = neutral. These are linked from the [Diener lab page](https://labs.psychology.illinois.edu/~ediener/SWLS.html) as "Understanding the SWLS scores.pdf", but the PDF itself was not retrievable this session.

### Inferences
- The Russian norm sits right in Diener's "average" band (20–24), so the band texts and the percentiles agree.
- A disclaimer with Russian and international helplines was added because the lowest band can show up alongside depression.

### Gaps
- The interpretation bands and the 1985 descriptives should be checked against the Diener PDF before publishing.
- No representative Russian norms exist; Osin & Leontiev say so themselves.

## 3. `attachment-style`: ECR-R (Fraley, Waller & Brennan, 2000)

### Takeaway
All 36 ECR-R items and the scoring key are posted openly by R. C. Fraley. The site uses 18 anxiety and 18 avoidance items on a 1–7 scale, each scored as a mean. Norms are M = 3.64 / 2.93 (SD 1.33 / 1.18) from more than 22,000 online takers. The four styles are produced with `profile` outcomes at the corners (0.25/0.75), which is the same as splitting each axis at the midpoint of 4. Fraley himself advises against categorising, and this is disclosed in the methodology.

### Cited Findings
- **Items and keying:** items 1–18 are anxiety (reverse 9, 11) and items 19–36 are avoidance (reverse 20, 22, 26, 27, 28, 29, 30, 31, 33, 34, 35, 36). There is a 7-point scale and the instructions say "how you generally experience relationships, not just … current relationship". Scores are means after reverse-keying.
  - The page allows randomising item order and changing the target (e.g., "mother").
  - The page gives no license or copyright text — [Fraley: ECR-R items](https://labs.psychology.illinois.edu/~rcfraley/measures/ecrritems.htm)
- **Norms:** more than 22,000 online takers, 78% female, mean age 24 (SD 10), 15% married. Avoidance M = 2.93 (SD 1.18); anxiety M = 3.64 (SD 1.33).
  - Male and female values are nearly identical. Predicted by age: anxiety 3.67 at age 20 down to 3.23 at 60; avoidance 2.90 up to 3.18. The two scales correlate r = .41.
  - α is typically ≥ .90.
  - Fraley "strongly recommend[s] against" categorising people into the four styles and advises treating the dimensions as continuous — [Fraley: ECR-R norms/info](https://labs.psychology.illinois.edu/~rcfraley/measures/ecrr-oldernorms.htm)
- **Russian adaptations:**
  - Казанцева Т. В. (2008). «Адаптация модифицированной методики "Опыт близких отношений" К. Бреннан и Р. К. Фрейли». *Известия РГПУ им. Герцена*, 74-2, 139–143 — [Herzen PDF](https://lib.herzen.spb.ru/media/magazines/contents/1/34(74)2/kazantseva_34_74_2_139_143.pdf)
  - ECR-R-14: Чистопольская, Митина, Ениколопов и др. (2018), *Психологический журнал* № 5
  - Чурсина (2022), *Вопросы психологии* № 1
  - All three are listed at [psytests.org ECR-R](https://psytests.org/family/ecrr.html). No Russian norms were reported there.
- **Background references (well-known, from my knowledge; not fetched):** Bartholomew & Horowitz (1991), JPSP 61(2), 226–244 (four-category model); Hazan & Shaver (1987), JPSP 52(3), 511–524; Brennan, Clark & Shaver (1998), in Simpson & Rholes (Eds.), *Attachment Theory and Close Relationships*; Sibley, Fischer & Liu (2005), PSPB 31(11), 1524–1536 (reliability and validity).

### Inferences
- **License status:** freely published by the author and widely used without fees, but not formally public domain. Keep the attribution, and confirm with Fraley if testik is monetised.
- The Russian items are a fresh translation, because Kazantseva's item text could not be checked.
- The per-dimension bands (<2.5, 2.5–3.99, 4–5.49, ≥5.5) let users see their anxiety and avoidance levels separately from the style label.
- **Style classification:** in a normalised 0–1 space, nearest-profile matching to (0.25, 0.25), (0.75, 0.25), (0.25, 0.75), (0.75, 0.75) gives exactly the quadrant split at raw 4.0.
  - With the norms (avoidance mean 2.93), most users will land in "secure" or "preoccupied", which matches the observed distribution.

### Gaps
- Fraley's norms page has internal inconsistencies in its age-regression equations (flagged on the page itself). Only the overall M/SD are used.
- No published Russian ECR-R norms (M/SD) were found.

## 4. `empathy`: Toronto Empathy Questionnaire (TEQ)

### Takeaway
The TEQ has 16 items on a 0–4 frequency scale. Reverse items are 2, 4, 7, 10, 11, 12, 14, 15, and the sum ranges 0–64. α = .85–.87 and retest r = .81. The sex-balanced Study 1 norm (M = 44.54, SD = 7.70, N = 200 undergraduates) is used for the percentile. There is no published Russian adaptation, so the site uses its own translation.

### Cited Findings
- **Items and scoring:** all 16 items are printed verbatim in Spreng et al. (2009) with anchors Never (0) to Always (4). Positive items are 1, 3, 5, 6, 8, 9, 13, 16; reverse items are 2, 4, 7, 10, 11, 12, 14, 15. The score is the total sum — [Spreng et al. 2009, PDF via SciSpace](https://scispace.com/pdf/the-toronto-empathy-questionnaire-scale-development-and-3xdquisj4z.pdf)
- **Descriptives (same paper):**

  | Study | N | M (SD) | Men M (SD) | Women M (SD) |
  |---|---|---|---|---|
  | 1 | 200 | 44.54 (7.70) | 44.45 (8.19) | 44.62 (7.22) |
  | 2 | 79 | 47.27 (7.48) | 43.46 (7.79) | 48.93 (6.77), d = .73 |
  | 3 | 65 | 46.95 (7.47) | 43.63 (7.93) | 48.33 (6.90), d = .63 |

  - Participants were University of Toronto undergraduates with a mean age of about 18.8 — [same PDF](https://scispace.com/pdf/the-toronto-empathy-questionnaire-scale-development-and-3xdquisj4z.pdf)
- **Reliability and validity:**
  - α = .85, .85, .87; retest r = .81 over about 66 days (N = 65).
  - r = .80 with the Empathy Quotient; r ≈ −.30 to −.33 with the Autism-Spectrum Quotient.
  - r = .35 with Reading the Mind in the Eyes; r = .23 with the Interpersonal Perception Task-15 — [same PDF](https://scispace.com/pdf/the-toronto-empathy-questionnaire-scale-development-and-3xdquisj4z.pdf)
- **License:** the paper contains no permission or licensing statement — [same PDF](https://scispace.com/pdf/the-toronto-empathy-questionnaire-scale-development-and-3xdquisj4z.pdf)
- **Russian:** psytests.org offers a Russian TEQ but states «Сведений об адаптации опросника нет» (there is no information about an adaptation) — [psytests.org TEQ](https://psytests.org/eq/teq.html)
- **Other language validations exist:** Czech — [PMC8156475](https://pmc.ncbi.nlm.nih.gov/articles/PMC8156475); Chinese medical students — [PMC7199516](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7199516/)

### Inferences
- **License status:** the items are published openly and used freely in research and clinical work, but no formal licence exists. Cite the paper, and ask Spreng before any commercial use.
- **Bands:** 0–36 (below −1 SD), 37–44, 45–52, 53–64 (above +1 SD). These are interpretive only; no official cut-offs exist.

### Gaps
- No Russian validation and no norms for older adults or non-students.
- No explicit licence statement from the authors.

## 5. `emotional-intelligence`: why TEIQue-SF was rejected, and the IPIP EI scales (Barchard, 2001)

### Takeaway
The TEIQue-SF (Petrides) is free only for academic research and bans commercial or quasi-commercial use, so it is not suitable for a public website. The site instead uses Kim Barchard's seven public-domain IPIP scales of potential EI components: 68 items on a 1–5 scale, each scale scored as a mean. The TEIQue facets (well-being, self-control, emotionality, sociability) cannot be replicated openly. Barchard's scales cover the "emotionality" side: perceiving, expressing and resonating with emotions, plus empathy. No open norms were found, so no percentile is shown.

### Cited Findings
- **TEIQue terms:**
  - "All TEIQue forms, versions, and translations are available free of charge for academic research purposes only."
  - "Commercial or quasi-commercial usage of any TEIQue instrument … is strictly prohibited."
  - Survey platforms and other uses need permission from admin@teique.com — [psychometriclab: Obtaining the TEIQue](https://old.psychometriclab.com/obtaining-the-teique/)
- **IPIP EI items:** the IPIP page "The Items in Each of the IPIP Scales Measuring Seven Components Potentially Related to 'Emotional Intelligence' (Barchard, 2001)" gives verbatim, +/− keyed items for attending to emotions (10 items), emotion-based decision-making (9), and the expressivity, responsive joy/distress and empathic concern items — [IPIP EI key](http://ipip.ori.org/newEmotionalIntelligenceKey.htm)
  - The page groups items under headings that the fetch tool rendered ambiguously. Positive Expressivity is listed with α = .81 (women) and .79 (men), and Responsive Joy with α = .73 and .70.
- **The seven scales:** Barchard's UNLV page lists them as Responsive Joy, Responsive Distress, Empathic Concern, Positive Expressivity, Negative Expressivity, Attending to Emotions and Emotion-Based Decision-Making, all available at the IPIP URL — [Barchard: psychological measures](https://barchard.faculty.unlv.edu/research/psychological-measures/)
- **Russian adaptation:** Князев Г. Г., Митрофанова Л. Г., Разумникова О. М. (2012). «Адаптация русскоязычной версии Опросника эмоционального интеллекта К. Барчард». *Психологический журнал*, № 4. It covers seven components built from IPIP items. The page shows no items, norms or reliability — [psytests.org Barchard EI](https://psytests.org/eq/eis.html); also listed on [Barchard's page](https://barchard.faculty.unlv.edu/research/psychological-measures/)
- **IPIP licence:** IPIP is public domain. Goldberg et al. (2006), *J Res Pers* 40, 84–96, describe the pool as free for any use. I know this from the IPIP site and the paper; ipip.ori.org was not reachable by curl this session.

### Inferences
- **How the items were split:** the fetched IPIP page merged blocks, so the JSON splits them by content.
  - Positive Expressivity (9): 6 positive-keyed and 3 negative-keyed items about affection and joy
  - Negative Expressivity (10): anger, fear and sadness display
  - Responsive Joy (10)
  - Responsive Distress (10)
  - Empathic Concern (10)
  - Attending (10)
  - Decision-making (9)
  - The split is internally consistent and item keying follows the IPIP +/− marks, but the scale membership should be checked against the IPIP page before launch.
- **Item text:** IPIP items are verb phrases ("Notice my emotions."), and the JSON prefixes "I …" for the English display. IPIP allows edits.
- **Bands and reporting:** fixed bands on the 1–5 metric (≤2.39 low, 2.4–3.59 medium, ≥3.6 high). No total EI score, because several scales are bipolar styles rather than "more is better" (e.g., decision-making = heart vs head).

### Gaps
- No open norms (M/SD) for Barchard's IPIP scales were found, so no percentiles.
- Exact alphas for five of the seven scales were not retrieved.
- An open alternative covering TEIQue-style self-control and well-being was not built. The site's self-esteem and life-satisfaction tests partly cover those.

## 6. `grit`: Short Grit Scale (Grit-S)

### Takeaway
The Grit-S has 8 items on a 1–5 scale. The consistency-of-interest items (1, 3, 5, 6) are reverse-scored. The overall score is the mean of all 8 items, plus two 4-item facet means, modelled as `grit` with facets `consistency` and `perseverance`. The norm is adults M = 3.4, SD = 0.7, N = 1,554. Use is free for non-commercial research, education and self-reflection only, so if testik is monetised it needs permission or an IPIP replacement.

### Cited Findings
- **Items and scoring:** the 8 items are given verbatim. Total = mean of all 8; consistency = items 1, 3, 5, 6; perseverance = items 2, 4, 7, 8.
  - The anchors run "Very much like me" to "Not like me at all".
  - Age means from Duckworth & Quinn (2009, Table 3): 25–34: 3.2; 35–44: 3.2; 45–54: 3.4; 55–64: 3.5; 65+: 3.7; total 3.4. Total-sample facet means: consistency 2.9, perseverance 3.7. The sample was about 80% women — [PsyToolkit Grit-S](https://psytoolkit.org/survey-library/grit-short.html)
- **Norms:** adults N = 1,554, M = 3.4, SD = 0.7 (Table 3). Adolescents M = 3.4 (SD 0.8); spelling-bee finalists M = 3.4 (SD 0.8). Testable calls these descriptive rather than normative — [Testable Grit-S](https://www.testable.org/scale/grit-s-short-grit-scale)
- **Reliability:** total α = .73–.83; perseverance α = .60–.78; consistency α = .73–.79. One-year retest r = .68 in adolescents. Meta-analytic mean α = .79 across 46 samples (Credé et al., 2017) — [Testable](https://www.testable.org/scale/grit-s-short-grit-scale)
- **License:** copyrighted by Duckworth and colleagues. Free for "non-commercial research, educational, and self-reflection purposes" with no fees or individual permission; other uses need permission — [Testable](https://www.testable.org/scale/grit-s-short-grit-scale)
  - I could not confirm this directly on angeladuckworth.com because the fetch budget was exhausted.
  - PsyToolkit's own summary: usable for research with acknowledgement — [PsyToolkit](https://psytoolkit.org/survey-library/grit-short.html)
- **Russian evidence:** Tyumeneva, Kuzmina & Kardanova (2014), HSE WP BRP 24/PSY/2014 — [HSE PDF](https://www.hse.ru/data/2014/11/19/1101023281/24PSY2014.pdf); [RePEc](https://ideas.repec.org/p/hig/wpaper/24psy2014.html)
  - Version and sample: the 12-item Grit-O (not the Grit-S) with N = 3,383 ninth-graders.
  - Results: consistency α = .76, perseverance α = .84, subscale r = .24. The authors argue against a single total score.
  - Wording: three items were reworded, and the paper does not print the Russian text.
- **Validity (well-known, from my knowledge of the papers; not fetched):**
  - Duckworth & Quinn (2009) abstract: Grit-S predicted educational attainment and fewer career changes in adults, GPA in adolescents, West Point retention and Spelling Bee advancement.
  - Credé et al. (2017, JPSP 113(3), 492–511): grit overlaps strongly with conscientiousness and predicts performance only modestly; perseverance predicts better than consistency.
  - PubMed record of the Grit-S paper: [PubMed 19205937](https://pubmed.ncbi.nlm.nih.gov/19205937/)

### Inferences
- No published Russian Grit-S adaptation was found, so the Russian wording is the site's own translation.
- Given the Russian finding that the facets correlate only weakly, the site shows facet bands alongside the overall score.
- **Bands for the overall mean:** <2.75, 2.75–3.49, 3.5–4.24, ≥4.25, which is about ±1 SD around M = 3.4.
- **Facet bands:** <2.5, 2.5–3.74, ≥3.75. Facets have no norms because SDs were not available.

### Gaps
- Facet SDs are missing, so there is no facet percentile.
- The licence terms should be confirmed on angeladuckworth.com and checked against testik's business model.
- **Fallback if monetised:** a public-domain IPIP perseverance or industriousness scale. Its items could not be pulled this session because ipip.ori.org was blocked by the proxy.
