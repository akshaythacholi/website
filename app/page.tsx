import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import JobTicker from "./components/JobTicker";
import Story from "./components/Story";
import Stats from "./components/Stats";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import ReadinessQuiz from "./components/ReadinessQuiz";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://aiswaryaunni.com/#person",
      "name": "Aiswarya Unni",
      "jobTitle": "Career Transition Consultant",
      "description":
        "Dentist turned career consultant helping Indian doctors, dentists and pharmacists transition into high-paying corporate careers in pharma, MedTech and consulting.",
      "url": "https://aiswaryaunni.com",
      "email": "aishuunni@gmail.com",
      "image": "https://aiswaryaunni.com/images/hero.JPG",
      "knowsAbout": [
        "Career Coaching",
        "Resume Writing",
        "Interview Preparation",
        "Pharmaceutical Industry",
        "Medical Affairs",
        "LinkedIn Optimisation",
        "Corporate Career Strategy",
        "Medical Science Liaison",
      ],
      "sameAs": [
        "https://www.linkedin.com/in/aiswarya-unni",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://aiswaryaunni.com/#service",
      "name": "Aiswarya Unni Career Consulting",
      "description":
        "Career transition consulting for Indian doctors, dentists and pharmacists moving into corporate roles in pharma, MedTech and healthcare consulting.",
      "url": "https://aiswaryaunni.com",
      "provider": { "@id": "https://aiswaryaunni.com/#person" },
      "areaServed": "India",
      "serviceType": "Career Consulting",
      "priceRange": "Contact for pricing",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Career Consulting Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Resume & CV Coaching",
              "description": "Full CV and cover letter rewrite tailored for pharma and MedTech hiring managers.",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Interview Preparation",
              "description": "Live mock interviews, STAR method coaching, and commercial awareness preparation.",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corporate Career Strategy",
              "description": "Skills audit, target company research, and a 90-day action plan for your first corporate offer.",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "LinkedIn Optimisation",
              "description": "Full LinkedIn profile rewrite so pharma and MedTech recruiters find you.",
            },
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do I need corporate experience or connections to start?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. AstraZeneca, Novartis, Abbott, and IQVIA India actively recruit clinicians with zero corporate experience. They want your clinical knowledge — reframed in language they understand. That's exactly what we do.",
          },
        },
        {
          "@type": "Question",
          "name": "I don't know which corporate role suits me. Is that okay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "That's the most common starting point. Role clarity is part of the work. We map your background against real options — MSL, Medical Affairs, Regulatory, Health-Tech, Consulting — and find your best fit together.",
          },
        },
        {
          "@type": "Question",
          "name": "Won't I earn less in a corporate role than in practice?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Almost certainly not. MSL roles at Novartis start at ₹15–20 LPA. Medical Advisors at Abbott or GSK earn ₹18–25 LPA. Compare that to ₹8,000–20,000/month in clinical — with no on-calls and structured growth.",
          },
        },
        {
          "@type": "Question",
          "name": "How quickly can I realistically make the switch?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most clients get their first interview within 4–6 weeks. A confirmed offer typically comes within 60–90 days. The programme builds the targeted approach that makes this happen.",
          },
        },
        {
          "@type": "Question",
          "name": "I'm working full-time in a hospital. Can I still do this?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. All sessions are online — 60–90 minutes, once or twice a week, around your shifts and OPDs. You build the exit strategy while still employed. No resignation needed.",
          },
        },
        {
          "@type": "Question",
          "name": "I'm not in Mumbai or Delhi. Does location matter?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not at all. Everything is online. I've worked with doctors from Tier-2 cities, smaller towns, and abroad. If you have internet and ambition, location is never a barrier.",
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://aiswaryaunni.com/#website",
      "url": "https://aiswaryaunni.com",
      "name": "Aiswarya Unni",
      "description": "Career transition consulting for Indian medical professionals",
      "publisher": { "@id": "https://aiswaryaunni.com/#person" },
      "inLanguage": "en-IN",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Stats />
        <Testimonials />
        <JobTicker />
        <Services />
        <HowItWorks />
        <ReadinessQuiz />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
