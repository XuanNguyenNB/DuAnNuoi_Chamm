import { useState } from 'react';
import { Menu, X, Heart, Home, Gift, Trophy, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { label: 'Trang chủ', href: '#', icon: Home },
        { label: 'Thống kê', href: '#stats', icon: BarChart3 },
        { label: 'Gói donate', href: '#packages', icon: Gift },
        { label: 'Hall of Fame', href: '#history', icon: Trophy },
    ];

    const handleNavClick = (href: string) => {
        setIsMenuOpen(false);
        // Smooth scroll to section
        if (href !== '#') {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Hamburger Menu */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 -ml-2 rounded-full hover:bg-cham-pink-100 transition-colors"
                    aria-label="Menu"
                >
                    <AnimatePresence mode="wait">
                        {isMenuOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="w-6 h-6 text-cham-pink-500" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu className="w-6 h-6 text-cham-pink-500" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* Logo */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center gap-2"
                >
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <Heart className="w-5 h-5 text-cham-red" fill="currentColor" />
                    </motion.div>
                    <span className="font-bold text-base md:text-lg gradient-text">Nuôi Châmm</span>
                </motion.div>

                {/* Avatar */}
                <motion.img
                    whileTap={{ scale: 0.9 }}
                    src="/photo_2026-01-06_05-07-59.jpg"
                    alt="Châm"
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover shadow-lg cursor-pointer ring-2 ring-cham-pink-200"
                />
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-[100]"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute left-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Menu Header */}
                            <div className="relative p-6 bg-gradient-to-br from-cham-pink-400 to-cham-pink-500 text-white">
                                {/* Close button */}
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>

                                <motion.img
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    src="/photo_2026-01-06_05-07-59.jpg"
                                    alt="Châm"
                                    className="w-16 h-16 rounded-full object-cover ring-2 ring-white/30 mb-3"
                                />
                                <h2 className="font-bold text-xl">Dự án nuôi Châmm</h2>
                                <p className="text-white/80 text-sm">Vì một thế giới không có Châm quạu</p>
                            </div>

                            {/* Menu Items */}
                            <nav className="py-4">
                                {menuItems.map((item, index) => (
                                    <motion.button
                                        key={item.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                        onClick={() => handleNavClick(item.href)}
                                        className="w-full flex items-center gap-4 px-6 py-4 hover:bg-cham-pink-50 transition-colors active:bg-cham-pink-100 text-left"
                                    >
                                        <item.icon className="w-5 h-5 text-cham-pink-400" />
                                        <span className="text-gray-700 font-medium">{item.label}</span>
                                    </motion.button>
                                ))}
                            </nav>

                            {/* Footer */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
                                <p className="text-xs text-gray-400 text-center">
                                    Made with 💖 by XuanNguyen
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
