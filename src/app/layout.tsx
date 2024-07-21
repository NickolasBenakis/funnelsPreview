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
      <link rel="icon" href="/favicon/favicon-16x16.png" />
      <link
        rel="apple-touch-startup-image"
        href="/favicon/apple-touch-icon.png"
        sizes="512x512"
      />
      <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
      <meta name="application-name" content="Funnels Preview" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="PWA App" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#FBF7EF" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#FBF7EF" />
      <link rel="manifest" href="/manifest.json" />

      <link
        rel="apple-touch-startup-image"
        href="/favicon/apple-touch-icon.png"
        sizes="2048x2732"
      />
      <link
        rel="apple-touch-startup-image"
        href="/favicon/apple-touch-icon.png"
        sizes="1668x2224"
      />
      <link
        rel="apple-touch-startup-image"
        href="/favicon/apple-touch-icon.png"
        sizes="1536x2048"
      />
      <link
        rel="apple-touch-startup-image"
        href="/favicon/apple-touch-icon.png"
        sizes="1125x2436"
      />
      <link
        rel="apple-touch-startup-image"
        href="/favicon/apple-touch-icon.png"
        sizes="1242x2208"
      />
      <link
        rel="apple-touch-startup-image"
        href="/favicon/apple-touch-icon.png"
        sizes="750x1334"
      />
      <link
        rel="apple-touch-startup-image"
        href="/favicon/apple-touch-icon.png"
        sizes="640x1136"
      />

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
