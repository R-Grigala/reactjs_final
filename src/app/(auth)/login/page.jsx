"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "@/lib/hooks";
import { updateUser } from "@/lib/slices/userSlice";

// Yup validation schema
const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("სახელი აუცილებელია")
    .min(3, "სახელი უნდა იყოს მინიმუმ 3 სიმბოლო"),
  password: yup
    .string()
    .required("პაროლი აუცილებელია")
    .min(4, "პაროლი უნდა იყოს მინიმუმ 4 სიმბოლო"),
  rememberMe: yup.boolean(),
});

function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "m38rmF$",
      rememberMe: false,
    },
  });

  // Check for saved credentials on mount
  useEffect(() => {
    setMounted(true);
    const savedUsername = localStorage.getItem("savedUsername");
    const savedToken = localStorage.getItem("authToken");
    
    if (savedToken) {
      router.push("/");
      return;
    }

    if (savedUsername) {
      setValue("username", savedUsername);
      setValue("rememberMe", true);
    }
  }, [router, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Step 1: Login to get token
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error("მოხდა შეცდომა: არასწორი სახელი ან პაროლი");
      }

      const result = await response.json();

      // Step 2: Fetch user data
      const userdata = await fetch("https://fakestoreapi.com/users/1");
      const parsedUserdata = await userdata.json();

      // Step 3: Save token and user data
      if (result?.token) {
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("username", data.username);

        // Save credentials if "Remember me" is checked
        if (data.rememberMe) {
          localStorage.setItem("savedUsername", data.username);
        } else {
          localStorage.removeItem("savedUsername");
        }

        // Step 4: Save user to Redux store
        dispatch(updateUser(parsedUserdata));

        // Dispatch auth change event for navbar
        window.dispatchEvent(new Event("authChange"));

        // Step 5: Redirect
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className={styles.main}>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.signin}>Sign In</h3>
        <p className={styles.desc}>please sign in to access market.</p>

        {/* Username input */}
        <div>
          <input
            placeholder="username"
            className={styles.input}
            {...register("username")}
          />
          {errors.username && (
            <p className={styles.errorMessage}>{errors.username.message}</p>
          )}
        </div>

        {/* Password input with toggle visibility */}
        <div>
          <input
            placeholder="password"
            type={passwordVisible ? "text" : "password"}
            className={styles.input}
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
        </div>

        {/* Toggle password visibility button */}
        <button
          type="button"
          className={styles.passwordToggle}
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          {passwordVisible ? "Hide password" : "See password"}
        </button>

        {/* Remember me checkbox */}
        <div className={styles.rememberMe}>
          <input
            type="checkbox"
            id="rememberMe"
            className={styles.rememberMeInput}
            {...register("rememberMe")}
          />
          <label htmlFor="rememberMe" className={styles.rememberMeLabel}>
            Remember me
          </label>
        </div>

        {/* Submit button */}
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>

        {/* Register link */}
        <Link href="/register">
          <button type="button" className={styles.notRegistered}>
            Don't have an account? Register
          </button>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;