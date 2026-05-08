import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Greenridge Wholesale Plants | Trade Plant Supplier Australia",
  description:
    "Premium wholesale plant catalogue for trade buyers, landscapers, retailers, designers and bulk buyers across Australia.",
  keywords: [
    "wholesale plants Australia",
    "wholesale tissue culture plants",
    "wholesale indoor plants",
    "bulk landscape plants",
    "trade plant supplier Melbourne",
    "plants for landscapers",
  ],
  openGraph: {
    title: "Greenridge Wholesale Plants",
    description:
      "Trade-only wholesale plant catalogue with protected buyer pricing and bulk quote flow.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WholesaleStore",
    name: "Greenridge Wholesale Plants",
    description:
      "Wholesale plant catalogue for retailers, landscapers, designers, growers and bulk trade buyers across Australia.",
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
