import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <main className="main_content_wrapper">
        <div className={styles.main_grid}>
          <div className={styles.main_card}>
            <div className={styles.brand_name}>mbrw</div>
          </div>
          <div className={styles.main_card}>
            <div className={styles.sub_text}>Делись впечатлением об играх</div>
          </div>
          <div className={styles.main_card}>
            <div className={styles.sub_text}>Отслеживай игровой прогресс</div>
          </div>
          <div className={styles.main_card}>
            <div className={styles.sub_text}>Следи за игровой индустрией</div>
          </div>
        </div>

      </main>

    </>
  );
}
