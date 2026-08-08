import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import {
  PAGE_TITLE,
  THEME_STORAGE_KEY,
  TOOL_DESCRIPTION,
  TOOL_NAME,
} from "@/lib/brand";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  // Must match public/CNAME — makes OG/social URLs absolute.
  metadataBase: new URL("https://count.vilaybende.com"),
  title: PAGE_TITLE,
  description: TOOL_DESCRIPTION,
  applicationName: TOOL_NAME,
  openGraph: {
    title: PAGE_TITLE,
    description: TOOL_DESCRIPTION,
    type: "website",
  },
};

export const viewport: Viewport = {
  // Dark is the site default regardless of system preference, so the
  // browser chrome color matches it (media-query values would follow the
  // system and clash with a dark page on light-mode devices).
  themeColor: "#0C0A09",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint so the dark default never flashes light.
 * Dark is the default: light only when the visitor explicitly chose it
 * with the toggle (the system preference is not consulted).
 */
const themeInitScript = `var t=null;try{t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})}catch(e){}if(t!=="light")document.documentElement.classList.add("dark")`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: the theme script may add `class="dark"`
    // before React hydrates — that mismatch is intentional.
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${inter.variable} font-sans bg-bg text-text antialiased min-h-dvh`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
