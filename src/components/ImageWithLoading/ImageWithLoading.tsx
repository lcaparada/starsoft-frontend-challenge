"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageSkeleton } from "./ImageSkeleton";
import styles from "./ImageWithLoading.module.scss";

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export const ImageWithLoading = ({
  src,
  alt,
  width,
  height,
  className,
}: ImageWithLoadingProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.skeletonWrapper}>
          <ImageSkeleton />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${styles.image} ${isLoading ? styles.hidden : ""} ${className || ""}`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};