import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wholesale Green Co | Wholesale Plants Australia",
  description:
    "Premium wholesale plant catalogue for trade buyers, landscapers, retailers, designers and bulk buyers across Australia.",
  keywords: [
    "wholesale plants Australia",
    "wholesale tissue culture plants",
    "wholesale indoor plants",
    "bulk landscape plants",
    "trade plant supplier Melbourne"
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WholesaleStore",
    name: "Wholesale Green Co",
    url: "https://www.wholesalegreenco.com",
    areaServed: ["Melbourne", "Victoria", "Australia"],
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {children}
      </body>
    </html>
  );
}
