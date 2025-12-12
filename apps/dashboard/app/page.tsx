import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard application.</p>
        <Button appName="dashboard" className={styles.secondary}>
          Click me
        </Button>
      </main>
    </div>
  );
}
