import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function BuilderLayout({ children }) {
    return (
        <div className="builder-layout">
            <Header />
            {children}
            <Footer />
        </div>
    );
}