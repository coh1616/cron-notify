"use client";

import { useState, useTransition } from "react";
import { triggerPing } from "./actions";
import styles from "./PingButton.module.css";

export default function PingButton() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState(null);

  function handleClick() {
    setResult(null);
    startTransition(async () => {
      try {
        const response = await triggerPing();
        setResult(response);
      } catch (error) {
        setResult({ success: false, message: error.message });
      }
    });
  }

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={handleClick} disabled={isPending}>
        {isPending ? "Sending..." : "Send Ping Email"}
      </button>
      {result?.success && (
        <p className={styles.result}>Email sent at {new Date(result.timestamp).toLocaleString()}</p>
      )}
      {result && !result.success && (
        <p className={`${styles.result} ${styles.error}`}>Failed: {result.message}</p>
      )}
    </div>
  );
}
