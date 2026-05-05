import React, { useRef } from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';

const ParticleEffect = ({ count = 30, color = '#D4AF37' }) => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const particles = Array.from(containerRef.current.children);

        particles.forEach((particle) => {
            gsap.to(particle, {
                y: `-${Math.random() * 200 + 100}vh`,
                x: `${Math.random() * 100 - 50}vw`,
                rotation: Math.random() * 360,
                opacity: 0,
                duration: Math.random() * 5 + 5,
                ease: 'none',
                repeat: -1,
                delay: Math.random() * -10
            });
        });
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-10 w-full h-full">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="absolute bottom-0 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 6 + 2}px`,
                        height: `${Math.random() * 6 + 2}px`,
                        backgroundColor: color,
                        opacity: Math.random() * 0.5 + 0.2
                    }}
                />
            ))}
        </div>
    );
};

export default ParticleEffect;
