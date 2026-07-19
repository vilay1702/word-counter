/** Pure text-analysis helpers — no DOM, trivially testable. */

export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  /** Whole minutes, rounded up; 0 when there are no words. */
  readingMinutes: number;
  speakingMinutes: number;
}

/** Average adult rates most editors assume. */
const READING_WPM = 200;
const SPEAKING_WPM = 130;

/** Words = runs of letters/digits (apostrophes and hyphens stay inside). */
const WORD_RE = /[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu;

export function extractWords(text: string): string[] {
  return text.match(WORD_RE) ?? [];
}

export function computeStats(text: string): TextStats {
  const words = extractWords(text).length;
  return {
    words,
    // Array.from counts code points, so emoji aren't counted twice.
    characters: Array.from(text).length,
    charactersNoSpaces: Array.from(text.replace(/\s/gu, "")).length,
    sentences: text
      .split(/[.!?…]+(?:\s|$)/u)
      .filter((part) => part.trim().length > 0).length,
    paragraphs: text.split(/\n+/).filter((line) => line.trim().length > 0)
      .length,
    readingMinutes: words === 0 ? 0 : Math.ceil(words / READING_WPM),
    speakingMinutes: words === 0 ? 0 : Math.ceil(words / SPEAKING_WPM),
  };
}

/** Function words too common to be interesting in a frequency list. */
const STOP_WORDS = new Set([
  "the", "and", "for", "are", "but", "not", "you", "all", "any", "can",
  "had", "her", "was", "one", "our", "out", "has", "him", "his", "how",
  "its", "she", "too", "use", "this", "that", "with", "from", "they",
  "them", "have", "will", "your", "what", "when", "were", "been", "than",
  "then", "there", "their", "would", "could", "should", "about", "which",
  "into", "also", "just", "like", "some", "more", "very", "over", "such",
  "only", "other", "these", "those", "because", "while", "where", "after",
  "before", "between", "through", "during", "each", "does", "doing", "did",
]);

export interface WordFrequency {
  word: string;
  count: number;
}

export function topWords(text: string, limit = 5): WordFrequency[] {
  const counts = new Map<string, number>();
  for (const raw of extractWords(text)) {
    const word = raw.toLowerCase();
    if (word.length < 3 || STOP_WORDS.has(word)) continue;
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([word, count]) => ({ word, count }))
    .filter(({ count }) => count > 1)
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))
    .slice(0, limit);
}
