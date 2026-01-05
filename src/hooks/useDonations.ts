import { useState, useEffect, useCallback } from 'react';
import { DonationPackage } from '../data/packages';
import { notifyDonation } from '../services/telegram';

export interface Donation {
    id: string;
    packageId: string;
    packageName: string;
    packageIcon: string;
    amount: number;
    message: string;
    donor: string;
    timestamp: number;
}

interface DonationsState {
    donations: Donation[];
    totalDonated: number;
    hungerLevel: number;
}

const STORAGE_KEY = 'nuoi-cham-donations';

const getInitialState = (): DonationsState => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch {
        console.error('Failed to load donations from localStorage');
    }
    return {
        donations: [
            {
                id: '1',
                packageId: 'trasua',
                packageName: 'Trà Sữa Full Topping',
                packageIcon: '🧋',
                amount: 60000,
                message: 'Uống đi cho bớt quạu nha bà dà',
                donor: 'Anh yêu',
                timestamp: Date.now() - 2 * 60 * 1000, // 2 phút trước
            },
            {
                id: '2',
                packageId: 'fund',
                packageName: 'Nạp quỹ',
                packageIcon: '💰',
                amount: 100000,
                message: 'Tiền lãi tình cảm tháng này',
                donor: 'Anh yêu',
                timestamp: Date.now() - 24 * 60 * 60 * 1000, // Hôm qua
            },
        ],
        totalDonated: 1200000,
        hungerLevel: 80,
    };
};

export const useDonations = () => {
    const [state, setState] = useState<DonationsState>(getInitialState);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const addDonation = useCallback((
        pkg: DonationPackage,
        amount: number,
        message: string,
        donor: string = 'Anh yêu'
    ) => {
        const newDonation: Donation = {
            id: Date.now().toString(),
            packageId: pkg.id,
            packageName: pkg.name,
            packageIcon: pkg.icon,
            amount,
            message,
            donor,
            timestamp: Date.now(),
        };

        setState(prev => ({
            donations: [newDonation, ...prev.donations].slice(0, 50), // Keep last 50
            totalDonated: prev.totalDonated + amount,
            hungerLevel: Math.max(0, prev.hungerLevel - 20), // Giảm đói sau khi donate
        }));

        // Gửi thông báo Telegram (không chờ kết quả)
        notifyDonation({
            packageName: pkg.name,
            packageIcon: pkg.icon,
            amount,
            message,
            donor,
        }).catch(console.error);
    }, []);

    const updateHungerLevel = useCallback((delta: number) => {
        setState(prev => ({
            ...prev,
            hungerLevel: Math.min(100, Math.max(0, prev.hungerLevel + delta)),
        }));
    }, []);

    const updateTotalDonated = useCallback((amount: number) => {
        setState(prev => ({
            ...prev,
            totalDonated: amount,
        }));
    }, []);

    return {
        donations: state.donations,
        totalDonated: state.totalDonated,
        hungerLevel: state.hungerLevel,
        addDonation,
        updateHungerLevel,
        updateTotalDonated,
    };
};
