import Phaser from 'phaser';
import { gameBus } from '@app/core';

export class MealShapesScene extends Phaser.Scene {
  private avatar!: string;
  private phase: 'collect' | 'return' | 'serve' | 'chopsticks' = 'collect';
  
  // Counters for App header
  private collectedCount = 0; // Number of circles placed
  private pairsCount = 0;     // Number of squares placed

  // Assets positions & game objects
  private table!: Phaser.GameObjects.Image;
  
  // Interactive Items
  private mamCircle!: Phaser.GameObjects.Container;
  private khaySquare!: Phaser.GameObjects.Container;
  private thotRect!: Phaser.GameObjects.Container;

  // Dishes to place in Phase 2
  private dishes: Phaser.GameObjects.Container[] = [];
  
  // Bowls to place in Phase 3
  private bigBowl!: Phaser.GameObjects.Container;
  private smallBowl!: Phaser.GameObjects.Container;
  private fatherSpot!: Phaser.GameObjects.Ellipse;
  private boySpot!: Phaser.GameObjects.Ellipse;

  // Chopsticks in Phase 4
  private chopsticksHolder!: Phaser.GameObjects.Container;

  constructor() {
    super('MealShapesScene');
  }

  init(): void {
    this.avatar = this.registry.get('avatar') || 'boy';
    this.phase = 'collect';
    this.collectedCount = 0;
    this.pairsCount = 0;
    this.dishes = [];
  }

