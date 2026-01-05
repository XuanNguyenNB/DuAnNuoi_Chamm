export interface DonationPackage {
    id: string;
    icon: string;
    name: string;
    price: number;
    description: string;
    category: 'food' | 'beauty' | 'special' | 'fund';
}

export const packages: DonationPackage[] = [
    {
        id: 'trasua-hailen',
        icon: '🧋',
        name: 'Trà Sữa Hai Lẹn',
        price: 60000,
        description: 'Thơm ngon béo ngậy',
        category: 'food',
    },
    {
        id: 'tradao',
        icon: '🍊',
        name: 'Trà Đào Cam Sả',
        price: 35000,
        description: 'Mát lạnh sảng khoái',
        category: 'food',
    },
    {
        id: 'micay',
        icon: '🍜',
        name: 'Mì Cay Gà Cấp Độ 0',
        price: 55000,
        description: 'Ăn cho ấm bụng',
        category: 'food',
    },
    {
        id: 'miengian',
        icon: '🛡️',
        name: 'Thẻ Bài Miễn Giận',
        price: 500000,
        description: 'Bỏ qua lỗi lầm 1 lần',
        category: 'special',
    },
    {
        id: 'skincare',
        icon: '✨',
        name: 'Vitamin Skincare',
        price: 500000,
        description: 'Da đẹp dáng xinh',
        category: 'beauty',
    },
    {
        id: 'custom',
        icon: '💝',
        name: 'Em Thích Là Được',
        price: 0, // Custom amount
        description: 'Tùy chọn số tiền',
        category: 'fund',
    },
];

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
};
