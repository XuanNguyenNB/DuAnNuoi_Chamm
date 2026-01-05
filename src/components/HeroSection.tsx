import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import { ChamMood } from '../data/config';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
    mood: ChamMood;
}

// Floating hearts component
const FloatingHearts = () => {
    const hearts = ['💖', '💕', '💗', '💓', '✨', '🎀', '💝'];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {hearts.map((heart, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100 + '%',
                        y: '110%',
                        opacity: 0,
                        scale: 0.5 + Math.random() * 0.5
                    }}
                    animate={{
                        y: '-10%',
                        opacity: [0, 1, 1, 0],
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        delay: i * 1.5,
                        ease: "linear"
                    }}
                    className="absolute text-2xl md:text-3xl"
                    style={{ left: `${10 + i * 12}%` }}
                >
                    {heart}
                </motion.div>
            ))}
        </div>
    );
};

const HeroSection = ({ mood }: HeroSectionProps) => {
    const [showSparkle, setShowSparkle] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowSparkle(true);
            setTimeout(() => setShowSparkle(false), 1000);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden py-8 md:py-12 px-4">
            {/* Animated background */}
            <FloatingHearts />

            {/* Gradient orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-pink-200/40 to-purple-200/40 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-rose-200/40 to-pink-200/40 rounded-full blur-3xl"
            />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                {/* Mood-based avatar */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="mb-6 relative inline-block"
                >
                    {/* Pulse ring effect */}
                    <motion.div
                        animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-cham-pink-300"
                    />

                    <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full overflow-hidden shadow-2xl shadow-cham-pink-300/50 glow ring-4 ring-cham-pink-200">
                        <img
                            src="/photo_2026-01-06_05-07-59.jpg"
                            alt="Châm"
                            className="w-full h-full object-cover"
                        />
                        {/* Mood badge */}
                        <motion.div
                            animate={{
                                scale: [1, 1.15, 1],
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute -bottom-1 -right-1 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-2xl md:text-3xl"
                        >
                            {mood.emoji}
                        </motion.div>
                    </div>

                    {/* Sparkle effect */}
                    {showSparkle && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                            className="absolute -top-2 -right-2 text-2xl"
                        >
                            ✨
                        </motion.div>
                    )}
                </motion.div>

                {/* Title with stagger animation */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-3xl md:text-5xl font-extrabold mb-3 md:mb-4"
                >
                    <span className="gradient-text">DỰ ÁN NUÔI CHÂMM</span>
                    <motion.span
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, 15, -15, 0]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="inline-block ml-2"
                    >
                        💖
                    </motion.span>
                </motion.h1>

                {/* Slogan with typewriter effect */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-base md:text-lg text-gray-600 italic mb-4"
                >
                    "Sự nghiệp vĩ đại nhất đời anh"
                </motion.p>

                {/* Current mood status - bouncy entrance */}
                <motion.div
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{
                        delay: 0.5,
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                    }}
                    className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-cham-pink-100"
                >
                    <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-2 h-2 rounded-full bg-gradient-to-r from-cham-pink-400 to-cham-red"
                    />
                    <span className={`${mood.color} font-semibold text-sm md:text-base`}>
                        {mood.text}
                    </span>
                    {mood.needsLevel >= 60 && (
                        <motion.span
                            animate={{
                                rotate: [0, 15, -15, 0],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            ⚠️
                        </motion.span>
                    )}
                </motion.div>

                {/* Stats icons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-6 md:mt-8 flex justify-center gap-6 md:gap-8"
                >
                    {[
                        { icon: Heart, color: 'text-cham-red', label: 'Tình yêu', fill: true },
                        { icon: Sparkles, color: 'text-yellow-400', label: 'Hạnh phúc', fill: false },
                        { icon: Star, color: 'text-purple-400', label: 'Sự nghiệp', fill: true },
                    ].map((item, i) => (
                        <motion.div
                            key={item.label}
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3
                            }}
                            className="flex flex-col items-center cursor-pointer touch-active"
                        >
                            <item.icon
                                className={`w-7 h-7 md:w-8 md:h-8 ${item.color} mb-1`}
                                fill={item.fill ? "currentColor" : "none"}
                            />
                            <span className="text-xs text-gray-500">{item.label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
