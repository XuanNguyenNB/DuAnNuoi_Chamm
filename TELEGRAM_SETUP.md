# Hướng dẫn tích hợp Telegram 📱

## Bước 1: Tạo Telegram Bot

1. Mở Telegram, tìm [@BotFather](https://t.me/BotFather)
2. Gửi lệnh `/newbot`
3. Đặt tên bot (VD: "Nuôi Châm Bot")
4. Đặt username (VD: `nuoicham_bot`)
5. Lưu lại **Bot Token** (dạng: `123456789:ABCdefGHIjklMNO...`)

## Bước 2: Lấy Chat ID của Châm

### Cách 1: Dùng @userinfobot
1. Cho Châm mở [@userinfobot](https://t.me/userinfobot)
2. Bấm Start - bot sẽ trả về **Chat ID**

### Cách 2: Dùng @getmyid_bot
1. Mở [@getmyid_bot](https://t.me/getmyid_bot)
2. Bấm Start

### Cách 3: Cho bot vào group
1. Thêm bot vào group chat với Châm
2. Gửi tin nhắn trong group
3. Truy cập: `https://api.telegram.org/bot<TOKEN>/getUpdates`
4. Tìm `chat.id` trong response

## Bước 3: Cấu hình Server

```bash
cd server
cp .env.example .env
```

Mở file `.env` và điền:
```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
PORT=3001
CORS_ORIGIN=https://yourdomain.com
```

## Bước 4: Chạy Server

### Development
```bash
cd server
npm install
npm run dev
```

### Production (VPS)
```bash
cd server
npm install
npm start
```

Hoặc dùng PM2:
```bash
pm2 start index.js --name "nuoi-cham-api"
```

## Bước 5: Cấu hình Frontend

Tạo file `.env` trong thư mục gốc:
```
VITE_API_URL=http://localhost:3001
```

Hoặc trên production:
```
VITE_API_URL=https://api.yourdomain.com
```

## Bước 6: Cấu hình Nginx (VPS)

```nginx
# API Server
server {
    listen 443 ssl;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend
server {
    listen 443 ssl;
    server_name yourdomain.com;

    root /var/www/nuoi-cham/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/notify/donation` | Gửi thông báo donate mới |
| POST | `/api/notify/goal-update` | Thông báo cập nhật mục tiêu |
| POST | `/api/notify/custom` | Gửi tin nhắn tùy chỉnh |
| GET | `/api/health` | Kiểm tra server status |

## Test thử

```bash
curl -X POST http://localhost:3001/api/notify/donation \
  -H "Content-Type: application/json" \
  -d '{"packageName":"Trà sữa","packageIcon":"🧋","amount":60000,"message":"Test"}'
```

## Tin nhắn mẫu gửi đến Châm

```
🎉 CÓ DONATE MỚI! 🎉

🧋 Trà Sữa Full Topping
💰 Số tiền: 60.000 đ
👤 Người gửi: Anh yêu
💬 Lời nhắn: "Uống đi cho bớt quạu nha em"

Châm ơi, có người yêu thương em nè! 💕
```
