---
description: Quy trình phát triển tính năng và màn chơi cho AI — Phiên bản 2.0
---

# 🤖 QUY TRÌNH TRIỂN KHAI CHO AI (STRICT AI WORKFLOW v2.0)
# Định hướng: Lingokids Style + Bản Sắc Việt Nam

Mỗi khi nhận yêu cầu phát triển, AI BẮT BUỘC thực hiện tuần tự các bước sau:

---

## BƯỚC 0: PHÂN LOẠI YÊU CẦU (REQUEST CLASSIFICATION)

Trước tiên, xác định yêu cầu thuộc loại nào:

| Loại | Ví dụ | Bước tiếp theo |
|---|---|---|
| **Sửa lỗi nhỏ (Hotfix)** | Sửa chữ bị dính, fix lỗi CSS | Làm ngay, không cần kế hoạch |
| **Cải tiến UI/UX** | Thêm hiệu ứng, đổi màu nút | Xem design rules → Làm |
| **Tính năng mới nhỏ** | Thêm 1 animation | Xác nhận khung → Làm |
| **Màn chơi mới (Scene)** | Bài học mới | Đi qua ĐỦ 5 bước bên dưới |
| **Thay đổi kiến trúc** | Tạo Class mới, refactor | Lập kế hoạch → Xin duyệt → Làm |

---

## BƯỚC 1: ĐỐI CHIẾU KHUNG GIÁO TRÌNH (CURRICULUM CHECK)

**Áp dụng khi:** Yêu cầu liên quan đến nội dung bài học hoặc màn chơi mới.

1. Mở `yeu-cau/Khunggiaotrinh_Storytelling.md`.
2. Xác định chính xác: **Năm mấy → Chặng mấy → Bài số mấy**.
3. Xác định 3 mục tiêu:
   - Mục tiêu **Toán học** (VD: Nhận diện hình tròn, hình vuông).
   - Mục tiêu **Tiếng Anh** (VD: Circle, Square, Shape).
   - Mục tiêu **Văn hoá/Kỹ năng** (VD: Phụ giúp gia đình).
4. Đọc kịch bản chi tiết trong `yeu-cau/Kichban_BaiX_TenBai.md` (nếu có).

> ⚠️ Nếu không tìm thấy bài học trong khung → **DỪNG, HỎI USER** trước khi tiếp tục.

---

## BƯỚC 2: PHÂN TÍCH KIẾN TRÚC (ARCHITECTURE ANALYSIS)

**Áp dụng khi:** Tạo màn chơi mới hoặc thay đổi kiến trúc.

### 2.1 Phân chia React vs Phaser
Vẽ sơ đồ phân chia trách nhiệm:
```
[React]                          [Phaser]
  └── TutorialModal               └── PreloaderScene (load assets)
  └── JourneyMap                  └── BaiXScene (gameplay)
  └── CompleteScreen              └── CharacterAnimator (nhân vật)
       ↕ EventBus (gameBus) ↕
```

### 2.2 Xác định Events cần thiết (EventBus)
Liệt kê rõ các sự kiện cần gửi/nhận:
- Phaser → React: `game-complete`, `cutscene`, `score-update`
- React → Phaser: `action`, `pause`, `resume`

### 2.3 Xác định Assets cần tạo/có sẵn
- Kiểm tra `public/assets/` xem đã có asset nào chưa.
- Liệt kê asset cần tạo mới: nhân vật, background, prop, âm thanh.

---

## BƯỚC 3: XÂY DỰNG HỆ THỐNG NHÂN VẬT (CHARACTER PIPELINE)

**Áp dụng khi:** Cần nhân vật mới hoặc animation mới trong Scene.

### 3.1 Chuẩn bị Asset Cut-out
```
public/assets/characters/{ten_nhan_vat}/
  ├── head.png          ← Đầu (pivot ở cổ: origin 0.5, 0.9)
  ├── body.png          ← Thân
  ├── arm_left.png      ← Tay trái (pivot ở vai: origin 0.8, 0.2)
  ├── arm_right.png     ← Tay phải (pivot ở vai: origin 0.2, 0.2)
  ├── leg_left.png      ← Chân trái (pivot ở hông: origin 0.5, 0.1)
  └── leg_right.png     ← Chân phải (pivot ở hông: origin 0.5, 0.1)
```

### 3.2 Sử dụng CharacterAnimator
```typescript
// Tạo nhân vật
const mom = new CharacterAnimator(scene, {
  x: width / 2, y: height / 2,
  character: 'mom',    // tên thư mục
  scale: 0.5
});

// Gọi animation có sẵn
mom.play('wave');      // Vẫy tay
mom.play('breathe');   // Nhịp thở
mom.play('walk');      // Đi bộ
mom.play('cheer');     // Vui mừng
mom.say('Xin chào!'); // Hiển thị hội thoại
```

### 3.3 Thư viện Animation chuẩn (trong CharacterAnimator)
| Tên | Mô tả | Bộ phận |
|---|---|---|
| `breathe` | Nhịp thở tự nhiên | Thân + Đầu lên/xuống |
| `blink` | Chớp mắt ngẫu nhiên | Scale Y mắt |
| `wave` | Vẫy tay chào | Tay phải xoay 0° → 100° |
| `nod` | Gật đầu đồng ý | Đầu xoay nhẹ |
| `shake` | Lắc đầu từ chối | Đầu xoay trái/phải |
| `cheer` | Nhảy vui mừng | Toàn thân lên/xuống + tay giơ |
| `walk` | Đi bộ vào/ra | Chân xen kẽ + thân nhẹ |
| `idle` | Đứng yên (thở + chớp mắt) | Tổng hợp |

