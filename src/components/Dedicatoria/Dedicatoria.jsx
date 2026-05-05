import React, { useRef } from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventData } from '../../data/eventData';
import SectionBackground from '../shared/SectionBackground';
import SectionCard from '../shared/SectionCard';

gsap.registerPlugin(ScrollTrigger);

const Separator = ({ className = "" }) => (
    <div className={`dedicatoria-reveal flex items-center gap-3 w-full max-w-[180px] mx-auto ${className}`}>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-xv-gold/40 origin-right scale-x-0 separator-line"></div>
        <span className="text-xv-gold/60 text-[10px] transform scale-0 separator-diamond">✦</span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-xv-gold/40 origin-left scale-x-0 separator-line"></div>
    </div>
);

const Dedicatoria = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reducedMotion) {
            gsap.set('.dedicatoria-reveal', { opacity: 1, y: 0 });
            gsap.set('.separator-line', { scaleX: 1 });
            gsap.set('.separator-diamond', { scale: 1 });
            return;
        }

        const blocks = gsap.utils.toArray('.dedicatoria-block');

        blocks.forEach((block) => {
            const elements = block.querySelectorAll('.dedicatoria-reveal');
            const separators = block.querySelectorAll('.separator-line');
            const diamonds = block.querySelectorAll('.separator-diamond');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: block,
                    start: "top 85%",
                    once: true
                }
            });

            tl.fromTo(elements,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out"
                }
            )
                .to(separators, {
                    scaleX: 1,
                    duration: 1,
                    ease: "power2.inOut",
                    stagger: 0.1
                }, "-=0.6")
                .to(diamonds, {
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    stagger: 0.1
                }, "-=0.8");
        });
    }, { scope: containerRef });

    return (
        <SectionBackground
            id="section-dedicatoria"
            className="-mt-5 z-20"
            halos={[
                { x: "50%", y: "30%", size: "600px", intensity: 0.18 },
                { x: "50%", y: "75%", size: "500px", intensity: 0.15 }
            ]}
        >
            <div ref={containerRef} className="py-20 sm:py-32">
                <SectionCard>
                    {/* 1. Separador ornamental superior */}
                    <div className="dedicatoria-block w-full flex flex-col items-center gap-12 sm:gap-14">
                        <Separator />

                        {/* 2 & 3. Cita bíblica y Referencia */}
                        <div className="flex flex-col items-center text-center">
                            <p className="dedicatoria-reveal font-script italic text-xv-cream/90 leading-[1.7] max-w-[30ch]"
                                style={{ fontSize: 'clamp(1.25rem, 4.5vw, 1.75rem)' }}>
                                "Todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora"
                            </p>
                            <span className="dedicatoria-reveal font-serif text-xv-gold/70 mt-4"
                                style={{ fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)' }}>
                                — Eclesiastés 3:1
                            </span>
                        </div>

                        <Separator />
                    </div>

                    {/* 5. Bloque de Padres */}
                    <div className="dedicatoria-block w-full flex flex-col items-center gap-12 sm:gap-14 mt-12 sm:mt-14">
                        <div className="flex flex-col items-center text-center gap-6">
                            <span className="dedicatoria-reveal font-body uppercase tracking-[0.2em] text-xv-cream/70"
                                style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)' }}>
                                CON LA BENDICIÓN DE MIS PADRES
                            </span>

                            <p className="dedicatoria-reveal font-script italic text-xv-cream/85 leading-[1.8] max-w-[32ch]"
                                style={{ fontSize: 'clamp(1rem, 3.5vw, 1.2rem)' }}>
                                Sus padres, <span className="text-xv-gold-light font-medium">{eventData.parents}</span>, tienen el honor de invitarte a celebrar este momento tan especial
                            </p>
                        </div>

                        <Separator />
                    </div>

                    {/* 7. Bloque de Padrinos */}
                    <div className="dedicatoria-block w-full flex flex-col items-center gap-12 sm:gap-14 mt-12 sm:mt-14">
                        <div className="flex flex-col items-center text-center gap-6">
                            <span className="dedicatoria-reveal font-body uppercase tracking-[0.2em] text-xv-cream/70"
                                style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)' }}>
                                MIS PADRINOS
                            </span>

                            <p className="dedicatoria-reveal font-script italic text-xv-cream/60"
                                style={{ fontSize: 'clamp(1rem, 3.5vw, 1.2rem)' }}>
                                {eventData.godparents}
                            </p>
                        </div>

                        <Separator className="mb-0" />
                    </div>
                </SectionCard>
            </div>
        </SectionBackground>
    );
};

export default Dedicatoria;
