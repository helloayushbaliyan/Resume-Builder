
"use client"
import { Provider } from "react-redux";
import "./globals.css";

import { Inter } from 'next/font/google';
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans ">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
