import React, { useEffect, useRef } from 'react';

const GoldenParticles = ({ count = 15 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    let rafId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 20;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.driftX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.time = Math.random() * 100;
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.time * 0.02) * 0.5 + this.driftX;
        this.time++;

        if (this.y < -10) {
          this.init();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#D4AF37';
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      particles = Array.from({ length: count }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      rafId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', init);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', init);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-2"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default GoldenParticles;
