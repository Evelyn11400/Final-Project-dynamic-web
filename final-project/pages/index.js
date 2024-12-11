import styles from "../styles/page.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <h1>Welcome to My Diary App</h1>
      <p>
        Please <a href="/login">Login</a> or <a href="/create">Register</a> to
        start.
      </p>
    </div>
  );
}
