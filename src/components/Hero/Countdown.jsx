import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { eventData } from '../../data/eventData';

const Countdown = () => {
    const timeLeft = useCountdown(eventData.targetDate);

    return (
        <div className="flex justify-center items-center gap-3 sm:gap-4 font-body mt-4">
            <div className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 backdrop-blur-md bg-white/5 border border-xv-gold/20 rounded-sm">
                <span className="text-xl sm:text-2xl text-white font-light">{timeLeft.days.toString().padStart(2, '0')}</span>
                <span className="text-[9px] sm:text-[10px] tracking-widest text-xv-gold/70 mt-1 uppercase font-semibold">Días</span>
            </div>
            <span className="text-xv-gold/50 text-xl">:</span>

            <div className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 backdrop-blur-md bg-white/5 border border-xv-gold/20 rounded-sm">
                <span className="text-xl sm:text-2xl text-white font-light">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-[9px] sm:text-[10px] tracking-widest text-xv-gold/70 mt-1 uppercase font-semibold">Hrs</span>
            </div>
            <span className="text-xv-gold/50 text-xl">:</span>

            <div className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 backdrop-blur-md bg-white/5 border border-xv-gold/20 rounded-sm">
                <span className="text-xl sm:text-2xl text-white font-light">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-[9px] sm:text-[10px] tracking-widest text-xv-gold/70 mt-1 uppercase font-semibold">Min</span>
            </div>
            <span className="text-xv-gold/50 text-xl">:</span>

            <div className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 backdrop-blur-md bg-white/5 border border-xv-gold/20 rounded-sm">
                <span className="text-xl sm:text-2xl text-white font-light">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-[9px] sm:text-[10px] tracking-widest text-xv-gold/70 mt-1 uppercase font-semibold">Seg</span>
            </div>
        </div>
    );
};

export default Countdown;
