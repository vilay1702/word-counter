/**
 * Brand constants — code mirror of "Branded Web Tools.md" v2 (repo root).
 * That file is the source of truth; change values there first, then here.
 *
 * v2 model: one parent brand, many products. The tool is the hero (its own
 * name, own accent, own personality); the parent is the endorser, appearing
 * only as "from [Parent]". This tool's claimed accent is Blue — the family
 * palette row for "Text & writing".
 */

/**
 * TODO in the brand doc (§1). Once decided, set the name here and the
 * endorsement lockup, footer, OG image, and About page pick it up.
 */
export const PARENT_BRAND: string | null = null;

/** Endorsement line (§1) — exactly this phrasing, never "Powered by". */
export const ENDORSEMENT = PARENT_BRAND ? `from ${PARENT_BRAND}` : null;

/** Maker credit (§1/§6) — footer of every tool, muted small text, own line. */
export const MAKER_CREDIT = "Made with ♥ by Vilay";

/** Parent tagline (§1). */
export const TAGLINE = "Free, fast tools that run in your browser.";

export const TOOL_NAME = "WordTally";
export const PAGE_TITLE = TOOL_NAME;

/** localStorage key for the theme choice (§ per-tool prefix). */
export const THEME_STORAGE_KEY = "wt:theme:v1";

/** Exactly one H1 per page — the tool's keyword-targeted description (§4). */
export const TOOL_H1 = "Word counter";
export const TOOL_DESCRIPTION =
  "Count words, characters, sentences, and reading time as you type. No signup, nothing uploaded.";

/**
 * Raw palette values for surfaces CSS variables can't reach
 * (OG images, SVG). Everything else consumes the tokens in globals.css.
 *
 * Accent = Blue, this tool's ONE claimed accent (§3).
 */
export const BRAND_COLORS = {
  accent: "#2563EB",
  /** Family-mark colors (logo/README.md): Bar A is always parent indigo;
      Bar B is this tool's accent; folds are the ~800 shade of each hue. */
  markCanvas: "#FAFAF9",
  markParent: "#4F46E5",
  markParentFold: "#3730A3",
  markAccentFold: "#1E40AF",
  accentHover: "#1D4ED8",
  accentSoft: "#EFF6FF",
  bg: "#FAFAF9",
  surface: "#FFFFFF",
  border: "#E7E5E4",
  text: "#1C1917",
  textMuted: "#78716C",
} as const;
