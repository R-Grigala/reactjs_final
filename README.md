# 🛒 Shopify – Next.js E‑Commerce Project

Live Demo: [https://shopify-tawny-beta.vercel.app/](https://shopify-tawny-beta.vercel.app/)
GitHub Repository: [https://github.com/R-Grigala/reactjs_final](https://github.com/R-Grigala/reactjs_final)

---

## 📌 Project Overview

This project is a **full-featured e‑commerce web application** built with **Next.js (App Router)** as part of a midterm/final assignment. The application demonstrates modern React and Next.js concepts including **client & server components, routing, data fetching, authentication, Redux state management**, and form validation.

The project uses the **Fake Store API** as a backend for products, users, carts, and authentication.

---

## 🚀 Tech Stack

* **Next.js 13+ (App Router)**
* **React**
* **Redux Toolkit** (Cart management)
* **React Hook Form** + **Yup** (Form validation)
* **Tailwind CSS / CSS Modules**
* **Fake Store API**
* **Vercel** (Deployment)


## 🧭 Navigation

* **Products** – Product listing (default page)
* **Product Details** – Dynamic route (`products/details/[id]`)
* **Profile** – Server-side fetched user profile
* **Cart** – Redux-powered cart functionality
* **Login / Register** – Authentication system

Navigation is handled using **Next.js App Router** and accessible via the **NavBar**.

---

## 🛍️ Products Page

* Fetches products from:
  `https://fakestoreapi.com/products`
* Displays product list with image, title, and description
* Category filtering
* Navigation to product details page

### Product Details Page

* Dynamic route: `/products/details/[id]`
* Fetches single product:
  `https://fakestoreapi.com/products/1`
* Displays:

  * Image
  * Title
  * Description
  * Price
  * Category
  * Rating & rating count

---

## 👤 Profile Page

* Fetches user data from:
  `https://fakestoreapi.com/users/3`
* Uses **Server-Side Fetching**
* Displays user profile information (design optional)

---

## 🛒 Cart Page

* Fetches initial cart data from:
  `https://fakestoreapi.com/carts/2`
* Fully managed with **Redux Toolkit**
* Features:

  * Add product to cart
  * Increase / decrease quantity (1–10)
  * Remove product
  * Total product count
  * Total price calculation

---

## 🔐 Authentication

### Login Page

* Endpoint used:
  `https://fakestoreapi.com/auth/login`
* Example credentials:

```json
{
  "username": "johnd",
  "password": "m38rmF$"
}
```

* Form handling with **react-hook-form**
* Validation with **Yup**
* "Remember Me" checkbox:

  * Saves token to `localStorage`
  * Automatically authorizes user on next visit

### Registration Page

* User registration functionality implemented

---

## ⚙️ State Management

* **Redux Toolkit** is used for cart state
* Global state includes:

  * Cart items
  * Product quantity
  * Total items count
  * Total payable amount

---

## 🌐 Deployment

* Project deployed on **Vercel**
* Live URL provided in submission
* Optimized for production build

---

## 📦 Installation & Setup

```bash
# Clone repository
git clone https://github.com/R-Grigala/reactjs_final.git

# Install dependencies
npm install

# Run development server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 📝 Assignment Requirements Checklist

✅ Next.js project with `src` directory
✅ App Router navigation
✅ useState & useEffect hooks
✅ Fetch API usage
✅ Products & Product Details pages
✅ Server-side fetching (Profile)
✅ Redux Cart functionality
✅ Authentication (Login & Register)
✅ Form validation (Yup + React Hook Form)
✅ GitHub repository with multiple commits
✅ Deployed on Vercel

---

## 👨‍💻 Author

**Roma Grigalashvili**
GitHub: [https://github.com/R-Grigala](https://github.com/R-Grigala)

---

⭐ If you like this project, feel free to star the repository!
