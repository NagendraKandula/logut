// hemanthkumarburada/sign-up/sign-up-40aa63dcbd9c55d2703944b1f2b4f73d666616ac/frontend/pages/home.tsx
import {withAuth} from '../utils/withAuth';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { GetServerSideProps } from "next";

const Home = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:4000/auth/logout', {
        method: 'POST',

      });

      if (res.ok) {
        // Redirect to the login page after successful logout
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to your Dashboard!
        </h1>
        
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </main>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = withAuth(async (context) => {
  return { props: {} };
});

export default Home;