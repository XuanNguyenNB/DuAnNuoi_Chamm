const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface DonationNotification {
    packageName: string;
    packageIcon: string;
    amount: number;
    message?: string;
    donor?: string;
}

interface GoalUpdateNotification {
    goalName: string;
    current: number;
    target: number;
    percentage: number;
}

/**
 * Gửi thông báo donate mới qua Telegram
 */
export async function notifyDonation(data: DonationNotification): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/notify/donation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result.success;
    } catch (error) {
        console.error('Failed to send donation notification:', error);
        return false;
    }
}

/**
 * Gửi thông báo cập nhật mục tiêu
 */
export async function notifyGoalUpdate(data: GoalUpdateNotification): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/notify/goal-update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result.success;
    } catch (error) {
        console.error('Failed to send goal update notification:', error);
        return false;
    }
}

/**
 * Gửi tin nhắn tùy chỉnh
 */
export async function notifyCustom(message: string): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/notify/custom`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });

        const result = await response.json();
        return result.success;
    } catch (error) {
        console.error('Failed to send custom notification:', error);
        return false;
    }
}

/**
 * Kiểm tra server health
 */
export async function checkServerHealth(): Promise<{ status: string; telegram: string } | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        return await response.json();
    } catch {
        return null;
    }
}
