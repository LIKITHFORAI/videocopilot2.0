import type { Metadata } from 'next';
import './globals.css';
import AuthContext from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'DrCloudEHR GTD',
  description: 'AI-Powered Video Intelligence for Healthcare',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
