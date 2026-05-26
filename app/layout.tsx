import type { Metadata } from "next";
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
  description: "Helping professionals land their dream corporate job. Book a free discovery call today.",
  metadataBase: new URL("https://aiswaryaunni.com"),
  openGraph: {
    title: "Aiswarya Unni | Career Consultant",
    description: "I made the leap. Now I'll help you make yours.",
    url: "https://aiswaryaunni.com",
    siteName: "Aiswarya Unni",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
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
