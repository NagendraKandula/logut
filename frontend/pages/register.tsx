import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "../styles/Register.module.css";

export default function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState("");

  const passwordRules = [
    { test: (p: string) => p.length >= 8, label: "At least 8 characters" },
    { test: (p: string) => /[A-Z]/.test(p), label: "One uppercase letter" },
    { test: (p: string) => /[a-z]/.test(p), label: "One lowercase letter" },
    { test: (p: string) => /\d/.test(p), label: "One number" },
    { test: (p: string) => /[@$!%*?&]/.test(p), label: "One special character" },
  ];

  const checkStrength = (password: string) => {
    const passed = passwordRules.filter((rule) => rule.test(password)).length;
    if (passed <= 2) return "Weak";
    if (passed === 3 || passed === 4) return "Medium";
    return "Strong";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setErrors(["Passwords do not match"]);
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/signup", form);
      setSuccess(res.data.message || "Signup successful!");
      setForm({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setErrors(Array.isArray(message) ? message : [message]);
    }
  };

  return (
    <div className={styles.pageGifBg}>
      <div className={styles.centeredContent}>
        <div className={styles.loginCard}>
          <h2 className={styles.loginTitle}>Create an Account</h2>
          <p className={styles.signupLink}>
            Already have an account?{" "}
            <Link href="/login" className={styles.link}>
              Log in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            {/* Username */}
            <div className={styles.formGroup}>
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                className={styles.input}
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className={styles.input}
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className={styles.formGroup}>
              <input
                type={showPassword.password ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={styles.input}
                value={form.password}
                onChange={handleChange}
                required
              />
              <span
                className={styles.toggleEye}
                onClick={() =>
                  setShowPassword((s) => ({ ...s, password: !s.password }))
                }
              >
                {showPassword.password ? "🙈" : "👁️"}
              </span>
            </div>

            {/* Strength indicator */}
            {form.password && (
              <div className={styles.divider}>
                <p>Password Strength: {checkStrength(form.password)}</p>
                <ul>
                  {passwordRules.map((rule, i) => (
                    <li
                      key={i}
                      className={
                        rule.test(form.password)
                          ? styles.valid
                          : styles.invalid
                      }
                    >
                      {rule.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Confirm Password */}
            <div className={styles.formGroup}>
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className={styles.input}
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                className={styles.toggleEye}
                onClick={() =>
                  setShowPassword((s) => ({ ...s, confirm: !s.confirm }))
                }
              >
                {showPassword.confirm ? "🙈" : "👁️"}
              </span>
            </div>

            {/* Errors */}
            {errors.length > 0 && (
              <div className={styles.error}>
                {errors.map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}

            {/* Success */}
            {success && <p className={styles.success}>{success}</p>}

            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </form>
          <div className={styles.divider}>
  <div className={styles.dividerLine}></div>
  <span>OR</span>
  <div className={styles.dividerLine}></div>
</div>
          {/* Google signup */}
          <button
            className={styles.googleButton}
            onClick={() =>
              (window.location.href = "http://localhost:4000/auth/google")
            }
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
