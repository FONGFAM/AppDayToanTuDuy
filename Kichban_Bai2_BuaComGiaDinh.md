# 🎬 KỊCH BẢN CHI TIẾT GAMEPLAY
**BÀI 2: BỮA CƠM GIA ĐÌNH**

* **Dự án:** Math & AI Mầm Non
* **Độ tuổi:** 3-4 tuổi (Lớp Mầm - Chặng 1)
* **Thời lượng chơi dự kiến:** 5 - 7 phút

---

## 🎯 1. TỔNG QUAN BÀI HỌC
* **Mục tiêu Toán học:** Nhận diện Hình tròn (Circle), Hình vuông (Square). So sánh To - Nhỏ (Big - Small). Tập đếm số lượng 1, 2.
* **Mục tiêu Ngôn ngữ (Tiếng Anh):** Circle, Square, Big, Small, One, Two.
* **Mục tiêu Văn hoá/Kỹ năng mềm:** Phụ giúp gia đình việc nhà (dọn cơm, chia bát đũa), truyền thống kính trên nhường dưới trong mâm cơm Việt.

## 🎨 2. THÀNH PHẦN THIẾT KẾ (ASSETS)
* **Bối cảnh:** Gian bếp và phòng ăn mang không khí gia đình Việt Nam. Có ánh nắng hắt vào từ cửa sổ. Bếp gạch hoặc bếp hiện đại nhưng có các vật dụng quen thuộc (chạn bát, lồng bàn).
* **Nhân vật:** 
  * **Bé** (Nhân vật chính/Avatar của người chơi).
  * **Bà nội** (Tóc búi, mặc áo lụa/áo bà ba màu ấm, hiền từ).
  * **Bố & Mẹ** (Mặc đồ công sở vừa đi làm về, hoặc đồ mặc nhà gọn gàng).
* **Vật thể tương tác (Props):** 
  * Chiếc mâm đồng (Hình tròn) / Khay gỗ (Hình vuông).
  * Các loại đĩa thức ăn: Đĩa trứng rán (Tròn), Đĩa đậu phụ (Vuông), Đĩa giò lụa (Tròn), Đĩa bánh chưng/bánh đúc (Vuông).
  * Bát ăn cơm (To và Nhỏ).
  * Đũa tre.

---

## 🎮 3. KỊCH BẢN TƯƠNG TÁC (GAMEPLAY FLOW)

### MÀN 1: MỞ ĐẦU - TÌM MÂM CƠM (Nhận diện Hình khối)
* **Cutscene (Hoạt cảnh):** 
  * Mẹ đang bận xào nấu trên bếp. Bà nội đang lau bàn. 
  * **Bà nội nói (Voice over):** *"Cháu ngoan của bà ơi, tới giờ ăn cơm rồi. Cháu vào chạn bát lấy giúp bà chiếc **Mâm hình Tròn** nhé!"*
* **Gameplay:**
  * UI hiển thị 3 vật thể dựa vào tường: 1 chiếc mâm đồng (Hình Tròn), 1 chiếc khay gỗ (Hình Vuông), và 1 cái thớt (Hình Chữ Nhật/Vuông).
  * **Nhiệm vụ:** Bé phải chạm (Tap) hoặc kéo (Drag) chiếc mâm đồng mang ra đặt lên bàn.
  * **Feedback:** 
    * *Đúng:* Mâm đồng bay ra bàn. Âm thanh vỗ tay. Giọng Tiếng Anh vang lên rõ ràng: **"CIRCLE! It's a Circle!"** (Hiển thị chữ CIRCLE kèm hiệu ứng lấp lánh).
    * *Sai:* Vật thể lắc nhẹ (Shake), giọng nói nhẹ nhàng: *"Chưa đúng rồi, mâm hình tròn cơ mà, cháu nhìn lại xem!"*

### MÀN 2: CHIA ĐỒ ĂN (Phân loại Hình Vuông - Tròn)
* **Hoạt cảnh:**
  * Mẹ bưng ra một khay lớn đựng nhiều đĩa đồ ăn.
  * **Mẹ nói:** *"Con giỏi quá! Bây giờ con giúp mẹ xếp các đĩa thức ăn **Hình Tròn** vào trong mâm đồng nhé!"*
