import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());

// Telegram Bot Config
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/**
 * Gửi tin nhắn qua Telegram Bot API
 */
async function sendTelegramMessage(message, parseMode = 'HTML') {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.error('❌ Telegram credentials not configured!');
        return { success: false, error: 'Telegram not configured' };
    }

    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: parseMode,
            }),
        });

        const data = await response.json();

        if (!data.ok) {
            console.error('❌ Telegram API error:', data);
            return { success: false, error: data.description };
        }

        console.log('✅ Telegram message sent!');
        return { success: true };
    } catch (error) {
        console.error('❌ Failed to send Telegram message:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Format số tiền VNĐ
 */
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
}

/**
 * API: Thông báo khi có donate mới
 */
app.post('/api/notify/donation', async (req, res) => {
    const { packageName, packageIcon, amount, message, donor } = req.body;

    if (!packageName || !amount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const telegramMessage = `
🎉 <b>CÓ DONATE MỚI!</b> 🎉

${packageIcon || '💝'} <b>${packageName}</b>
💰 Số tiền: <b>${formatPrice(amount)}</b>
👤 Người gửi: ${donor || 'Anh yêu'}
${message ? `💬 Lời nhắn: "${message}"` : ''}

<i>Châm ơi, có người yêu thương em nè! 💕</i>
  `.trim();

    const result = await sendTelegramMessage(telegramMessage);

    if (result.success) {
        res.json({ success: true, message: 'Notification sent!' });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

/**
 * API: Thông báo cập nhật mục tiêu
 */
app.post('/api/notify/goal-update', async (req, res) => {
    const { goalName, current, target, percentage } = req.body;

    const telegramMessage = `
📊 <b>CẬP NHẬT MỤC TIÊU</b>

🎯 ${goalName}
📈 Tiến độ: <b>${formatPrice(current)} / ${formatPrice(target)}</b>
💯 Hoàn thành: <b>${percentage}%</b>

${percentage >= 100 ? '🎊 CHÚC MỪNG ĐẠT MỤC TIÊU!' : percentage >= 80 ? '🔥 Sắp đạt rồi!' : '💪 Cố lên!'}
  `.trim();

    const result = await sendTelegramMessage(telegramMessage);

    if (result.success) {
        res.json({ success: true, message: 'Notification sent!' });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

/**
 * API: Gửi tin nhắn tùy chỉnh
 */
app.post('/api/notify/custom', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const result = await sendTelegramMessage(message);

    if (result.success) {
        res.json({ success: true, message: 'Notification sent!' });
    } else {
        res.status(500).json({ success: false, error: result.error });
    }
});

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        telegram: TELEGRAM_BOT_TOKEN ? 'configured' : 'not configured'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📱 Telegram: ${TELEGRAM_BOT_TOKEN ? '✅ Configured' : '❌ Not configured'}`);
});
