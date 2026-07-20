---
description: Quy trình phát triển tính năng và màn chơi cho AI
---

# 🤖 QUY TRÌNH TRIỂN KHAI CHO AI (STRICT AI WORKFLOW)

Mỗi khi AI nhận một yêu cầu phát triển hoặc cập nhật dự án, AI BẮT BUỘC phải thực hiện tuần tự các bước sau để tránh sai sót và đi chệch hướng:

## BƯỚC 1: ĐỐI CHIẾU KHUNG GIÁO TRÌNH (CURRICULUM CHECK)
- TRƯỚC KHI VIẾT CODE, AI phải kiểm tra yêu cầu thuộc **Năm nào**, **Chặng nào**, **Bài số mấy** trong `Khunggiaotrinh_Storytelling.md`.
- Xác định rõ:
  - **Mục tiêu Toán học:** (VD: Phân loại, đếm số, hình khối).
  - **Mục tiêu Tiếng Anh:** (VD: Đếm One, Two, Circle).
  - **Bối cảnh:** (VD: Bếp của ông bà, Sạp hoa quả chợ quê).
- *Cảnh báo:* Nếu yêu cầu của User mơ hồ hoặc sai lệch với khung, AI phải dừng lại hỏi hoặc chủ động nắn chỉnh về đúng Khung Giáo Trình. Tuyệt đối không tự ý thêm bớt nội dung.

## BƯỚC 2: PHÂN TÍCH KIẾN TRÚC & PHÂN CHIA NHIỆM VỤ (ARCHITECTURE PLANNING)
- Căn cứ vào `README.md`, xác định rõ phần nào thuộc **React UI** (nút bấm, modal, menu) và phần nào thuộc **Phaser Canvas** (kéo thả, nhân vật 2D, va chạm).
- Lên danh sách các sự kiện (Events) cần thiết để giao tiếp giữa React và Phaser qua `EventBus` (nếu có sự tương tác qua lại).

## BƯỚC 3: THỰC THI VIẾT CODE (IMPLEMENTATION)
1. **Cập nhật Cấu hình (nếu có):** Khai báo Lesson mới trong `src/data/curriculum.ts`.
2. **Tạo Game Scene:** Viết class kế thừa `Phaser.Scene` cho bài học (VD: `src/game/scenes/Lesson4Scene.ts`). Đảm bảo logic kéo/thả/chạm/di chuyển phù hợp với trẻ em.
3. **Đăng ký Scene:** Khai báo Scene mới vào `src/game/config.ts` và logic gọi Scene tương ứng từ React qua Phaser.
4. **Viết React UI:** Tạo Component hiển thị bọc ngoài Game (nếu cần modal chúc mừng, modal hướng dẫn). Lắng nghe Event từ Game để cập nhật UI/Điểm số.

## BƯỚC 4: QUY TRÌNH SỬ DỤNG TÀI NGUYÊN (ASSET PIPELINE)
- AI khi code giả lập/sử dụng tài nguyên (hình ảnh/âm thanh) tạm thời (placeholder) phải đảm bảo:
  - Tên file rõ ràng, bằng tiếng Anh hoặc tiếng Việt không dấu (VD: `mam-com.png`, `banh-chung.webp`).
  - Lồng ghép màu sắc và hình khối đúng yêu cầu (VD: Quả bưởi phải tròn và xanh, Bánh chưng phải vuông và xanh).
- Kích thước ảnh nhân vật/đồ vật không vượt quá giới hạn khung hình hiển thị.
- Hình ảnh ưu tiên định dạng WebP/PNG tối ưu dung lượng cho App di động (Capacitor).

## BƯỚC 5: KIỂM TRA MÔI TRƯỜNG ĐÓNG GÓI (MOBILE/CAPACITOR CHECK)
- Sau khi viết xong tính năng, AI phải kiểm tra lại xem code TypeScript có lỗi không.
- Nhắc nhở bản thân rằng dự án sẽ chạy trên iOS/Android qua Capacitor. Không được viết các tính năng web-only (VD: không dựa dẫm vào các API trình duyệt đặc thù mà Mobile không hỗ trợ tốt).
- Phải đảm bảo Test UI responsive trên kích thước màn hình ngang (Landscape) của iPad/Điện thoại.

---
> **LỜI NHẮC CẢNH BÁO CHO AI:** 
> Việc tạo ra một App giáo dục cho trẻ mầm non yêu cầu sự tĩnh tại, dễ hiểu và chậm rãi. **KHÔNG** thêm các hiệu ứng rung lắc mạnh, **KHÔNG** làm luồng đi (User Flow) phức tạp. LUÔN LUÔN giữ sự đơn giản, rõ ràng và đúng chuẩn văn hoá Việt!