---

## BƯỚC 4: THỰC THI CODE (IMPLEMENTATION)

Thứ tự code bắt buộc:

### 4.1 Cập nhật dữ liệu (Data Layer)
```
apps/main-app/src/data/curriculum.ts
  └── Thêm entry bài học mới (id, title, mission, scene key...)
```

### 4.2 Tạo Phaser Scene
```
packages/game-{ten-bai}/src/
  ├── {TenBai}Scene.ts     ← Game Scene chính
  ├── {TenBai}Preloader.ts ← Load assets
  └── index.ts             ← Export
```

Template Scene bắt buộc:
```typescript
export class BaiXScene extends Phaser.Scene {
  private phase: 'intro' | 'play' = 'intro';
  
  create(): void {
    gameBus.emit('cutscene', true);  // Ẩn HUD
    this.startIntro();
  }
  
  private startIntro(): void {
    // Phase 1: Cutscene — nhân vật Cut-out diễn hoạt
    // Gọi CharacterAnimator, hội thoại, hiệu ứng
    // Sau khi xong → this.startPlay()
  }
  
  private startPlay(): void {
    this.phase = 'play';
    gameBus.emit('cutscene', false); // Hiện HUD
    // Setup tương tác kéo thả / tap
  }
  
  private onComplete(): void {
    gameBus.emit('game-complete', { score: ... });
  }
}
```

### 4.3 Đăng ký Scene
```
apps/main-app/src/game/config.ts
  └── Thêm Scene mới vào mảng scene[]
```

### 4.4 Tạo React UI (nếu cần)
- TutorialModal: Nội dung hướng dẫn bài mới.
- Không thay đổi cấu trúc App.tsx trừ khi thật sự cần thiết.

---

## BƯỚC 5: KIỂM TRA & HOÀN THIỆN (QA CHECKLIST)

Trước khi báo cáo "done", AI phải tự kiểm tra:

### 5.1 Kiểm tra kỹ thuật
- [ ] TypeScript không có lỗi (`npm run build` không báo lỗi).
- [ ] Không có `console.error` nào trong runtime.
- [ ] Asset đã load đúng trong PreloaderScene (không load lazy).
- [ ] EventBus không bị memory leak khi chuyển Scene.

### 5.2 Kiểm tra UI/UX
- [ ] Tất cả nút bấm có Bouncy Effect (scale animation).
- [ ] Không có `text-transform: uppercase` với tiếng Việt.
- [ ] `letter-spacing` tối thiểu `0.05em`.
- [ ] Font `iruKaEdu` hiển thị đúng trên cả React và Phaser.
- [ ] Giao diện không bị vỡ trên màn hình Landscape 768px+.

### 5.3 Kiểm tra Gameplay
- [ ] HUD ẩn đúng lúc cutscene, hiện đúng lúc gameplay.
- [ ] Tương tác kéo thả/tap hoạt động trên mobile (touch events).
- [ ] Phản hồi âm thanh/hình ảnh xảy ra trong < 300ms sau mỗi action.
- [ ] Không có khoảng trống chờ > 3 giây.

### 5.4 Kiểm tra Nội dung
- [ ] Tiếng Anh đúng theo từ vựng trong khung giáo trình.
- [ ] Bối cảnh, nhân vật, đạo cụ phù hợp văn hoá Việt Nam.
- [ ] Không có nội dung/hình ảnh không phù hợp trẻ em.

---

## PHỤ LỤC: CẤU TRÚC THƯ MỤC CHUẨN

```
task-2/
├── apps/
│   └── main-app/
│       ├── src/
│       │   ├── components/     ← React Components
│       │   │   ├── ui/         ← UI chung (BouncyButton, Modal...)
│       │   │   ├── JourneyMap.tsx
│       │   │   ├── LandingScreen.tsx
│       │   │   └── CompleteScreen.tsx
│       │   ├── data/
│       │   │   └── curriculum.ts  ← Dữ liệu bài học
│       │   ├── game/
│       │   │   ├── config.ts      ← Cấu hình Phaser
│       │   │   └── EventBus.ts   ← gameBus
│       │   └── App.tsx           ← Root component
│       └── public/
│           └── assets/
│               ├── static/       ← Font (iruKaEdu)
│               ├── images/       ← Background chung
│               ├── sounds/       ← Âm thanh chung
│               └── characters/   ← Cut-out parts của nhân vật
│                   ├── boy/
│                   ├── mom/
│                   ├── dad/
│                   └── grandma/
├── packages/
│   ├── game-meal-shapes/   ← Bài 2: Bữa Cơm
│   │   └── src/
│   │       ├── MealShapesScene.ts
│   │       └── CharacterAnimator.ts  ← (cần tạo)
│   └── game-kitchen/       ← Bài 3: Đôi Đũa
└── yeu-cau/                ← Tài liệu thiết kế
    ├── Khunggiaotrinh_Storytelling.md
    └── Kichban_BaiX_*.md
```

---

> **⚡ NGUYÊN TẮC VÀNG:** Luôn hỏi bản thân — "Liệu một đứa trẻ 3 tuổi có hiểu được cái này không?" trước khi thêm bất kỳ thứ gì vào game.
