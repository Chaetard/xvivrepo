import React from 'react';
import LazyImage from '../common/LazyImage';

const GalleryItem = ({ src, alt, className = '' }) => {
    return (
        <div className={`gallery-item w-full h-full overflow-hidden rounded-sm group relative ${className}`}>
            <LazyImage
                src={src}
                alt={alt}
                className="w-full h-full object-cover transform transition-transform duration-[1.5s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-60 transition-opacity duration-500 mix-blend-multiply"></div>
            <div className="absolute inset-4 border border-cream/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none scale-95 group-hover:scale-100 transform z-10"></div>
        </div>
    );
};

export default GalleryItem;
