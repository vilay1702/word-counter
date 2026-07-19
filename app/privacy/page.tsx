import type { Metadata } from "next";
import { TOOL_NAME } from "@/lib/brand";
import { StaticPage, StaticSection } from "@/components/ui/StaticPage";

export const metadata: Metadata = {
  title: `Privacy · ${TOOL_NAME}`,
  description: `How ${TOOL_NAME} handles your data: everything stays in your browser.`,
};

export default function PrivacyPage() {
  return (
    <StaticPage h1="Privacy">
      <StaticSection heading="The short version">
        <p>
          Everything runs in your browser. Your text is never uploaded — we
          couldn’t read it if we wanted to.
        </p>
      </StaticSection>

      <StaticSection heading="What's stored, and where">
        <p>
          {TOOL_NAME} saves two things in your browser’s local storage: the
          text you’re working on, so it survives a refresh, and your light or
          dark theme choice.
        </p>
        <p>
          That data lives only on your device. It’s not sent to a server, and
          it isn’t shared between your devices or browsers.
        </p>
      </StaticSection>

      <StaticSection heading="No accounts, no trackers">
        <p>
          There’s nothing to sign up for, and we don’t use analytics trackers,
          advertising pixels, or cookies.
        </p>
      </StaticSection>

      <StaticSection heading="Clearing your data">
        <p>
          Use “Clear text” to empty the counter, or clear this site’s data in
          your browser settings to remove everything at once. Gone means gone
          — there’s no copy anywhere else.
        </p>
      </StaticSection>
    </StaticPage>
  );
}
