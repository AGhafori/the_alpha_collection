# Printables

Source files and generated PDFs for printable learning materials (sold on Etsy / elsewhere). This is a separate product line from the web games in `games/`, but lives in this repo for convenience.

## Structure

```
printables/
├── assets/
│   ├── print-base.css     ← shared fonts, color palette, page helpers
│   └── fonts/              ← self-hosted Dari/Farsi script fonts (Noto Naskh/Sans/Kufi Arabic)
├── dari/
│   ├── data/
│   │   └── letters.json    ← the 33-letter Dari alphabet + example words (source of truth)
│   ├── letter-tracing/
│   │   └── preview.html    ← generated, open directly in a browser to review/tweak
│   ├── flashcards/
│   │   └── preview.html
│   ├── poster/
│   │   └── preview.html
│   ├── booklet/
│   │   └── preview.html    ← combined workbook (cover + tracing + bonus poster)
│   └── output/              ← generated PDFs (both US Letter and A4) — the sellable files
└── build/
    ├── generate.py          ← builds the HTML previews and renders them to PDF
    └── .venv/                ← local Python env with WeasyPrint (gitignored)
```

## Current Dari products (v1 drafts)

1. **Letter tracing sheets** (`dari-letter-tracing-*.pdf`) — one page per letter (33 pages + cover), with a traceable model letter, faded trace-over repetitions, blank practice lines, and an illustrated example word.
2. **Flashcards** (`dari-flashcards-*.pdf`) — 8 cards per page, letter + emoji + example word, cut-out style with dashed borders.
3. **Alphabet poster** (`dari-alphabet-poster-*.pdf`) — single page, all 33 letters in a grid, for a wall chart.
4. **Workbook booklet** (`dari-workbook-booklet-*.pdf`) — all of the above combined into one sellable PDF: cover page, all 33 tracing pages, and the alphabet poster as a bonus closing page. (Flashcards are left out of the booklet since they're meant to be cut apart, not bound.)

Each one renders to both `*-letter.pdf` (US Letter) and `*-a4.pdf` (A4) in `dari/output/`.

## Why Dari, not Farsi

This set targets **Dari** (Afghan Persian) rather than Iranian Farsi. Same script and alphabet, but:

- **و (Waw)** is transliterated as `w`, not `v` — Dari keeps the historical /w/ pronunciation that Iranian Farsi shifted to /v/.
- **ق (Qaf) vs غ (Ghayn)** are kept phonetically distinct (`q` vs `gh`) — Dari preserves this contrast; Iranian Farsi merged both to one sound.
- A couple of example words were swapped for ones more natural in Afghan usage: **ط → طیاره** (tayara, "airplane") instead of the Iranian طوطی ("parrot"), and **ه → هندوانه** ("watermelon") to free up "airplane" for ط.

**Note:** this is a careful best effort, not native-speaker-verified. Dari also has vowel-length distinctions (e.g. در شیر vs شیر) that aren't reflected in the simplified transliterations here. Please have a native Dari speaker proofread the words, names, and transliterations before publishing — especially ث, ض, ظ, ع, غ, and the swapped ط/ه words.

## Editing the content

Letter names use the [Omniglot Dari alphabet chart](https://www.omniglot.com/writing/dari.htm) as a reference. This collection labels ح as "Hee" and ه as "He" to distinguish them for learners; both keep `h` as their consonant sound. These labels do not prescribe different consonant lengths.

All letter/word/emoji data lives in `dari/data/letters.json`. Edit it there rather than in the HTML — the generator rebuilds everything from it. Each entry has:

- `letter` — the Dari/Farsi script character
- `name` — the Romanized letter name (e.g. "Be", "Alef Madd", "Waw")
- `latin` — the short phonetic sound (e.g. "b", "w", "q")
- `word` / `wordLatin` / `wordEn` — the example word in script, transliterated, and in English
- `emoji` — the icon used on cards/sheets

## Regenerating the PDFs

A local virtualenv with [WeasyPrint](https://weasyprint.org/) is already set up at `build/.venv`. The fonts referenced by `assets/print-base.css` are self-hosted in `assets/fonts/` (copied from the system's Noto Arabic fonts), so no internet access is needed to render.

```bash
printables/build/.venv/bin/python3 printables/build/generate.py
```

This regenerates all four HTML previews and all eight PDFs. If the venv is ever missing, recreate it with:

```bash
python3 -m venv printables/build/.venv
printables/build/.venv/bin/pip install weasyprint
```

## Design notes

- Palette and fonts match the main app's "lime-washed green" look (`css/style.css` `:root` variables) for brand consistency, but with lighter/cream page backgrounds to keep ink usage low for home printing.
- Fonts: 'Alpha Letter' (Noto Naskh Arabic) for large display letters/words — nice traditional letterforms for tracing; 'Alpha Body' (Noto Sans Arabic) for small UI text; 'Alpha Display' (Noto Kufi Arabic) for bold headers.
- Each PDF includes a small footer line: "For personal & classroom use · Not for resale or redistribution" — update/adjust this to match whatever license terms you want to sell under.
