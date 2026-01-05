import { motion, AnimatePresence } from 'framer-motion';
import { Goal } from '../data/config';
import { formatPrice } from '../data/packages';
import { useState, useEffect } from 'react';

interface GoalProgressProps {
    goal: Goal;
    totalDonated: number;
}

// Confetti component
const Confetti = () => {
    const confettiPieces = ['🎉', '🎊', '✨', '💖', '🎀', '⭐', '💝'];

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {confettiPieces.map((piece, i) => (
                <motion.span
                    key={i}
                    initial={{
                        y: 0,
                        x: 50 + i * 40,
                        opacity: 1,
                        rotate: 0,
                        scale: 1
                    }}
                    animate={{
                        y: -150,
                        x: 50 + i * 40 + (Math.random() - 0.5) * 100,
                        opacity: 0,
                        rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                        scale: 0
                    }}
                    transition={{
                        duration: 1.5 + Math.random(),
                        ease: "easeOut",
                        delay: i * 0.1
                    }}
                    className="absolute text-2xl"
                    style={{ left: `${10 + i * 12}%` }}
                >
                    {piece}
                </motion.span>
            ))}
        </div>
    );
};

const GoalProgress = ({ goal, totalDonated }: GoalProgressProps) => {
    const current = Math.min(totalDonated, goal.target);
    const percentage = Math.min(100, Math.round((current / goal.target) * 100));
    const [showConfetti, setShowConfetti] = useState(false);
    const [prevPercentage, setPrevPercentage] = useState(percentage);

    // Show confetti on milestone
    useEffect(() => {
        if (percentage >= 100 && prevPercentage < 100) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 2000);
        }
        setPrevPercentage(percentage);
    }, [percentage, prevPercentage]);

    const getMessage = () => {
        if (percentage >= 100) return '🎉 ĐẠT MỤC TIÊU RỒI!';
        if (percentage >= 80) return '🔥 Sắp đạt rồi!';
        if (percentage >= 50) return '💪 Được nửa rồi!';
        if (percentage >= 25) return '🌟 Tiếp tục phát huy!';
        return goal.description;
    };

    const getProgressColor = () => {
        if (percentage >= 100) return 'from-emerald-400 via-green-400 to-teal-500';
        if (percentage >= 75) return 'from-cham-pink-400 via-rose-400 to-cham-red';
        return 'from-cham-pink-300 via-cham-pink-400 to-cham-pink-500';
    };

    return (
        <section className="py-4 md:py-8 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="max-w-4xl mx-auto relative overflow-hidden bg-gradient-to-br from-white via-cham-pink-50/30 to-white rounded-2xl md:rounded-3xl shadow-xl shadow-cham-pink-100/50 p-4 md:p-6 border border-cham-pink-100/50"
            >
                {/* Confetti effect */}
                <AnimatePresence>
                    {showConfetti && <Confetti />}
                </AnimatePresence>

                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2"
                >
                    <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-xl md:text-2xl"
                    >
                        🎯
                    </motion.span>
                    MỤC TIÊU THÁNG
                </motion.h2>

                {/* Goal info */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-3 mb-4 bg-white/60 rounded-xl p-3"
                >
                    <motion.span
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-3xl md:text-4xl"
                    >
                        {goal.icon}
                    </motion.span>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base md:text-lg text-gray-800 truncate">{goal.name}</h3>
                        <p className="text-gray-500 text-xs md:text-sm">Mục tiêu hiện tại</p>
                    </div>
                </motion.div>

                {/* Progress numbers */}
                <div className="flex items-end justify-between mb-2">
                    <div className="flex-1 min-w-0">
                        <motion.span
                            key={current}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className="text-xl md:text-2xl font-bold gradient-text"
                        >
                            {formatPrice(current)}
                        </motion.span>
                        <span className="text-gray-400 mx-1 md:mx-2">/</span>
                        <span className="text-gray-600 font-medium text-sm md:text-base">
                            {formatPrice(goal.target)}
                        </span>
                    </div>
                    <motion.div
                        key={percentage}
                        initial={{ scale: 1.5, y: -10 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`text-xl md:text-2xl font-bold ${percentage >= 100 ? 'text-emerald-500' : 'text-cham-pink-500'}`}
                    >
                        {percentage}%
                    </motion.div>
                </div>

                {/* Progress bar */}
                <div className="h-5 md:h-6 bg-gray-100 rounded-full overflow-hidden mb-3 relative shadow-inner">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${getProgressColor()} rounded-full relative overflow-hidden`}
                    >
                        {/* Animated shimmer */}
                        <motion.div
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        />

                        {/* Sparkle at end */}
                        {percentage > 10 && (
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.8, 1, 0.8]
                                }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1 text-sm md:text-base"
                            >
                                ⭐
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Milestones */}
                    {[25, 50, 75].map((milestone) => (
                        <div
                            key={milestone}
                            className="absolute top-0 h-full w-0.5 bg-white/70"
                            style={{ left: `${milestone}%` }}
                        />
                    ))}
                </div>

                {/* Dynamic message */}
                <motion.p
                    key={getMessage()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center text-sm md:text-base font-medium ${percentage >= 100 ? 'text-emerald-600' : 'text-gray-600'
                        }`}
                >
                    {getMessage()}
                </motion.p>

                {/* Celebration */}
                {percentage >= 100 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-4 text-center"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-3xl md:text-4xl inline-block"
                        >
                            🎊🎉🎊
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
};

export default GoalProgress;
