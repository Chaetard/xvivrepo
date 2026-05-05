import React, { useRef } from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';

/**
 * SectionCard Component
 * 
 * A premium container for section content with:
 * 1. Translucent wine background with backdrop blur.
 * 2. Subtle golden border and Art-Deco corners.
 * 3. Smooth entry animation (Fade + Scale).
 *
 * @param {Object} props
 * @param {string} props.className - Additional classes for the card
 * @param {React.ReactNode} props.children - Card content
 * 
 * @example
 * <SectionCard>
 *   <YourContent />
 * </SectionCard>
 */
const SectionCard = ({ children, className = "" }) => {
    const cardRef = useRef(null);

    useGSAP(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        gsap.fromTo(cardRef.current,
            {
                opacity: 0,
                scale: reducedMotion ? 1 : 0.96
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 85%",
                    once: true
                }
            }
        );
    }, { scope: cardRef });

    const CornerDecoration = ({ position = "top-left" }) => {
        const rotationMap = {
            "top-left": "rotate-0 top-2 left-2",
            "top-right": "rotate-90 top-2 right-2",
            "bottom-right": "rotate-180 bottom-2 right-2",
            "bottom-left": "rotate-270 bottom-2 left-2"
        };

        return (
            <div className={`absolute ${rotationMap[position]} w-6 h-6 text-xv-gold/50 pointer-events-none`}>
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2H22M2 2V22M2 6H18V2" stroke="currentColor" strokeWidth="1" />
                </svg>
            </div>
        );
    };

    return (
        <div className="w-full max-w-[720px] mx-auto px-4 sm:px-8 mt-12 mb-12">
            <div
                ref={cardRef}
                className={`relative bg-[#280a0f]/55 backdrop-blur-md border border-xv-gold/25 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]
                           p-8 sm:p-14 overflow-hidden ${className}`}
                style={{
                    WebkitBackdropFilter: 'blur(16px)',
                    backdropFilter: 'blur(16px)',
                }}
            >
                {/* Decorative Corners */}
                <CornerDecoration position="top-left" />
                <CornerDecoration position="top-right" />
                <CornerDecoration position="bottom-right" />
                <CornerDecoration position="bottom-left" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SectionCard;
