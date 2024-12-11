import styles from "../../styles/page.module.css";

export default function CreateUserForm({ createUserFunction }) {
  return (
    <div className={styles.homeform}>
      <div>
        <h1>Create a New Account！</h1>
      </div>
      <div>
        <form onSubmit={createUserFunction}>
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
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}
