import styles from "./Footer.module.scss"

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <span>STARSOFT © {currentYear} TODOS OS DIREITOS RESERVADOS</span>
    </footer>
  )
}