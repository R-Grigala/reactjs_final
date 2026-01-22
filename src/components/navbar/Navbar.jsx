'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';

const NavBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        checkAuthStatus();
    }, []);

    const checkAuthStatus = () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken');
            const savedUsername = localStorage.getItem('username');
            if (token) {
                setIsLoggedIn(true);
                setUsername(savedUsername || 'User');
            } else {
                setIsLoggedIn(false);
                setUsername('');
            }
        }
    };

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            // Clear all auth-related data from localStorage
            localStorage.removeItem('authToken');
            localStorage.removeItem('username');
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('cart');
            
            // Dispatch custom event to update navbar
            window.dispatchEvent(new Event('authChange'));
        }
        setIsLoggedIn(false);
        setUsername('');
        router.push('/login');
    };

    // Listen for auth changes (login/logout)
    useEffect(() => {
        const handleAuthChange = () => {
            checkAuthStatus();
        };

        const handleStorageChange = () => {
            checkAuthStatus();
        };

        // Custom event for same-tab changes
        window.addEventListener('authChange', handleAuthChange);
        
        // Storage event for cross-tab changes
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('authChange', handleAuthChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    if (!mounted) return null;

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbardiv}>
                <div className={styles.navLinks}>
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

                <div className={styles.authSection}>
                    {isLoggedIn ? (
                        <>
                            <span className={styles.username}>Hello, {username}!</span>
                            <button 
                                onClick={handleLogout}
                                className={styles.logoutBtn}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className={styles.loginBtn}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;