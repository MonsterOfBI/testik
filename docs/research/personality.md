# Personality tests for testik: scientific basis, open-licensed items, scoring and norms (big-five, temperament, jungian-types, hexaco, dark-triad)

Deliverables (all validated with `node JSON.parse` plus a schema check: contiguous bands, item counts match ranges, bilingual strings, outcome profile and compatibility ids):

| id | file | items | scale | dimensions | outcomes | licence of items | norms |
|---|---|---|---|---|---|---|---|
| big-five | `tests/big-five.json` | 120 IPIP-NEO-120 | 1–5 | 5 domains (24–120) + 30 facets (4–20), linked via `facets` | none | public domain (IPIP) | published: Kajonius & Johnson 2019, N = 320,128 |
| temperament | `tests/temperament.json` | 48 (the IPIP-NEO-120 E and N items) | 1–5 | E, N (24–120) | 4 temperaments (nearest profile, split at population mean) | public domain (IPIP) | published: same as big-five E and N |
| jungian-types | `tests/jungian-types.json` | 40 IPIP Big-Five Factor Markers (E, Intellect, A, C) | 1–5 | E/I, S/N, T/F, J/P (10–50) | 16 types, original names | public domain (IPIP) | computed by testik from an open dataset, N = 19,607 |
| hexaco | `tests/hexaco.json` | 60 IPIP-HEXACO (10 per factor) | 1–7 | H, E, X, A, C, O (10–70) | none | public domain (IPIP) | computed by testik from an open dataset, N = 21,643 |
| dark-triad | `tests/dark-triad.json` | 27 SD3 | 1–5 | Mach, Narc, Psych (sum 9–45 = mean × 9) | none | **copyrighted, no open licence; permission needed for commercial use** | published: Jones & Paulhus 2014 Table 3, pooled by testik |

Build scripts (Python, regenerate the JSON): `/tmp/claude-0/-home-user/ead60077-fab3-50f6-a4af-d6aa3f9985ec/scratchpad/build/personality/` (`build_*.py`, `bf_items.py`, `bf_domains.py`, `bf_facets.py`, `jung_types.py`, `common.py`). The derived statistics come from files in `/tmp/claude-0/-home-user/ead60077-fab3-50f6-a4af-d6aa3f9985ec/scratchpad/gh/` (`big5_norms.json`, `hx_selected.json`).

Research-environment caveat: the proxy blocked ipip.ori.org, openpsychometrics.org/_rawdata, crossref, Europe PMC and web.archive.org for curl. WebFetch reached the ipip.ori.org home page and the OEJTS pages, but the session's WebFetch budget then ran out. Item text was therefore taken from mirrors (an npm package, GitHub mirrors of the Open-Source Psychometrics codebooks) and cross-checked as described below.

---

## Big Five (IPIP-NEO-120): exact items, keying, scoring, reliability, norms, licence

### Takeaway
The IPIP-NEO-120 is public domain, including for commercial use. It is well validated: domain α ≈ .81–.90, and domains correlate .76–.87 with the NEO PI-R. Kajonius & Johnson (2019) provide published norms for all 5 domains and 30 facets on the same raw scale (facet = sum of 4 items, 4–20). This is the strongest test in the set.

