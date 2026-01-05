import { motion } from 'framer-motion';
import { Donation } from '../hooks/useDonations';
import { formatPrice } from '../data/packages';

interface HallOfFameProps {
    donations: Donation[];
}

const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes}p trước`;
    if (hours < 24) return `${hours}h trước`;
    if (days === 1) return 'Hôm qua';
    if (days < 7) return `${days} ngày`;

    return new Date(timestamp).toLocaleDateString('vi-VN');
};

const HallOfFame = ({ donations }: HallOfFameProps) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const item = {
        hidden: { opacity: 0, x: -30, scale: 0.9 },
        show: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 25 }
        },
    };

    const getBadge = (index: number) => {
        if (index === 0) return { emoji: '🥇', bg: 'bg-gradient-to-br from-yellow-300 to-amber-400', shadow: 'shadow-yellow-200/50' };
        if (index === 1) return { emoji: '🥈', bg: 'bg-gradient-to-br from-gray-300 to-gray-400', shadow: 'shadow-gray-200/50' };
        if (index === 2) return { emoji: '🥉', bg: 'bg-gradient-to-br from-amber-500 to-orange-500', shadow: 'shadow-orange-200/50' };
        return null;
    };

    return (
        <section id="history" className="py-4 md:py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2"
                >
                    <motion.span
                        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-xl md:text-2xl"
                    >
                        🏆
                    </motion.span>
                    LỊCH SỬ CỐNG NẠP
                </motion.h2>

                {donations.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/80 rounded-2xl p-6 md:p-8 text-center"
                    >
                        <motion.span
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-4xl md:text-5xl mb-4 block"
                        >
                            📭
                        </motion.span>
                        <p className="text-gray-500">Chưa có donate nào...</p>
                        <p className="text-gray-400 text-sm mt-1">Hãy là người đầu tiên!</p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="space-y-3"
                    >
                        {donations.slice(0, 10).map((donation, index) => {
                            const badge = getBadge(index);

                            return (
                                <motion.div
                                    key={donation.id}
                                    variants={item}
                                    whileHover={{ scale: 1.01, x: 5 }}
                                    className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all border border-white/50"
                                >
                                    <div className="flex items-start gap-3">
                                        {/* Badge or Icon */}
                                        <div className="relative flex-shrink-0">
                                            {badge ? (
                                                <motion.div
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    transition={{ delay: 0.2 + index * 0.1, type: 'spring' }}
                                                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl ${badge.bg} shadow-lg ${badge.shadow}`}
                                                >
                                                    {badge.emoji}
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                                    className="w-10 h-10 md:w-12 md:h-12 bg-cham-pink-50 rounded-xl flex items-center justify-center text-xl md:text-2xl"
                                                >
                                                    {donation.packageIcon}
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <span className="font-bold text-gray-800 text-sm md:text-base">
                                                    {donation.donor}
                                                </span>
                                                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                                                    {formatTimeAgo(donation.timestamp)}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-xs md:text-sm mb-1">
                                                nạp <span className="font-semibold text-cham-pink-500">{donation.packageName}</span>
                                            </p>
                                            <p className="font-bold text-sm md:text-base gradient-text">
                                                {formatPrice(donation.amount)}
                                            </p>

                                            {donation.message && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="mt-2 bg-cham-pink-50/70 rounded-lg p-2 md:p-2.5"
                                                >
                                                    <p className="text-xs md:text-sm text-gray-600 italic">
                                                        💬 "{donation.message}"
                                                    </p>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default HallOfFame;
