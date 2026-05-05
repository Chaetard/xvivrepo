import React, { useEffect, useRef } from 'react';

// [r,g,b] tuples — opacity applied per-petal at draw time
const PETAL_COLORS = [
    [93,  20,  30],   // vino
    [139,  0,  28],   // rojo oscuro
    [180, 35,  55],   // rojo medio
    [120, 20,  40],   // borgoña
    [212, 175, 55],   // dorado
];

// Asymmetric rose-petal bezier path, unit size ~25px tall
function drawPetal(ctx, s) {
    ctx.beginPath();
    ctx.moveTo(0, -12 * s);
    ctx.bezierCurveTo( 7 * s, -12 * s,  10 * s, -4 * s,  8 * s,  3 * s);
    ctx.bezierCurveTo( 6 * s,  10 * s,   2 * s, 13 * s,  0,     13 * s);
    ctx.bezierCurveTo(-2 * s,  13 * s,  -6 * s, 10 * s, -8 * s,  3 * s);
    ctx.bezierCurveTo(-10 * s, -4 * s,  -7 * s, -12 * s, 0, -12 * s);
    ctx.closePath();
}

function makePetal(w, h, mobile, staggered) {
    const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
    return {
        x:            Math.random() * w,
        // stagger starting positions so petals don't all appear at once
        y:            staggered ? -20 - Math.random() * h : Math.random() * h,
        rotation:     Math.random() * Math.PI * 2,
        rotSpeed:     (Math.random() - 0.5) * 0.022,
        fallSpeed:    0.35 + Math.random() * 0.5,
        swayAmp:      18 + Math.random() * 28,
        swaySpeed:    0.006 + Math.random() * 0.009,
        swayOffset:   Math.random() * Math.PI * 2,
        scale:        mobile ? 0.55 + Math.random() * 0.5 : 0.7 + Math.random() * 0.65,
        opacity:      0.3 + Math.random() * 0.28,
        color,
    };
}

const RosePetals = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Honour user motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });

        const isMobile = window.innerWidth < 768;
        const COUNT = isMobile ? 10 : 18;

        let rafId = null;
        let running = false;
        let time = 0;

        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();

        let petals = Array.from({ length: COUNT }, () =>
            makePetal(canvas.width, canvas.height, isMobile, true)
        );

        const tick = () => {
            if (!running) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time++;

            for (const p of petals) {
                p.y += p.fallSpeed;
                p.rotation += p.rotSpeed;
                const sway = Math.sin(time * p.swaySpeed + p.swayOffset) * p.swayAmp;

                // Recycle petal when it exits the bottom
                if (p.y > canvas.height + 25) {
                    p.y = -25;
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

        // Pause when tab is backgrounded
        const onVisibility = () => {
            if (document.hidden) {
                running = false;
                cancelAnimationFrame(rafId);
            } else {
                running = true;
                rafId = requestAnimationFrame(tick);
            }
        };
        document.addEventListener('visibilitychange', onVisibility);

        // Start immediately (component mounts only after envelope opens)
        running = true;
        rafId = requestAnimationFrame(tick);

        const onResize = () => {
            resize();
            // Re-seed petals at current positions so they don't jump
            petals = Array.from({ length: COUNT }, () =>
                makePetal(canvas.width, canvas.height, isMobile, false)
            );
        };
        window.addEventListener('resize', onResize, { passive: true });

        return () => {
            running = false;
            cancelAnimationFrame(rafId);
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 5,          // above page background, below hero content (z-20) and navbar (z-100)
            }}
        />
    );
};

export default RosePetals;
