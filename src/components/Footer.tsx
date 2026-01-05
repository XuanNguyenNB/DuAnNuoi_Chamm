import { motion } from 'framer-motion';
import { Heart, Code } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const hearts = ['💖', '💕', '💗', '💓', '💝'];

    return (
        <footer className="py-6 md:py-8 px-4 mt-4 md:mt-8 safe-area-bottom">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto text-center"
            >
                {/* Decorative hearts */}
                <div className="flex justify-center gap-3 mb-4">
                    {hearts.map((heart, i) => (
                        <motion.span
                            key={i}
                            animate={{
                                y: [0, -8, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: "easeInOut"
                            }}
                            className="text-lg md:text-xl"
                        >
                            {heart}
                        </motion.span>
                    ))}
                </div>

                {/* Slogan */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-base md:text-lg text-gray-600 italic mb-4"
                >
                    "Châm chỉ việc xinh, thế giới để anh lo."
                    <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="inline-block ml-1"
                    >
                        💖
                    </motion.span>
                </motion.p>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-400 text-xs md:text-sm"
                >
                    <span>© {currentYear}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1">
                        Made with
                        <motion.span
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Heart className="w-3.5 h-3.5 text-cham-red" fill="currentColor" />
                        </motion.span>
                        by <span className="font-semibold text-cham-pink-500">XuanNguyen</span>
                    </span>
                </motion.div>

                {/* Version badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-3"
                >
                    <span className="inline-flex items-center gap-1 text-xs text-gray-300 bg-gray-50 px-2 py-1 rounded-full">
                        <span>🎀</span>
                        v1.0
                    </span>
                </motion.div>
            </motion.div>
        </footer>
    );
};

export default Footer;
