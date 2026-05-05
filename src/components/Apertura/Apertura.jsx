import React, { useState, useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '../../hooks/useGSAP';
import GoldenParticles from '../shared/GoldenParticles';
import RosePetals from '../ui/RosePetals';
import AudioManager from '../../utils/AudioManager';

const BG_SILK = 'https://images.unsplash.com/photo-1590012357757-4229986bb60f?q=80&w=2670&auto=format&fit=crop'; // Re-use Hero silk

/**
 * Apertura Component - Cinematic Invitation Opening
 */
const Apertura = ({ onComplete }) => {
  const isReturning = !!sessionStorage.getItem('lidiana_xv_opened');
  const [isOpening, setIsOpening] = useState(false);
  const containerRef = useRef(null);
  const envelopeRef = useRef(null);
  const sealRef = useRef(null);
  const cardRef = useRef(null);

  // 4. Lectura de query params
  const invitadoName = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    let name = params.get('name') || params.get('invitado');
    if (!name) return null;

    // Sanitize & Capitalize
    name = decodeURIComponent(name).replace(/[-_]/g, ' ');
    if (name.length > 30) name = name.substring(0, 30) + '...';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => AudioManager.preload(), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isReturning) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reducedMotion ? 0 : 10000;
    const t = setTimeout(() => handleOpen(), delay);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = () => {
    if (isOpening) return;
    AudioManager.play();
    setIsOpening(true);

    // Bloquear scroll
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('lidiana_xv_opened', 'true');
        document.body.style.overflow = '';
        onComplete();
      }
    });

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      tl.to(containerRef.current, { opacity: 0, duration: 0.5 });
      return;
    }

    // Fase 1: Feedback (click) & Limpiar overflow para permitir rotación
    tl.set(envelopeRef.current, { overflow: 'visible' }) // Permitir que la solapa salga al rotar
      .to(sealRef.current, { scale: 0.92, duration: 0.1, yEase: "power1.inOut" })
      .to(sealRef.current, { scale: 1, duration: 0.1 });

    // Fase 2: Sello rompiéndose
    tl.to('.seal-particle', {
      x: (i) => Math.cos(i) * 120,
      y: (i) => Math.sin(i) * 120,
      rotation: () => Math.random() * 360,
      scale: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0,
      ease: "power3.out"
    }, "+=0.1");

    // Fase 3: Solapa abriéndose
    tl.to('.envelope-flap', {
      rotateX: -170,
      translateZ: -100, // Empujar hacia atrás para que no estorbe
      opacity: 0.4,     // Desvanecer ligeramente al abrir
      duration: 1.2,
      ease: "power2.inOut"
    }, "-=0.6");

    // Fase 4: Carta saliendo
    tl.set(cardRef.current, { zIndex: 50 }); // Asegurar que sale AL FRENTE de todo
    tl.fromTo(cardRef.current,
      { y: 0, opacity: 0, scale: 0.8 },
      { y: -200, opacity: 1, scale: 1.1, duration: 1.2, ease: "power2.out" },
      "-=0.7"
    );

    // Fase 5: Fade-out de la solapa (ya no es necesaria)
    tl.to('.envelope-flap', { opacity: 0, duration: 0.4 }, "-=0.8");

    // Fase 6: Fade-out Cinematográfico del contenedor
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 1.2,
      duration: 1.2,
      ease: "power2.inOut"
    }, "-=0.4");
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1A0508] overflow-hidden"
    >
      {/* 1. FONDO COHERENTE */}
      <div className="absolute inset-0 z-0">
        {/* Capa seda */}
        <div
          className="absolute inset-0 opacity-70 blur-[8px] brightness-[0.6]"
          style={{
            backgroundImage: `url(${BG_SILK})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />

        {/* Halo detrás de la carta */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] z-1 ${!isReturning ? 'ap-glow' : ''}`}
          style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, transparent 60%)', filter: 'blur(60px)' }} />
      </div>

      {/* Pétalos y Partículas */}
      <RosePetals />
      <GoldenParticles count={18} />

      {/* 4. MICROCOPY SUPERIOR */}
      <div className="relative z-10 text-center mb-10 transition-opacity duration-700 h-16 flex flex-col justify-end">
        {invitadoName ? (
          <>
            <span className="block font-body uppercase tracking-[0.3em] text-xv-gold/70 text-xs mb-2">Para:</span>
            <span className="font-script italic text-xv-gold-light" style={{ fontSize: 'clamp(1.3rem, 4.5vw, 1.7rem)' }}>{invitadoName}</span>
          </>
        ) : (
          <span className="font-script italic text-xv-cream/85" style={{ fontSize: 'clamp(1rem, 3.5vw, 1.2rem)' }}>Tienes una invitación</span>
        )}
      </div>

      {/* 2. SOBRE PREMIUM */}
      <div
        ref={envelopeRef}
        onClick={handleOpen}
        className={`envelope relative w-[280px] h-[200px] sm:w-[360px] sm:h-[260px] cursor-pointer z-10 overflow-hidden rounded-lg ${!isReturning ? 'ap-float' : ''} ${isOpening ? 'pointer-events-none' : ''}`}
        style={{ perspective: '1200px' }}
      >
        {/* Sombra proyectada */}
        <div className="absolute inset-x-2 bottom-0 h-4 bg-black/60 blur-xl opacity-60 z-0" />

        {/* Cuerpo del sobre */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#5C0F1A] via-[#3D0810] to-[#5C0F1A] border border-xv-gold/40 rounded-lg shadow-[inset_0_0_60px_rgba(0,0,0,0.4)] overflow-hidden">
          {/* Textura de papel */}
          <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
          </div>
        </div>

        {/* Esquinas ornamentales */}
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`absolute w-8 h-8 sm:w-10 sm:h-10 text-xv-gold/60 ${i === 0 ? 'top-2 left-2 rotate-0' :
            i === 1 ? 'top-2 right-2 rotate-90' :
              i === 2 ? 'bottom-2 right-2 rotate-180' : 'bottom-2 left-2 -rotate-90'
            }`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M2,12 L2,2 L12,2" />
              <path d="M6,6 L10,6 M6,6 L6,10" />
            </svg>
          </div>
        ))}

        {/* Carta (inicialmente oculta) */}
        <div
          ref={cardRef}
          className="absolute inset-x-4 bottom-4 h-full bg-xv-cream rounded-sm shadow-xl flex items-center justify-center p-4 z-[2] opacity-0"
        >
          <div className="border border-xv-gold/30 w-full h-full flex flex-col items-center justify-center text-xv-dark p-4">
            <span className="font-display text-xs uppercase tracking-widest mb-1">Mis XV</span>
            <div className="w-8 h-px bg-xv-gold/50 mb-3" />
            <h4 className="font-display text-2xl tracking-widest">LIDIANA</h4>
          </div>
        </div>

        {/* Solapa (envelope-flap) */}
        <div
          className="envelope-flap absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#6B121F] to-[#4A0A14] origin-top z-[3] shadow-md"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
        />

        {/* 3. SELLO DE CERA PREMIUM */}
        <div
          ref={sealRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] rounded-full z-[4] shadow-[inset_0_4px_8px_rgba(255,230,150,0.4),inset_0_-4px_8px_rgba(60,40,0,0.5),0_4px_12px_rgba(0,0,0,0.5),0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center group overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #F4D679 0%, #D4AF37 40%, #8B6914 80%, #6B5010 100%)'
          }}
        >
          {/* Shimmer effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent mix-blend-overlay ${!isReturning ? 'ap-shimmer' : ''}`} />

          {/* Sello Text */}
          <span className="font-display font-bold text-[22px] sm:text-[28px] text-[#4A3508] tracking-widest"
            style={{ textShadow: '1px 1px 0 rgba(255,220,130,0.4), -1px -1px 0 rgba(60,40,0,0.4)' }}>
            XV
          </span>

          {/* Partículas de ruptura (ocultas hasta el click) */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="seal-particle absolute w-full h-full rounded-full opacity-0 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }} />
          ))}
        </div>
      </div>

      {/* MICROCOPY INFERIOR */}
      <div className={`relative z-10 mt-10 transition-opacity duration-500 ${isOpening ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-col items-center gap-2">
          <div className={`${!isReturning ? 'ap-bounce' : ''} text-xv-gold/70`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </div>
          <span className="font-script italic text-xv-gold-light/80" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}>
            Abre tu invitación
          </span>
        </div>
      </div>
    </div>
  );
};

export default Apertura;
