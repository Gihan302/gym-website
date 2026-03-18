import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

// ━━━ STEP 8: app/layout.tsx ━━━

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-primary",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fitness Gym | Push Your Limits",
  description: "Elite training and world-class equipment. Join the gym that transforms lives. Premium coaching, modern facilities, and a dedicated community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${oswald.variable}`}>
      <body className="antialiased">
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
