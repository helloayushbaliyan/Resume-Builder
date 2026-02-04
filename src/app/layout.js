import { Inter } from 'next/font/google';
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: {
    template: '%s | Cvee',
    default: 'Cvee Resume Builder',
  },
  description: 'Cvee is a resume builder that helps you create professional resumes in minutes.',
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
