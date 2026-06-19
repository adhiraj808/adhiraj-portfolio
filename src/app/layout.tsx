import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import PetCursor from "@/components/common/PetCursor";
import ClickSpark from "@/components/common/ClickSpark";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adhiraj Mishra | AIML Engineer Portfolio",
  description:
    "Portfolio of Adhiraj Mishra, B-Tech CSE (AIML) student focused on AI, machine learning, and responsive web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${orbitron.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <PetCursor pet="cat" />
        <ClickSpark sparkColor="#fff" sparkSize={6} sparkRadius={20} sparkCount={8} duration={400} />
      </body>
    </html>
  );
}
