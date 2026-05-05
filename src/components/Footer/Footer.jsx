import React from 'react';
import { eventData } from '../../data/eventData';

const Footer = () => {
    return (
        <footer className="w-full py-32 bg-primary text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 w-full flex justify-center">
                <div className="w-full h-2 bg-gradient-to-r from-[#DC143C] via-secondary to-[#8B0000]"></div>
            </div>

            {/* Background patterns */}
            <div className="absolute inset-0 opacity-10 bg-floral-pattern"></div>

            <div className="z-10 px-6 relative">
                <h2 className="font-serif text-6xl md:text-8xl text-cream mb-8 drop-shadow-2xl leading-tight font-bold">¡Te esperamos!</h2>

                <div className="bg-dark/30 backdrop-blur-sm p-4 rounded-lg border border-white/20 inline-block">
                    <p className="font-sans tracking-[0.4em] sm:tracking-[0.6em] uppercase text-sm sm:text-base text-secondary font-bold">{eventData.hashtag}</p>
                </div>

                <div className="flex justify-center items-center gap-6 mt-16 opacity-80">
                    <div className="w-16 h-[2px] bg-secondary"></div>
                    <span className="font-serif text-4xl text-secondary">L</span>
                    <div className="w-16 h-[2px] bg-secondary"></div>
                </div>
            </div>

            {/* Decorative background abstract shapes */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C41E3A] rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 mix-blend-screen opacity-50"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 mix-blend-screen opacity-50"></div>
        </footer>
    );
};

export default Footer;
