import { useState } from 'react';
import { cn } from '@/lib/cn';

interface SmartImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  /** Average colour used underneath while the photo decodes. */
  placeholder?: string;
  sizes?: string;
}

/**
 * Local WebP photographs with a blur-up placeholder.
 */
export function SmartImage({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  eager = false,
  placeholder = '#d9cfba',
  sizes,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ backgroundColor: placeholder }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        onLoad={() => setLoaded(true)}
        className={cn(
          'h-full w-full object-cover blur-in will-change-transform',
          loaded && 'is-loaded',
          imgClassName,
        )}
      />
    </div>
  );
}
