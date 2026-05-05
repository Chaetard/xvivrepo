import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import AudioManager from '../../utils/AudioManager';

const AudioButton = () => {
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const onStarted = () => setVisible(true);
    const onEnded = () => setVisible(false);
    const onMuteChange = (e) => setMuted(e.detail.muted);

    window.addEventListener('audio:started', onStarted);
    window.addEventListener('audio:ended', onEnded);
    window.addEventListener('audio:muteChange', onMuteChange);

    return () => {
      window.removeEventListener('audio:started', onStarted);
      window.removeEventListener('audio:ended', onEnded);
      window.removeEventListener('audio:muteChange', onMuteChange);
    };
  }, []);

  const handleClick = () => {
    const nowMuted = AudioManager.toggleMute();
    setMuted(nowMuted);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={muted ? 'Activar música' : 'Silenciar música'}
      className={`audio-btn${visible ? ' audio-btn--visible' : ''}`}
    >
      {muted
        ? <VolumeX size={20} color="#D4AF37" aria-hidden="true" />
        : <Volume2 size={20} color="#D4AF37" aria-hidden="true" />
      }
    </button>
  );
};

export default AudioButton;
