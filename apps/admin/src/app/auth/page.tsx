"use client";

import { useState } from "react";
import styles from "./auth.module.css";
import { signupUser, loginUser } from "@/lib/actions";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signup");
  const [error, setError] = useState("");

  async function handleSignup(formData: FormData) {
    try {
      await signupUser(formData);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleLogin(formData: FormData) {
    try {
      await loginUser(formData);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className={styles.formWrap}>
      <div className={styles.tabs}>
        <h3 className={styles.signupTab}>
          <a
            className={activeTab === "signup" ? styles.active : ""}
            onClick={() => setActiveTab("signup")}
          >
            הרשמה
          </a>
        </h3>
        <h3 className={styles.loginTab}>
          <a
            className={activeTab === "login" ? styles.active : ""}
            onClick={() => setActiveTab("login")}
          >
            התחברות
          </a>
        </h3>
      </div>

      <div className={styles.tabsContent}>
        {/* ✅ Signup Form */}
        <div
          id="signup-tab-content"
          className={`${styles.tabContent} ${
            activeTab === "signup" ? styles.active : styles.hidden
          }`}
        >
          {error && <p className={styles.error}>{error}</p>}
          <form className={styles.signupForm} action={handleSignup}>
            <input
              type="text"
              name="fullName"
              className={styles.input}
              autoComplete="off"
              placeholder="שם מלא"
              required
            />
            <input
              type="email"
              name="email"
              className={styles.input}
              autoComplete="off"
              placeholder="אימייל"
              required
            />
            <input
              type="password"
              name="password"
              className={styles.input}
              autoComplete="off"
              placeholder="סיסמה"
              required
            />
            <button type="submit" className={styles.button}>
              הרשמה
            </button>
          </form>
          <div className={styles.helpText}>
            <p>בהרשמתך, אתה מסכים ל-</p>
            <p>
              <a href="#">תנאי השימוש</a>
            </p>
          </div>
        </div>

        {/* ✅ Login Form */}
        <div
          id="login-tab-content"
          className={`${styles.tabContent} ${
            activeTab === "login" ? styles.active : styles.hidden
          }`}
        >
          {error && <p className={styles.error}>{error}</p>}
          <form className={styles.loginForm} action={handleLogin}>
            <input
              type="email"
              name="email"
              className={styles.input}
              autoComplete="off"
              placeholder="אימייל"
              required
            />
            <input
              type="password"
              name="password"
              className={styles.input}
              autoComplete="off"
              placeholder="סיסמה"
              required
            />
            <button type="submit" className={styles.button}>
              התחברות
            </button>
          </form>
          {/* <div className={styles.helpText}>
            <p>
              <a href="#">שכחת את הסיסמה?</a>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
