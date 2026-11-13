#!/usr/bin/env python3
"""
Generates the Dari printable PDFs for The Alpha Collection.

Reads printables/dari/data/letters.json and builds four products as
standalone, editable HTML files (so they can be opened directly in a
browser and tweaked by hand), then renders each one to both US Letter
and A4 PDFs with WeasyPrint.

Usage:
    printables/build/.venv/bin/python3 printables/build/generate.py
"""
import json
from pathlib import Path

from weasyprint import CSS, HTML

ROOT = Path(__file__).resolve().parent.parent
DARI = ROOT / "dari"
ASSETS = ROOT / "assets"

with open(DARI / "data" / "letters.json", encoding="utf-8") as f:
    DATA = json.load(f)

LETTERS = DATA["letters"]
SET_TITLE = DATA["setTitle"]
SET_SUBTITLE = DATA["setSubtitle"]
COLLECTION = DATA["collectionTitle"]

PAGE_SIZES = {"letter": "Letter", "a4": "A4"}

BASE_CSS_LINK = '<link rel="stylesheet" href="../../assets/print-base.css">'


def html_shell(title, body, extra_style=""):
    return f"""<!DOCTYPE html>
<html lang="prs" dir="rtl">
<head>
<meta charset="UTF-8">
<title>{title}</title>
{BASE_CSS_LINK}
<style>
{extra_style}
</style>
</head>
<body>
{body}
</body>
</html>"""


def render_pdf(html_path: Path, out_stem: str):
    for key, size in PAGE_SIZES.items():
        out_path = DARI / "output" / f"{out_stem}-{key}.pdf"
        HTML(filename=str(html_path)).write_pdf(
            out_path,
            stylesheets=[CSS(string=f"@page {{ size: {size}; margin: 0.4in; }}")],
        )
        print(f"  -> {out_path.relative_to(ROOT)}")


# ---------------------------------------------------------------------------
# Shared building blocks: cover page + one tracing sheet per letter
# ---------------------------------------------------------------------------

TRACING_STYLE = """
@page { margin: 0.4in; }
.sheet {
  page-break-after: always;
  padding: 0 0.15in;
}
.sheet:last-child { page-break-after: avoid; }

.sheet-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 3px solid var(--ac-accent);
  padding-bottom: 8px;
  margin-bottom: 18px;
}
.sheet-head .brand {
  font-family: 'Alpha Display', sans-serif;
  font-weight: 700;
  font-size: 13pt;
  color: var(--ac-accent-dark);
}
.sheet-head .counter {
  font-size: 10pt;
  color: var(--ac-mid);
  direction: ltr;
}

.letter-banner {
  display: flex;
  align-items: center;
  gap: 24px;
  background: var(--ac-cream);
  border: 2px solid var(--ac-green);
  border-radius: 18px;
  padding: 14px 28px;
  margin-bottom: 26px;
}
.letter-banner .big-letter {
  font-family: 'Alpha Letter', serif;
  font-size: 64pt;
  line-height: 1;
  color: var(--ac-accent-dark);
}
.letter-banner .letter-meta .letter-name {
  font-size: 18pt;
  font-weight: 700;
  direction: ltr;
  text-align: right;
}
.letter-banner .letter-meta .letter-latin {
  font-size: 11pt;
  color: var(--ac-mid);
  direction: ltr;
  text-align: right;
  margin-top: 2px;
}

.section-label {
  font-size: 10pt;
  font-weight: 700;
  color: var(--ac-accent-dark);
  margin: 0 0 8px 0;
}

.trace-row, .write-row {
  display: flex;
  justify-content: space-between;
  gap: 6px;
  border-bottom: 2px dashed var(--ac-line);
  padding-bottom: 4px;
  margin-bottom: 16px;
}
.trace-row span, .write-row span {
  flex: 1;
  text-align: center;
  font-family: 'Alpha Letter', serif;
  font-size: 36pt;
  line-height: 1.1;
}
.trace-row .tr-model { color: var(--ac-accent-dark); }
.trace-row .tr-ghost { color: var(--ac-trace); }
.write-row span { color: var(--ac-trace); min-height: 40pt; }

.word-card {
  display: flex;
  align-items: center;
  gap: 18px;
  background: var(--ac-green);
  border-radius: 18px;
  padding: 14px 28px;
  margin-top: 8px;
}
.word-card .word-emoji { font-size: 34pt; }
.word-card .word-fa {
  font-family: 'Alpha Letter', serif;
  font-size: 24pt;
  color: var(--ac-dark);
}
.word-card .word-translit {
  font-size: 10pt;
  color: var(--ac-dark);
  direction: ltr;
  text-align: right;
  margin-top: 3px;
}

.cover {
  position: relative;
  min-height: 10.3in;
  page-break-after: always;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background: var(--ac-green);
  border-radius: 24px;
  padding: 0 0.6in;
}
.cover .emoji { font-size: 64pt; }
.cover h1 {
  font-family: 'Alpha Display', sans-serif;
  font-size: 34pt;
  margin: 10px 0 0 0;
  color: var(--ac-dark);
}
.cover h2 {
  font-size: 16pt;
  font-weight: 400;
  direction: ltr;
  color: var(--ac-mid);
  margin: 6px 0 24px 0;
}
.cover .tagline {
  font-size: 11pt;
  color: var(--ac-dark);
  margin: 0 auto;
  max-width: 5in;
  direction: ltr;
}
.cover .sample-row {
  direction: rtl;
  font-family: 'Alpha Letter', serif;
  font-size: 30pt;
  color: var(--ac-accent-dark);
  margin-top: 20px;
  letter-spacing: 10px;
}
"""


