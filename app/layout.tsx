import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import { ClerkProvider } from '@clerk/nextjs'
import { APP_DESCRIPTION, APP_NAME } from "@/data/constants";
import { Toaster } from "@/components/ui/toaster"

const font = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="google-adsense-account" content="ca-pub-1509079417546074"></meta>
        </head>
        <body className={font.className}>
          <header className="sticky top-0 z-50 w-full">
            <Header />
          </header>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
