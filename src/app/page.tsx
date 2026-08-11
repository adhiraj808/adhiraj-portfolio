import { PortfolioSite } from "@/components/layout/portfolio-site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Adhiraj Mishra",
    "url": "https://adhirajmishra.tech",
    "image": "https://github.com/adhiraj808.png",
    "sameAs": [
      "https://github.com/adhiraj808",
      "https://vkrehealth-in.vercel.app"
    ],
    "jobTitle": "AIML Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "description": "Portfolio of Adhiraj Mishra, B-Tech CSE (AIML) student focused on AI, machine learning, and responsive web development.",
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "YOLOv3",
      "Python",
      "PyTorch",
      "Scikit-learn",
      "React",
      "Next.js",
      "Node.js",
      "SQL"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "B-Tech CSE (AIML)"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <PortfolioSite />
    </>
  );
}
