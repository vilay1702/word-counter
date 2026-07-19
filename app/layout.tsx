import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import {
  PAGE_TITLE,
  THEME_STORAGE_KEY,
  TOOL_DESCRIPTION,
  TOOL_NAME,
} from "@/lib/brand";
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0A09" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint so a stored dark preference never flashes light.
 * Stored choice wins; absent means "follow the system".
 */
const themeInitScript = `try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

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
      </body>
    </html>
  );
}
