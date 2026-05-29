import Image, { type ImageProps } from "next/image";

type StockImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
};

/** Imagen con prioridad y sin depender del optimizador remoto */
export default function StockImage({
  src,
  alt,
  className,
  ...props
}: StockImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      unoptimized
      {...props}
    />
  );
}