* **Gameplay:**
  * UI hiển thị khay đồ ăn của mẹ gồm: 2 đĩa hình tròn (Trứng rán, Giò chả), 2 đĩa hình vuông (Đậu phụ, Bánh chưng).
  * **Nhiệm vụ:** Bé kéo thả (Drag & Drop) đúng 2 đĩa hình tròn vào trong mâm đồng.
  * **Feedback:**
    * Khi kéo đúng đĩa tròn vào mâm, AI phát âm: **"Circle!"**.
    * (Tùy chọn nâng cao) Mẹ nói tiếp: *"Còn lại đĩa thức ăn **Hình Vuông**, con xếp lên khay gỗ nhé!"* -> Bé kéo đĩa vuông lên khay gỗ. AI phát âm: **"Square!"**.

### MÀN 3: SO SÁNH BÁT TO - BÁT NHỎ
* **Hoạt cảnh:**
  * Bố từ ngoài bước vào, xoa đầu bé.
  * **Bố nói:** *"Cơm đã dọn xong rồi, hai bố con mình đi lấy bát ăn cơm thôi! Con lấy giúp bố **Bát To** cho bố, và **Bát Nhỏ** cho con nhé!"*
* **Gameplay:**
  * UI hiển thị trên chạn bát: 1 Bát cỡ lớn (Bát To) và 1 Bát cỡ nhỏ (Bát Nhỏ) có hình chú gấu.
  * Trên bàn xuất hiện 2 hình mờ (Silhouette) vị trí ngồi của Bố và của Bé.
  * **Nhiệm vụ:** Kéo Bát To đặt vào chỗ của Bố, kéo Bát Nhỏ đặt vào chỗ của Bé.
  * **Feedback:**
    * Kéo Bát To thành công: **"BIG! Big bowl."**
    * Kéo Bát Nhỏ thành công: **"SMALL! Small bowl."**

### MÀN 4: SO SÁNH SỐ ĐẾM (Chia Đũa)
* **Hoạt cảnh:**
  * **Ông bà ngồi vào bàn.**
  * **Bà nội cười bảo:** *"Cháu lấy cho ông bà chiếc đũa để ăn cơm nhé!"*
* **Gameplay:**
  * UI hiển thị một ống đũa tre.
  * **Nhiệm vụ:** Bé chạm (Tap) vào ống đũa để rút đũa ra đưa cho ông bà.
  * **Tương tác đếm số:** 
    * Chạm lần 1: Một chiếc đũa bay ra. AI đếm: **"ONE!"** (Hiển thị số 1 khổng lồ).
    * Chạm lần 2: Chiếc đũa thứ hai bay ra tạo thành một đôi. AI đếm: **"TWO!"** (Hiển thị số 2).
  * **Hoạt cảnh chốt:** Bé mang "Hai" chiếc đũa đưa bằng hai tay cho ông bà.

### MÀN KẾT THÚC (OUTRO)
* Cả nhà quây quần bên mâm cơm.
* **Bé khoanh tay nói to (Âm thanh lồng tiếng trẻ con):** *"Con mời ông bà ăn cơm! Con mời bố mẹ ăn cơm ạ!"*
* **Ông bà / Bố mẹ cười tươi:** *"Cảm ơn con, bé con của nhà ta ngoan quá, đã biết giúp đỡ gia đình rồi!"*
* **Màn hình hiện chữ:** **"THÀNH CÔNG!"** cùng cơn mưa pháo hoa (Confetti) sao vàng.
* **Tổng kết bài học (Flashcard hiện lên để bé ôn lại):** Hình Tròn (Circle), Hình Vuông (Square), To (Big), Nhỏ (Small), Số 1 (One), Số 2 (Two).

---

## ⚙️ 4. LƯU Ý CHO ĐỘI NGŨ PHÁT TRIỂN (DEV & ART)
* **Art (Đồ hoạ):** Nên vẽ mâm đồng và đồ ăn cực kỳ bắt mắt, màu sắc rực rỡ để kích thích vị giác và sự tò mò của trẻ.
* **Sound (Âm thanh):** Tiếng đĩa chạm vào mâm (lách cách) cần chân thực. Giọng Tiếng Anh cần đọc chậm, vang, nhấn âm chuẩn để trẻ dễ nghe và bắt chước.
* **Logic/Tiền AI:** Lưu lại thao tác (Click/Kéo sai) của bé ở phần phân loại Hình Vuông/Tròn. Nếu bé làm sai quá 2 lần ở Màn 2, AI của hệ thống sẽ bật hiệu ứng (Gợi ý) - làm mờ (dim) các đĩa hình vuông đi và chỉ làm sáng (highlight) đĩa hình tròn để hướng sự chú ý của bé.
