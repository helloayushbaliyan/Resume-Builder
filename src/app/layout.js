import { Inter } from 'next/font/google';
import "./globals.css";
import Providers from "@/components/Providers";
import { defaultSEO } from "@/config/seo";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  ...defaultSEO,
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
