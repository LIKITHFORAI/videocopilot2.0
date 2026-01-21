import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Video Copilot',
  description: 'Conversational AI for Videos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
