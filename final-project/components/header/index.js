import styles from "../../styles/page.module.css";
import Link from "next/link";
export default function Header({ isLoggedIn, logoutUserFunction }) {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.title}>
        <h1>Online Diary Book</h1>
      </div>
      <div className={styles.nav}>
        <ul>
          {isLoggedIn && (
            <>
              <li>
                <Link href="/diary">Home</Link>
              </li>
              <li>
                <a onClick={logoutUserFunction} className={styles.logout}>
                  Log Out
                </a>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/create">Create User</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
