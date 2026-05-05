const OGG_URL =
  "https://bhmcnobbizqsdplxambv.supabase.co/storage/v1/object/public/n0kemm_bucket/openingogg.ogg";
const MP3_URL =
  "https://bhmcnobbizqsdplxambv.supabase.co/storage/v1/object/public/n0kemm_bucket/openingmp3.mp3";

const AudioManager = (() => {
  let audio = null;
  let started = false;
  let muted = false;
  let fadeRaf = null;

  function emit(event, detail = {}) {
    window.dispatchEvent(new CustomEvent(`audio:${event}`, { detail }));
  }

  function onEnded() {
    started = false;
    emit("ended");
    cleanup();
  }

  function onError() {
    started = false;
    cleanup();
  }

  function cleanup() {
    if (audio) {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.src = "";
      audio = null;
    }
  }

  function init() {
    if (audio) return true;
    try {
      audio = new Audio();
      const canOgg = audio.canPlayType('audio/ogg; codecs="vorbis"');
      audio.src = canOgg !== "" ? OGG_URL : MP3_URL;
      audio.loop = false;
      audio.volume = 0;
      audio.addEventListener("ended", onEnded);
      audio.addEventListener("error", onError);
      return true;
    } catch (e) {
      audio = null;
      return false;
    }
  }

  function _fadeTo(targetVol, durationMs) {
    if (!audio) return;
    if (fadeRaf) cancelAnimationFrame(fadeRaf);

    const startVol = audio.volume;
    const diff = targetVol - startVol;
    if (Math.abs(diff) < 0.001) return;

    const startTime = performance.now();

    function tick(now) {
      if (!audio) return;
      const elapsed = now - startTime;
      const p = Math.min(elapsed / durationMs, 1);
      // ease-in-out cubic
      const t = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      audio.volume = Math.max(0, Math.min(1, startVol + diff * t));
      if (p < 1) {
        fadeRaf = requestAnimationFrame(tick);
      } else {
        fadeRaf = null;
      }
    }
    fadeRaf = requestAnimationFrame(tick);
  }

  return {
    preload() {
      if (started) return;
      if (!init()) return;
      audio.preload = "auto";
    },

    play() {
      if (started) return;
      if (!init()) return;
      audio.volume = 1;
      audio.currentTime = 15;
      const p = audio.play();
      if (p !== undefined) {
        p.then(() => {
          started = true;
          emit("started");
          _fadeTo(0.7, 1500);
        }).catch(() => {
          // Silent fail — autoplay policy or network error
        });
      }
    },

    fadeTo(vol, durationMs = 1000) {
      if (!started) return;
      _fadeTo(Math.max(0, Math.min(1, vol)), durationMs);
    },

    toggleMute() {
      if (!audio || !started) return muted;
      muted = !muted;
      audio.muted = muted;
      emit("muteChange", { muted });
      return muted;
    },

    get isStarted() {
      return started;
    },
    get isMuted() {
      return muted;
    },
  };
})();

export default AudioManager;
