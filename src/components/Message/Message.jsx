import React, { useRef } from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventData, CRITICAL_IMAGES } from '../../data/eventData';

gsap.registerPlugin(ScrollTrigger);

const Message = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom 80%",
                toggleActions: "play none none reverse",
            }
        });

        tl.fromTo(".msg-element",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
        );
    }, []);

    return (
        <section ref={containerRef} className="relative w-full min-h-[60svh] flex flex-col items-center justify-center py-20 px-6 overflow-hidden bg-xv-dark">
            {/* Marble Texture Background */}
            <div
                className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none"
                style={{
                    backgroundImage: `url(${CRITICAL_IMAGES[2]})`, // marbleTexture
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Comilla Decorativa Gigante */}
            <span className="absolute top-10 left-[10%] text-9xl text-xv-gold/10 font-display select-none pointer-events-none">"</span>
            <span className="absolute bottom-10 right-[10%] text-9xl text-xv-gold/10 font-display select-none pointer-events-none rotate-180">"</span>

            <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center">
                {/* Ornamento Superior */}
                <div className="msg-element flex items-center gap-4 w-full max-w-[120px] mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-xv-gold/50"></div>
                    <span className="text-xv-gold text-[10px]">✦</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-xv-gold/50"></div>
                </div>

                <p className="msg-element font-script text-white/90 text-2xl md:text-3xl lg:text-4xl leading-loose italic mb-10 max-w-[85%] mx-auto">
                    {eventData.message}
                </p>

                {/* Ornamento Inferior */}
                <div className="msg-element flex items-center gap-4 w-full max-w-[120px] mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-xv-gold/50"></div>
                    <span className="text-xv-gold text-[10px]">✦</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-xv-gold/50"></div>
                </div>

                <div className="msg-element flex flex-col items-center gap-2">
                    <span className="font-body text-sm text-white/70 uppercase tracking-widest">Con cariño,</span>
                    <span className="font-script text-4xl text-xv-gold italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{eventData.signature}</span>
                    <span className="font-body text-xs text-white/40 tracking-widest mt-4 uppercase">{eventData.parents}</span>
                </div>
            </div>
        </section>
    );
};

export default Message;
