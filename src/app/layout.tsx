import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'International Journal of Interdisciplinary Organizational Studies',
  description: 'Exploring new possibilities in knowledge, culture and change management within the broader context of the nature and future of organizations and their impact on society.',
  keywords: [
    'organizational studies',
    'interdisciplinary research',
    'academic journal',
    'peer-reviewed',
    'open access',
    'management research',
  ],
  authors: [{ name: 'CG Scholar' }],
  openGraph: {
    title: 'International Journal of Interdisciplinary Organizational Studies',
    description: 'Exploring organizational dynamics through interdisciplinary research',
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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}