import React from 'react';

const DetailCard = ({ title, icon, desc, address }) => {
    return (
        <div className="detail-card bg-white p-8 rounded shadow-lg flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 h-full">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="text-4xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">{icon}</div>
            <h3 className="font-serif text-2xl text-primary mb-4 tracking-wide">{title}</h3>
            <p className="font-sans text-dark/80 mb-3 font-medium text-balance">{desc}</p>
            {address && (
                <div className="mt-auto pt-2">
                    <div className="w-8 h-px bg-secondary/50 mx-auto mb-2"></div>
                    <p className="font-sans text-xs uppercase tracking-widest text-dark/50 text-balance">{address}</p>
                </div>
            )}

            {/* Decorative corners */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-secondary/20"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-secondary/20"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-secondary/20"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-secondary/20"></div>
        </div>
    );
};

export default DetailCard;
