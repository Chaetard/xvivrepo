import { useState, useEffect } from 'react';

const LazyImage = ({ src, alt, className, style, ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(null);

    useEffect(() => {
        if (!src) return;
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setCurrentSrc(src);
            setIsLoaded(true);
        };
    }, [src]);

    return (
        <div className={`relative overflow-hidden bg-cream/30 ${className}`} style={style}>
            <img
                src={currentSrc || "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjwvc3ZnPg=="}
                alt={alt}
                className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}`}
                {...props}
            />
        </div>
    );
};

export default LazyImage;
