---
description: 
---


## 2. QUY TRÌNH QUẢN LÝ MÃ NGUỒN (GIT WORKFLOW)

Dự án áp dụng mô hình **Feature Branch Workflow** kết hợp **Conventional Commits**.

### 2.1. Cấu trúc Nhánh (Branches)
- `main`: Nhánh chứa code hoàn chỉnh, ổn định nhất (Production). Chỉ được phép Merge từ nhánh `develop` sang, không code trực tiếp.
- `develop`: Nhánh chứa code đang phát triển, dùng để test nội bộ (Staging).
- `feature/[tên-chức-năng]`: Nhánh dùng để code tính năng mới (VD: `feature/bai2-bua-com-gia-dinh`, `feature/login-api`).
- `bugfix/[tên-lỗi]`: Nhánh sửa lỗi phát sinh.

### 2.2. Quy ước Đặt tên Commit (Conventional Commits)
Khi gõ lệnh commit, phải tuân thủ định dạng: `<type>: <mô tả ngắn>`
- `feat:` Dành cho tính năng mới. (VD: `feat: them man hinh chon nhan vat`)
- `fix:` Sửa lỗi bug. (VD: `fix: loi khong phat duoc am thanh tren iOS`)
- `refactor:` Tối ưu/Viết lại code nhưng không làm thay đổi logic.
- `docs:` Cập nhật tài liệu (Markdown, Kịch bản).
- `chore:` Các tác vụ linh tinh, cấu hình (VD: `chore: update thu vien phaser`).

---

## 3. QUY TRÌNH LÀM VIỆC HÀNG NGÀY (DAILY WORKFLOW)

Đội ngũ sẽ tuân theo vòng lặp 5 bước sau khi nhận một Yêu cầu (Task) từ Kịch bản:

1. **Nhận Task & Phân tích:**
   - Dev nhận Kịch bản (VD: `Kichban_Bai2_BuaComGiaDinh.md`).
   - Phân tích xem cần Asset (hình ảnh/âm thanh) gì, API backend nào để hỗ trợ.
2. **Tạo nhánh (Branching):**
   - Từ nhánh `develop`, dev checkout ra nhánh mới: `git checkout -b feature/bai-2-gameplay`.
3. **Phát triển & Test cục bộ (Development):**
   - Code tính năng.
   - Test trực tiếp trên Web (Chrome) và giả lập iPad (Xcode Simulator via Capacitor).
4. **Tạo Pull Request (Code Review):**
   - Khi làm xong, đẩy code lên Github/Gitlab và tạo Pull Request (PR) yêu cầu merge vào `develop`.
   - Một Dev khác (hoặc Lead) sẽ vào review code. Nếu đạt tiêu chuẩn mới được Merge.
5. **Nghiệm thu (Staging & QA):**
   - Code sau khi gộp vào `develop` sẽ tự động deploy lên server Staging.
   - Đội ngũ thiết kế, giáo viên mầm non vào chơi thử. Nếu đúng Kịch bản thì sẽ gộp sang `main` để chốt.

---

## 4. QUY TẮC QUẢN LÝ ASSET (HÌNH ẢNH, ÂM THANH)
Bởi vì Game Giáo dục chứa lượng Asset rất lớn (Nhân vật, Mâm cơm, Bát đũa, Giọng đọc Tiếng Anh):
- Hình ảnh bắt buộc dùng định dạng **WebP** hoặc **PNG đã nén** để làm nhẹ App.
- Kích thước ảnh nhân vật/đồ vật không vượt quá giới hạn khung hình hiển thị (Đừng đưa ảnh 4K vào màn hình Game).
- Toàn bộ Asset phải được tải lên Cloud (Cloudflare R2/S3) ở môi trường Production thay vì nhét trực tiếp vào Source Code, giúp App tải về lần đầu nhẹ hơn.