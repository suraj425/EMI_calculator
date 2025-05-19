
import type { Metadata } from 'next';
import { Inter as Geist } from 'next/font/google'; // Using Inter as a placeholder for Geist if Geist causes issues, otherwise Geist/Geist_Mono is fine
import { Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://placehold.co'; // Replace with your actual domain in Vercel/Netlify env vars

export const metadata: Metadata = {
  title: 'EMI Calculator - Calculate Loan EMIs & Compare Bank Rates',
  description: 'Easily calculate your Equated Monthly Installment (EMI) for home loans, car loans, personal loans. Compare current interest rates from top Indian banks and apply online. Free, fast, and accurate EMI calculator.',
  keywords: ['EMI calculator', 'loan calculator', 'personal loan EMI', 'home loan EMI', 'car loan EMI', 'interest rates', 'bank loans', 'loan comparison', 'India', 'finance', 'mortgage calculator', 'online EMI calculator'],
  openGraph: {
    title: 'EMI Calculator - Calculate Loan EMIs & Compare Bank Rates',
    description: 'Easily calculate your Equated Monthly Installment (EMI) for home loans, car loans, personal loans. Compare current interest rates from top Indian banks and apply online.',
    url: siteUrl,
    siteName: 'EMI Calculator',
    images: [
      {
        url: 'https://placehold.co/1200x630.png?text=EMI+Calculator', // Replace with a relevant image
        width: 1200,
        height: 630,
        alt: 'EMI Calculator - Loan Planning Tool',
        'data-ai-hint': 'social media finance',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMI Calculator - Calculate Loan EMIs & Compare Bank Rates',
    description: 'Easily calculate your Equated Monthly Installment (EMI) for home loans, car loans, personal loans. Compare current interest rates from top Indian banks and apply online.',
    // images: ['https://placehold.co/1200x630.png?text=EMI+Calculator'], // Replace with a relevant image,
  },
  robots: { // Optional: good for SEO
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
  // icons: { // Optional: Add favicon details
  //   icon: '/favicon.ico',
  //   apple: '/apple-touch-icon.png',
  // },
  // verification: { // Optional: For Google Search Console, etc.
  //   google: 'your-google-site-verification-code',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
