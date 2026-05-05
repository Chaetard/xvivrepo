import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImagePreloader } from './hooks/useImagePreloader';
import { CRITICAL_IMAGES, SECONDARY_IMAGES } from './data/eventData';
import AudioManager from './utils/AudioManager';

import Apertura from './components/Apertura/Apertura';
import Hero from './components/Hero/Hero';
import Dedicatoria from './components/Dedicatoria/Dedicatoria';
import InvitacionFormal from './components/InvitacionFormal/InvitacionFormal';
import RSVP from './components/RSVP/RSVP';
import Cierre from './components/Cierre/Cierre';
import AudioButton from './components/shared/AudioButton';

gsap.registerPlugin(ScrollTrigger);

const VOLUME_CURVE = [
  { id: 'section-hero',        vol: 0.53, duration: 2000 },
  { id: 'section-dedicatoria', vol: 0.30, duration: 1500 },
  { id: 'section-invitacion',  vol: 0.30, duration: 0    },
  { id: 'section-rsvp',        vol: 0.23, duration: 1000 },
  { id: 'section-cierre',      vol: 0.45, duration: 8000 },
];

function App() {
  useImagePreloader(CRITICAL_IMAGES, SECONDARY_IMAGES);

  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    const triggers = VOLUME_CURVE.map(({ id, vol, duration }) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 60%',
        onEnter: () => AudioManager.fadeTo(vol, duration || 1000),
        onEnterBack: () => AudioManager.fadeTo(vol, duration || 1000),
      })
    );

    return () => triggers.forEach((t) => t.kill());
  }, [hasStarted]);

  return (
    <div className="bg-cream min-h-screen text-dark font-sans selection:bg-secondary selection:text-white">
      {!hasStarted && (
        <Apertura onComplete={() => setHasStarted(true)} />
      )}

      {hasStarted && (
        <main className="opacity-0 animate-[fadeIn_1.5s_ease-in-out_forwards]">
          <Hero />
          <Dedicatoria />
          <InvitacionFormal />
          <RSVP />
          <Cierre />
        </main>
      )}

      <AudioButton />
    </div>
  );
}

export default App;