def build_cover_section(tagline):
    return f"""
    <section class="cover">
      <div class="emoji">🔤</div>
      <h1>{SET_TITLE}</h1>
      <h2>{SET_SUBTITLE}</h2>
      <p class="tagline">{tagline}</p>
      <div class="sample-row">{' '.join(l['letter'] for l in LETTERS[:8])}</div>
    </section>
    """


def build_letter_sheet(i, item, total):
    letter = item["letter"]
    ghosts = "".join(f'<span class="tr-ghost">{letter}</span>' for _ in range(6))
    trace_row = f'<div class="trace-row"><span class="tr-model">{letter}</span>{ghosts}</div>'
    write_row = '<div class="write-row">' + "".join('<span></span>' for _ in range(7)) + '</div>'
    return f"""
    <section class="sheet">
      <div class="sheet-head">
        <div class="brand">{COLLECTION} · {SET_SUBTITLE}</div>
        <div class="counter">{i} / {total}</div>
      </div>
      <div class="letter-banner">
        <div class="big-letter">{letter}</div>
        <div class="letter-meta">
          <div class="letter-name">{item['name']}</div>
          <div class="letter-latin">sounds like "{item['latin']}"</div>
        </div>
      </div>
      <p class="section-label">TRACE IT</p>
      {trace_row}
      {trace_row}
      <p class="section-label">WRITE IT YOURSELF</p>
      {write_row}
      {write_row}
      <div class="word-card">
        <div class="word-emoji">{item['emoji']}</div>
        <div>
          <div class="word-fa">{item['word']}</div>
          <div class="word-translit">{item['wordLatin']} &middot; {item['wordEn']}</div>
        </div>
      </div>
      <div class="page-footer">{COLLECTION} — Dari Letter Tracing · For personal &amp; classroom use · Not for resale or redistribution</div>
    </section>
    """


# ---------------------------------------------------------------------------
# 1. Letter tracing sheets — one page per letter
# ---------------------------------------------------------------------------

def build_tracing_html():
    total = len(LETTERS)
    tagline = (
        f"Letter tracing &amp; handwriting practice — {total} pages, one per Dari letter, "
        "with a traceable model, free-write lines, and an illustrated example word."
    )
    pages = [build_cover_section(tagline)]
    pages += [build_letter_sheet(i, item, total) for i, item in enumerate(LETTERS, start=1)]

    html_path = DARI / "letter-tracing" / "preview.html"
    html_path.write_text(
        html_shell(f"{SET_TITLE} — Letter Tracing", "\n".join(pages), TRACING_STYLE),
        encoding="utf-8",
    )
    return html_path


# ---------------------------------------------------------------------------
# 2. Flashcards — 8 cards per page (2 cols x 4 rows), front side only (v1)
# ---------------------------------------------------------------------------

FLASHCARD_STYLE = """
@page { margin: 0.35in; }
.card-page {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 0.18in;
  height: 10.3in;
  page-break-after: always;
}
.card-page:last-child { page-break-after: avoid; }

.card {
  border: 2.5px dashed var(--ac-accent);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  background: var(--ac-cream);
  padding: 8px;
}
.card .letter {
  font-family: 'Alpha Letter', serif;
  font-size: 46pt;
  color: var(--ac-accent-dark);
  line-height: 1;
}
.card .meta { text-align: center; }
.card .meta .word {
  font-family: 'Alpha Letter', serif;
  font-size: 15pt;
  color: var(--ac-dark);
}
.card .meta .emoji { font-size: 20pt; }
.card .meta .translit {
  font-size: 7.5pt;
  color: var(--ac-mid);
  direction: ltr;
}
"""


