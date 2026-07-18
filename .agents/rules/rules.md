---
trigger: always_on
---

## 1. QUY TẮC LẬP TRÌNH (CODING RULES)

### 1.1. Quy tắc chung
- **Ngôn ngữ bắt buộc:** TypeScript (Cho cả React Frontend, Phaser Game và NestJS Backend). KHÔNG dùng JavaScript thuần để tránh lỗi ngầm ẩn (runtime errors).
- **Format Code:** Sử dụng `Prettier` và `ESLint` làm chuẩn. Bắt buộc format code trước khi commit.
- **Tên biến/hàm (Naming Convention):**
  - Đặt tên bằng tiếng Anh.
  - Tên biến, hàm: `camelCase` (VD: `getUserProfile`, `startGame`).
  - Tên Class, Interface, Component: `PascalCase` (VD: `MainMenuScene`, `UserProfile`).
  - Hằng số (Constants): `UPPER_SNAKE_CASE` (VD: `MAX_LEVEL`, `API_URL`).

### 1.2. React (Frontend) Rules
- Bắt buộc dùng **Functional Components** và React Hooks. Không dùng Class Components.
- Phân tách UI (View) và Logic: Các hàm gọi API/xử lý phức tạp nên đưa vào Custom Hooks.

### 1.3. Phaser (Game Engine) Rules
- Mỗi màn hình / màn chơi phải là một `Phaser.Scene` độc lập.
- KHÔNG khởi tạo trực tiếp Asset (hình ảnh/âm thanh) bên trong Scene đang chơi, phải load toàn bộ ở một Scene chờ riêng (`PreloaderScene`) để tránh giật lag.
- Mọi thao tác gửi điểm số, tiến độ học từ Phaser ra ngoài hệ thống phải thông qua một Event Emitter trung gian để React bắt sự kiện (Tách biệt hoàn toàn Game và Web UI).

---