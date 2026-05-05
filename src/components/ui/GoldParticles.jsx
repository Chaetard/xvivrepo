import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GoldParticles() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Create particles
        const particles = Array.from({ length: 25 }, (_, i) => {
            const el = document.createElement("div");
            el.className = "absolute rounded-full bg-xv-gold shadow-[0_0_8px_rgba(212,175,55,0.8)] pointer-events-none";
            el.style.width = `${Math.random() * 3 + 1}px`;
            el.style.height = el.style.width;
            el.style.left = `${Math.random() * 100}vw`;
            el.style.top = "110vh"; // Start below screen
            containerRef.current.appendChild(el);
            return el;
        });

        particles.forEach((el) => {
            gsap.to(el, {
                y: -(window.innerHeight * 1.5),
                x: `+=${Math.random() * 100 - 50}`,
                opacity: Math.random() * 0.5 + 0.2, // Between 0.2 and 0.7
                duration: Math.random() * 4 + 5,
                delay: Math.random() * 5,
                repeat: -1,
                ease: "none",
                modifiers: {
                    x: gsap.utils.unitize((x) => parseFloat(x) % window.innerWidth), // Keep horizontal in bounds roughly
                }
            });
        });

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = "";
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
            aria-hidden="true"
        />
    );
}
