import { motion, AnimatePresence } from 'framer-motion';
import { ChamMood } from '../data/config';

interface StatusBoardProps {
    mood: ChamMood;
    hungerLevel: number;
}

const StatusBoard = ({ mood, hungerLevel }: StatusBoardProps) => {
    const beautyLevel = 100;

    const getProgressColor = (level: number) => {
        if (level < 30) return 'from-green-400 to-emerald-500';
        if (level < 60) return 'from-yellow-400 to-orange-400';
        return 'from-orange-400 to-red-500';
    };

    const getProgressBg = (level: number) => {
        if (level < 30) return 'bg-green-100';
        if (level < 60) return 'bg-yellow-100';
        return 'bg-red-100';
    };

    return (
        <section id="stats" className="py-4 md:py-8 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-xl shadow-cham-pink-100/50 p-4 md:p-6 border border-white/50"
            >
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2"
                >
                    <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="text-xl md:text-2xl"
                    >
                        📊
                    </motion.span>
                    STATUS BOARD
                </motion.h2>

                <div className="space-y-4 md:space-y-6">
                    {/* Mood */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-cham-pink-50 to-white"
                    >
                        <span className="text-gray-600 font-medium text-sm md:text-base">Mood:</span>
                        <span className={`font-bold flex items-center gap-2 ${mood.color} text-sm md:text-base`}>
                            <motion.span
                                animate={{
                                    scale: [1, 1.3, 1],
                                    rotate: [0, 10, -10, 0]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-xl md:text-2xl"
                            >
                                {mood.emoji}
                            </motion.span>
                            <span className="hidden sm:inline">{mood.text}</span>
                            <span className="sm:hidden text-xs">{mood.text.split(' - ')[0]}</span>
                        </span>
                    </motion.div>

                    {/* Độ đói */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600 font-medium text-sm md:text-base flex items-center gap-1.5">
                                <span>⚡</span> Năng lượng:
                            </span>
                            <motion.span
                                key={hungerLevel}
                                initial={{ scale: 1.5 }}
                                animate={{ scale: 1 }}
                                className="font-bold text-gray-700"
                            >
                                {hungerLevel}%
                            </motion.span>
                        </div>
                        <div className={`h-3 md:h-4 ${getProgressBg(hungerLevel)} rounded-full overflow-hidden relative`}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${hungerLevel}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`h-full bg-gradient-to-r ${getProgressColor(hungerLevel)} rounded-full relative overflow-hidden`}
                            >
                                {/* Animated shine */}
                                <motion.div
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                />
                            </motion.div>
                        </div>
                        <AnimatePresence>
                            {hungerLevel >= 70 && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-500 text-xs md:text-sm mt-1.5 italic flex items-center gap-1"
                                >
                                    <motion.span
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                    >
                                        ⚠️
                                    </motion.span>
                                    Năng lượng đang thấp! Cần nạp thêm!
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Độ xinh */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600 font-medium text-sm md:text-base flex items-center gap-1.5">
                                <span>✨</span> Độ xinh:
                            </span>
                            <span className="font-bold text-cham-pink-500 flex items-center gap-1">
                                ∞%
                                <motion.span
                                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                    ✨
                                </motion.span>
                            </span>
                        </div>
                        <div className="h-3 md:h-4 bg-cham-pink-100 rounded-full overflow-hidden relative">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${beautyLevel}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-cham-pink-300 via-cham-pink-400 to-cham-pink-500 rounded-full relative overflow-hidden"
                            >
                                {/* Rainbow shimmer */}
                                <motion.div
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                                />
                                {/* Sparkle at end */}
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 text-xs"
                                >
                                    ⭐
                                </motion.div>
                            </motion.div>
                        </div>
                        <p className="text-cham-pink-500 text-xs md:text-sm mt-1.5 italic text-right">
                            Luôn xinh không cần filter 💕
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default StatusBoard;
