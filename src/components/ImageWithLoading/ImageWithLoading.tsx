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
  loading?: "lazy" | "eager";
  priority?: boolean;
}

export const ImageWithLoading = ({
  src,
  alt,
  width,
  height,
  className,
  loading = "lazy",
  priority = false,
}: ImageWithLoadingProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.skeletonWrapper} aria-hidden="true">
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
        loading={loading}
        {...(priority && { priority: true })}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
    </div>
  );
};