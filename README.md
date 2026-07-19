# 📝 WordTally

Need to hit a word limit — or prove you did? Paste your text and WordTally
counts words, characters, sentences, and paragraphs live as you type, plus
how long it takes to read or say out loud.

No signup. No app to install. Nothing you type ever leaves your browser.

## How to use it

1. **Paste or type** — drop in an essay, a caption, a cover letter,
   anything. The counts update with every keystroke.
2. **Read the panel** — words up top, then characters (with and without
   spaces), sentences, paragraphs, reading time, and speaking time.
3. **Copy stats** — one tap puts a tidy summary on your clipboard, ready
   for your editor, teacher, or client.

## How it counts

- **Words** are runs of letters or digits — apostrophes and hyphens stay
  inside a word, so "don't" and "well-known" each count once.
- **Sentences** end at a full stop, question mark, or exclamation mark.
- **Reading time** assumes about 200 words a minute, **speaking time**
  about 130 — the averages most editors use.
- **Most used words** shows your top repeated words (skipping filler like
  "the" and "and"), handy for spotting crutch words.

## Your data

The text you're working on is saved in this browser only, so it survives
a refresh. Nothing is uploaded — there are no accounts, no trackers, and
no server to send anything to. See the Privacy page in the app for
details.

## Coming back

Your text is right where you left it — same browser, same device. Use
"Clear text" to start fresh.

---

## For developers

This is a [Next.js 15](https://nextjs.org/) app (App Router, TypeScript,
Tailwind CSS v4). All counting is pure client-side string analysis in
`lib/textStats.ts` — no dependencies beyond the framework.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (fully static — deploys anywhere Next.js runs)
```

Branding follows `../Branded Web Tools.md`: design tokens in
`app/globals.css`, brand constants in `lib/brand.ts`, canonical microcopy
in `lib/copy.ts`. The parent brand name is still `TODO` in the brand doc —
set `PARENT_BRAND` in `lib/brand.ts` once it's decided.

Made with ♥ by Vilay
