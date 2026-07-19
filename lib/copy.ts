/**
 * Canonical microcopy — part of the brand ("Branded Web Tools.md" §7).
 * Tone: friendly-direct. Sentence case. Verb-first button labels.
 * Reuse these strings; don't write ad-hoc empty/error states in components.
 */
export const copy = {
  // Privacy line (shown under every tool workspace)
  privacy:
    "Everything runs in your browser — your text is never uploaded or seen by anyone.",

  // Header actions
  themeToggle: "Switch between light and dark",

  // Buttons (verb-first, never "Submit" or "OK")
  copyStats: "Copy stats",
  copiedStats: "Copied!",
  clearText: "Clear text",
  tryAgain: "Try again",

  // Workspace states
  textareaLabel: "Your text",
  textareaPlaceholder: "Paste or start typing — the counts update live…",
  emptyHint: "Counts appear the moment you start typing.",

  // Stat labels
  words: "Words",
  characters: "Characters",
  charactersNoSpaces: "Without spaces",
  sentences: "Sentences",
  paragraphs: "Paragraphs",
  readingTime: "Reading time",
  speakingTime: "Speaking time",

  // Top words panel
  topWordsTitle: "Most used words",
  topWordsEmpty: "Your most-used words will show up here.",

  // Time formatting
  underAMinute: "< 1 min",
  minutes: (n: number) => `${n} min`,

  // Errors
  errorTitle: "The counter lost count",
  errorBody:
    "Something went wrong. Your text is safe in this browser — give it another go.",

  // 404
  notFoundTitle: "This page doesn’t count",
  notFoundBody:
    "The address may be mistyped, or the page moved. Your text is right where you left it.",
  backToCounter: "Back to the counter",
} as const;
