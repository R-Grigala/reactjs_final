"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const page = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await fetch("https://fakestoreapi.com/users/3", {
          cache: "no-store",
        });
        const data = await resp.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className={styles.profileContainer}>Loading...</div>;
  }

  if (!user) {
    return <div className={styles.profileContainer}>Failed to load profile.</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h1>Welcome {user.username}!</h1>
      
      <div className={styles.section}>
        <h2>Details:</h2>
        <ul className={styles.list}>
          <li>
            <span className={styles.label}>firstname:</span> {user.name?.firstname}
          </li>
          <li>
            <span className={styles.label}>lastname:</span> {user.name?.lastname}
          </li>
          <li>
            <span className={styles.label}>phone:</span> {user.phone}
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Location:</h2>
        <ul className={styles.list}>
          <li>
            <span className={styles.label}>city:</span> {user.address?.city}
          </li>
          <li>
            <span className={styles.label}>street:</span> {user.address?.street}
          </li>
          <li>
            <span className={styles.label}>number:</span> {user.address?.number}
          </li>
          <li>
            <span className={styles.label}>zipcode:</span> {user.address?.zipcode}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default page;