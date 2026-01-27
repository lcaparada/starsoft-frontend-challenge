import { Icon } from "../Icon/Icon"
import styles from "./Header.module.scss"

export const Header = () => {
  return (
    <header className={styles.header}>
      <Icon name="logo" size={101} />
      <section className={styles.bag}>
        <Icon name="bag" size={33} />
        <span>0</span>
      </section>
    </header>
  )
}