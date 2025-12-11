import { Lexend, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Script from "next/script";

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
    default: "Xtreme Gen AI",
    template: "%s | Xtreme Gen AI"
  },
  description: "Discover the power of Xtreme Gen AI, the ultimate AI platform for businesses and individuals. From lead generation and sales assistance to content creation and feedback collection, Xtreme Gen AI delivers cutting-edge solutions tailored to your needs. Enhance productivity, automate workflows, and unlock new growth opportunities with our advanced AI-driven tools. Explore features like real-time analytics, seamless integration, and customizable solutions designed to scale with your business. Experience the future of AI—start your journey with Xtreme Gen AI today!",
  keywords: ["AI", "customer support", "chatbot", "IVR ai", "text-to-speech", "Voice AI", "Xtreme Gen AI"],
  authors: [{ name: "Anshuman Singh" }],
  creator: "Anshuman Singh",
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
    url: "https://xtreme-gen-ai.com",
    siteName: "Xtreme Gen AI",
    title: "Xtreme Gen AI - Call The Future Now",
    description: "Discover the power of Xtreme Gen AI, the ultimate AI platform for businesses and individuals. From lead generation and sales assistance to content creation and feedback collection, Xtreme Gen AI delivers cutting-edge solutions tailored to your needs. Enhance productivity, automate workflows, and unlock new growth opportunities with our advanced AI-driven tools. Explore features like real-time analytics, seamless integration, and customizable solutions designed to scale with your business. Experience the future of AI—start your journey with Xtreme Gen AI today!",
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
