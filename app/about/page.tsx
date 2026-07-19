import type { Metadata } from "next";
import { ENDORSEMENT, MAKER_CREDIT, TAGLINE, TOOL_NAME } from "@/lib/brand";
import { StaticPage, StaticSection } from "@/components/ui/StaticPage";

export const metadata: Metadata = {
  title: `About · ${TOOL_NAME}`,
  description: `What ${TOOL_NAME} is, how it works, and who makes it.`,
};

export default function AboutPage() {
  return (
    <StaticPage h1={`About ${TOOL_NAME}`}>
      <StaticSection heading="What it is">
        <p>
          {TOOL_NAME} is a free word counter for anything you write — essays,
          tweets, cover letters, meta descriptions. Paste or type, and it
          counts words, characters, sentences, and paragraphs as you go, plus
          how long your text takes to read or say out loud.
        </p>
        <p>
          There’s no signup and nothing to install. It runs entirely in your
          browser, and your text never leaves your device.
        </p>
      </StaticSection>

      <StaticSection heading="How it counts">
        <p>
          Words are anything separated by spaces or line breaks. Sentences end
          at a full stop, question mark, or exclamation mark. Reading time
          assumes about 200 words a minute, speaking time about 130 — the
          averages most editors use.
        </p>
      </StaticSection>

      <StaticSection heading="Who makes it">
        <p>
          {/* Family positioning (§1) — the endorsement line joins once the
              parent brand is decided. */}
          {TOOL_NAME}
          {ENDORSEMENT ? ` is ${ENDORSEMENT} —` : " is part of"} a family of
          free single-purpose web tools. {TAGLINE} No clutter, no accounts, no
          uploads.
        </p>
        <p>{MAKER_CREDIT}</p>
      </StaticSection>
    </StaticPage>
  );
}
