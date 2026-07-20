# App Dạy Toán Tư Duy (Chuyện Của Bé)

Dự án Game Giáo dục 2D tương tác dành cho trẻ 3–6 tuổi dựa trên **Giáo trình Xoắn ốc** (Gia đình ➔ Xã hội ➔ Thiên nhiên) kết hợp yếu tố **Kể chuyện (Storytelling)** và tích hợp văn hóa Việt Nam thân thuộc.

Dự án được xây dựng theo kiến trúc **Monorepo (NPM Workspaces + Turborepo)** kết hợp **ReactJS + Phaser 3 + TypeScript + Vite** và bọc bằng **Capacitor** để đóng gói ra App iOS/Android.

---

## 🛠️ Stack Công Nghệ

- **Kiến trúc:** Monorepo (NPM Workspaces & Turborepo)
- **Frontend Framework:** React 19 + TypeScript + Vite
- **Game Engine:** Phaser 3 (Engine game 2D chuyên nghiệp)
- **CSS / Styling:** CSS thuần linh hoạt
- **Mobile Wrapper:** Capacitor (Bọc Web App chạy mượt như App Native)

---

## 📁 Cấu Trúc Mã Nguồn Chính (Monorepo)

```text
.
├── package.json         # Định nghĩa workspace, chứa script npx turbo run dev/build
├── turbo.json           # Cấu hình Turborepo (tối ưu tốc độ build)
│
├── apps/
│   └── main-app/        # [HOST APP] Ứng dụng gốc (Vite + React + Capacitor)
│       ├── src/
│       │   ├── App.tsx          # Quản lý luồng màn hình (Landing -> Avatar -> Bản đồ -> Game)
│       │   ├── components/      # Các UI component của React (DPad, Map, Modal)
│       │   └── game/
│       │       └── createGame.ts# Hàm khởi tạo và mount game Phaser vào React
│       ├── package.json         # Chứa cấu hình Capacitor và dependencies
│       └── index.html           # Khung HTML gốc
│
└── packages/
    ├── core/            # [SHARED CODE] Phần code dùng chung (VD: EventBus)
    │   └── src/eventBus.ts      # Hệ thống Pub/Sub giao tiếp giữa React và Phaser
    │
    ├── game-kitchen/    # [GAME LEVEL] Logic Bài 3: Đôi đũa của ông (Điều khiển di chuyển)
    │   └── src/KitchenScene.ts
    │
    └── game-meal-shapes/# [GAME LEVEL] Logic Bài 2: Bữa cơm gia đình (Kéo thả hình khối)
        └── src/MealShapesScene.ts
```

---

## 🎮 Các Màn Chơi Đã Triển Khai (Dưới dạng Package độc lập)

1.  **Bài 2: Bữa cơm gia đình (`@app/game-meal-shapes`)**
    - Nhận diện hình khối cơ bản: Kéo mâm tròn (Circle) ra bàn.
    - Phân loại hình vuông và tròn: Xếp đĩa thức ăn tròn (Giò, Trứng) vào mâm tròn, đĩa vuông (Bánh chưng, Đậu phụ) vào khay vuông.
    - So sánh To - Nhỏ: Chia Bát To cho bố (Big), Bát Nhỏ cho con (Small).
    - Tập đếm cơ bản: Chạm vào ống đũa để rút đũa đếm `One`, `Two` cho ông bà.
2.  **Bài 3: Đôi đũa của ông (`@app/game-kitchen`)**
    - Bé di chuyển quanh bếp bằng nút D-Pad hoặc WASD.
    - Rút đủ 10 chiếc đũa ở chạn bát (đếm Tiếng Anh từ `One` đến `Ten`).
    - Mang đũa về bàn ăn và chia đều 5 đôi đũa cho các thành viên trong gia đình.

---

## 🚀 Hướng Dẫn Chạy Dự Án (Môi trường Web)

### Yêu Cầu Cài Đặt
- Node.js bản **v20.19.0** trở lên.
- Trình quản lý gói `npm`.

### Các Bước Thực Hiện

1.  **Cài đặt các gói phụ thuộc:**
    Tại thư mục gốc của dự án, chạy lệnh:
    ```bash
    npm install
    ```
2.  **Chạy máy chủ phát triển (Dev Server) bằng Turbo:**
    ```bash
    npx turbo run dev
    ```
3.  **Truy cập ứng dụng:**
    Mở trình duyệt và truy cập địa chỉ: 👉 **`http://localhost:3000/`** (hoặc `http://localhost:5173/` tùy cấu hình hiển thị trong Terminal).

---

## 📱 Hướng Dẫn Đóng Gói Ra App Điện Thoại (Capacitor)

1.  **Build mã nguồn toàn dự án:**
    ```bash
    npx turbo run build
    ```
2.  **Đồng bộ mã nguồn vào thư mục App Native:**
    Di chuyển vào thư mục `apps/main-app` và chạy:
    ```bash
    cd apps/main-app
    npx cap sync
    ```
3.  **Mở trên các IDE di động chuyên dụng:**
    - **iOS (Xcode trên máy Mac):**
      ```bash
      npx cap open ios
      ```
    - **Android (Android Studio):**
      ```bash
      npx cap open android
      ```
