import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
// import PetCursor from "@/components/common/PetCursor";
import ClickSpark from "@/components/common/ClickSpark";
import { ThemeProvider } from "@/components/theme-provider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adhirajmishra.tech"),
  title: {
    default: "Adhiraj Mishra | AIML Engineer Portfolio",
    template: "%s | Adhiraj Mishra",
  },
  description:
    "Portfolio of Adhiraj Mishra, B-Tech CSE (AIML) student focused on AI, machine learning, and responsive web development.",
  keywords: [
    "Adhiraj Mishra",
    "AIML Engineer",
    "Machine Learning Portfolio",
    "Software Engineer",
    "B-Tech CSE AIML",
    "Deep Learning",
    "YOLOv3 Object Detection",
    "MediAI AI Assistant",
    "Portfolio"
  ],
  authors: [{ name: "Adhiraj Mishra", url: "https://github.com/adhiraj808" }],
  creator: "Adhiraj Mishra",
  publisher: "Adhiraj Mishra",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adhirajmishra.tech",
    title: "Adhiraj Mishra | AIML Engineer Portfolio",
    description:
      "Portfolio of Adhiraj Mishra, B-Tech CSE (AIML) student focused on AI, machine learning, and responsive web development.",
    siteName: "Adhiraj Mishra Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Adhiraj Mishra | AIML Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adhiraj Mishra | AIML Engineer Portfolio",
    description:
      "Portfolio of Adhiraj Mishra, B-Tech CSE (AIML) student focused on AI, machine learning, and responsive web development.",
    images: ["https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1200"],
    creator: "@adhiraj808",
  },
  alternates: {
    canonical: "https://adhirajmishra.tech",
  },
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="hidden lg:block">
            {/* <PetCursor pet="cat" /> */}
          </div>
          <ClickSpark
            sparkColor="var(--cyan)"
            sparkSize={6}
            sparkRadius={20}
            sparkCount={8}
            duration={400}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
