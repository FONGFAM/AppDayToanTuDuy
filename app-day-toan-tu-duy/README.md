# App Dạy Toán Tư Duy (Bản Đồ Trưởng Thành)

Dự án Game Giáo dục 2D tương tác dành cho trẻ 3–6 tuổi dựa trên **Giáo trình Xoắn ốc** (Gia đình ➔ Xã hội ➔ Thiên nhiên) kết hợp yếu tố **Kể chuyện (Storytelling)** và tích hợp văn hóa Việt Nam thân thuộc.

Dự án được xây dựng bằng công nghệ hiện đại: **ReactJS + Phaser 3 + TypeScript + Vite** và bọc bằng **Capacitor** để đóng gói ra App iOS/Android.

---

## 🛠️ Stack Công Nghệ

- **Frontend Framework:** React 19 + TypeScript + Vite
- **Game Engine:** Phaser 3 (Engine game 2D chuyên nghiệp)
- **CSS / Styling:** CSS thuần linh hoạt
- **Mobile Wrapper:** Capacitor (Bọc Web App chạy mượt như App Native)

---

## 🎮 Các Màn Chơi Đã Triển Khai (Dưới dạng Bản chơi thử Demo)

1.  **Bài 2: Bữa cơm gia đình (Màn kéo thả tương tác chuột/touch):**
    - Nhận diện hình khối cơ bản: Kéo mâm tròn (Circle) ra bàn.
    - Phân loại hình vuông và tròn: Xếp đĩa thức ăn tròn (Giò, Trứng) vào mâm tròn, đĩa vuông (Bánh chưng, Đậu phụ) vào khay vuông.
    - So sánh To - Nhỏ: Chia Bát To cho bố (Big), Bát Nhỏ cho con (Small).
    - Tập đếm cơ bản: Chạm vào ống đũa để rút đũa đếm `One`, `Two` cho ông bà.
2.  **Bài 3: Đôi đũa của ông (Màn di chuyển nhập vai phím/D-Pad):**
    - Bé di chuyển quanh bếp bằng nút D-Pad hoặc WASD.
    - Rút đủ 10 chiếc đũa ở chạn bát (đếm Tiếng Anh từ `One` đến `Ten`).
    - Mang đũa về bàn ăn và chia đều 5 đôi đũa cho các thành viên trong gia đình.

---

## 🚀 Hướng Dẫn Chạy Dự Án (Môi trường Web)

### Yêu Cầu Cài Đặt
- Node.js bản **v20.19.0** trở lên.
- Trình quản lý gói `npm`.

### Các Bước Thực Hiện

1.  **Cài đặt các gói phụ thuộc (Dependencies):**
    ```bash
    npm install
    ```
2.  **Chạy máy chủ phát triển (Dev Server):**
    ```bash
    npm run dev
    ```
3.  **Truy cập ứng dụng:**
    Mở trình duyệt (khuyên dùng Google Chrome hoặc Safari trên iPad) và truy cập địa chỉ hiển thị trong terminal, mặc định là:
    👉 **`http://localhost:3000/`** (hoặc `http://localhost:5173/` tùy cấu hình)

---

## 📱 Hướng Dẫn Đóng Gói Ra App Điện Thoại (Capacitor)

Dự án đã cấu hình Capacitor để chạy trên iOS và Android.

1.  **Build mã nguồn web:**
    ```bash
    npm run build
    ```
2.  **Đồng bộ mã nguồn vào thư mục App Native:**
    ```bash
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

---

## 📁 Cấu Trúc Mã Nguồn Chính

```text
src/
├── App.tsx             # Quản lý luồng màn hình chính (Landing -> Chọn Avatar -> Bản đồ -> Game)
├── components/         # Các UI component của React (DPad, JourneyMap, TutorialModal, LandingScreen)
├── data/
│   └── curriculum.ts   # Lộ trình 365 ngày (Năm 1, Năm 2, Năm 3 tương ứng độ tuổi)
├── game/
│   ├── config.ts       # Cấu hình khung game của Phaser 3
│   ├── createGame.ts   # Hàm khởi tạo và mount game Phaser vào React
│   ├── eventBus.ts     # Cầu nối truyền nhận dữ liệu giữa Phaser và React UI
│   └── scenes/
│       ├── KitchenScene.ts    # Logic Bài 3: Đôi đũa của ông (Phím điều khiển di chuyển)
│       └── MealShapesScene.ts # Logic Bài 2: Bữa cơm gia đình (Kéo thả tương tác hình khối)
└── utils/
    └── audio.ts        # Quản lý phát âm thanh Tiếng Anh và âm hiệu ứng
```
