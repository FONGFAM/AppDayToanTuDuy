---
trigger: always_on
---

# 🤖 QUY TẮC BẮT BUỘC DÀNH CHO AI (STRICT AI RULES)

Để đảm bảo AI không tự ý sáng tạo sai lệch (làm linh tinh) khỏi mục tiêu dự án "App Dạy Toán Tư Duy - Chuyện Của Bé", AI PHẢI TUÂN THỦ NGHIÊM NGẶT các quy tắc sau:

## 1. BÁM SÁT KHUNG GIÁO TRÌNH & VĂN HOÁ
- **Tuyệt đối không tự bịa bài học mới:** Bất kỳ tính năng, màn chơi nào AI tạo ra ĐỀU PHẢI nằm trong file `Khunggiaotrinh_Storytelling.md`. Không được chế thêm các chủ đề ngoài lề (VD: Không làm game bắn súng, không đưa yếu tố bạo lực, không dùng bối cảnh phép thuật phương Tây nếu chưa có trong khung).
- **Văn hoá Việt Nam là cốt lõi:** Các tài nguyên (assets), nội dung hội thoại, tên nhân vật, bối cảnh phải bám sát văn hoá dân gian và hiện đại Việt Nam (VD: bánh chưng, cây khế, chú Cuội, mâm cơm, tàu điện Cát Linh).
- **Đúng chuẩn độ tuổi 3-6:** Các phép toán, logic phải cực kỳ đơn giản. Không dùng text (chữ) quá nhiều, thiên về kéo thả, chạm (touch/drag), đếm số và hình khối trực quan. Lồng ghép từ vựng Tiếng Anh cơ bản theo đúng khung.

## 2. QUY TẮC CÔNG NGHỆ (TECH STACK RULES)
- **Tech Stack Độc Tôn:** BẮT BUỘC dùng `React 19` + `TypeScript` + `Vite` + `Phaser 3` + `Capacitor` (theo `README.md`). 
- **Styling:** Chỉ dùng CSS thuần (Vanilla CSS). **TUYỆT ĐỐI KHÔNG** dùng TailwindCSS hay thư viện UI nào khác.
- **Không dùng JavaScript thuần (Vanilla JS):** Mọi file logic, component, game scene phải là `.ts` hoặc `.tsx`. Bắt buộc có typing đàng hoàng.

## 3. QUY TẮC KIẾN TRÚC MÃ NGUỒN (CODE ARCHITECTURE)
- **Tách biệt rạch ròi React và Phaser:** 
  - Giao diện ngoài game (Menu, Bản đồ, Chọn nhân vật, Modal hướng dẫn) => Dùng React.
  - Lõi chơi game (Kéo thả đồ vật, Di chuyển nhân vật) => Dùng Phaser 3.
- **Giao tiếp qua EventBus:** Mọi thao tác gửi/nhận dữ liệu (VD: báo cáo hoàn thành bài chơi từ Phaser ra React) PHẢI thông qua `EventBus` (mô hình publish/subscribe). Phaser không được thao tác trực tiếp lên DOM.
- **Quy tắc Phaser Scene:**
  - Mỗi bài học (Lesson) là một `Phaser.Scene` độc lập.
  - KHÔNG khởi tạo trực tiếp Asset (hình ảnh/âm thanh) bên trong Scene đang chơi, phải load toàn bộ ở một Scene chờ riêng (`PreloaderScene`) để tránh giật lag.

## 4. QUY TẮC ĐẶT TÊN (NAMING CONVENTIONS)
- Tên biến, hàm: `camelCase` (VD: `loadLevel`, `checkAnswer`).
- Tên Component (React) & Class (Phaser): `PascalCase` (VD: `MainMenuScene`, `JourneyMap`).
- Tên Hằng số: `UPPER_SNAKE_CASE` (VD: `MAX_SCORE`, `API_URL`).
- Format Code: Sử dụng `Prettier` và `ESLint` làm chuẩn. Bắt buộc format code trước khi commit.