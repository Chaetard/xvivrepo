import React, { useMemo } from 'react';

/**
 * SectionBackground Component
 * 
 * A reusable background wrapper that adds depth to sections using:
 * 1. A sophisticated wine-colored gradient system (continuity from Hero).
 * 2. A subtle golden grain/noise texture layer.
 * 3. Configurable radial golden halos (glows).
 *
 * @param {Object} props
 * @param {Array} props.halos - Array of halo objects: { x, y, size, intensity }
 * @param {string} props.className - Additional classes for the section
 * @param {React.ReactNode} props.children - Section content
 * 
 * @example
 * <SectionBackground halos={[
 *   { x: "50%", y: "30%", size: "600px", intensity: 0.18 }
 * ]}>
 *   <YourSectionContent />
 * </SectionBackground>
 */
const SectionBackground = ({ halos = [], className = "", id, children }) => {
    // Memoize the grain SVG to avoid re-renders
    const GrainOverlay = useMemo(() => (
        <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.05] mix-blend-overlay">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="matrix" values="0.83 0 0 0 0.21 0 0.68 0 0 0.12 0 0 0.44 0 0.05 0 0 0 1 0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    ), []);

    return (
        <div
            id={id}
            className={`relative w-full overflow-hidden ${className}`}
            style={{
                // Empalme con hero: empieza en #1A0508 para hacer match con el bridge del hero compactado
                background: 'linear-gradient(180deg, #1A0508 0%, #220710 20%, #2A0810 50%, #1F0608 85%, #150406 100%)'
            }}
        >
            {/* Layer 0: Atmospheric Gradients (Top & Bottom) */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(ellipse at 50% 0%, rgba(120, 20, 30, 0.1) 0%, transparent 60%),
                        radial-gradient(ellipse at 50% 100%, rgba(60, 10, 15, 0.5) 0%, transparent 70%)
                    `
                }}
            />

            {/* Layer 1: Radial Halos */}
            <div className="absolute inset-0 z-[1] pointer-events-none">
                {halos.map((halo, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            left: halo.x,
                            top: halo.y,
                            width: halo.size || '500px',
                            height: halo.size || '500px',
                            transform: 'translate(-50%, -50%)',
                            background: `radial-gradient(circle, rgba(212, 175, 55, ${halo.intensity || 0.15}) 0%, transparent 70%)`,
                            filter: 'blur(60px)',
                            borderRadius: '50%',
                        }}
                    />
                ))}
            </div>

            {/* Layer 1: Grain Overlay */}
            {GrainOverlay}

            {/* Layer 2: Content */}
            <div className="relative z-[2] w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default SectionBackground;
