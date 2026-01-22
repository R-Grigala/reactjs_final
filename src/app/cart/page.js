'use client';
import CartItem from '@/components/cartItem/CartItem';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

function CartPage() {
    const [cartData, setCartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    const fetchCartData = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://fakestoreapi.com/carts/1');
            const result = await response.json();
            
            // Fetch product details for each item to get prices
            const productsWithPrices = await Promise.all(
                result.products.map(async (item) => {
                    const productRes = await fetch(
                        `https://fakestoreapi.com/products/${item.productId}`
                    );
                    const product = await productRes.json();
                    return {
                        ...item,
                        price: product.price
                    };
                })
            );
            
            setCartData(productsWithPrices);
            setError(null);
        } catch (err) {
            setError('Error loading cart');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Calculate total price whenever cartData changes
    useEffect(() => {
        if (cartData && cartData.length > 0) {
            const total = cartData.reduce((sum, item) => {
                return sum + (item.price * item.quantity);
            }, 0);
            setTotalPrice(total);
        } else {
            setTotalPrice(0);
        }
    }, [cartData]);

    useEffect(() => {
        fetchCartData();
    }, []);

    if (loading) return (
        <div className={styles.loadingContainer}>
            <p>Loading cart...</p>
        </div>
    );

    if (error) return (
        <div className={styles.errorContainer}>
            <p>{error}</p>
        </div>
    );

    if (!cartData || cartData.length === 0) return (
        <div className={styles.emptyContainer}>
            <p>Your cart is empty</p>
        </div>
    );

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Shopping Cart</h1>
                <div className={styles.cartItems}>
                    {cartData.map((item) => (
                        <CartItem
                            key={item.productId}
                            item={item}
                            cartData={cartData}
                            setCartData={setCartData}
                        />
                    ))}
                </div>
                <div className={styles.summary}>
                    <div className={styles.totalPrice}>
                        <span>Total Price:</span>
                        <span className={styles.price}>${totalPrice.toFixed(2)}</span>
                    </div>
                    <button className={styles.checkoutBtn}>Proceed to Checkout</button>
                </div>
            </div>
        </main>
    );
}

export default CartPage;