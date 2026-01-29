import { Inter } from 'next/font/google';
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: {
    template: '%s | Resume Builder',
    default: 'Resume Builder',
  },
  description: 'Create professional resumes in minutes with our easy-to-use resume builder.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans ">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
