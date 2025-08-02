import React, { useState, useRef, useEffect } from "react";
import { ImImage } from "react-icons/im";

import cn from "../../utils/cn";

export default function Image({ src, alt, className = "" }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px", // preload before it comes into view
        // threshold: .5, // if 50% of the image is visible
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoaded(false);
    setHasError(true);
  };

  return (
    <div ref={imgRef} className="relative overflow-hidden rounded-lg h-full">
      {/* Loading/Error Placeholder */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-gray-100 flex items-center justify-center transition-opacity duration-900 ${
          isLoaded && !hasError
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }`}
      >
        <ImImage size={48} className="text-gray-400" />
      </div>

      {/* Main Image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            `object-cover w-full h-full transition-all duration-700 ease-out`,
            className
          )}
        />
      )}
    </div>
  );
}
