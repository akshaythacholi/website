import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aiswarya Unni | Career Consultant | Dentist to Corporate",
  description:
    "Aiswarya Unni helps Indian doctors, dentists and pharmacists transition into high-paying corporate careers in pharma, MedTech and consulting. Book a 30-minute discovery call today.",
  metadataBase: new URL("https://aiswaryaunni.com"),
  keywords: [
    "career consultant India",
    "dentist to corporate",
    "doctor corporate career India",
    "pharma career for doctors",
    "MSL career India",
    "medical affairs jobs India",
    "career transition consultant",
    "clinical to corporate India",
    "MBBS corporate job",
    "BDS corporate career",
    "pharmacist corporate career",
    "medical science liaison India",
    "healthcare consulting career",
    "career coach for doctors India",
  ],
  authors: [{ name: "Aiswarya Unni", url: "https://aiswaryaunni.com" }],
  creator: "Aiswarya Unni",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Aiswarya Unni | Career Consultant | Dentist to Corporate",
    description:
      "Helping Indian doctors, dentists and pharmacists land high-paying corporate careers in pharma, MedTech and consulting. Book a 30-minute discovery call.",
    url: "https://aiswaryaunni.com",
    siteName: "Aiswarya Unni",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aiswarya Unni | Career Consultant | Dentist to Corporate",
    description:
      "Helping Indian doctors, dentists and pharmacists land high-paying corporate careers in pharma, MedTech and consulting.",
    creator: "@aiswaryaunni",
  },
  formatDetection: { telephone: false, email: false },
  alternates: {
    canonical: "https://aiswaryaunni.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#1D1D1F" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakartaSans.variable} ${playfair.variable}`}>
      <body className="font-sans bg-white text-ink antialiased">
        <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.9 }}>
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
