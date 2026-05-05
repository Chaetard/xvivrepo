import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '../../hooks/useGSAP';
import { CRITICAL_IMAGES } from '../../data/eventData';
// import GoldParticles from '../ui/GoldParticles';

const EnvelopeIntro = ({ isReady, onOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const flapRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        if (isOpen) {
            const tl = gsap.timeline({ onComplete: onOpen });
            // Open flap
            tl.to(flapRef.current, {
                rotateX: 180,
                duration: 0.8,
                ease: "power2.inOut"
            })
                // Fade out envelope
                .to(containerRef.current, {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.inOut"
                }, "+=0.3");
        }
    }, [isOpen]);

    const handleOpen = () => {
        if (isReady && !isOpen) {
            setIsOpen(true);
        }
    };

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#1a0a0a] via-[#3d0c0c] to-[#1a0a0a] overflow-hidden">
            {/* Texture overlay */}
            <div
                className="absolute inset-0 z-0 opacity-15 pointer-events-none"
                style={{
                    backgroundImage: `url(${CRITICAL_IMAGES[1]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            {/* Particles */}
            {/* <GoldParticles /> */}

            <div ref={contentRef} className="relative z-20 flex flex-col items-center justify-center" onClick={handleOpen}>
                {!isReady ? (
                    <div className="w-8 h-8 border-[2px] border-xv-gold/20 border-t-xv-gold rounded-full animate-spin"></div>
                ) : (
                    <div className="relative cursor-pointer group">
                        {/* CSS Envelope Base */}
                        <div className="relative w-64 h-48 sm:w-80 sm:h-56 bg-xv-wine/90 border border-xv-gold/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
                            {/* Flap */}
                            <div
                                ref={flapRef}
                                className="absolute top-0 left-0 w-full h-0 border-solid origin-top z-30 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
                                style={{
                                    borderWidth: '0 8rem 6rem 8rem',
                                    borderColor: 'transparent transparent transparent transparent',
                                    borderTop: '6rem solid rgba(139, 0, 0, 0.95)', // burgundy ish
                                    transformStyle: 'preserve-3d',
                                    width: '100%',
                                }}
                            />
                            {/* Left/Right flaps for visual */}
                            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden w-full h-full">
                                <div className="absolute top-0 left-0 w-0 h-0 border-solid border-l-xv-red/80" style={{ borderWidth: '12rem 0 0 16rem', borderColor: 'transparent transparent transparent rgba(107,21,32,0.6)' }} />
                                <div className="absolute top-0 right-0 w-0 h-0 border-solid border-r-xv-red/80" style={{ borderWidth: '12rem 16rem 0 0', borderColor: 'transparent rgba(107,21,32,0.6) transparent transparent' }} />
                                <div className="absolute bottom-0 left-0 w-full h-0 border-solid border-b-xv-wine" style={{ borderWidth: '0 0 8rem 16rem', borderColor: 'transparent transparent rgba(61,12,12,0.9) transparent' }} />
                            </div>

                            {/* Seal */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-0 transition-transform duration-300 group-hover:scale-105">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-xv-gold-light via-xv-gold to-[#a8811d] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] border-2 border-white/10">
                                    <span className="font-script text-2xl text-xv-black mt-1">XV</span>
                                </div>
                                <span className="absolute -bottom-8 font-body text-[10px] tracking-widest text-xv-gold uppercase whitespace-nowrap opacity-80">Abre tu invitación</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnvelopeIntro;