### Cited Findings
- The IPIP home page states: "The items and scales are in the public domain, which means that one can copy, edit, translate, or use them for any purpose", without asking permission or paying a fee — [IPIP](https://ipip.ori.org/). The Item Response Warehouse rights register quotes the full sentence and rules IPIP "ship" — [IRW register](https://github.com/ben-domingue/irw/blob/main/itemtext/instrument_rights_register.csv)
- Citation: Johnson, J. A. (2014). Measuring thirty facets of the Five Factor Model with a 120-item public domain inventory: Development of the IPIP-NEO-120. *J. Research in Personality, 51*, 78–89, doi:10.1016/j.jrp.2014.05.003. Samples: development N = 21,588 (Internet; 7,859 men, 13,729 women; M age 26.2); validation N = 619,150 (Internet; M age 25.2); 481–501 Eugene-Springfield community participants for NEO PI-R correlations; 160 acquaintance-rated participants. It "has been freely distributed since its construction in October, 2000." — [Johnson 2014 PDF](https://bpb-us-e1.wpmucdn.com/sites.psu.edu/dist/1/163537/files/2023/07/IPIPNEO120.pdf)
- Johnson 2014, validation sample α: N .90, E .89, O .81, A .86, C .90. Facets range .63 (O6 Liberalism) to .88 (C6 Cautiousness). Correlations with the NEO PI-R: N .87, E .85, O .84, A .76, C .80. Facets range .53–.76, mean .66, ≈ .91 corrected for attenuation. No test-retest was reported — [Johnson 2014](https://bpb-us-e1.wpmucdn.com/sites.psu.edu/dist/1/163537/files/2023/07/IPIPNEO120.pdf)
- **Norms used:** Kajonius, P. J., & Johnson, J. A. (2019). *Europe's J. Psychology, 15*(2), 260–275, doi:10.5964/ejop.v15i2.1671. CC BY 4.0. N = 320,128 US online volunteers (40% male; M age 28.1, SD 10.1). Facet = sum of 4 items (4–20). Domain = mean of its 6 facet sums. Table A1 (M/SD/α): N 11.10/2.66/.90; E 13.69/2.36/.89; O 13.71/2.06/.82; A 14.87/2.01/.85; C 14.95/2.34/.90, plus all 30 facets (e.g. N1 12.07/3.77, C6 13.68/4.09). Mean facet α = .78; 4 facets fall below .70. Raw data are freely available (PsychArchives doi 10.23668/psycharchives.2448) — [Kajonius & Johnson 2019 (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC7871748)
- Item wording, order and keying come from the MIT-licensed npm package `@alheimsins/b5-johnson-120-ipip-neo-pi-r` v6.0.13, which mirrors ipip.ori.org/30FacetNEO-PI-RItems.htm. Answer anchors are Very Inaccurate / Moderately Inaccurate / Neither Accurate Nor Inaccurate / Moderately Accurate / Very Accurate, scored 1–5, and "minus"-keyed items are scored 5→1. The package also contains a community Russian translation, which was used only as a reference — [GitHub: Alheimsins/b5-johnson-120-ipip-neo-pi-r](https://github.com/Alheimsins/b5-johnson-120-ipip-neo-pi-r)
- 55 of the 120 items are reverse-keyed (count from the package key).
- Two Russian IPIP-NEO pages exist on psytests.org (IPIP-NEO-120 and IPIP-NEO-300 in Russian). They are online test sites, not peer-reviewed validations — [psytests IPIP-NEO-120 RU](https://psytests.org/bigfive/ipipneo120ru.html)
- The Russian BFI-2 (Kalugin et al., 2021, hosted by Colby College) appeared in search. The BFI/BFI-2 are "for non-commercial uses only" according to the Berkeley Personality Lab clause quoted in the IRW register, so they are not an option — [Kalugin et al. 2021 PDF](https://www.colby.edu/wp-content/uploads/2021/06/Kalugin_et_al_2021.pdf); [IRW register](https://github.com/ben-domingue/irw/blob/main/itemtext/instrument_rights_register.csv)

### Inferences
- In the JSON, questions point to **facet** ids. A domain score must be computed as the sum of its 6 facets (24 items, 24–120). Its norms are the published domain values × 6 (exact for a linear transform): N 66.6/15.96, E 82.14/14.16, O 82.26/12.36, A 89.22/12.06, C 89.7/14.04.
- Domain bands cut at the 10th/30th/70th/90th percentiles of the norms (normal approximation). Facet bands cut at the 30th/70th. Percentiles assume normality; some facets are skewed (e.g. A2 Morality and A3 Altruism have means near 16.7 out of 20), so tail percentiles there are approximate.
- The Russian translation is new (written for testik and checked against the community translation). O6 Liberalism items refer to US "liberal/conservative" voting; they are translated literally and flagged in the methodology.

### Gaps
- No peer-reviewed, openly available Russian adaptation of the IPIP-NEO-120 was found. psytests.org pages are not validation studies, and the Kalugin et al. paper concerns the BFI-2 (from the title and host; not read).
- The WebFetch summary of Kajonius & Johnson described the anchors as 1 = "almost never" to 5 = "almost always". This conflicts with the standard IPIP accuracy anchors and was not re-checked; the standard IPIP anchors are used.
- No test-retest reliability for the IPIP-NEO-120 was found in the sources read.

---

## Temperament (four temperaments via Eysenck's E × N): items, lie scale, norms, history, licence

### Takeaway
Eysenck's EPI/EPQ items are commercial and copyrighted, and no verified IPIP "EPQ proxy" item list could be retrieved. The test therefore uses the 48 public-domain IPIP-NEO-120 Extraversion and Neuroticism items, which keeps exact published norms. Temperament is the E × N quadrant relative to the **population means**. No open lie scale exists, so none is included.

### Cited Findings
- The EPI (Eysenck & Eysenck, 1964/1968) is sold by the publisher EdITS. IRW lists it as "hold" (a named commercial test with no grant located) — [IRW register](https://github.com/ben-domingue/irw/blob/main/itemtext/instrument_rights_register.csv)
- The best-known social-desirability scale, Paulhus's BIDR-6, carries the clause "This version may be used for non-commercial purposes only, that is, pure research" (quoted from Paulhus's site via IRW) — [IRW register](https://github.com/ben-domingue/irw/blob/main/itemtext/instrument_rights_register.csv)
- E and N norms (24–120 sum, converted from Kajonius & Johnson 2019 Table A1): E M = 82.14, SD = 14.16 (α .89); N M = 66.6, SD = 15.96 (α .90); N = 320,128 — [Kajonius & Johnson 2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC7871748)
- The Russian textbook framing (Eysenck's circle, the Hippocrates–Galen–Kant–Wundt–Pavlov lineage, Pavlov's strength/balance/mobility types mapped to the four temperaments) is standard content of Ильин «Психология индивидуальных различий» (2004) and Гиппенрейтер «Введение в общую психологию» (1988). Historical claims in the methodology rest on these textbooks and on Eysenck (1947, 1967) and Eysenck & Eysenck (1975, 1985). They were **not fetched online** in this session (no URL).

### Inferences
- Nearest-profile targets: on the normalised 0–1 scale, the population means are E 0.606 and N 0.444. Targets are mean ± 1 SD: E 0.753/0.458, N 0.610/0.277. Because the targets are symmetric, the type boundaries fall exactly at the population means. A simulation confirmed this: all-neutral answers give E = 72 (below the mean) and N = 72 (above the mean), so the result is melancholic.
- The quadrant adjectives in the outcome texts follow Eysenck's well-known circle (e.g. sanguine: "sociable, outgoing, talkative, responsive, easy-going, lively, carefree, leadership"). These are scientific descriptors, not protected text.
- Compatibility hints are labelled as heuristics. The only research anchor cited is that a partner's low N relates to relationship satisfaction (Malouff et al., 2010, J. Res. Pers. 44, 124–127, doi 10.1016/j.jrp.2009.09.004). This was cited from memory and **not fetched**.
- IPIP-NEO Extraversion includes warmth and cheerfulness facets, while Eysenck's E stressed sociability plus impulsivity. The two are close but not identical; this is stated in the methodology.

### Gaps
- The IPIP site's page of scales keyed to EPQ constructs could not be reached (ipip.ori.org scale pages were blocked by the proxy, and search did not return it). Whether IPIP has EPQ-R proxy scales, and their items, remains unverified.
- No public-domain lie or social-desirability scale was found (BIDR is non-commercial; the Marlowe–Crowne licence was not checked).
- The Russian EPI adaptation history (e.g. who adapted it and when) was not researched.

---

## Jungian 16 types: which open instrument, licence, items, scoring, norms

### Takeaway
The OEJTS is **CC BY-NC-SA 4.0 (non-commercial)**, so it is unsuitable for a commercial site. The test instead implements McCrae & Costa's (1989) finding that the four type indices are aspects of Big Five E, O, A and C, scored with 40 public-domain IPIP Big-Five Factor Markers. Norms and cut-offs (the sample means) come from an open dataset of 19,607 people. Type names are original.

### Cited Findings
- The OEJTS development page says the OEJTS items and page content are "licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License". It reports no α, retest or MBTI-agreement statistics; items were crowdsourced from about 2,230 people and screened on 25,568 participants — [OEJTS development](http://openpsychometrics.org/tests/OEJTS/development/)
- The OEJTS main page names version 1.2 and says only that a comparison found it "the most accurate" of several free MBTI alternatives. It states no licence and says the test "has 60 items in two sections" — [OEJTS](https://openpsychometrics.org/tests/OEJTS/)
- The npm package `@openmbti/core` (MIT licence for its code) ships a 32-item bipolar OEJTS 1.2 form scored 8–40 per dimension with cut-off 24. Its MIT licence does not override the item licence — [@openmbti/core README](https://cdn.jsdelivr.net/npm/@openmbti/core@1.0.1/README.md)
- IRW blocks another openpsychometrics instrument (OSRI) on the same CC BY-NC-SA clause, so the same reasoning applies to the OEJTS — [IRW register](https://github.com/ben-domingue/irw/blob/main/itemtext/instrument_rights_register.csv)
- McCrae & Costa (1989), J. Personality 57(1), 17–40, doi 10.1111/j.1467-6494.1989.tb00759.x. N = 267 men and 201 women. They found "no support for the view that the MBTI measures truly dichotomous preferences or qualitatively distinct types"; the four indices measure aspects of four of the five FFM dimensions — [PubMed abstract](https://pubmed.ncbi.nlm.nih.gov/2709300/)
- Items are verbatim from the BIG5 dataset codebook (IPIP 50-item Big-Five Factor Markers; anchors 1 = Disagree, 3 = Neutral, 5 = Agree; collected c. 2012) — [haghish/openpsychometrics mirror, BIG5](https://github.com/haghish/openpsychometrics)
- testik computed norms from that dataset (N = 19,607 after removing incomplete answers, ages outside 13–100 and constant responders; 61% female; M age 26.3; 45% US). For 10-item sums: E 30.11 (SD 9.23, α .89); Intellect 39.12 (6.24, α .79); A 38.46 (7.15, α .83); C 33.47 (7.31, α .81). Scale intercorrelations are .08–.33. With mean cut-offs, type frequencies range from ENFJ 11.6% and ISTP 10.0% down to ENTJ/ESTJ 3.7% — computed from [the open BIG5 data](https://github.com/haghish/openpsychometrics)

### Inferences
- Mapping: E/I = Extraversion; S/N = Intellect/Imagination (high = N); T/F = Agreeableness (high = F); J/P = Conscientiousness (high = J). Letters split at the sample means. Profiles are mean ± 0.18 on the normalised scale, which is equivalent to the per-letter rule; the simulation was consistent.
- The original type names avoid both 16Personalities' trademarked nicknames and Keirsey's names (e.g. INTJ "The Cartographer", ISTJ "The Anchor", ESFP "The Celebration"). `compatibleWith` = the type differing only in E/I plus the type differing only in J/P; the methodology labels this a heuristic.
- The words "MBTI" and "Myers-Briggs" should stay out of product naming; four-letter codes are used generically.
- Validity caveat: the BFFM Intellect items emphasise verbal and intellectual self-image more than Jung's "intuition", and T/F via Agreeableness is a reinterpretation. Both points are disclosed in the methodology.

### Gaps
- Exact McCrae & Costa (1989) correlations (commonly cited as about .7 for E/I and S/N and .4–.5 for T/F and J/P) were not verified, because only the abstract was read. The JSON avoids specific r values.
- The OEJTS item count conflicts between sources (60 items on the main page vs. the 32-item 1.2 form in the npm package). This was not resolved; it is moot because the OEJTS is non-commercial.
- Pittenger (2005), cited for retest instability (doi 10.1037/1065-9293.57.3.210), was cited from memory and not fetched.
- No Russian validation of these 40 IPIP markers was searched.

---

## HEXACO: instrument choice, licence, items, scoring, norms

### Takeaway
The official HEXACO-PI-R and HEXACO-60 are free **only for non-profit academic research**. The test uses the public-domain **IPIP-HEXACO** scales (Ashton, Lee & Goldberg, 2007; 240 items, 24 facets). testik selected 60 of them, 10 per factor and 2–3 per facet, and computed alphas and norms on 21,643 open-data respondents. Ashton & Lee's published norms belong to different items and were deliberately not used.

### Cited Findings
- hexaco.org clause (quoted in IRW, fetched 2026-09-05): "You can download any of these forms free of charge, but only for the purpose of non-profit academic research ... Please contact the authors if you would like to use the inventory for non-academic purposes." IRW verdict: block — [IRW register](https://github.com/ben-domingue/irw/blob/main/itemtext/instrument_rights_register.csv); [hexaco.org](https://hexaco.org/)
- The Open-Source Psychometrics dataset "Answers to the IPIP HEXACO equivalent scales" has 240 items, N = 22,786, collected 2014, on a 7-point scale (1 strongly disagree … 7 strongly agree; the codebook's "5 = slightly disagree" is a typo for "slightly agree") — [haghish/openpsychometrics README and HEXACO/codebook.txt](https://github.com/haghish/openpsychometrics)
- IRW verified that the dataset's item stems match ipip.ori.org/newHEXACO_PI_key.htm. It reports 40/40 matches for the H, E, X, A, C and O facet sets checked, once the codebook's added "I " prefix is removed, with "+keyed first" ordering, and says these are "the IPIP-HEXACO scales (Ashton, Lee & Goldberg 2007), NOT the HEXACO-PI-R" — [IRW batch_350 provenance](https://github.com/ben-domingue/irw/tree/main/itemtext/itemtables/batch_350); [batch_349/351 notes](https://github.com/ben-domingue/irw/tree/main/itemtext/itemtables)
- An auto-generated OpenScales listing of the IPIP-HEXACO key gives facet α .69–.88 (e.g. Greed Avoidance .69, Patience .88) — [OpenScales IPIP-HEXACO README](https://raw.githubusercontent.com/stmueller/OpenScales/main/scales/ipip/IPIP-HEXACO/README.md)
- testik analysis (N = 21,643 after requiring both validity items ≥ 5, no missing answers and non-constant responding; 66% US). Keying came from the sign of each item's loading on its facet's first principal component, which matched IRW's per-item polarity checks. The 60 items were selected by item–factor rest correlation while keeping every facet. Results (sum 10–70, M/SD/α):
  - H 46.43/10.48/.78
  - E 43.90/10.46/.82
  - X 36.18/12.03/.87
  - A 41.21/10.84/.83
  - C 42.03/9.90/.79
  - O 54.31/7.67/.71

  The 10-item scores correlate .90–.95 with the 40-item factor scores, and the factors intercorrelate at |r| ≤ .41 (H–A) — computed from [the open HEXACO data](https://github.com/haghish/openpsychometrics)
- A Russian HEXACO-PI-R exists online, and there is a Russian study of the Honesty-Humility structure; both are search hits only — [psytests HEXACO-PI-R](https://psytests.org/multi/hexacoA.html); [psystudy.ru article 333](https://psystudy.ru/index.php/num/article/view/333)

### Inferences
- The English items keep the IPIP stem format (the codebook's leading "I" removed, "i'm" fixed to "I'm"). 28 of the 60 items are reverse-keyed and scored 8 − answer.
- O has a high mean (54.3/70) and is skewed (−0.44), so its top band is narrow (65–70). Percentiles near the ceiling are approximate.
- A Russian adaptation of the official HEXACO-PI-R would be a derivative of the non-commercial instrument, so it cannot be used either.

### Gaps
- Published HEXACO-60 norms (Ashton & Lee, 2009, J. Pers. Assess. 91, 340–345) were not retrieved (Scribd and docx hits only). They would not apply to these items anyway.
- The IPIP-HEXACO key page and table could not be fetched directly (proxy block, then WebFetch budget). Keying is empirical and cross-checked against IRW's statement of the IPIP key order, not read from the key itself.
- The 60-item selection and norms are unpublished testik analyses; there is no Russian validation.
- Ashton, Lee & Goldberg (2007) PAID 42(8), 1515–1526 (doi 10.1016/j.paid.2006.10.027) and the other HEXACO references in the JSON were cited from knowledge and not fetched.

---

## Dark Triad: SD3 vs Dirty Dozen licence, items, scoring, norms, sensitive interpretation

### Takeaway
**Neither the SD3 nor the Dirty Dozen has a verifiable open licence.** The SD3 was chosen as the better instrument: 9 items per trait, a Russian adaptation and open data. The licence field warns that written permission from the authors is needed before commercial use. The fallback is the public-domain Honesty-Humility scale in `hexaco`, which captures the triad's shared core.

### Cited Findings
- Jones, D. N., & Paulhus, D. L. (2014). Introducing the Short Dark Triad (SD3). *Assessment, 21*(1), 28–41, doi 10.1177/1073191113514105. The response scale is 1 (strongly disagree) to 5 (strongly agree). Scores are means of 9 items after recoding reversals: Narcissism items 2, 6 and 8 and Psychopathy items 2 and 7. The article has no free-use statement, only "Reprints and permissions: sagepub.com/journalsPermissions.nav" — [Jones & Paulhus 2014 PDF (author's site)](https://www2.psych.ubc.ca/~dpaulhus/research/DARK_TRAITS/ARTICLES/ASSESST.2014.with.Jones.pdf)
- SD3 samples: Study 1 N = 489, Study 2 N = 279 and Study 3 N = 230 (MTurk US/Canada; 46–58% female); Study 4 had 65 targets and 65 informants. Table 3 item means (SD), men/women:
  - Study 1: P 2.26 (.61) / 1.96 (.57); M 3.40 (.55) / 3.27 (.56); N 2.92 (.45) / 2.78 (.48)
  - Studies 2 and 3 are similar.

  α: M .71–.77, N .68–.78, P .72–.80. Intercorrelations: M–P .40–.50, M–N .18–.29, N–P .31–.42. No retest was reported. Note that the Study 3 text gives alphas of ".68 to .74", which conflicts with Table 4 — [Jones & Paulhus 2014](https://www2.psych.ubc.ca/~dpaulhus/research/DARK_TRAITS/ARTICLES/ASSESST.2014.with.Jones.pdf)
- **Norms used:** testik pooled the sex-specific Table 3 values across Studies 1–3 (n ≈ 998, with sex counts from the reported % female). Item means (SD): M 3.198 (.585), N 2.828 (.526), P 2.161 (.616). These ×9 give sum norms of 28.78/5.27, 25.46/4.74 and 19.45/5.54 — derived from [Jones & Paulhus 2014](https://www2.psych.ubc.ca/~dpaulhus/research/DARK_TRAITS/ARTICLES/ASSESST.2014.with.Jones.pdf)
- Verbatim English items come from the Open-Source Psychometrics SD3 codebook (N = 18,192; 1 = disagree, 3 = neutral, 5 = agree). IRW found all 27 modal wordings consistent across 3 independent tables — [haghish/openpsychometrics SD3](https://github.com/haghish/openpsychometrics); [IRW sd3.key.txt](https://github.com/ben-domingue/irw/blob/main/collections/curated/sd3.key.txt)
- In that self-selected web sample (N = 17,740 complete), testik found item means of M 3.71 (.79, α .86), N 3.07 (.77, α .80) and P 2.82 (.81, α .80). These are much higher than the MTurk norms, so they were not used as norms — computed from [open SD3 data](https://github.com/haghish/openpsychometrics)
- IRW rights register: SD3 = "hold". It found no originator terms, and silence on a named third-party instrument counts as a hold. It notes third-party hosts say the SD3 may be used in research with acknowledgement and points to Paulhus's lab page as the place to check. The SD4 is under the Hogrefe OpenMind licence and is blocked; the SRP-4 is blocked (MHS, Qualification Level B) — [IRW register](https://github.com/ben-domingue/irw/blob/main/itemtext/instrument_rights_register.csv)
- Russian adaptation: Егорова М. С., Ситникова М. А., Паршикова О. В. (2015). Адаптация Короткого опросника Темной триады. *Психологические исследования, 8*(43), doi 10.54359/ps.v8i43.1052. N = 571 (M age 35.2; 58.5% women); α M .72, N .74, P .70; no means reported on the abstract page — [psystudy.ru](https://psystudy.ru/index.php/num/article/view/1052)
- The Dirty Dozen (Jonason & Webster, 2010, Psychological Assessment 22(2), 420–432) appears on many test sites. No licence statement was found in the search results — [Western Sydney University record](https://researchers.westernsydney.edu.au/en/publications/the-dirty-dozen-a-concise-measure-of-the-dark-triad/)

### Inferences
- The SD3 is preferable to the DTDD on content: 9 vs 4 items per scale, and published criticism of the DTDD psychopathy scale (Miller et al., 2012, Psychological Assessment 24(4), 1048–1053; cited from knowledge, not fetched). Its licence status is no better, so the choice is about quality, not licence.
- The JSON scores sums (9–45) for integer bands; mean = sum/9 is stated in the scoring notes. Bands cut at the 30th/70th/90th percentiles and are labelled Low / Average / Elevated / High. The texts stress that these are subclinical traits, give adaptive and risk aspects plus practical advice, and say that only clinicians diagnose.
- Item P8 (casual sex) is kept because removing it would invalidate the norms. The site may want an 18+ notice for this test.
- The Russian wording is testik's own; the Egorova et al. verbatim Russian items were not available.

### Gaps
- The Paulhus lab DARK_TRAITS page failed to load, so the authors' own terms of use for the SD3 remain unknown. **Action for the site owner:** obtain permission or confirm the terms with D. L. Paulhus before commercial use.
- The Dirty Dozen's licence and terms were not verified, and the Russian Egorova et al. norms (means/SD) were not available.

---

## Cross-cutting: helplines, scoring conventions and implementation notes

### Takeaway
All five JSONs follow SCHEMA.md and use the same helpline wording as the project's other tests: 112; Moscow 051 (8-495-051 from a mobile); the children's line 8-800-2000-122, which is the children's/teen line, not a general adult line. The dark triad adds the ANNA Centre line 8-800-7000-600. Percentiles assume normal distributions.

### Cited Findings
- The existing project tests (depression-phq9, anxiety-gad7, stress-pss10) use 112 / 051 / 8-495-051 and describe 8-800-2000-122 as "Детский телефон доверия". My files were aligned with this — [local file: tests/depression-phq9.json](/home/user/research_notes/Научная%20база%20тестов%20для%20сайта/tests/depression-phq9.json)

### Inferences
- Site engine requirements:
  1. big-five: domain score = sum of facet scores.
  2. temperament and jungian-types: outcomes use the nearest-profile rule on (raw − min)/(max − min); the profiles are already centred on the population means.
  3. hexaco uses a 7-point scale (reverse = 8 − x); all the others use 5 points (reverse = 6 − x).
  4. Every `norms` object is on the same raw scale as the dimension.
- Of the "norms", only big-five, temperament and dark-triad use published values. Jungian and HEXACO norms are testik computations from open datasets. Each `norms.source` says this explicitly so the site can show it.

### Gaps
- The 8-800-7000-600 (ANNA Centre) number was used from knowledge and not re-verified this session.
- None of the Russian translations has been back-translated or piloted. A small pilot (internal consistency on ~200 Russian speakers) is recommended before claiming Russian norms.
