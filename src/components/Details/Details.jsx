import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '../../hooks/useGSAP';
import { eventData, IMAGES } from '../../data/eventData';

gsap.registerPlugin(ScrollTrigger);

const Details = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                end: "bottom bottom",
                toggleActions: "play none none reverse",
            }
        });

        tl.fromTo(".detail-card",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
        );
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-24 px-6 min-h-[80svh] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Venue Image with heavy overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={IMAGES.venue}
                    alt="Venue Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-xv-dark opacity-85"></div>
            </div>

            <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
                <h3 className="font-display text-4xl sm:text-5xl text-white mb-6 tracking-wide text-center">Detalles del Evento</h3>

                {/* Ornamento Dorado */}
                <div className="flex items-center gap-4 w-full max-w-[120px] mb-12">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-xv-gold/50"></div>
                    <span className="text-xv-gold text-[10px]">✦</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-xv-gold/50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {eventData.eventDetails.map((detail, index) => (
                        <div
                            key={detail.id}
                            className="detail-card flex flex-col items-center justify-center text-center p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-sm hover:border-xv-gold/30 transition-colors duration-300"
                        >
                            <span className="text-3xl mb-4 opacity-90">{detail.icon}</span>
                            <h4 className="font-display text-xl text-xv-gold mb-2">{detail.title}</h4>
                            <p className="font-body text-sm font-light text-white/90 leading-relaxed mb-2">{detail.desc}</p>
                            {detail.address && (
                                <p className="font-body text-xs text-white/50 uppercase tracking-widest mt-2">{detail.address}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Details;
