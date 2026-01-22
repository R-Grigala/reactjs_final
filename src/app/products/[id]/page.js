'use client';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProductPage() {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // add-to-cart state
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((resp) => {
        if (!resp.ok) throw new Error('Failed to fetch product');
        return resp.json();
      })
      .then((res) => setSingleProduct(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const addToCart = () => {
    if (!singleProduct) return;
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existing = cart.find((c) => c.productId === singleProduct.id);
      if (existing) {
        existing.quantity = Math.min(10, existing.quantity + quantity);
      } else {
        cart.push({ productId: singleProduct.id, quantity });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    } catch (e) {
      console.error('Add to cart failed', e);
    }
  };

  if (loading) return <div className={styles.productLoading}>პროდუქტი იტვირთება...</div>;
  if (error) return <div className={styles.productError}>Ошибка: {error}</div>;
  if (!singleProduct) return null;

  const rating = singleProduct.rating || { rate: 0, count: 0 };

  return (
    <div className={styles.productContainer}>
      <Image
        src={singleProduct.image}
        width={300}
        height={300}
        alt={singleProduct.title}
        style={{ objectFit: 'contain' }}
      />

      <div>
        <h3 className={styles.title}>{singleProduct.title}</h3>

        <p className={styles.desc}>{singleProduct.description}</p>

        <div className={styles.meta}>
          <span className={styles.category}>{singleProduct.category}</span>
          <span className={styles.price}>${singleProduct.price}</span>
          <span className={styles.rating}>⭐ {rating.rate}</span>
          <span className={styles.reviews}>{rating.count} reviews</span>
        </div>

        <div className={styles.actions}>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            aria-label="Quantity"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <button className={styles.buyBtn} onClick={addToCart}>
            {added ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}