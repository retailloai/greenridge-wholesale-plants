import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Greenridge Wholesale Plants | Trade Plant Supplier Australia",
  description:
    "Premium wholesale plant website prototype for trade buyers with approved buyer catalogue, product detail, trade application and quote request flow.",
  keywords: [
    "wholesale plants Australia",
    "wholesale tissue culture plants",
    "trade plant supplier",
    "wholesale indoor plants",
    "bulk landscape plants",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
