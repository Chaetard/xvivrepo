import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '../../hooks/useGSAP';
import { eventData } from '../../data/eventData';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
    const containerRef = useRef(null);
    const { gallery } = eventData;

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom bottom",
                toggleActions: "play none none reverse",
            }
        });

        tl.fromTo(".gallery-img",
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "power2.out" }
        );
    }, []);

    // Helper for rendering an image with hover effect
    const EditorialImage = ({ src, aspectClass, colSpanClass = "" }) => (
        <div className={`gallery-img overflow-hidden rounded-[2px] ${aspectClass} ${colSpanClass} border border-xv-gold/10`}>
            <img
                src={src}
                alt="Gallery Item"
                className="w-full h-full object-cover transition-transform duration-[600ms] hover:scale-105 ease-[cubic-bezier(0.25,0,0.25,1)]"
                loading="lazy"
            />
        </div>
    );

    return (
        <section ref={containerRef} className="w-full py-20 px-4 sm:px-6 md:px-12 bg-xv-black">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center mb-12">
                    <h3 className="font-display text-3xl sm:text-4xl text-white tracking-widest uppercase mb-4">Galeria</h3>
                    <div className="h-px w-16 bg-xv-gold/50"></div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    {/* 1. Imagen grande full-width (Rosas) */}
                    {gallery[0] && <EditorialImage src={gallery[0]} aspectClass="aspect-[4/5] sm:aspect-[16/9]" colSpanClass="col-span-2" />}

                    {/* 2. Dos imágenes lado a lado (Salón y Chandelier) */}
                    {gallery[1] && <EditorialImage src={gallery[1]} aspectClass="aspect-square" />}
                    {gallery[2] && <EditorialImage src={gallery[2]} aspectClass="aspect-square" />}

                    {/* 3. Imagen panorámica (Mesa Decorada) */}
                    {gallery[3] && <EditorialImage src={gallery[3]} aspectClass="aspect-[16/9] sm:aspect-[21/9]" colSpanClass="col-span-2" />}

                    {/* 4. Dos imágenes lado a lado (Tacones y Pastel) */}
                    {gallery[4] && <EditorialImage src={gallery[4]} aspectClass="aspect-square" />}
                    {gallery[5] && <EditorialImage src={gallery[5]} aspectClass="aspect-square" />}

                    {/* 5. Imagen final full-width (Bouquet) */}
                    {gallery[6] && <EditorialImage src={gallery[6]} aspectClass="aspect-[4/5] sm:aspect-[16/9]" colSpanClass="col-span-2" />}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
