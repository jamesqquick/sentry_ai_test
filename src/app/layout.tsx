import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

import { Raleway } from 'next/font/google';
const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI Test',
  description: 'Can AI Fix this?',
  openGraph: {
    images: [
      {
        url: '/logo-wide.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={raleway.className}>
      <body className="">
        <div className="flex min-h-screen justify-center items-center bg-gray-900">
          <div>{children}</div>
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        </div>
      </body>
    </html>
  );
}
