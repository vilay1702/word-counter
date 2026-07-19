"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { computeStats, topWords } from "@/lib/textStats";
import { copy } from "@/lib/copy";
import { TOOL_DESCRIPTION, TOOL_H1 } from "@/lib/brand";
import { Button } from "@/components/ui/Button";
import { ToolShell } from "@/components/ui/ToolShell";
import { StatsPanel } from "@/components/StatsPanel";
import { TopWords } from "@/components/TopWords";

const HOW_IT_WORKS = [
  "Paste your text or write straight into the box — essays, posts, captions, anything.",
  "Watch the counts update live: words, characters, sentences, paragraphs, and reading time.",
  "Tap Copy stats to grab a tidy summary for your editor, teacher, or client.",
];

export default function Home() {
  const [text, setText, hydrated] = useLocalStorage<string>(
    "wordtally:text:v1",
    "",
  );
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stats = useMemo(() => computeStats(text), [text]);
  const frequencies = useMemo(() => topWords(text), [text]);

  useEffect(
    () => () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    },
    [],
  );

  const copyStats = async () => {
    const fmt = new Intl.NumberFormat("en-US");
    const minutes = (n: number) =>
      n <= 1 ? copy.underAMinute : copy.minutes(n);
    const summary = [
      `${copy.words}: ${fmt.format(stats.words)}`,
      `${copy.characters}: ${fmt.format(stats.characters)}`,
      `${copy.characters} (${copy.charactersNoSpaces.toLowerCase()}): ${fmt.format(stats.charactersNoSpaces)}`,
      `${copy.sentences}: ${fmt.format(stats.sentences)}`,
      `${copy.paragraphs}: ${fmt.format(stats.paragraphs)}`,
      `${copy.readingTime}: ${minutes(stats.readingMinutes)}`,
      `${copy.speakingTime}: ${minutes(stats.speakingMinutes)}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable (permissions/insecure context) — nothing to do
    }
  };

  return (
    <ToolShell
      h1={TOOL_H1}
      description={TOOL_DESCRIPTION}
      privacyLine={copy.privacy}
      howItWorks={HOW_IT_WORKS}
    >
      {/* min-w-0 on both grid children: otherwise the textarea's intrinsic
          width sets the column's min-content and overflows small screens */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div className="flex min-w-0 flex-col gap-3">
          <label htmlFor="text-input" className="sr-only">
            {copy.textareaLabel}
          </label>
          <textarea
            id="text-input"
            value={hydrated ? text : ""}
            onChange={(e) => setText(e.target.value)}
            placeholder={copy.textareaPlaceholder}
            spellCheck={false}
            className="min-h-[16rem] w-full min-w-0 resize-y rounded-md border border-border bg-bg p-4 text-body outline-none transition placeholder:text-text-muted focus:border-accent focus:bg-surface focus:ring-2 focus:ring-accent-soft sm:min-h-[22rem]"
          />
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="primary"
              onClick={copyStats}
              disabled={stats.words === 0}
            >
              {copied ? copy.copiedStats : copy.copyStats}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setText("")}
              disabled={text.length === 0}
            >
              {copy.clearText}
            </Button>
            {text.length === 0 && (
              <span className="text-small text-text-muted">
                {copy.emptyHint}
              </span>
            )}
          </div>
        </div>

        <div className="min-w-0 space-y-6">
          <StatsPanel stats={stats} />
          <TopWords words={frequencies} />
        </div>
      </div>
    </ToolShell>
  );
}
