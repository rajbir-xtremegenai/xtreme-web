import { Lexend, Outfit } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Xtreme Gen AI",
  description: "Empowering businesses to rapidly build & deploy AI agents",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lexend.variable} ${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
