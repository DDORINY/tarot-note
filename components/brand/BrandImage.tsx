"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useState } from "react";

type Props = {
  alt: string;
  className?: string;
  fallback?: ReactNode;
  fill?: boolean;
  height?: number;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  src: string;
  width?: number;
};

export function BrandImage({
  alt,
  className,
  fallback = null,
  fill = false,
  height,
  imageClassName,
  priority = false,
  sizes,
  src,
  width
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  if (fill) {
    return (
      <Image
        alt={alt}
        className={imageClassName}
        fill
        onError={() => setFailed(true)}
        priority={priority}
        sizes={sizes}
        src={src}
      />
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      height={height ?? 1}
      onError={() => setFailed(true)}
      priority={priority}
      src={src}
      width={width ?? 1}
    />
  );
}
