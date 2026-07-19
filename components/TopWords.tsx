import type { WordFrequency } from "@/lib/textStats";
import { copy } from "@/lib/copy";
import { Card } from "@/components/ui/Card";

/** The most-used words (stop words filtered), with a soft frequency bar. */
export function TopWords({ words }: { words: WordFrequency[] }) {
  const max = words[0]?.count ?? 0;
  return (
    <Card className="min-w-0">
      <h2 className="mb-3 font-display text-h3 font-semibold">
        {copy.topWordsTitle}
      </h2>
      {words.length === 0 ? (
        <p className="text-small text-text-muted">{copy.topWordsEmpty}</p>
      ) : (
        <ul className="space-y-2">
          {words.map(({ word, count }) => (
            <li key={word} className="relative overflow-hidden rounded-sm">
              {/* Content colors are free per the brand doc — but the soft
                  accent tint keeps the panel on-palette anyway. */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 bg-accent-soft"
                style={{ width: `${(count / max) * 100}%` }}
              />
              <div className="relative flex items-center justify-between gap-2 px-2.5 py-1.5 text-small">
                <span className="truncate font-medium">{word}</span>
                <span className="tabular-nums text-text-muted">×{count}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
