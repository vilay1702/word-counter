import type { TextStats } from "@/lib/textStats";
import { copy } from "@/lib/copy";
import { Card } from "@/components/ui/Card";

function formatMinutes(minutes: number, words: number): string {
  if (words === 0) return "—";
  if (minutes <= 1) return copy.underAMinute;
  return copy.minutes(minutes);
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-md border border-border bg-bg p-3">
      <div className="font-display text-h3 font-semibold tabular-nums">
        {value}
      </div>
      <div className="text-small text-text-muted">{label}</div>
    </div>
  );
}

/** Live counts: hero word count + the supporting stats grid. */
export function StatsPanel({ stats }: { stats: TextStats }) {
  const fmt = new Intl.NumberFormat("en-US");
  return (
    <Card aria-live="polite" className="min-w-0">
      <div className="rounded-md bg-accent-soft p-4 text-center">
        <div className="font-display text-5xl font-bold tabular-nums text-accent">
          {fmt.format(stats.words)}
        </div>
        <div className="mt-1 text-small font-medium text-text-muted">
          {copy.words}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <StatTile label={copy.characters} value={fmt.format(stats.characters)} />
        <StatTile
          label={copy.charactersNoSpaces}
          value={fmt.format(stats.charactersNoSpaces)}
        />
        <StatTile label={copy.sentences} value={fmt.format(stats.sentences)} />
        <StatTile label={copy.paragraphs} value={fmt.format(stats.paragraphs)} />
        <StatTile
          label={copy.readingTime}
          value={formatMinutes(stats.readingMinutes, stats.words)}
        />
        <StatTile
          label={copy.speakingTime}
          value={formatMinutes(stats.speakingMinutes, stats.words)}
        />
      </div>
    </Card>
  );
}
