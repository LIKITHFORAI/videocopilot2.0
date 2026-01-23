import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/components/Auth/AuthProvider';

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
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
