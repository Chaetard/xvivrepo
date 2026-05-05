import React, { useRef } from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';

const ScrollIndicator = () => {
    const dotRef = useRef(null);

    useGSAP(() => {
        gsap.to(dotRef.current, {
            y: 20,
            opacity: 0,
            repeat: -1,
            duration: 1.5,
            ease: 'power2.inOut'
        });
    }, []);

    return (
        <div className="flex justify-center items-center mt-12 mb-4 z-20 relative">
            <div className="w-6 h-10 border-2 border-secondary rounded-full flex justify-center pt-2">
                <div ref={dotRef} className="w-1.5 h-1.5 bg-secondary rounded-full" />
            </div>
        </div>
    );
};

export default ScrollIndicator;
