'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useFetch from '@/hooks/useFetch';
import styles from './page.module.css';

const ProductsPage = () => {
    const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');
    const [selectedCategory, setSelectedCategory] = useState('all');

    if (loading) return (
        <div className={styles.loadingContainer}>
            <p className={styles.loadingText}>Loading...</p>
        </div>
    );
    
    if (error) return (
        <div className={styles.errorContainer}>
            <p className={styles.errorText}>Error fetching products: {error.message}</p>
        </div>
    );

    const categories = ['all', ...new Set(products.map(p => p.category))];
    const filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className={styles.container}>
            <div className={styles.filterContainer}>
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`${styles.filterBtn} ${selectedCategory === category ? styles.active : ''}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <main className={styles.main}>
                {filteredProducts.map(item => (
                    <div className={styles.itemWrapper} key={item.id}>
                        <Image
                            src={item.image}
                            width={100}
                            height={80}
                            alt={item.title}
                            style={{ objectFit: 'contain' }}
                        />
                        <div>
                            <h3 className={styles.title}>{item.title}</h3>
                            <p className={styles.desc}>{item.description}</p>
                        </div>
                        <Link href={`/products/${item.id}`}>
                            <p>See Details</p>
                        </Link>
                    </div>
                ))}
            </main>

            {filteredProducts.length === 0 && (
                <div className={styles.emptyState}>
                    <p className={styles.emptyText}>No products found</p>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;