import styles from "../../styles/page.module.css";

export default function LoginForm({ loginUserFunction }) {
  return (
    <div className={styles.homeform}>
      <div>
        <h1>Login to Your Account！</h1>
      </div>
      <div>
        <form onSubmit={loginUserFunction}>
          <div className={styles.field}>
            <p>Email</p>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className={styles.field}>
            <p>Password</p>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
