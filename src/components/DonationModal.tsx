import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Heart } from 'lucide-react';
import { DonationPackage, formatPrice } from '../data/packages';
import { buildVietQRUrl, bankConfig } from '../data/config';

interface DonationModalProps {
    isOpen: boolean;
    onClose: () => void;
    package: DonationPackage | null;
    onConfirmDonation: (amount: number, message: string) => void;
}

const DonationModal = ({ isOpen, onClose, package: pkg, onConfirmDonation }: DonationModalProps) => {
    const [customAmount, setCustomAmount] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [copied, setCopied] = useState(false);
    const [step, setStep] = useState<'info' | 'qr'>('info');

    if (!pkg) return null;

    const amount = pkg.price > 0 ? pkg.price : parseInt(customAmount) || 0;
    const transferContent = `NUOICHAM ${pkg.id.toUpperCase()}`;
    const qrUrl = buildVietQRUrl(amount, transferContent);

    const handleCopyContent = async () => {
        try {
            await navigator.clipboard.writeText(transferContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleConfirm = () => {
        onConfirmDonation(amount, message || 'Yêu em! 💕');
        setStep('info');
        setMessage('');
        setCustomAmount('');
        onClose();
    };

    const handleClose = () => {
        setStep('info');
        setMessage('');
        setCustomAmount('');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-cham-pink-400 to-cham-pink-500 text-white p-4 rounded-t-3xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">{pkg.icon}</span>
                                <div>
                                    <h3 className="font-bold text-lg">{pkg.name}</h3>
                                    <p className="text-white/80 text-sm">{pkg.description}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6">
                            {step === 'info' ? (
                                <>
                                    {/* Custom amount input */}
                                    {pkg.price === 0 && (
                                        <div className="mb-6">
                                            <label className="block text-gray-600 font-medium mb-2">
                                                Số tiền muốn nạp (VNĐ)
                                            </label>
                                            <input
                                                type="number"
                                                value={customAmount}
                                                onChange={(e) => setCustomAmount(e.target.value)}
                                                placeholder="Nhập số tiền..."
                                                className="w-full px-4 py-3 rounded-xl border-2 border-cham-pink-200 focus:border-cham-pink-400 focus:outline-none transition-colors text-lg"
                                            />
                                        </div>
                                    )}

                                    {/* Message input */}
                                    <div className="mb-6">
                                        <label className="block text-gray-600 font-medium mb-2">
                                            Lời nhắn cho Châm 💌
                                        </label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Ví dụ: Yêu em nhiều lắm..."
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-cham-pink-200 focus:border-cham-pink-400 focus:outline-none transition-colors resize-none"
                                        />
                                    </div>

                                    {/* Amount display */}
                                    <div className="bg-cham-pink-50 rounded-2xl p-4 mb-6 text-center">
                                        <p className="text-gray-600 mb-1">Số tiền donate:</p>
                                        <p className="text-3xl font-bold gradient-text">
                                            {amount > 0 ? formatPrice(amount) : '--'}
                                        </p>
                                    </div>

                                    {/* Next button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setStep('qr')}
                                        disabled={amount <= 0}
                                        className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-cham-pink-500 to-cham-red shadow-lg shadow-cham-pink-200/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Tiếp tục thanh toán →
                                    </motion.button>
                                </>
                            ) : (
                                <>
                                    {/* QR Code */}
                                    <div className="text-center mb-6">
                                        <p className="text-gray-600 mb-4">
                                            Quét mã QR để chuyển khoản
                                        </p>
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="bg-white rounded-2xl p-4 inline-block shadow-lg"
                                        >
                                            <img
                                                src={qrUrl}
                                                alt="VietQR Code"
                                                className="w-64 h-64 object-contain"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/256?text=QR+Error`;
                                                }}
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Bank info */}
                                    <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Ngân hàng:</span>
                                            <span className="font-medium">{bankConfig.bankId}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Số tài khoản:</span>
                                            <span className="font-medium">{bankConfig.accountNo}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Chủ TK:</span>
                                            <span className="font-medium">{bankConfig.accountName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Số tiền:</span>
                                            <span className="font-bold text-cham-pink-500">{formatPrice(amount)}</span>
                                        </div>
                                    </div>

                                    {/* Transfer content */}
                                    <div className="mb-6">
                                        <p className="text-gray-600 text-sm mb-2">Nội dung chuyển khoản:</p>
                                        <div className="flex items-center gap-2">
                                            <code className="flex-1 bg-cham-pink-50 px-4 py-3 rounded-xl font-mono text-cham-pink-600 font-bold">
                                                {transferContent}
                                            </code>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleCopyContent}
                                                className="p-3 bg-cham-pink-100 rounded-xl hover:bg-cham-pink-200 transition-colors"
                                            >
                                                {copied ? (
                                                    <Check className="w-5 h-5 text-green-500" />
                                                ) : (
                                                    <Copy className="w-5 h-5 text-cham-pink-500" />
                                                )}
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setStep('info')}
                                            className="flex-1 py-3 rounded-xl font-medium border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                                        >
                                            ← Quay lại
                                        </button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleConfirm}
                                            className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg flex items-center justify-center gap-2"
                                        >
                                            <Heart className="w-4 h-4" fill="currentColor" />
                                            Đã chuyển xong!
                                        </motion.button>
                                    </div>

                                    <p className="text-center text-gray-400 text-xs mt-4">
                                        * Bấm "Đã chuyển xong" sau khi chuyển khoản thành công
                                    </p>
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DonationModal;
