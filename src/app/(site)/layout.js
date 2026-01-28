import Header from "@/components/Header";
import "../globals.css";

import { Inter } from 'next/font/google';
import Footer from "@/components/Footer";

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});



export default function SiteLayout({ children }) {
    return (
        <>
            <Header />
            <div className="min-h-screen">{children}</div>
            <Footer />
        </>
    );
}