  preload(): void {
    this.load.image('kitchen-bg', 'assets/phongbep.webp');
    this.load.image('table', 'assets/caiban.webp');
    this.load.image('mother', 'assets/anhme.webp');
    this.load.image('father', 'assets/anhbo.webp');
    this.load.image('grandma', 'assets/anhba.webp');
    this.load.image('player-avatar', this.avatar === 'boy' ? 'assets/betrai.webp' : 'assets/characters/player-girl.png');
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // 1. Background
    this.add.image(width / 2, height / 2, 'kitchen-bg').setDisplaySize(width, height);

    // 2. Bàn ăn (Table in the center bottom)
    this.table = this.add.image(width / 2 + 50, height / 2 + 130, 'table').setScale(0.75).setDepth(10);

    // 3. Characters sitting around
    this.add.image(width / 2 - 220, height / 2 - 10, 'grandma').setScale(0.35).setDepth(9);
    this.add.image(width / 2 + 300, height / 2 + 10, 'mother').setScale(0.35).setDepth(9);
    this.add.image(width / 2 + 50, height / 2 - 80, 'father').setScale(0.32).setDepth(9);
    this.add.image(width / 2 - 340, height / 2 + 160, 'player-avatar').setScale(0.35).setDepth(11);

    // 4. Cabinet (Chạn bát on the left)
    this.add.rectangle(150, height / 2 + 80, 220, 320, 0x8d5c38)
      .setStrokeStyle(6, 0x5c3a21)
      .setDepth(5);
    this.add.text(150, height / 2 - 60, 'CHẠN BÁT', {
      fontFamily: 'Arial',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#ffffff',
      backgroundColor: '#5c3a21',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5).setDepth(6);

    // 5. Initialize Interactive Drag-and-Drop system
    this.createPhase1Items();

    // Set first instruction hint
    gameBus.emit('action-context', { label: 'BẮT ĐẦU', enabled: false, hint: 'Kéo chiếc mâm tròn trên chạn bát ra bàn' });
    this.emitProgress();
  }

  // ==========================================
  // PHASE 1: TÌM MÂM TRÒN
  // ==========================================
  private createPhase1Items(): void {
    const { height } = this.cameras.main;

    // Mâm Tròn (Circle) - Correct Target
    this.mamCircle = this.add.container(150, height / 2 + 20);
    const mamBg = this.add.circle(0, 0, 45, 0xe5c158).setStrokeStyle(4, 0xd0aa3e);
    const mamLabel = this.add.text(0, 0, 'Mâm Tròn', { fontSize: '14px', color: '#5c3a21', fontStyle: 'bold' }).setOrigin(0.5);
    this.mamCircle.add([mamBg, mamLabel]);
    this.mamCircle.setSize(90, 90).setDepth(20);
    this.makeDraggable(this.mamCircle, 'circle');

    // Khay Vuông (Square) - Wrong Target
    this.khaySquare = this.add.container(150, height / 2 + 110);
    const khayBg = this.add.rectangle(0, 0, 80, 80, 0xa0785a).setStrokeStyle(4, 0x7c593f);
    const khayLabel = this.add.text(0, 0, 'Khay Vuông', { fontSize: '13px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
    this.khaySquare.add([khayBg, khayLabel]);
    this.khaySquare.setSize(80, 80).setDepth(20);
    this.makeDraggable(this.khaySquare, 'square-tray');

    // Thớt hình chữ nhật - Wrong Target
    this.thotRect = this.add.container(150, height / 2 + 190);
    const thotBg = this.add.rectangle(0, 0, 90, 50, 0x8a8a8a).setStrokeStyle(4, 0x5e5e5e);
    const thotLabel = this.add.text(0, 0, 'Thớt', { fontSize: '14px', color: '#ffffff' }).setOrigin(0.5);
    this.thotRect.add([thotBg, thotLabel]);
    this.thotRect.setSize(90, 50).setDepth(20);
    this.makeDraggable(this.thotRect, 'rect-tray');
  }

  private makeDraggable(container: Phaser.GameObjects.Container, type: string): void {
    container.setInteractive();
    this.input.setDraggable(container);

    const startX = container.x;
    const startY = container.y;

    container.on('drag', (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
      container.x = dragX;
      container.y = dragY;
    });

    container.on('dragend', () => {
      // Check if dropped near the table center
      const tableX = this.table.x;
      const tableY = this.table.y;
      const distance = Phaser.Math.Distance.Between(container.x, container.y, tableX, tableY);

      if (this.phase === 'collect' && type === 'circle' && distance < 180) {
        // Correct drop!
        this.input.setDraggable(container, false);
        container.x = tableX - 50;
        container.y = tableY - 10;
        
        // Visual indicators of success
        this.showSuccessFx(container);

        // Subtitles & Voice
        gameBus.emit('learning-word', { vietnamese: 'Hình Tròn (Circle)', english: 'Circle', kind: 'success' });
        
        this.time.delayedCall(2000, () => {
          this.startPhase2();
        });
      } else {
        // Wrong item or dropped too far - Tween back
        this.tweens.add({
          targets: container,
          x: startX,
          y: startY,
          duration: 300,
          ease: 'Power2',
          onStart: () => {
            if (type !== 'circle') {
              gameBus.emit('subtitle', { text: 'Không đúng rồi, hãy tìm mâm hình Tròn cơ!', tone: 'try' });
            }
          }
        });
      }
    });
  }

  // ==========================================
  // PHASE 2: CHIA ĐỒ ĂN (Vuông - Tròn)
  // ==========================================
  private startPhase2(): void {
    this.phase = 'return';
    this.emitProgress();

    // Clean up unnecessary items on the cabinet
    this.tweens.add({
      targets: [this.khaySquare, this.thotRect],
      alpha: 0,
      duration: 300,
      onComplete: () => {
        this.khaySquare.destroy();
        this.thotRect.destroy();
      }
    });

    // Place a small square tray on the table as well so we can sort both
    this.khaySquare = this.add.container(this.table.x + 90, this.table.y - 10);
    const trayBg = this.add.rectangle(0, 0, 95, 95, 0xa0785a).setStrokeStyle(4, 0x7c593f);
    const trayLabel = this.add.text(0, 0, 'Khay Vuông', { fontSize: '13px', color: '#ffffff' }).setOrigin(0.5);
    this.khaySquare.add([trayBg, trayLabel]).setDepth(11).setAlpha(0);

    this.tweens.add({
      targets: this.khaySquare,
      alpha: 1,
      duration: 300
    });

    // Create dishes on the cabinet
    const { height } = this.cameras.main;
    const dishTypes = ['circle', 'square', 'circle', 'square'];
    const dishColors = [0xff6b6b, 0x51cf66, 0xfcc419, 0x339af0];
    const dishLabels = ['Giò (Tròn)', 'Bánh chưng (Vuông)', 'Trứng (Tròn)', 'Đậu (Vuông)'];

    gameBus.emit('action-context', { 
      label: 'CHIA ĐỒ ĂN', 
      enabled: false, 
      hint: 'Xếp đĩa Tròn vào Mâm Tròn, đĩa Vuông vào Khay Vuông' 
    });

    dishTypes.forEach((shape, index) => {
      const x = 150;
      const y = height / 2 - 20 + (index * 80);

      const dish = this.add.container(x, y);
      
      let bg;
      if (shape === 'circle') {
        bg = this.add.circle(0, 0, 30, dishColors[index]).setStrokeStyle(3, 0xffffff);
      } else {
        bg = this.add.rectangle(0, 0, 56, 56, dishColors[index]).setStrokeStyle(3, 0xffffff);
      }

      const txt = this.add.text(0, 0, dishLabels[index], { fontSize: '10px', color: '#000000', fontStyle: 'bold' }).setOrigin(0.5);
      dish.add([bg, txt]).setSize(60, 60).setDepth(20);
      
      this.dishes.push(dish);
      this.makeDishDraggable(dish, shape, x, y);
    });
  }

  private makeDishDraggable(dish: Phaser.GameObjects.Container, shape: string, startX: number, startY: number): void {
    dish.setInteractive();
    this.input.setDraggable(dish);

    dish.on('drag', (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
      dish.x = dragX;
      dish.y = dragY;
    });

    dish.on('dragend', () => {
      // Determine targets
      const targetTray = shape === 'circle' ? this.mamCircle : this.khaySquare;
      const distance = Phaser.Math.Distance.Between(dish.x, dish.y, targetTray.x, targetTray.y);

      if (distance < 100) {
        // Correct drop!
        this.input.setDraggable(dish, false);
        
        // Animate snapping inside the target container
        const targetX = targetTray.x + (shape === 'circle' ? (this.collectedCount === 0 ? -18 : 18) : (this.pairsCount === 0 ? -16 : 16));
        const targetY = targetTray.y + (shape === 'circle' ? 5 : 5);

        this.tweens.add({
          targets: dish,
          x: targetX,
          y: targetY,
          scale: 0.8,
          duration: 150
        });

        this.showSuccessFx(dish);

        if (shape === 'circle') {
          this.collectedCount++;
          gameBus.emit('learning-word', { vietnamese: 'Hình Tròn (Circle)', english: 'Circle', kind: 'tap' });
        } else {
          this.pairsCount++;
          gameBus.emit('learning-word', { vietnamese: 'Hình Vuông (Square)', english: 'Square', kind: 'tap' });
        }

        this.emitProgress();

        // Check complete Phase 2
        if (this.collectedCount === 2 && this.pairsCount === 2) {
          this.time.delayedCall(2000, () => {
            this.startPhase3();
          });
        }
      } else {
        // Incorrect drop
        this.tweens.add({
          targets: dish,
          x: startX,
          y: startY,
          duration: 300,
          ease: 'Power2',
          onStart: () => {
            const wrongTray = shape === 'circle' ? 'Khay Vuông' : 'Mâm Tròn';
            gameBus.emit('subtitle', { text: `Đĩa này không xếp lên ${wrongTray} được đâu!`, tone: 'try' });
          }
        });
      }
    });
  }

  // ==========================================
  // PHASE 3: SO SÁNH BÁT TO - BÁT NHỎ
  // ==========================================
  private startPhase3(): void {
    this.phase = 'serve';
    this.collectedCount = 0; // Reset counters to track Bowls
    this.pairsCount = 0;
    this.emitProgress();

    // Clear Phase 2 items visually (keep background and table)
    this.dishes.forEach((d) => d.setAlpha(0.6));

    // Show silhouettes on table where bowls should go
    const { height } = this.cameras.main;
    
    // Spot for Father (Big Bowl)
    this.fatherSpot = this.add.ellipse(this.table.x, this.table.y - 45, 65, 30, 0x339af0, 0.3)
      .setStrokeStyle(2, 0x339af0)
      .setDepth(11);
    this.add.text(this.table.x, this.table.y - 45, 'Bố', { fontSize: '12px', color: '#000000' }).setOrigin(0.5).setDepth(12);

    // Spot for Me/Boy (Small Bowl)
    this.boySpot = this.add.ellipse(this.table.x - 70, this.table.y + 20, 45, 20, 0xfcc419, 0.3)
      .setStrokeStyle(2, 0xfcc419)
      .setDepth(11);
    this.add.text(this.table.x - 70, this.table.y + 20, 'Bé', { fontSize: '12px', color: '#000000' }).setOrigin(0.5).setDepth(12);

    // Render Big Bowl and Small Bowl on chạn bát
    // Big Bowl
    this.bigBowl = this.add.container(150, height / 2 + 10);
    const bigBg = this.add.ellipse(0, 0, 70, 40, 0xffffff).setStrokeStyle(3, 0x339af0);
    const bigTxt = this.add.text(0, -2, 'Bát To', { fontSize: '15px', color: '#339af0', fontStyle: 'bold' }).setOrigin(0.5);
    this.bigBowl.add([bigBg, bigTxt]).setSize(70, 40).setDepth(20);
    this.makeBowlDraggable(this.bigBowl, 'big', this.fatherSpot);

    // Small Bowl
    this.smallBowl = this.add.container(150, height / 2 + 90);
    const smallBg = this.add.ellipse(0, 0, 46, 26, 0xffffff).setStrokeStyle(3, 0xfcc419);
    const smallTxt = this.add.text(0, -1, 'Bát Nhỏ', { fontSize: '10px', color: '#fcc419', fontStyle: 'bold' }).setOrigin(0.5);
    this.smallBowl.add([smallBg, smallTxt]).setSize(46, 26).setDepth(20);
    this.makeBowlDraggable(this.smallBowl, 'small', this.boySpot);

    gameBus.emit('action-context', { 
      label: 'SO SÁNH BÁT', 
      enabled: false, 
      hint: 'Kéo Bát To đặt cho Bố, Bát Nhỏ đặt cho Bé' 
    });
  }

  private makeBowlDraggable(bowl: Phaser.GameObjects.Container, size: 'big' | 'small', targetSpot: Phaser.GameObjects.Ellipse): void {
    bowl.setInteractive();
    this.input.setDraggable(bowl);

    const startX = bowl.x;
    const startY = bowl.y;

    bowl.on('drag', (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
      bowl.x = dragX;
      bowl.y = dragY;
    });

    bowl.on('dragend', () => {
      const distance = Phaser.Math.Distance.Between(bowl.x, bowl.y, targetSpot.x, targetSpot.y);

      if (distance < 80) {
        // Correct
        this.input.setDraggable(bowl, false);
        bowl.x = targetSpot.x;
        bowl.y = targetSpot.y;
        targetSpot.setAlpha(0);

        this.showSuccessFx(bowl);

        if (size === 'big') {
          this.collectedCount = 1;
          gameBus.emit('learning-word', { vietnamese: 'To (Big)', english: 'Big', kind: 'tap' });
        } else {
          this.pairsCount = 1;
          gameBus.emit('learning-word', { vietnamese: 'Nhỏ (Small)', english: 'Small', kind: 'tap' });
        }

        this.emitProgress();

        if (this.collectedCount === 1 && this.pairsCount === 1) {
          this.time.delayedCall(2000, () => {
            this.startPhase4();
          });
        }
      } else {
        // Wrong spot
        this.tweens.add({
          targets: bowl,
          x: startX,
          y: startY,
          duration: 300,
          ease: 'Power2',
          onStart: () => {
            const who = size === 'big' ? 'bố' : 'bé';
            gameBus.emit('subtitle', { text: `Hãy đặt bát này cho đúng vị trí của ${who}!`, tone: 'try' });
          }
        });
      }
    });
  }

  // ==========================================
  // PHASE 4: CHIA ĐŨA & KẾT THÚC
  // ==========================================
  private startPhase4(): void {
    this.phase = 'chopsticks';
    this.collectedCount = 0; // Track count of chopsticks drawn
    this.pairsCount = 0;
    this.emitProgress();

    // Clean up Phase 3 spots
    this.fatherSpot.destroy();
    this.boySpot.destroy();

    // Show Chopstick Holder on the cabinet
    const { height } = this.cameras.main;
    this.chopsticksHolder = this.add.container(150, height / 2 + 50);
    const holderBg = this.add.rectangle(0, 0, 60, 90, 0xe15e3b).setStrokeStyle(4, 0xffe3a6);
    const holderLabel = this.add.text(0, 0, 'ỐNG ĐŨA', { fontSize: '11px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
    
    // Draw some stick tops poking out
    for (let i = 0; i < 5; i++) {
      const stick = this.add.rectangle(-20 + (i * 10), -50, 4, 30, 0xa75d2e);
      this.chopsticksHolder.add(stick);
    }
    
    this.chopsticksHolder.add([holderBg, holderLabel]).setSize(60, 90).setDepth(20);

    // Make it clickable (Tap to draw)
    this.chopsticksHolder.setInteractive({ useHandCursor: true });
    
    gameBus.emit('action-context', { 
      label: 'LẤY ĐŨA', 
      enabled: true, 
      hint: 'Chạm (Tap) vào Ống đũa trên tủ để lấy đũa đưa cho ông bà' 
    });

    // Listen to click or Action Button
    const drawChopstick = () => {
      if (this.phase !== 'chopsticks' || this.collectedCount >= 2) return;

      this.collectedCount++;
      this.emitProgress();

      // Spawn a chopstick visual flying from container to table
      const stick = this.add.rectangle(this.chopsticksHolder.x, this.chopsticksHolder.y - 60, 6, 120, 0xa75d2e)
        .setStrokeStyle(1, 0xffd99a)
        .setAngle(-20)
        .setDepth(25);

      const targetX = this.table.x - 100 + (this.collectedCount * 15);
      const targetY = this.table.y - 10;

      this.tweens.add({
        targets: stick,
        x: targetX,
        y: targetY,
        angle: 45,
        duration: 500,
        ease: 'Power2',
        onComplete: () => {
          this.showSuccessFx(stick);
        }
      });

      if (this.collectedCount === 1) {
        gameBus.emit('learning-word', { vietnamese: 'Một (One)', english: 'One', kind: 'tap' });
      } else if (this.collectedCount === 2) {
        this.chopsticksHolder.disableInteractive();
        gameBus.emit('learning-word', { vietnamese: 'Hai (Two)', english: 'Two', kind: 'complete' });
        
        this.time.delayedCall(2200, () => {
          this.triggerWin();
        });
      }
    };

    this.chopsticksHolder.on('pointerdown', drawChopstick);
    
    const onAction = gameBus.on('action', drawChopstick);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, onAction);
  }

  // ==========================================
  // FEEDBACKS & FX
  // ==========================================
  private showSuccessFx(obj: Phaser.GameObjects.GameObject): void {
    const { x, y } = obj as any;
    
    // Simple burst effect
    const particles = this.add.graphics({ x: x, y: y }).setDepth(30);
    particles.fillStyle(0xfff3a6, 0.8);
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      particles.fillCircle(Math.cos(angle) * 30, Math.sin(angle) * 30, 6);
    }

    this.tweens.add({
      targets: particles,
      alpha: 0,
      scale: 1.5,
      duration: 350,
      onComplete: () => particles.destroy()
    });
  }

  private emitProgress(): void {
    gameBus.emit('progress', {
      collected: this.collectedCount,
      pairs: this.pairsCount,
      target: 2,
      phase: this.phase,
    });
  }

  private triggerWin(): void {
    gameBus.emit('level-complete');
  }
}
