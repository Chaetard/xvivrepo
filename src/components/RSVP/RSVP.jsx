import React, { useRef } from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionBackground from '../shared/SectionBackground';
import SectionCard from '../shared/SectionCard';

gsap.registerPlugin(ScrollTrigger);

/**
 * WhatsApp Icon (SVG)
 */
const WhatsAppIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
);

const Separator = ({ className = "" }) => (
    <div className={`rsvp-reveal flex items-center gap-3 w-full max-w-[150px] mx-auto ${className}`}>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-xv-gold/40 origin-right scale-x-0 separator-line"></div>
        <span className="text-xv-gold/60 text-[8px] transform scale-0 separator-diamond">✦</span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-xv-gold/40 origin-left scale-x-0 separator-line"></div>
    </div>
);

/**
 * RSVP Component
 */
const RSVP = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reducedMotion) {
            gsap.set('.rsvp-reveal', { opacity: 1, y: 0, scale: 1 });
            gsap.set('.separator-line', { scaleX: 1 });
            gsap.set('.separator-diamond', { scale: 1 });
            return;
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                once: true
            }
        });

        // Sequential animations
        tl.fromTo('.rsvp-label', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
            .fromTo('.rsvp-phrase', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
            .fromTo('.rsvp-button', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }, "-=0.4")
            .fromTo('.rsvp-microcopy', { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.4")
            .to('.separator-line', { scaleX: 1, duration: 1, ease: "power2.inOut" }, "-=1")
            .to('.separator-diamond', { scale: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.8");

    }, { scope: containerRef });

    const whatsappLink = "https://api.whatsapp.com/send/?phone=523841035012&text=Hola%2C%20confirmo%20mi%20asistencia%20a%20los%20XV%20a%C3%B1os%20de%20Lidiana%20%E2%9C%A8";

    return (
        <SectionBackground
            id="section-rsvp"
            halos={[
                { x: "50%", y: "40%", size: "550px", intensity: 0.18 }
            ]}
        >
            <div ref={containerRef} className="py-20 sm:py-28">
                <SectionCard className="text-center">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-6 mb-10">
                        <Separator />
                        <span className="rsvp-label font-body uppercase tracking-[0.2em] text-xv-cream/75"
                            style={{ fontSize: 'clamp(0.85rem, 2.8vw, 1rem)' }}>
                            Confirma tu asistencia
                        </span>
                    </div>

                    {/* Emotional phrase */}
                    <p className="rsvp-phrase font-script italic text-xv-gold-light/90 leading-relaxed max-w-[28ch] mx-auto mb-10"
                        style={{ fontSize: 'clamp(1.15rem, 4vw, 1.45rem)' }}>
                        "Tu presencia es el mejor regalo en este día tan especial"
                    </p>

                    {/* CTA Button */}
                    <div className="flex flex-col items-center">
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rsvp-button animate-pulse-gold group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-4.5 
                                       rounded-full border-[1.5px] border-xv-gold/60 text-[#E8C56C] font-body font-medium uppercase tracking-[0.12em] 
                                       transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.3)]
                                       hover:bg-xv-gold/15 hover:border-xv-gold/90 hover:-translate-y-0.5 active:scale-[0.97]"
                            style={{
                                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.08))',
                                fontSize: 'clamp(0.9rem, 2.8vw, 1.05rem)'
                            }}
                        >
                            <WhatsAppIcon />
                            <span>Confirmar por WhatsApp</span>
                        </a>

                        <p className="rsvp-microcopy font-script italic text-xv-cream/50 mt-4"
                            style={{ fontSize: 'clamp(0.75rem, 2.3vw, 0.85rem)' }}>
                            Se abrirá WhatsApp con un mensaje predefinido
                        </p>
                    </div>

                    {/* Bottom Separator */}
                    <div className="mt-12">
                        <Separator className="mb-0" />
                    </div>
                </SectionCard>
            </div>
        </SectionBackground>
    );
};

export default RSVP;
