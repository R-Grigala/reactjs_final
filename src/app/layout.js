import NavBar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

export default function Layout({ children }) {
    return (
        <html>
            <body>
                <NavBar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}