def build_flashcards_html():
    cards_per_page = 8
    pages = []
    for start in range(0, len(LETTERS), cards_per_page):
        chunk = LETTERS[start:start + cards_per_page]
        cards = []
        for item in chunk:
            cards.append(f"""
            <div class="card">
              <div class="letter">{item['letter']}</div>
              <div class="meta">
                <div class="emoji">{item['emoji']}</div>
                <div class="word">{item['word']}</div>
                <div class="translit">{item['wordLatin']} &middot; {item['wordEn']}</div>
              </div>
            </div>
            """)
        pages.append('<section class="card-page">' + "".join(cards) + "</section>")

    html_path = DARI / "flashcards" / "preview.html"
    html_path.write_text(
        html_shell(f"{SET_TITLE} — Flashcards", "\n".join(pages), FLASHCARD_STYLE),
        encoding="utf-8",
    )
    return html_path


# ---------------------------------------------------------------------------
# 3. Alphabet wall poster — single page, all letters in a grid
# ---------------------------------------------------------------------------

POSTER_STYLE = """
.poster {
  min-height: 10.3in;
  display: flex;
  flex-direction: column;
  padding: 0 0.15in;
}
.poster-head {
  text-align: center;
  margin-bottom: 18px;
}
.poster-head h1 {
  font-family: 'Alpha Display', sans-serif;
  font-size: 30pt;
  color: var(--ac-accent-dark);
  margin: 0;
}
.poster-head h2 {
  font-size: 13pt;
  font-weight: 400;
  direction: ltr;
  color: var(--ac-mid);
  margin: 4px 0 0 0;
}
.poster-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.12in;
  width: 100%;
}
.poster-cell {
  background: var(--ac-cream);
  border: 2px solid var(--ac-green);
  border-radius: 12px;
  text-align: center;
  padding: 8px 2px;
}
.poster-cell .letter {
  font-family: 'Alpha Letter', serif;
  font-size: 26pt;
  color: var(--ac-accent-dark);
  line-height: 1;
}
.poster-cell .emoji { font-size: 13pt; }
.poster-cell .word {
  font-size: 7pt;
  color: var(--ac-dark);
}
"""


def build_poster_section(heading=None):
    cells = []
    for item in LETTERS:
        cells.append(f"""
        <div class="poster-cell">
          <div class="letter">{item['letter']}</div>
          <div class="emoji">{item['emoji']}</div>
          <div class="word">{item['word']}</div>
        </div>
        """)

    head = heading if heading is not None else f"""
      <div class="poster-head">
        <h1>{SET_TITLE}</h1>
        <h2>{SET_SUBTITLE} · {COLLECTION}</h2>
      </div>
    """

    return f"""
    <section class="poster">
      {head}
      <div class="poster-grid">{"".join(cells)}</div>
      <div class="page-footer">{COLLECTION} — Dari Alphabet Poster · For personal &amp; classroom use · Not for resale or redistribution</div>
    </section>
    """


def build_poster_html():
    html_path = DARI / "poster" / "preview.html"
    html_path.write_text(
        html_shell(f"{SET_TITLE} — Poster", build_poster_section(), "@page { margin: 0.3in; }\n" + POSTER_STYLE),
        encoding="utf-8",
    )
    return html_path


# ---------------------------------------------------------------------------
# 4. Booklet — cover + all tracing sheets + a bonus poster page, as one PDF
# ---------------------------------------------------------------------------

def build_booklet_html():
    total = len(LETTERS)
    tagline = (
        f"A complete Dari alphabet workbook — {total} letter tracing pages, "
        "one per letter, plus a bonus alphabet poster at the end."
    )
    pages = [build_cover_section(tagline)]
    pages += [build_letter_sheet(i, item, total) for i, item in enumerate(LETTERS, start=1)]

    bonus_heading = """
      <div class="poster-head">
        <h1>🎁 Bonus: Alphabet Poster</h1>
        <h2>Pull this page out and hang it up!</h2>
      </div>
    """
    pages.append(build_poster_section(bonus_heading))

    booklet_style = TRACING_STYLE + "\n.poster { page-break-after: avoid; }\n" + POSTER_STYLE

    html_path = DARI / "booklet" / "preview.html"
    html_path.parent.mkdir(exist_ok=True)
    html_path.write_text(
        html_shell(f"{SET_TITLE} — Workbook", "\n".join(pages), booklet_style),
        encoding="utf-8",
    )
    return html_path


# ---------------------------------------------------------------------------

if __name__ == "__main__":
    (DARI / "output").mkdir(exist_ok=True)

    print("Building letter tracing sheets...")
    render_pdf(build_tracing_html(), "dari-letter-tracing")

    print("Building flashcards...")
    render_pdf(build_flashcards_html(), "dari-flashcards")

    print("Building poster...")
    render_pdf(build_poster_html(), "dari-alphabet-poster")

    print("Building combined workbook booklet...")
    render_pdf(build_booklet_html(), "dari-workbook-booklet")

    print("Done.")
