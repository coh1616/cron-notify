import styles from "./page.module.css";
import PingButton from "./PingButton";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PingButton />
      </main>
    </div>
  );
}
