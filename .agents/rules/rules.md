---
trigger: always_on
---

# 🤖 QUY TẮC BẮT BUỘC DÀNH CHO AI (STRICT AI RULES)
# Phiên bản 2.0 — Định hướng Lingokids + Bản Sắc Việt Nam

Dự án "App Dạy Toán Tư Duy - Chuyện Của Bé" là một EdTech Product cho trẻ 3-6 tuổi.
AI phải đảm bảo từng dòng code, từng pixel thiết kế, từng từ ngữ đều phục vụ cho một trẻ mầm non Việt Nam.

---

## 1. NGUYÊN TẮC NỀN TẢNG (NON-NEGOTIABLE CORE PRINCIPLES)

### 1.1 Bám sát khung giáo trình
- Mọi tính năng, màn chơi, nội dung mới ĐỀU PHẢI có nguồn gốc từ `Khunggiaotrinh_Storytelling.md`.
- **Không tự bịa nội dung** ngoài khung. Không thêm bạo lực, phép thuật phương Tây, hay chủ đề không phù hợp lứa tuổi.
- Nếu yêu cầu mơ hồ → **dừng lại, hỏi trước khi code**.

### 1.2 Văn hoá Việt Nam là cốt lõi
- Nhân vật, bối cảnh, đạo cụ, hội thoại PHẢI phản ánh văn hoá Việt (mâm cơm, áo dài, chợ quê, tàu điện, bánh chưng, cây khế...).
- Nhân vật người Việt (da ngăm, tóc đen, nét mặt thân thiện), không dùng hoạt vật/linh vật Tây phương làm nhân vật chính.

### 1.3 Chuẩn độ tuổi 3-6
- Logic toán học cực kỳ đơn giản. Ưu tiên: kéo thả (Drag & Drop), chạm (Tap), đếm bằng ngón tay.
- **Tối thiểu chữ viết** — tối đa hình ảnh và âm thanh.
- Tiếng Anh chỉ lồng ghép theo đúng từ vựng trong khung giáo trình.

---

## 2. QUY TẮC THIẾT KẾ HÌNH ẢNH (ART DIRECTION — LINGOKIDS STYLE)

### 2.1 Phong cách đồ hoạ bắt buộc
- **Flat Vector Art:** Không có đổ bóng 3D phức tạp, không có texture photo-realistic.
- **Thick Rounded Outlines:** Tất cả nhân vật và đồ vật PHẢI có viền bao quanh dày (~6-8px), màu đậm (navy `#2B2D42`), bo tròn mềm.
- **Vibrant Pastel Colors:** Dùng bảng màu pastel rực rỡ. Không dùng màu thuần nguyên chất.
- **Big Expressive Eyes:** Nhân vật có mắt to, tròn, lấp lánh. Thể hiện cảm xúc qua mắt và miệng.
- **Simple Shapes:** Đầu to, tay chân mập mạp, tỉ lệ chibi/cartoon.

### 2.2 Nhân vật — Kiến trúc Cut-out bắt buộc
- Mỗi nhân vật PHẢI được xây dựng theo kiến trúc **Cut-out Animation** (tách rời bộ phận):
  - Các bộ phận: Đầu, Thân, Tay-trái, Tay-phải, Chân-trái, Chân-phải.
  - Mỗi bộ phận là file PNG trong suốt riêng biệt.
  - Lưu vào `public/assets/characters/{ten_nhan_vat}/`.
- Pivot (điểm xoay) đặt đúng vị trí giải phẫu (vai cho tay, cổ cho đầu, đầu gối cho chân).
- **KHÔNG** dùng ảnh nhân vật nguyên khối tĩnh cho cutscene.

