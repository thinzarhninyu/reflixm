import type { Metadata } from "next";
import { Fresca, Inter, Markazi_Text, Palanquin_Dark, Poppins, Raleway, Sofia_Sans, Space_Grotesk, Tienne } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import { ClerkProvider } from '@clerk/nextjs'
import { DM_Sans } from "next/font/google";
import { APP_NAME } from "@/data/constants";

const inter = Inter({ subsets: ["latin"] });
// const font = DM_Sans({ subsets: ["latin"], weight: "700" });
// const font = Markazi_Text({ subsets: ["latin"], weight: "700"});
// const font = Space_Grotesk({ subsets: ["latin"], weight: "700" });
// const font = Poppins({ subsets: ["latin"], weight: "500" });
const font = Raleway({ subsets: ["latin"], weight: "700" });

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Review for Shows",
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
        </body>
      </html>
    </ClerkProvider>
  );
}
