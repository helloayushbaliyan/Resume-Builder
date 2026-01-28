
"use client"
import { Provider } from "react-redux";
import "./globals.css";

import { Inter } from 'next/font/google';
import store from "@/redux/store";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans ">
        <Provider store={store}>
          {children}

        </Provider>
      </body>
    </html>
  );
}
