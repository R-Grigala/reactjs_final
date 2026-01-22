'use client';
import React, { useEffect, useState } from 'react';
import styles from './CartItem.module.css';
import Image from 'next/image';
import Link from 'next/link';

function CartItem({ item, cartData, setCartData }) {
    const [cartItem, setCartItem] = useState(null);
    const [number, setNumber] = useState(item.quantity);

    const fetchCartItem = async () => {
        const res = await fetch(
            `https://fakestoreapi.com/products/${item.productId}`
        );
        const resp = await res.json();
        return setCartItem(resp);
    };

    const handleClick = (event) => {
        let newQuantity = number;
        
        if (event === '-' && number > 1) {
            newQuantity = number - 1;
            setNumber(newQuantity);
        } else if (event === '+' && number < 10) {
            newQuantity = number + 1;
            setNumber(newQuantity);
        }
        
        updateCartData(newQuantity);
    };

    const updateCartData = (newQuantity) => {
        const updatedCart = cartData.map(cartItem =>
            cartItem.productId === item.productId
                ? { ...cartItem, quantity: newQuantity }
                : cartItem
        );
        setCartData(updatedCart);
    };

    const handleDelete = async (id) => {
        const response = await fetch('https://fakestoreapi.com/carts/1', {
            method: 'DELETE',
        });
        const result = await response.json();
        if (result?.date) {
            setCartData(cartData.filter((item) => item.productId !== id));
        }
    };

    useEffect(() => {
        fetchCartItem();
    }, []);

    if (!cartItem) {
        return <div className={styles.loading}>ჩატვირთვა...</div>;
    }

    return (
        <div className={styles.cartItem}>
            <div className={styles.cartHeadWrapper}>
                <Link href={`/products/${item.productId}`}>
                    <Image
                        src={cartItem.image}
                        width={80}
                        height={90}
                        alt={cartItem.title}
                    />
                </Link>
                <div className={styles.cartImgTextWrapper}>
                    <p className={styles.title}>{cartItem.title}</p>
                    <h5 className={styles.category}>{cartItem.category}</h5>
                </div>
            </div>
            <div className={styles.cartBodyWrapper}>
                <div className={styles.cartQuantityContainer}>
                    <button
                        disabled={number === 1}
                        className={styles.minus}
                        onClick={() => handleClick('-')}
                    >
                        -
                    </button>
                    <p className={styles.quantity}>{number}</p>
                    <button
                        disabled={number === 10}
                        className={styles.plus}
                        onClick={() => handleClick('+')}
                    >
                        +
                    </button>
                </div>
                <div className={styles.price}>
                    <span>${(cartItem.price * number).toFixed(2)}</span>
                </div>
                <div className={styles.deleteBtn}>
                    <button 
                        onClick={() => handleDelete(item.productId)}
                        aria-label="Delete item"
                    >
                        <Image 
                            src="/bin.svg" 
                            width={20} 
                            height={20} 
                            alt="delete" 
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;