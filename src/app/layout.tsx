// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "./globals.css";

// Import the CLIENT-SIDE wrapper that provides SessionProvider
import AuthProvider from '@/components/providers/Providers'; // ← adjust path if needed

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // optional — cleaner font usage
});

export const metadata: Metadata = {
  title: {
    default: 'International Journal of Interdisciplinary Organizational Studies',
    template: '%s | IJIOS', // child pages will have nice titles
  },
  description:
    'Exploring new possibilities in knowledge, culture and change management within the broader context of the nature and future of organizations and their impact on society.',
  keywords: [
    'organizational studies',
    'interdisciplinary research',
    'academic journal',
    'peer-reviewed',
    'open access',
    'management research',
    'knowledge management',
    'organizational change',
  ],
  authors: [{ name: 'CG Scholar' }],
  openGraph: {
    title: 'International Journal of Interdisciplinary Organizational Studies',
    description:
      'Exploring organizational dynamics through interdisciplinary research',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Optional: better mobile experience */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* You can add more meta tags here later (og:image, twitter, etc.) */}
      </head>

      <body className={`${inter.className} antialiased`}>
        {/* 
            Very important → SessionProvider must be inside a "use client" component
            We use the wrapper AuthProvider for that reason
        */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}