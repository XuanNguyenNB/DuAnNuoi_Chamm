export interface BankConfig {
    bankId: string; // Mã ngân hàng VietQR
    accountNo: string;
    accountName: string;
    template: 'compact' | 'compact2' | 'qr_only' | 'print';
}

export interface Goal {
    id: string;
    icon: string;
    name: string;
    target: number;
    current: number;
    description: string;
}

export interface ChamMood {
    emoji: string;
    text: string;
    color: string;
    needsLevel: number; // 0-100
}

// Cấu hình ngân hàng - THAY ĐỔI THÔNG TIN NÀY
export const bankConfig: BankConfig = {
    bankId: 'MB', // Mã ngân hàng: MB, VCB, TCB, ACB, TPB, v.v.
    accountNo: '0123456789', // Số tài khoản của bạn
    accountName: 'NGUYEN VAN A', // Tên chủ tài khoản
    template: 'compact2',
};

// Mục tiêu hiện tại
export const currentGoal: Goal = {
    id: 'mua-xe-may',
    icon: '🛵',
    name: 'Mua xe máy',
    target: 30000000,
    current: 1200000,
    description: 'Cố lên anh yêu ơi!',
};

// Trạng thái mood của Châm - luôn vui vẻ!
export const moods: ChamMood[] = [
    { emoji: '😍', text: 'Siêu hạnh phúc', color: 'text-pink-500', needsLevel: 0 },
    { emoji: '🥰', text: 'Đang vui vẻ', color: 'text-pink-400', needsLevel: 20 },
    { emoji: '😊', text: 'Vui lắm nè', color: 'text-pink-400', needsLevel: 40 },
    { emoji: '😄', text: 'Hạnh phúc ghê', color: 'text-pink-400', needsLevel: 60 },
    { emoji: '🥳', text: 'Vui quá trời', color: 'text-pink-400', needsLevel: 80 },
    { emoji: '💖', text: 'Yêu anh nhiều lắm', color: 'text-pink-500', needsLevel: 100 },
];

export const getCurrentMood = (hungerLevel: number): ChamMood => {
    const sortedMoods = [...moods].sort((a, b) => b.needsLevel - a.needsLevel);
    return sortedMoods.find(m => hungerLevel >= m.needsLevel) || moods[0];
};

// VietQR API URL builder
export const buildVietQRUrl = (
    amount: number,
    message: string,
    config: BankConfig = bankConfig
): string => {
    const encodedMessage = encodeURIComponent(message);
    return `https://img.vietqr.io/image/${config.bankId}-${config.accountNo}-${config.template}.png?amount=${amount}&addInfo=${encodedMessage}&accountName=${encodeURIComponent(config.accountName)}`;
};
