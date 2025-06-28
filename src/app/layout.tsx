import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { NotificationContainer } from "./_components/ui/NotificationContainer";

export const metadata: Metadata = {
  title: "DigiConvo - AI Conversation Practice",
  description: "Practice difficult conversations with AI-powered emotional intelligence",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body 
        className="bg-gray-50 font-sans antialiased"
        suppressHydrationWarning={true}
      >
        <TRPCReactProvider>
          {children}
          <NotificationContainer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
