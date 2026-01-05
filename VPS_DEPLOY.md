# Hướng dẫn Deploy trên VPS 🚀

## Domain: nuoicham.xuannguyen.site

---

## Bước 1: SSH vào VPS

```bash
ssh root@your_vps_ip
```

---

## Bước 2: Cài đặt Node.js (nếu chưa có)

```bash
# Cài NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Cài Node.js 20
nvm install 20
nvm use 20
```

---

## Bước 3: Clone repository

```bash
cd /var/www
git clone https://github.com/XuanNguyenNB/DuAnNuoi_Chamm.git nuoicham
cd nuoicham
```

---

## Bước 4: Build Frontend

```bash
# Cài dependencies
npm install

# Build production
npm run build
```

Kết quả build nằm trong folder `dist/`

---

## Bước 5: Cài đặt Backend (Telegram API)

```bash
cd server
npm install

# Tạo file .env từ template
cp .env.example .env
nano .env
```

Điền thông tin:
```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
PORT=3001
CORS_ORIGIN=https://nuoicham.xuannguyen.site
```

---

## Bước 6: Cài PM2 để chạy backend

```bash
npm install -g pm2

# Chạy server
cd /var/www/nuoicham/server
pm2 start index.js --name "nuoicham-api"

# Auto-start khi reboot
pm2 startup
pm2 save
```

---

## Bước 7: Cấu hình Nginx

```bash
nano /etc/nginx/sites-available/nuoicham
```

Paste nội dung sau:

```nginx
# Frontend - Static files
server {
    listen 80;
    server_name nuoicham.xuannguyen.site;

    root /var/www/nuoicham/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing - redirect all to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (nếu cần)
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Kích hoạt site:

```bash
ln -s /etc/nginx/sites-available/nuoicham /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## Bước 8: Cấu hình Cloudflare

1. **DNS Settings** trên Cloudflare:
   - Type: `A`
   - Name: `nuoicham`
   - Content: `<IP VPS của bạn>`
   - Proxy: ✅ (Proxied - màu cam)

2. **SSL/TLS Settings**:
   - Mode: `Flexible` hoặc `Full`

3. **Page Rules** (Optional):
   - URL: `nuoicham.xuannguyen.site/*`
   - Setting: Cache Level = Cache Everything

---

## Bước 9: Cập nhật Frontend env

Tạo file `.env.production` trước khi build:

```bash
cd /var/www/nuoicham
echo "VITE_API_URL=https://nuoicham.xuannguyen.site" > .env.production
npm run build
```

---

## Kiểm tra

```bash
# Kiểm tra Nginx
curl http://localhost

# Kiểm tra API
curl http://localhost:3001/api/health

# Kiểm tra PM2
pm2 status
pm2 logs nuoicham-api
```

---

## Commands hữu ích

```bash
# Xem logs
pm2 logs nuoicham-api

# Restart API
pm2 restart nuoicham-api

# Update code
cd /var/www/nuoicham
git pull
npm run build
pm2 restart nuoicham-api

# Reload Nginx
systemctl reload nginx
```

---

## Troubleshooting

### Lỗi 502 Bad Gateway
```bash
# Kiểm tra PM2
pm2 status
pm2 restart nuoicham-api
```

### Lỗi Permission denied
```bash
chown -R www-data:www-data /var/www/nuoicham
chmod -R 755 /var/www/nuoicham
```

### Lỗi Cloudflare 522 (Connection timeout)
- Kiểm tra firewall: `ufw allow 80` và `ufw allow 443`
- Kiểm tra Nginx đang chạy: `systemctl status nginx`

---

## Hoàn tất! 🎉

Website sẽ hoạt động tại: **https://nuoicham.xuannguyen.site**
