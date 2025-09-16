import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Header.module.css";


export default function Header() {
  const router = useRouter();

  return (
    <header className={styles.header}>
      {/* This is the logo on the left */}
      <div className={styles.logo}>☐ LOGO</div>

      {/* These are the navigation links in the middle */}
      <nav className={styles.nav}>
        <a href="#">Features</a>
        <a href="#">Channels</a>
        <a href="#">Blog</a>
        <a href="#">FAQs</a>
      </nav>

      {/* These are the "Log In" and "Get Started" buttons on the right */}
      <div className={styles.actions}>
         <Link href="/login" className={styles.loginButton}>
          Log In
        </Link>
       <Link href="/register" className={styles.getStartedButton}>
       Get Started
       </Link>
      </div>

    </header>
  );
}