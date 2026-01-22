'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const NavBar = () => {
    const pathname = usePathname();

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbardiv}>
                <Link 
                    href="/" 
                    className={pathname === '/' ? styles.activeTab : ''}
                >
                    Products
                </Link>
                <Link 
                    href="/profile" 
                    className={pathname === '/profile' ? styles.activeTab : ''}
                >
                    Profile
                </Link>
                <Link 
                    href="/cart" 
                    className={pathname === '/cart' ? styles.activeTab : ''}
                >
                    Cart
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;