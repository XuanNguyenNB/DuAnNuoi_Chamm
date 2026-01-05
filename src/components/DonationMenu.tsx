import { motion } from 'framer-motion';
import { DonationPackage, formatPrice } from '../data/packages';
import { useState } from 'react';

interface DonationMenuProps {
    packages: DonationPackage[];
    onSelectPackage: (pkg: DonationPackage) => void;
}

const DonationMenu = ({ packages, onSelectPackage }: DonationMenuProps) => {
    const [pressedId, setPressedId] = useState<string | null>(null);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        },
    };

    const getCategoryGradient = (category: DonationPackage['category']) => {
        switch (category) {
            case 'food':
                return 'from-orange-400 via-red-400 to-rose-500';
            case 'beauty':
                return 'from-pink-400 via-fuchsia-400 to-purple-500';
            case 'special':
                return 'from-yellow-400 via-amber-400 to-orange-500';
            case 'fund':
                return 'from-cham-pink-400 via-rose-400 to-cham-red';
            default:
                return 'from-cham-pink-400 to-cham-pink-500';
        }
    };

    const getCategoryBg = (category: DonationPackage['category']) => {
        switch (category) {
            case 'food': return 'bg-orange-50';
            case 'beauty': return 'bg-pink-50';
            case 'special': return 'bg-amber-50';
            case 'fund': return 'bg-rose-50';
            default: return 'bg-cham-pink-50';
        }
    };

    return (
        <section id="packages" className="py-6 md:py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2"
                >
                    <motion.span
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-xl md:text-2xl"
                    >
                        🍽️
                    </motion.span>
                    MENU VỖ BÉO
                </motion.h2>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 gap-3 md:gap-4"
                >
                    {packages.map((pkg) => (
                        <motion.div
                            key={pkg.id}
                            variants={item}
                            whileHover={{ scale: 1.03, y: -5 }}
                            whileTap={{ scale: 0.97 }}
                            onTouchStart={() => setPressedId(pkg.id)}
                            onTouchEnd={() => setPressedId(null)}
                            className={`relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group ${pressedId === pkg.id ? 'scale-97' : ''
                                }`}
                            onClick={() => onSelectPackage(pkg)}
                        >
                            {/* Animated background gradient on hover */}
                            <motion.div
                                className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(pkg.category)} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                            />

                            <div className="p-4 md:p-5 relative">
                                {/* Icon with bounce */}
                                <motion.div
                                    whileHover={{ rotate: [-10, 10, -10, 0], scale: 1.1 }}
                                    className={`${getCategoryBg(pkg.category)} w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-3`}
                                >
                                    {pkg.icon}
                                </motion.div>

                                {/* Content */}
                                <h3 className="font-bold text-gray-800 text-sm md:text-base mb-1 line-clamp-1">
                                    {pkg.name}
                                </h3>
                                <p className="text-gray-500 text-xs md:text-sm mb-2 italic line-clamp-1">
                                    "{pkg.description}"
                                </p>
                                <p className="font-bold text-base md:text-lg gradient-text">
                                    {pkg.price > 0 ? formatPrice(pkg.price) : 'Tùy chọn'}
                                </p>

                                {/* Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`mt-3 w-full py-2.5 md:py-3 rounded-xl font-bold text-white text-sm md:text-base bg-gradient-to-r ${getCategoryGradient(pkg.category)} shadow-lg transition-all active:shadow-sm`}
                                >
                                    <span className="flex items-center justify-center gap-1.5">
                                        <motion.span
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        >
                                            💝
                                        </motion.span>
                                        NẠP NGAY
                                    </span>
                                </motion.button>
                            </div>

                            {/* Shine effect on hover */}
                            <motion.div
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '200%' }}
                                transition={{ duration: 0.6 }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default DonationMenu;
