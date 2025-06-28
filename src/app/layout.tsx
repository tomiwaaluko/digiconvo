import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { NotificationContainer } from "./_components/ui/NotificationContainer";
import { ThemeProvider } from "./_components/theme";

export const metadata: Metadata = {
  title: "DigiConvo - AI Conversation Practice",
  description:
    "Practice difficult conversations with AI-powered emotional intelligence",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body
        className="bg-gray-50 font-sans antialiased dark:bg-gray-950"
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <TRPCReactProvider>
            {children}
            <NotificationContainer />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
