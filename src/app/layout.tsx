import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const oswald = Oswald({
  subsets:  ["latin"],
  weight:   ["400", "500", "600", "700"],
  variable: "--font-primary",
  display:  "swap",
});

export const metadata: Metadata = {
  title:       "Fitness Gym | Push Your Limits",
  description: "Elite training and world-class equipment. Join the gym that transforms lives.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /*
      ── KEY FIX ──────────────────────────────────────────────
      DO NOT put className on <html>.
      next-themes needs full control of <html> to add/remove
      the "dark" class. If React also controls className on
      <html>, they conflict and the .dark class never applies
      reliably — which is why light mode was broken.

      Instead: put the font variable on <body> so Oswald loads
      correctly AND next-themes can freely manage <html>.
      ─────────────────────────────────────────────────────── */
    <html lang="en" suppressHydrationWarning>
      <body className={`${oswald.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="gym-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}