### 2.3 Giao diện người dùng (UI)
- Nút bấm: Bo góc cực tròn (>= 24px), viền đậm, shadow cứng tạo cảm giác 3D nổi.
- **Bouncy Effect bắt buộc:** Tất cả nút bấm PHẢI có hiệu ứng nảy khi nhấn (`scale 0.95`).
- **TUYỆT ĐỐI KHÔNG dùng `text-transform: uppercase`** với tiếng Việt — gây lỗi dấu chồng.
- Font chữ: `iruKaEdu` cho cả React UI và Phaser.
- `letter-spacing` tối thiểu `0.05em` trên mọi đoạn văn bản.

---

## 3. QUY TẮC CÔNG NGHỆ (TECH STACK)

| Lớp | Công nghệ | Ghi chú |
|---|---|---|
| UI ngoài game | React 19 + TypeScript | Menu, Map, Modal |
| Engine Game | Phaser 3 + TypeScript | Scene, Physics, Tween |
| Styling | Vanilla CSS (`index.css`) | **Không Tailwind** |
| Cross-platform | Capacitor | iOS + Android |
| Build | Vite + Turborepo | Monorepo |
| Animation nhân vật | Phaser Tweens (Cut-out) | Không Spine, không Rive |

- Mọi file logic phải là `.ts` hoặc `.tsx`. **Không dùng JavaScript thuần**.

---

## 4. QUY TẮC KIẾN TRÚC MÃ NGUỒN

### 4.1 Tách biệt React và Phaser
- **React:** Landing, Avatar, Bản đồ, Modal, Complete Screen.
- **Phaser:** Gameplay — kéo thả, di chuyển, va chạm, Cut-out animation.
- **Giao tiếp:** Chỉ qua `EventBus` (gameBus). Phaser không truy cập DOM.

### 4.2 Chuẩn hoá Phaser Scene
- Mỗi bài học = 1 `Phaser.Scene` độc lập.
- Mọi asset PHẢI load trong `PreloaderScene`, không load trong Scene play.
- Mỗi Scene có 2 pha rõ ràng:
  - `IntroPhase` (Cutscene): Tắt HUD, nhân vật Cut-out diễn hoạt, hội thoại hiện chậm.
  - `PlayPhase` (Gameplay): Bật HUD, bé tương tác kéo thả/tap.

### 4.3 CharacterAnimator — Class dùng chung (phải xây dựng)
- Mọi nhân vật phải được quản lý qua `CharacterAnimator.ts`.
- Không hard-code Tween riêng lẻ trong từng Scene.

---

## 5. QUY TẮC ĐẶT TÊN

| Loại | Chuẩn | Ví dụ |
|---|---|---|
| Biến, hàm | `camelCase` | `loadAssets`, `checkAnswer` |
| Component, Class | `PascalCase` | `JourneyMap`, `MealShapesScene` |
| Hằng số | `UPPER_SNAKE_CASE` | `MAX_SCORE`, `GAME_WIDTH` |
| File CSS, asset | `kebab-case` | `mam-com.png`, `intro-bg.webp` |
| Thư mục nhân vật | `characters/{name}/` | `characters/mom/`, `characters/boy/` |

---

## 6. QUY TẮC TÀI NGUYÊN (ASSETS)

- Định dạng: **WebP** (ưu tiên) hoặc **PNG** (khi cần trong suốt).
- Nhân vật: PNG trong suốt, nền xoá hoàn toàn.
- Âm thanh: MP3/OGG, tối đa 2MB/file.
- Không commit asset > 5MB.

---

## 7. CẢNH BÁO ĐỎ (RED FLAGS — AI dừng ngay, không làm)

- ❌ Thêm bài học ngoài `Khunggiaotrinh_Storytelling.md`.
- ❌ Dùng `text-transform: uppercase` với văn bản tiếng Việt.
- ❌ Load asset trong Scene đang play (gây lag).
- ❌ Phaser thao tác trực tiếp lên DOM React.
- ❌ Dùng ảnh nhân vật nguyên khối tĩnh trong cutscene.
- ❌ Hiệu ứng rung lắc mạnh hoặc âm thanh giật mình đột ngột.
- ❌ Chờ > 3 giây không có phản hồi hình ảnh hoặc âm thanh.
