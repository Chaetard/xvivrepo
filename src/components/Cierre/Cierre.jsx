import React, { useRef } from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventData } from '../../data/eventData';
import SectionBackground from '../shared/SectionBackground';
import CierrePetals from './CierrePetals';

gsap.registerPlugin(ScrollTrigger);

const CROWN_URL = 'https://static.vecteezy.com/system/resources/thumbnails/058/991/243/small/golden-tiara-adorned-with-gems-and-jewel-cut-out-transparent-png.png';

const SeparatorOrnament = ({ className = "" }) => (
    <div className={`cierre-separator flex items-center gap-4 w-full max-w-[220px] mx-auto ${className}`}>
        <span className="text-xv-gold/60 text-xs transform scale-0 separator-diamond">✦</span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-xv-gold/50 to-transparent origin-center scale-x-0 separator-line"></div>
        <span className="text-xv-gold/60 text-xs transform scale-0 separator-diamond">✦</span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-xv-gold/50 to-transparent origin-center scale-x-0 separator-line"></div>
        <span className="text-xv-gold/60 text-xs transform scale-0 separator-diamond">✦</span>
    </div>
);

/**
 * Cierre Component - Cinematic final section
 */
const Cierre = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useGSAP(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reducedMotion) {
            gsap.set('.cierre-anim-item', { opacity: 1, y: 0, scale: 1 });
            gsap.set('.separator-line', { scaleX: 1 });
            gsap.set('.separator-diamond', { scale: 1 });
            gsap.set('.signature-reveal', { clipPath: 'inset(0 0 0 0)' });
            return;
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
                once: true
            }
        });

        // 0.0s - SECTION ENTRANCE
        tl.to(sectionRef.current, { backgroundColor: '#1A0508', duration: 1 })

            // 0.6s - SEPARATOR TOP
            .to('.cierre-sep-top .separator-line', { scaleX: 1, duration: 0.6, stagger: 0.1, ease: "power2.inOut" }, 0.4)
            .to('.cierre-sep-top .separator-diamond', { scale: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.7)" }, 0.5)

            // 1.0s - CLOSING PHRASE
            .fromTo('.cierre-phrase',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                0.7)

            // 1.8s - NAME SIGNATURE (The WOW Moment) - Speeded up to 1.2s
            .fromTo('.signature-reveal',
                { clipPath: 'inset(0 100% 0 0)' },
                {
                    clipPath: 'inset(0 0% 0 0)',
                    duration: 1.2, // Rápida pero notable
                    ease: "power2.out", // Más natural
                    onComplete: () => {
                        // Brute force removal of any clip-path effects
                        gsap.set('.signature-reveal', { clipPath: 'none', clearProps: "clipPath" });
                    }
                },
                1.4)

            // 3.0s - SHIMMER PASS (Cleaned up)
            .fromTo('.signature-shimmer',
                { x: '-100%', opacity: 0 },
                {
                    x: '100%',
                    opacity: 0.6,
                    duration: 1.2,
                    ease: "power2.inOut",
                    onComplete: () => {
                        gsap.set('.signature-shimmer', { display: 'none' });
                    }
                },
                2.8)

            // 5.0s - SEPARATOR BOTTOM
            .to('.cierre-sep-bottom .separator-line', { scaleX: 1, duration: 1, ease: "power2.inOut" }, 5.0)
            .to('.cierre-sep-bottom .separator-diamond', { scale: 1, duration: 0.8, ease: "back.out(1.7)" }, 5.2)

            // 5.3s - FINAL DATE
            .fromTo('.cierre-fecha',
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 1 },
                5.3);

    }, { scope: sectionRef });

    return (
        <section
            id="section-cierre"
            ref={sectionRef}
            className="relative min-h-[100vh] min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden bg-[#0A0203] px-6 sm:px-12 pt-[80px] sm:pt-[100px]"
            style={{
                background: 'radial-gradient(ellipse at center, #2A0810 0%, #1A0508 40%, #0A0203 100%)'
            }}
        >
            {/* Capa 2: Vignette dramática */}
            <div className="absolute inset-0 z-1 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_50%,rgba(0,0,0,0.6)_100%)]" />

            {/* Capa 4: Rayos de luz divinos */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.12] animate-[lightRaysRotate_90s_linear_infinite] mix-blend-screen pointer-events-none z-2">
                <defs>
                    <radialGradient id="rayGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                    </radialGradient>
                </defs>
                {[...Array(12)].map((_, i) => (
                    <line
                        key={i}
                        x1="50%" y1="50%"
                        x2={`${50 + 50 * Math.cos((i * 30 * Math.PI) / 180)}%`}
                        y2={`${50 + 50 * Math.sin((i * 30 * Math.PI) / 180)}%`}
                        stroke="url(#rayGrad)"
                        strokeWidth="2"
                    />
                ))}
            </svg>

            {/* Capa 5: Lluvia intensa de pétalos */}
            <CierrePetals />

            {/* CONTENIDO */}
            <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl">

                {/* B. Separador Superior */}
                <div className="cierre-sep-top mb-10 sm:mb-14 w-full flex justify-center">
                    <SeparatorOrnament />
                </div>

                {/* C. Frase de Cierre */}
                <p className="cierre-phrase font-script italic text-xv-gold-light/95 leading-[1.8] max-w-[32ch] mx-auto mb-14 sm:mb-20"
                    style={{ fontSize: 'clamp(1.25rem, 4.5vw, 1.7rem)' }}>
                    "Espero contar con tu presencia en este día tan importante para mí"
                </p>

                {/* E. Mensaje Final - Wrapper con centrado horizontal forzado */}
                <div className="signature-wrapper relative flex justify-center items-center mb-14 sm:mb-20 w-full min-h-[140px] sm:min-h-[200px] overflow-visible">

                    {/* Halo dorado pulsante */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] z-0 pointer-events-none animate-[haloPulse_4s_infinite_ease-in-out]"
                        style={{
                            background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.35) 0%, rgba(212, 175, 55, 0.15) 30%, transparent 70%)',
                            filter: 'blur(80px)'
                        }}
                    />

                    <div className="relative text-center w-full flex justify-center">
                        <h1 className="signature-reveal font-signature text-xv-gold-light tracking-normal leading-none px-4 select-none pointer-events-none text-center block w-full"
                            style={{
                                fontFamily: "'Great Vibes', cursive",
                                fontSize: 'clamp(3rem, 12vw, 5.5rem)', // Made larger as requested
                                textShadow: '0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.3)',
                                textDecoration: 'none !important',
                                border: 'none',
                                outline: 'none',
                                WebkitBackfaceVisibility: 'hidden',
                                backfaceVisibility: 'hidden'
                            }}
                        >
                            ¡Los esperamos!
                        </h1>

                        {/* Shimmer overlay */}
                        <div className="signature-shimmer absolute inset-0 pointer-events-none mix-blend-overlay overflow-hidden hidden sm:block">
                            <div className="absolute inset-[-20%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg]" />
                        </div>
                    </div>
                </div>

                {/* G. Separador Inferior */}
                <div className="cierre-sep-bottom mb-10 sm:mb-12 w-full flex justify-center">
                    <SeparatorOrnament />
                </div>

                {/* H. Fecha Final */}
                <div className="cierre-fecha">
                    <p className="font-body text-xv-gold/75 tracking-[0.4em] uppercase"
                        style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}>
                        23 · MAYO · 2026
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Cierre;
