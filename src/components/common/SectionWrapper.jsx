import React, { useRef } from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';

const SectionWrapper = ({ id, children, className = '', noReveal = false, noMinHeight = false }) => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        if (noReveal) return;

        gsap.fromTo(sectionRef.current,
            { autoAlpha: 0, y: 50 },
            {
                duration: 1,
                autoAlpha: 1,
                y: 0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                }
            }
        );
    }, []);

    return (
        <section id={id} ref={sectionRef} className={`w-full ${noMinHeight ? 'py-16' : 'min-h-screen py-20'} px-6 sm:px-12 md:px-24 flex flex-col items-center justify-center relative ${className}`}>
            {children}
        </section>
    );
};

export default SectionWrapper;
