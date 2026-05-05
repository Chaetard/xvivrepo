import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '../../hooks/useGSAP';
import { IMAGES } from '../../data/eventData';

gsap.registerPlugin(ScrollTrigger);

const Location = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                end: "bottom bottom",
                toggleActions: "play none none reverse",
            }
        });

        tl.fromTo(".location-element",
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
        );
    }, []);

    return (
        <section ref={containerRef} className="w-full bg-[#1a0a0a] py-16 flex flex-col items-center">

            {/* Map Container */}
            <div className="location-element relative w-full h-[60svh] sm:h-[70svh] overflow-hidden group">

                {/* 
                  To achieve grayscale + red tint, we mix CSS filters and blend modes.
                  An iframe could be used, but for design consistency as directed, an image works.
                  Using the table decor image as a placeholder for a "map snippet" aesthetic,
                  or just a real elegant google map screenshot image. 
                */}
                <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80" // Map-like overhead city view placeholder from unsplash
                    alt="Map Location"
                    className="w-full h-full object-cover filter grayscale contrast-125"
                />

                {/* Reddish tint overlay */}
                <div className="absolute inset-0 bg-xv-wine mix-blend-multiply opacity-80 transition-opacity duration-500 group-hover:opacity-70"></div>
                {/* Dark gradient fade for edges */}
                <div className="absolute inset-0 bg-gradient-to-t from-xv-dark via-transparent to-xv-dark opacity-100"></div>

                {/* Content over map */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 mt-10 pointer-events-none">
                    <h3 className="font-display text-4xl text-white mb-2 tracking-wide drop-shadow-md">Ubicación</h3>
                    <p className="font-body font-light text-sm text-white/80 mb-8 max-w-sm text-center">Acompañanos en este majestuoso lugar para celebrar</p>

                    <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pointer-events-auto border border-xv-gold text-xv-gold px-10 py-3 font-body tracking-[0.1em] uppercase text-xs hover:bg-xv-gold hover:text-xv-black transition-all duration-300 backdrop-blur-sm bg-black/20"
                    >
                        Cómo llegar
                    </a>
                </div>
            </div>

        </section>
    );
};

export default Location;
