import Image from "next/image";
import styles from "./CartCard.module.scss";
import { Button } from "../Button/Button";
import { Counter } from "../Counter/Counter";

export const CartCard = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.imageContainer}>
        <Image
          src="https://github.com/shadcn.png"
          alt="Product Card"
          width={161}
          height={161}
          className={styles.image}
        />
      </section>
      <section className={styles.infoContainer}>
        <span className={styles.title}>ITEM 2</span>
        <span className={styles.description}>Redesigned from scratch and completely revised.</span>
        <div className={styles.priceContainer}>
          <Image src={"/images/eth-logo.png"} alt="ETH Logo" width={29} height={29} />
          <span>12 ETH</span>
        </div>
        <div className={styles.counterContainer}>
          <Counter value={1} onIncrement={() => { }} onDecrement={() => { }} />
          <Button icon="trash" />
        </div>
      </section>
    </div>
  )
}