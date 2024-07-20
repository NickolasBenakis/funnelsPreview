import "@/styles/globals.css";

import { Navbar } from "@/components/navbar/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { fonts } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const generateMetadata = (): Metadata => ({
  title: {
    default: "Funnels Preview",
    template: "Funnels Preview",
  },
  description: "Funnels Preview",
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
});

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang={"en"} suppressHydrationWarning={true}>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body className={cn("min-h-screen font-sans", fonts)}>
        <ThemeProvider attribute="class">
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
