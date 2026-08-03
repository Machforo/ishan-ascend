import { useState, useEffect } from "react";
import { ImageOff } from "lucide-react";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export default function ImageWithFallback({ src, alt, fallbackSrc, className, ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  if (!src || error) {
    if (fallbackSrc) {
      return <img src={fallbackSrc} alt={alt || "Fallback Image"} className={className} {...props} />;
    }
    return (
      <div className={`flex flex-col items-center justify-center bg-muted text-muted-foreground ${className}`} {...(props as any)}>
        <ImageOff className="w-1/4 h-1/4 max-w-[48px] max-h-[48px] opacity-20" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || "Image"}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
