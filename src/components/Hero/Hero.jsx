import React, { useRef } from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventData } from '../../data/eventData';
import Countdown from './Countdown';
import RosePetals from '../ui/RosePetals';

gsap.registerPlugin(ScrollTrigger);

const CROWN_URL =
    'https://static.vecteezy.com/system/resources/thumbnails/058/991/243/small/golden-tiara-adorned-with-gems-and-jewel-cut-out-transparent-png.png';
const BG_URL =
    'https://i.pinimg.com/736x/20/99/3d/20993db4370f94175bf44e931511f6e3.jpg';

const Hero = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const compactRef = useRef(null);

    useGSAP(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        /* ── Entry animation ──────────────────────────────── */
        if (reduced) {
            gsap.set('.hero-fade', { opacity: 1, y: 0 });
        } else {
            gsap.fromTo(
                '.hero-fade',
                { opacity: 0, y: 22 },
                { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'power2.out', delay: 0.15 }
            );
        }

        if (reduced) return;

        const compact = compactRef.current;

        /* ── Scroll: original fades out, compact fades in ── */
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=380',
                scrub: 1.5,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    // Enable compact pointer events once mostly visible
                    if (compact) {
                        compact.style.pointerEvents = self.progress > 0.85 ? 'all' : 'none';
                    }
                },
            },
        });

        // Full content block fades up and out
        scrollTl.to(contentRef.current, {
            opacity: 0,
            y: -28,
            scale: 0.9,
            transformOrigin: 'center top',
            ease: 'none',
            duration: 1,
        }, 0);

        // Compact hero slides down from above and fades in
        scrollTl.fromTo(
            compact,
            { opacity: 0, y: -18 },
            { opacity: 1, y: 0, ease: 'none', duration: 1 },
            0.18
        );

    }, []);

    return (
        <>
            <RosePetals />

            {/* ── Compact persistent hero (fixed) ─────────────────────────
                Appears on scroll, stays fixed for the rest of the page.
                Contains all elements except countdown + arrow.
                aria-hidden: original hero is still in DOM for screen readers.
            ──────────────────────────────────────────────────────────────── */}
            <div
                ref={compactRef}
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    opacity: 0,
                    pointerEvents: 'none',
                    overflow: 'hidden',
                }}
            >
                {/* Background Layers with mask for smooth transition */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    WebkitMaskImage: 'linear-gradient(180deg, black 0%, black 40%, rgba(0,0,0,0.7) 70%, transparent 100%)',
                    maskImage: 'linear-gradient(180deg, black 0%, black 40%, rgba(0,0,0,0.7) 70%, transparent 100%)',
                }}>
                    {/* Background — same image, cropped to top */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url('${BG_URL}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                    }} />
                    {/* Dark overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(26,10,10,0.85)',
                    }} />

                    {/* Bridge Gradient (Bridge to the next section color) */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '30px',
                        background: 'linear-gradient(180deg, transparent 0%, #1A0508 100%)',
                        pointerEvents: 'none',
                        zIndex: 1,
                    }} />
                </div>

                {/* Bottom border — made transparent to fix hard cut */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'transparent',
                }} />

                {/* Compact content */}
                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '10px 1.25rem 12px',
                    gap: '3px',
                }}>
                    <img
                        src={CROWN_URL}
                        alt=""
                        style={{
                            width: 'min(145px, 39vw)',
                            height: 'auto',
                            marginBottom: '1px',
                        }}
                    />
                    <span
                        className="font-display text-xv-gold tracking-[0.3em] uppercase"
                        style={{ fontSize: 'clamp(1.35rem, 6.8vw, 2.55rem)', lineHeight: 1.1 }}
                    >
                        {eventData.quinceanera}
                    </span>
                    <span
                        className="font-script italic text-white font-light"
                        style={{ fontSize: 'clamp(1.15rem, 5.8vw, 2.2rem)', lineHeight: 1.1 }}
                    >
                        Mis Quince Años
                    </span>
                    {/* Microcopy and Date removed from compact version */}
                </div>
            </div>

            <style>
                {`
                @keyframes crownFloat {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                @keyframes crownGlow {
                    0%, 100% { 
                        filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.4));
                        opacity: 0.9;
                    }
                    50% { 
                        filter: drop-shadow(0 0 25px rgba(212, 175, 55, 0.7));
                        opacity: 1;
                    }
                }
                .animate-crown {
                    animation: crownFloat 8s ease-in-out infinite, crownGlow 6s ease-in-out infinite;
                }
                @keyframes heroBounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(10px); }
                }
                .animate-hero-bounce {
                    animation: heroBounce 2s ease-in-out infinite;
                }
                `}
            </style>

            {/* ── Full Hero Section ─────────────────────────────────────── */}
            <section
                id="section-hero"
                ref={sectionRef}
                className="relative w-full min-h-[100svh] overflow-hidden flex flex-col items-center justify-center"
            >
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full" style={{
                        backgroundImage: `url('${BG_URL}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }} />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 z-10" style={{
                    background: 'linear-gradient(to bottom, rgba(26,10,10,0.25) 0%, rgba(26,10,10,0.65) 60%, rgba(26,10,10,1) 100%)',
                }} />

                {/* ── Content block ──────────────────────────────────────── */}
                <div
                    ref={contentRef}
                    className="relative z-20 w-full max-w-sm sm:max-w-md px-5 flex flex-col items-center text-center"
                >
                    {/* Crown — 20-25% bigger than before */}
                    <div className="hero-fade w-full flex justify-center pointer-events-none">
                        <img
                            src={CROWN_URL}
                            alt="Corona de quinceañera"
                            className="hero-crown-img animate-crown"
                            style={{
                                width: 'min(285px, 75vw)',
                                height: 'auto',
                                willChange: 'transform',
                            }}
                        />
                    </div>

                    {/* Divider — extra breathing room below crown */}
                    <div className="hero-fade hero-ornament flex items-center gap-3 w-full max-w-[180px] mt-6 mb-7">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-xv-gold/50" />
                        <span className="text-xv-gold text-xs">✦</span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-xv-gold/50" />
                    </div>

                    {/* Name — ~18% bigger */}
                    <h1
                        className="hero-fade hero-name font-display text-xv-gold tracking-[0.3em] uppercase"
                        style={{ fontSize: 'clamp(2.35rem, 12vw, 4.2rem)' }}
                    >
                        {eventData.quinceanera}
                    </h1>

                    {/* Subtitle — ~13% bigger */}
                    <h2
                        className="hero-fade hero-subtitle font-script text-white italic font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-4 sm:mt-5"
                        style={{ fontSize: 'clamp(2rem, 10vw, 3.4rem)' }}
                    >
                        Mis Quince Años
                    </h2>

                    {/* Microcopy — ~20% bigger, more space from subtitle */}
                    <p
                        className="hero-fade hero-microcopy font-script italic text-xv-gold/70 mt-7 leading-relaxed"
                        style={{
                            fontSize: 'clamp(0.95rem, 3.8vw, 1.15rem)',
                            maxWidth: '26ch',
                        }}
                    >
                        Con la bendición de Dios y mis padres,&nbsp;
                        te invito a celebrar conmigo
                    </p>

                    {/* Date — extra space above (separated from microcopy) */}
                    <div className="hero-fade hero-date mt-10">
                        <p
                            className="font-body text-xv-gold/70 tracking-[0.25em] uppercase"
                            style={{ fontSize: 'clamp(0.72rem, 2.8vw, 0.88rem)' }}
                        >
                            23 · MAYO · 2026
                        </p>
                    </div>

                    {/* Countdown */}
                    <div className="hero-fade hero-countdown w-full mt-6">
                        <Countdown />
                    </div>

                    {/* Scroll arrow */}
                    <div
                        className="hero-arrow mt-9"
                        aria-hidden="true"
                        style={{ willChange: 'opacity' }}
                    >
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="animate-hero-bounce"
                        >
                            <path
                                d="M6 9L12 15L18 9"
                                stroke="#D4AF37"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
