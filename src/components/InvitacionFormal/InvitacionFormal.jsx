import React, { useRef } from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventData } from '../../data/eventData';
import SectionBackground from '../shared/SectionBackground';
import SectionCard from '../shared/SectionCard';

gsap.registerPlugin(ScrollTrigger);

/**
 * Icons (Inline SVGs)
 */
const ChurchIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2" />
        <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
        <path d="m18 7-5-4-1-1-1 1-5 4" />
        <path d="M12 7v5" />
        <path d="M10 9h4" />
    </svg>
);

const GlassIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.2 3a2 2 0 0 1 1.6.8l4.4 5.8a2 2 0 0 1 0 2.4l-7.4 9.1a2 2 0 0 1-3.2 0l-7.4-9.1a2 2 0 0 1 0-2.4l4.4-5.8a2 2 0 0 1 1.6-.8h6Z" />
        <path d="M7 8h10" />
    </svg>
);

const CalendarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);

const ClockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const MapPinIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const Separator = ({ className = "" }) => (
    <div className={`formal-separator flex items-center gap-3 w-full max-w-[180px] mx-auto ${className}`}>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-xv-gold/40 origin-right scale-x-0 separator-line"></div>
        <span className="text-xv-gold/60 text-[10px] transform scale-0 separator-diamond">✦</span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-xv-gold/40 origin-left scale-x-0 separator-line"></div>
    </div>
);

/**
 * InvitacionFormal Component
 */
const InvitacionFormal = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reducedMotion) {
            gsap.set('.formal-reveal', { opacity: 1, y: 0 });
            gsap.set('.separator-line', { scaleX: 1 });
            gsap.set('.separator-diamond', { scale: 1 });
            return;
        }

        // Header Reveal
        gsap.fromTo('.formal-header-reveal',
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.formal-header',
                    start: "top 85%",
                    once: true
                }
            }
        );

        // Sub-cards Reveal
        const subCards = gsap.utils.toArray('.formal-subcard');
        subCards.forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.2 * (index + 1),
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                        once: true
                    }
                }
            );
        });

        // Separators Reveal
        gsap.to('.separator-line', {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                once: true
            }
        });
        gsap.to('.separator-diamond', {
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                once: true
            }
        });

        // CTA Button Reveal
        gsap.fromTo('.formal-cta',
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                delay: 0.6,
                scrollTrigger: {
                    trigger: '.formal-cta',
                    start: "top 90%",
                    once: true
                }
            }
        );
    }, { scope: containerRef });

    const DataRow = ({ icon: Icon, text, isPlaceholder = false }) => (
        <div className="flex items-center gap-3">
            <span className="text-xv-gold/60"><Icon /></span>
            <span className={`font-serif text-xv-cream ${isPlaceholder ? 'italic opacity-50' : 'opacity-85'}`}
                style={{ fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)' }}>
                {text}
            </span>
        </div>
    );

    return (
        <SectionBackground
            id="section-invitacion"
            halos={[
                { x: "30%", y: "25%", size: "500px", intensity: 0.15 },
                { x: "70%", y: "75%", size: "550px", intensity: 0.18 }
            ]}
        >
            <div ref={containerRef} className="py-20 sm:py-32">
                <SectionCard>
                    {/* --- Encabezado --- */}
                    <div className="formal-header flex flex-col items-center gap-8 mb-12 sm:mb-16">
                        <Separator />
                        <div className="flex flex-col items-center text-center gap-2">
                            <span className="formal-header-reveal font-script italic text-xv-gold/80 mb-1"
                                style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.3rem)' }}>
                                {eventData.parents}
                            </span>
                            <span className="formal-header-reveal font-body uppercase tracking-[0.2em] text-xv-cream/75"
                                style={{ fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)' }}>
                                Tienen el honor de invitarte
                            </span>
                            <h2 className="formal-header-reveal font-script italic text-xv-gold-light leading-tight mt-4"
                                style={{ fontSize: 'clamp(1.4rem, 5vw, 1.9rem)' }}>
                                A la celebración de los Quince Años de su hija
                            </h2>
                        </div>
                        <Separator />
                    </div>

                    {/* --- Sub-cards Container --- */}
                    <div className="w-full flex flex-col gap-6 sm:gap-8 max-w-[500px] mx-auto">

                        {/* Sub-card 1: Ceremonia */}
                        <div className="formal-subcard bg-[#3c0f14]/40 backdrop-blur-sm border border-xv-gold/20 rounded-xl p-7 sm:p-9 flex flex-col items-center text-center">
                            <div className="text-xv-gold/80 mb-3"><ChurchIcon /></div>
                            <span className="font-body uppercase tracking-[0.2em] text-xv-gold/70 mb-1"
                                style={{ fontSize: 'clamp(0.7rem, 2.3vw, 0.85rem)' }}>
                                Ceremonia Religiosa
                            </span>
                            <h3 className="font-script italic text-xv-cream/90 mb-6"
                                style={{ fontSize: 'clamp(1.15rem, 4vw, 1.4rem)' }}>
                                Santa Misa de Acción de Gracias
                            </h3>

                            <div className="w-10 h-px bg-xv-gold/30 mb-6" />

                            <div className="flex flex-col gap-2.5 items-start">
                                <DataRow icon={CalendarIcon} text="23 de Mayo, 2026" />
                                <DataRow icon={ClockIcon} text="5:00 PM" />
                                <DataRow icon={MapPinIcon} text="Col. Guadalupe" />
                            </div>
                        </div>

                        {/* Sub-card 2: Recepción */}
                        <div className="formal-subcard bg-[#3c0f14]/40 backdrop-blur-sm border border-xv-gold/20 rounded-xl p-7 sm:p-9 flex flex-col items-center text-center">
                            <div className="text-xv-gold/80 mb-3"><GlassIcon /></div>
                            <span className="font-body uppercase tracking-[0.2em] text-xv-gold/70 mb-1"
                                style={{ fontSize: 'clamp(0.7rem, 2.3vw, 0.85rem)' }}>
                                Recepción
                            </span>
                            <h3 className="font-script italic text-xv-cream/90 mb-6"
                                style={{ fontSize: 'clamp(1.15rem, 4vw, 1.4rem)' }}>
                                Real San Pedro
                            </h3>

                            <div className="w-10 h-px bg-xv-gold/30 mb-6" />

                            <div className="flex flex-col gap-2.5 items-start">
                                <DataRow icon={CalendarIcon} text="23 de Mayo, 2026" />
                                <DataRow icon={ClockIcon} text="7:00 PM" />
                                <DataRow icon={MapPinIcon} text="C. San Lorenzo Victoria 71, Libertad, 45303 Tala, Jal." />
                            </div>

                            {/* CTA Button */}
                            <a
                                href="https://maps.app.goo.gl/Um3ceHxs633wurAM7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="formal-cta group flex items-center gap-2 mt-8 px-6 py-3 border border-xv-gold/50 rounded-lg text-xv-gold-light font-body uppercase tracking-wider transition-all duration-300 hover:bg-xv-gold/10 hover:border-xv-gold active:scale-[0.97]"
                                style={{ fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)' }}
                            >
                                <MapPinIcon size={16} />
                                <span>Cómo llegar</span>
                            </a>
                        </div>

                    </div>

                    {/* --- Separador Inferior --- */}
                    <div className="mt-12 sm:mt-16 w-full">
                        <Separator className="mb-0" />
                    </div>

                </SectionCard>
            </div>
        </SectionBackground>
    );
};

export default InvitacionFormal;
