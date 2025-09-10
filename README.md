# BlackMedia CMS (Payload + Next.js)

A minimal CMS built with Payload CMS + Next.js App Router. Optimized for Cloudinary uploads. Root path redirects to `/admin`.

---

## English

### Quick Start
1) Copy env from `test.env` and set:
   - Required: `DATABASE_URI`, `PAYLOAD_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - Optional: `CLOUDINARY_UPLOAD_PRESET` (unsigned), `CLOUDINARY_SIGN_URL` (strict), `LOG_CLOUDINARY` (logs)
2) Install & run:
```bash
pnpm install
pnpm dev
```
3) Open `http://localhost:3000` → redirects to `/admin`.

### Cloudinary Upload
- Implemented in `src/collections/Media.ts` (`beforeChange`).
- Direct REST upload to Cloudinary (no local storage): `upload.disableLocalStorage: true`.
- Saved fields: `url` (secure_url), `filename` (public_id), `cloudinaryVersion`, `mimeType`, `filesize`.

### GraphQL
- Playground: `/api/graphql-playground`
- Endpoint: `/api/graphql`
- Auth (if needed): `Authorization: Bearer <token>` or `payload-token` cookie.
- REST list media: `GET /api/media?limit=100&page=1&depth=0`

### Production
```bash
pnpm build
pnpm start
```
Ensure Cloudinary env vars are configured on your host.

### Troubleshooting
- 500 on upload: set `LOG_CLOUDINARY=true`, check server logs ("upload failed/exception").
- 401/403/404 from Cloudinary: wrong keys/cloud_name, missing `upload_preset`, or IP restriction.
- ENOENT mkdir: local storage disabled already; no local dirs are created.

### License
MIT

---

## Tiếng Việt

### Bắt đầu nhanh
1) Tạo file env (tham khảo `test.env`):
   - Bắt buộc: `DATABASE_URI`, `PAYLOAD_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - Tuỳ chọn: `CLOUDINARY_UPLOAD_PRESET` (unsigned), `CLOUDINARY_SIGN_URL` (strict), `LOG_CLOUDINARY` (log)
2) Cài & chạy:
```bash
pnpm install
pnpm dev
```
3) Mở `http://localhost:3000` → tự chuyển sang `/admin`.

### Upload Cloudinary
- Định nghĩa tại `src/collections/Media.ts` (`beforeChange`).
- Upload trực tiếp qua REST; đã tắt lưu local: `upload.disableLocalStorage: true`.
- Lưu: `url` (secure_url), `filename` (public_id), `cloudinaryVersion`, `mimeType`, `filesize`.

### GraphQL
- Playground: `/api/graphql-playground`
- Endpoint: `/api/graphql`
- Auth (nếu cần): Header `Authorization: Bearer <token>` hoặc cookie `payload-token`.
- REST lấy media: `GET /api/media?limit=100&page=1&depth=0`

### Production
```bash
pnpm build
pnpm start
```
Đảm bảo cấu hình đầy đủ biến môi trường Cloudinary trên môi trường deploy.

### Xử lý sự cố
- Upload 500: bật `LOG_CLOUDINARY=true`, xem log server ("upload failed/exception").
- 401/403/404 Cloudinary: sai key/cloud_name, thiếu `upload_preset`, hoặc hạn chế IP.
- ENOENT mkdir: đã tắt lưu local, không tạo thư mục trên host.

### Giấy phép
MIT
