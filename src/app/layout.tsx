import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TermsZipp - Free Privacy Policy & Terms Generator",
  description: "Generate professional privacy policies, terms of service, cookie policies, and other legal documents for your website in seconds. Free and easy to use.",
  keywords: "privacy policy generator, terms of service generator, terms and conditions, cookie policy, GDPR, legal documents, website policy",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "TermsZipp - Free Privacy Policy & Terms Generator",
    description: "Generate professional privacy policies, terms of service, and other legal documents for your website in seconds.",
    url: "https://termszipp.com",
    siteName: "TermsZipp",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TermsZipp - Legal Document Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TermsZipp - Free Privacy Policy & Terms Generator",
    description: "Generate professional legal documents for your website in seconds.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
