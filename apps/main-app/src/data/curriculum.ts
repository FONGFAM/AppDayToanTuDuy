export type Lesson = {
  id: string;
  title: string;
  math: string;
  mission: string;
  english: string[];
  playable?: boolean;
};

export type Stage = {
  id: string;
  title: string;
  theme: string;
  story: string;
  icon: string;
  lessons: Lesson[];
};

export type SchoolYear = {
  id: 1 | 2 | 3;
  ages: string;
  className: string;
  title: string;
  subtitle: string;
  stages: Stage[];
};

export const curriculum: SchoolYear[] = [
  {
    id: 1,
    ages: '3–4 tuổi',
    className: 'Lớp Mầm',
    title: 'Bước chân đầu tiên',
    subtitle: 'Khám phá gia đình, ngõ xóm và thiên nhiên bằng giác quan.',
    stages: [
      {
        id: 'magic-home', title: 'Ngôi nhà kỳ diệu', theme: 'Gia đình', icon: '🏡',
        story: 'Bé thức dậy trong ngôi nhà thân quen và bắt đầu một ngày mới cùng gia đình.',
        lessons: [
          { id: 'wardrobe', title: 'Tủ quần áo của bé', math: 'Phân loại & màu sắc', mission: 'Xếp áo dài, áo bà ba và nón lá về đúng màu.', english: ['Red', 'Yellow', 'Blue', 'Sort'] },
          { id: 'family-meal-shapes', title: 'Bữa cơm gia đình', math: 'Hình khối cơ bản', mission: 'Tìm mâm tròn, thớt tròn và bàn vuông.', english: ['Circle', 'Square', 'Shape'], playable: true },
          { id: 'grandpa-chopsticks', title: 'Đôi đũa của ông', math: 'So sánh & số đếm', mission: 'Lấy đủ 10 chiếc đũa, chọn đũa dài và chia 5 đôi cho gia đình.', english: ['Long', 'Short', 'One', 'Two'], playable: true },
        ],
      },
      {
        id: 'small-alley', title: 'Ngõ nhỏ phố nhỏ', theme: 'Xã hội', icon: '🏙️',
        story: 'Bé cùng mẹ ra đầu ngõ, ghé tiệm tạp hóa và đi chợ quê.',
        lessons: [
          { id: 'village-road', title: 'Băng qua đường làng', math: 'Dài – ngắn', mission: 'Chọn tấm ván dài nhất để bước qua rãnh nước.', english: ['Long', 'Short'] },
          { id: 'fruit-stall', title: 'Sạp hoa quả', math: 'Quy luật AB', mission: 'Xếp bưởi và cam theo đúng quy luật lặp.', english: ['Pattern', 'Next'] },
          { id: 'coconut-candy', title: 'Chia kẹo dừa', math: 'Số lượng dưới 5', mission: 'Chia đúng 3 hoặc 4 viên kẹo cho các bạn.', english: ['Three', 'Four'] },
        ],
      },
      {
        id: 'countryside', title: 'Về quê nội', theme: 'Thiên nhiên', icon: '🌾',
        story: 'Cuối tuần, cả nhà về quê khám phá vườn cây, ao cá và chuồng gà.',
        lessons: [
          { id: 'chicken-roof', title: 'Lợp mái chuồng gà', math: 'Tam giác & cấu trúc', mission: 'Ghép hình tam giác và vuông để làm mái.', english: ['Triangle', 'House'] },
          { id: 'starfruit-story', title: 'Sự tích cây khế', math: 'Số lượng 5', mission: 'Giúp chim thần hái đúng 5 quả khế chín.', english: ['Five', 'Starfruit'] },
        ],
      },
    ],
  },
  {
    id: 2,
    ages: '4–5 tuổi',
    className: 'Lớp Chồi',
    title: 'Thế giới rộng lớn',
    subtitle: 'Mở rộng tới lễ hội, trường học và phong cảnh Việt Nam.',
    stages: [
      {
        id: 'traditional-tet', title: 'Đón Tết cổ truyền', theme: 'Gia đình', icon: '🧧',
        story: 'Cả nhà cùng gói bánh, trang trí đèn và xếp mâm ngũ quả.',
        lessons: [
          { id: 'banh-chung', title: 'Gói bánh chưng, bánh tét', math: 'Trong/ngoài, trên/dưới', mission: 'Đặt lá, nhân và hộp mứt đúng vị trí.', english: ['In', 'On', 'Under'] },
          { id: 'lantern-pattern', title: 'Trang trí lồng đèn', math: 'Quy luật AAB/ABB', mission: 'Nối dây đèn theo chuỗi màu nâng cao.', english: ['Pattern'] },
          { id: 'five-fruit-tray', title: 'Xếp mâm ngũ quả', math: 'Thứ tự kích thước', mission: 'Xếp quả từ lớn nhất đến nhỏ nhất.', english: ['Biggest', 'Smallest'] },
        ],
      },
      {
        id: 'school-festival', title: 'Ngày hội đến trường', theme: 'Xã hội', icon: '🏫',
        story: 'Bé đi học mẫu giáo, xem múa lân và gặp các nghệ nhân.',
        lessons: [
          { id: 'lion-dance', title: 'Múa lân rước đèn', math: 'Số lượng 6–8', mission: 'Đếm các bạn nhỏ cầm lồng đèn.', english: ['Six', 'Seven', 'Eight'] },
          { id: 'harvest', title: 'Mùa gặt', math: 'Nhiều/ít/bằng nhau', mission: 'So sánh các thúng lúa của bác nông dân.', english: ['More', 'Less', 'Equal'] },
          { id: 'to-he', title: 'Nghệ nhân nặn Tò he', math: 'Hình học 3D', mission: 'Phân loại khối cầu và khối hộp.', english: ['Sphere', 'Cube'] },
        ],
      },
      {
        id: 'forest-cave', title: 'Hang động & rừng tràm', theme: 'Thiên nhiên', icon: '🧭',
        story: 'Chuyến dã ngoại đưa bé qua bờ ruộng, ao sen và vườn dừa.',
        lessons: [
          { id: 'buffalo-code', title: 'Dắt trâu về chuồng', math: 'Lệnh tuần tự', mission: 'Dùng mũi tên dẫn trâu qua bờ ruộng.', english: ['Left', 'Right', 'Forward'] },
          { id: 'frog-add', title: 'Ếch ngồi lá sen', math: 'Cộng trong phạm vi 5', mission: 'Đếm số ếch sau khi có thêm bạn nhảy tới.', english: ['Plus', 'Add'] },
          { id: 'coconut-subtract', title: 'Hái dừa xiêm', math: 'Trừ trong phạm vi 5', mission: 'Hái dừa và đếm số quả còn lại.', english: ['Minus', 'Take away'] },
        ],
      },
    ],
  },
  {
    id: 3,
    ages: '5–6 tuổi',
    className: 'Lớp Lá',
    title: 'Sẵn sàng tới trường',
    subtitle: 'Rèn logic, tiền AI và toán học tiền tiểu học.',
    stages: [
      {
        id: 'grandpa-lessons', title: 'Bài học của ông', theme: 'Gia đình', icon: '🪁',
        story: 'Bé nghe chuyện cổ tích và chơi trò dân gian cùng ông bà.',
        lessons: [
          { id: 'hopscotch', title: 'Nhảy lò cò', math: 'Đếm cách 2 và 5', mission: 'Nhảy vào các ô số theo quy luật.', english: ['Two', 'Five', 'Count'] },
          { id: 'bundle-sticks', title: 'Câu chuyện bó đũa', math: 'Chục & đơn vị', mission: 'Bó 10 que thành một chục.', english: ['Tens', 'Ones'] },
          { id: 'pho-shop', title: 'Quán phở đầu ngõ', math: 'Phép trừ đến 10', mission: 'Bưng bát phở và tính số còn lại.', english: ['Minus', 'Left'] },
        ],
      },
      {
        id: 'modern-city', title: 'Thành phố hiện đại', theme: 'Xã hội', icon: '🚇',
        story: 'Bé đi tàu điện, làm kỹ sư và bảo vệ môi trường.',
        lessons: [
          { id: 'metro-add', title: 'Tàu điện Cát Linh – Hà Đông', math: 'Phép cộng đến 10', mission: 'Ghép toa tàu có phép tính đúng.', english: ['Plus', 'Equal'] },
          { id: 'crane-balance', title: 'Cần cẩu xây dựng', math: 'Cân bằng & phép tính đến 20', mission: 'Đặt khối thép để hai bên cân bằng.', english: ['Equal', 'Heavy', 'Balance'] },
          { id: 'ha-long-if', title: 'Bảo vệ Vịnh Hạ Long', math: 'If–Then & tiền AI', mission: 'Phân loại rác cho tàu vớt rác.', english: ['If', 'Then', 'Condition'] },
        ],
      },
      {
        id: 'moon-legend', title: 'Sự tích cung trăng', theme: 'Thiên nhiên vĩ mô', icon: '🌙',
        story: 'Trí tưởng tượng đưa bé gặp Chú Cuội, cây đa và đàn chim Lạc.',
        lessons: [
          { id: 'hundred-bamboo', title: 'Cây tre trăm đốt', math: 'Đo lường & chiều cao', mission: 'Xếp đốt tre để đo chiều cao.', english: ['Taller', 'Shorter', 'Measure'] },
          { id: 'lac-birds', title: 'Đàn chim Lạc vũ trụ', math: 'Tách – gộp số', mission: 'Tách một đàn chim thành các nhóm nhỏ.', english: ['Part', 'Whole'] },
          { id: 'trang-ti', title: 'Câu đố của Trạng Tí', math: 'Toán đố & logic', mission: 'Giải câu đố vui dân gian.', english: ['Story', 'Problem'] },
          { id: 'magic-backpack', title: 'Chiếc cặp sách diệu kỳ', math: 'Tổng ôn cuối hành trình', mission: 'Phân loại đồ dùng để sẵn sàng vào lớp 1.', english: ['Review', 'School'] },
        ],
      },
    ],
  },
];
