import { Lexend, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ConditionalLayout from "./components/ConditionalLayout";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Call The Future Now: Human-Like AI Agents by Xtreme Gen AI",
    template: "%s | Xtreme Gen AI"
  },
  description: "Empowering 50+ brands to rapidly build & deploy 24/7, language-neutral, CRM-integrated voice AI agents. Low latency & interruption handling.",
  keywords: ["AI", "customer support", "chatbot", "IVR ai", "text-to-speech", "Voice AI", "Xtreme Gen AI", "AI Agents", "Automation"],
  authors: [{ name: "Xtreme Gen AI" }],
  creator: "Xtreme Gen AI",
  publisher: "Xtreme Gen AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://xtremegenai.com",
    siteName: "Xtreme Gen AI",
    title: "Call The Future Now: Human-Like AI Agents by Xtreme Gen AI",
    description: "Empowering 50+ brands to rapidly build & deploy 24/7, language-neutral, CRM-integrated voice AI agents. Low latency & interruption handling.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Xtreme Gen AI",
      },
    ],
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-944394587"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-944394587');
            console.log("✅ Google Ads gtag fired with ID: AW-944394587");
          `}
        </Script>
      </head>
      <body className={`${lexend.variable} ${outfit.variable} antialiased`}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
