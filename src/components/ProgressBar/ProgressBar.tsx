import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className={styles.progressBar}>
      <div className={styles.progressBarFill} style={{ width: `${progress}%` }}></div>
    </div>
  )
}