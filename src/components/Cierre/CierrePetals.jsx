import React, { useEffect, useRef } from 'react';

const PETAL_COLORS = [
    [93, 20, 30],   // vino
    [139, 0, 28],   // rojo oscuro
    [180, 35, 55],   // rojo medio
    [120, 20, 40],   // borgoña
    [212, 175, 55],   // dorado
];

function drawPetal(ctx, s) {
    ctx.beginPath();
    ctx.moveTo(0, -12 * s);
    ctx.bezierCurveTo(7 * s, -12 * s, 10 * s, -4 * s, 8 * s, 3 * s);
    ctx.bezierCurveTo(6 * s, 10 * s, 2 * s, 13 * s, 0, 13 * s);
    ctx.bezierCurveTo(-2 * s, 13 * s, -6 * s, 10 * s, -8 * s, 3 * s);
    ctx.bezierCurveTo(-10 * s, -4 * s, -7 * s, -12 * s, 0, -12 * s);
    ctx.closePath();
}

function makePetal(w, h, mobile, staggered) {
    const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
    return {
        x: Math.random() * w,
        y: staggered ? -20 - Math.random() * h : Math.random() * h,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015, // slower rotation
        fallSpeed: 0.2 + Math.random() * 0.35,    // slower fall (requested)
        swayAmp: 25 + Math.random() * 35,       // more sway
        swaySpeed: 0.004 + Math.random() * 0.007,
        swayOffset: Math.random() * Math.PI * 2,
        scale: mobile ? 0.4 + Math.random() * 0.4 : 0.6 + Math.random() * 0.6,
        opacity: 0.25 + Math.random() * 0.35,
        color,
    };
}

/**
 * CierrePetals Component - Instances more petals for a closing experience
 */
const CierrePetals = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });

        const isMobile = window.innerWidth < 768;
        const COUNT = isMobile ? 22 : 40; // 2x density (requested)

        let rafId = null;
        let running = true;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();

        let petals = Array.from({ length: COUNT }, () =>
            makePetal(canvas.width, canvas.height, isMobile, false)
        );

        const tick = () => {
            if (!running) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time++;

            for (const p of petals) {
                p.y += p.fallSpeed;
                p.rotation += p.rotSpeed;
                const sway = Math.sin(time * p.swaySpeed + p.swayOffset) * p.swayAmp;

                if (p.y > canvas.height + 30) {
                    p.y = -30;
                    p.x = Math.random() * canvas.width;
                }

                ctx.save();
                ctx.globalAlpha = p.opacity;
                ctx.translate(p.x + sway, p.y);
                ctx.rotate(p.rotation);
                ctx.fillStyle = `rgb(${p.color[0]},${p.color[1]},${p.color[2]})`;
                drawPetal(ctx, p.scale);
                ctx.fill();
                ctx.restore();
            }

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);

        const onResize = () => {
            resize();
            petals = Array.from({ length: COUNT }, () =>
                makePetal(canvas.width, canvas.height, isMobile, false)
            );
        };
        window.addEventListener('resize', onResize, { passive: true });

        return () => {
            running = false;
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 3,
            }}
        />
    );
};

export default CierrePetals;
