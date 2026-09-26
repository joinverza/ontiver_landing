import styles from "./DotLoader.module.css";

export const DotLoader = () => {
  return (
    <span className="ml-1 inline-flex w-5 justify-start" aria-hidden="true">
      {[0, 1, 2].map((dot) => (
        <span key={dot} className={styles.dot}>
          .
        </span>
      ))}
    </span>
  );
};
