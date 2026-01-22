import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <a href="/products">Products</a>
                <a href="/profile">Profile</a>
                <a href="/cart">Cart</a>
            </div>
            <p className={styles.copy}>&copy; {new Date().getFullYear()} Store. All rights reserved.</p>
        </footer>
    );
};

export default Footer;