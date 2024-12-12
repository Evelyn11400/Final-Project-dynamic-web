import Link from "next/link";
import styles from "../styles/page.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <h1>Welcome to My Diary App</h1>
      <p>
        Please <Link href="/login">Login</Link> or{" "}
        <Link href="/create">Register</Link> to start.
      </p>
    </div>
  );
}
