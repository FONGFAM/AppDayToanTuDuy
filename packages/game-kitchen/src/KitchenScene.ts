import Phaser from 'phaser';
import { gameBus } from '@app/core';

type Direction = 'up' | 'down' | 'left' | 'right';
type Phase = 'collect' | 'return' | 'serve';
type TargetRole = 'grandpa' | 'grandma' | 'mom' | 'sister' | 'self';
type ActionContext = { label: string; enabled: boolean; hint: string };

type Target = {
  role: TargetRole;
  vi: string;
  en: string;
  x: number;
  y: number;
  served: boolean;
  glow: Phaser.GameObjects.Ellipse;
  placedPair: Phaser.GameObjects.Container;
};

const NUMBER_WORDS = [
  { vi: 'Một', en: 'One' },
  { vi: 'Hai', en: 'Two' },
  { vi: 'Ba', en: 'Three' },
  { vi: 'Bốn', en: 'Four' },
  { vi: 'Năm', en: 'Five' },
  { vi: 'Sáu', en: 'Six' },
  { vi: 'Bảy', en: 'Seven' },
  { vi: 'Tám', en: 'Eight' },
  { vi: 'Chín', en: 'Nine' },
  { vi: 'Mười', en: 'Ten' },
];

const TARGET_DATA: Array<Omit<Target, 'served' | 'glow' | 'placedPair'>> = [
  { role: 'grandpa', vi: 'Ông', en: 'Grandpa', x: 355, y: 462 },
  { role: 'grandma', vi: 'Bà', en: 'Grandma', x: 492, y: 449 },
  { role: 'mom', vi: 'Mẹ', en: 'Mom', x: 750, y: 452 },
  { role: 'sister', vi: 'Em gái', en: 'Sister', x: 910, y: 468 },
  { role: 'self', vi: 'Bé', en: 'Me', x: 410, y: 536 },
];

export class KitchenScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private playerShadow!: Phaser.GameObjects.Ellipse;
  private playerScale = 0.105;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Record<'W' | 'A' | 'S' | 'D' | 'SPACE', Phaser.Input.Keyboard.Key>;
  private heldDirections = new Set<Direction>();
  private collected = 0;
  private pairs = 0;
  private phase: Phase = 'collect';
  private canMove = false;
  private sitting = false;
  private completed = false;
  private actionContext: ActionContext = { label: 'LẤY ĐŨA', enabled: false, hint: 'Đi đến ống đũa bên phải' };
  private carryBundle!: Phaser.GameObjects.Container;
  private carryText!: Phaser.GameObjects.Text;
  private seatedBoy!: Phaser.GameObjects.Container;
  private seatedArm!: Phaser.GameObjects.Container;
  private seatZone = new Phaser.Math.Vector2(334, 650);
  private holderZone = new Phaser.Math.Vector2(1115, 545);
  private targets: Target[] = [];
  private selectedTarget = 0;
  private sparkEmitter!: Phaser.GameObjects.Particles.ParticleEmitter;
  private dustEmitter!: Phaser.GameObjects.Particles.ParticleEmitter;
  private unsubscribers: Array<() => void> = [];
  private footstepTime = 0;

  constructor() {
    super('KitchenScene');
  }

  preload(): void {
    this.load.image('dining-approved', 'assets/dining-approved.jpg');
    this.load.image('boy', 'assets/characters/player-boy.png');
  }

  create(): void {
    this.add.image(640, 360, 'dining-approved').setDisplaySize(1280, 720);
    this.add.rectangle(640, 360, 1280, 720, 0x2b180e, 0.02);

    this.createTextures();
    this.createRightCabinetCover();
    this.createTargets();
    this.createSeatedBoy();
    this.createPlayer();
    this.createParticles();
    this.createMovementBounds();
    this.bindInputs();

    this.cameras.main.fadeIn(420, 255, 248, 232);
    this.emitProgress();
    this.updateActionContext(true);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.unsubscribers.forEach((off) => off());
      this.unsubscribers = [];
    });
  }

  private createTextures(): void {
    const spark = this.make.graphics({ x: 0, y: 0 });
    spark.fillStyle(0xffd34d, 1).fillCircle(6, 6, 6);
    spark.generateTexture('spark-dot', 12, 12);
    spark.destroy();

    const dust = this.make.graphics({ x: 0, y: 0 });
    dust.fillStyle(0xffffff, 0.72).fillCircle(4, 4, 4);
    dust.generateTexture('dust-dot', 8, 8);
    dust.destroy();
  }

  private createRightCabinetCover(): void {
    const cover = this.add.container(1127, 502).setDepth(12);

    const cabinet = this.add.rectangle(0, 70, 306, 400, 0x8f552f, 1)
      .setStrokeStyle(8, 0x5f341f)
      .setOrigin(0.5);
    const top = this.add.rectangle(0, -126, 316, 30, 0x6f3c23, 1).setStrokeStyle(4, 0x4f2b1b);
    const panelA = this.add.rectangle(-68, 66, 116, 266, 0xa86b3d, 1).setStrokeStyle(5, 0x6f4027);
    const panelB = this.add.rectangle(68, 66, 116, 266, 0xa86b3d, 1).setStrokeStyle(5, 0x6f4027);
    const knobA = this.add.circle(-24, 64, 6, 0xe5b35d);
    const knobB = this.add.circle(24, 64, 6, 0xe5b35d);

    const holder = this.add.container(-15, -82);
    holder.add(this.add.rectangle(0, 35, 76, 86, 0xe15e3b).setStrokeStyle(6, 0xffe3a6));
    for (let i = 0; i < 10; i += 1) {
      holder.add(
        this.add.rectangle(-31 + i * 7, -12 - (i % 3) * 8, 5, 108, i % 2 ? 0x79421f : 0xa75d2e)
          .setAngle(-8 + i * 1.8)
          .setStrokeStyle(1, 0xffd99a),
      );
    }

    const label = this.add.text(-15, 8, 'ỐNG ĐŨA', {
      fontFamily: 'Nunito, Arial, sans-serif',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#5d321c',
      backgroundColor: '#fff7dfec',
      padding: { x: 12, y: 7 },
    }).setOrigin(0.5);

    cover.add([cabinet, top, panelA, panelB, knobA, knobB, holder, label]);
  }

  private createTargets(): void {
    this.targets = TARGET_DATA.map((data) => {
      const glow = this.add.ellipse(data.x, data.y, 112, 46, 0x74d97a, 0.16)
        .setStrokeStyle(4, 0xffffff, 0.9)
        .setDepth(18)
        .setAlpha(0);
      const pair = this.createPair(data.x + 32, data.y - 5, 0.35).setVisible(false).setDepth(20);
      return { ...data, served: false, glow, placedPair: pair };
    });
  }

  private createSeatedBoy(): void {
    this.seatedBoy = this.add.container(355, 604).setDepth(22).setVisible(false);

    const legs = this.add.container(0, 80);
    legs.add([
      this.add.rectangle(-22, 0, 38, 94, 0x4b7189).setAngle(7).setStrokeStyle(3, 0x29475a),
      this.add.rectangle(22, 0, 38, 94, 0x4b7189).setAngle(-7).setStrokeStyle(3, 0x29475a),
      this.add.ellipse(-28, 48, 56, 26, 0xf3f2ed).setStrokeStyle(3, 0x333333),
      this.add.ellipse(28, 48, 56, 26, 0xf3f2ed).setStrokeStyle(3, 0x333333),
    ]);

    const torso = this.add.rectangle(0, 5, 98, 118, 0xe7b74d)
      .setStrokeStyle(5, 0x8b5a2d)
      .setOrigin(0.5);
    const hood = this.add.ellipse(0, -40, 94, 54, 0x56a4bb, 1).setStrokeStyle(4, 0x2f6e80);
    const head = this.add.circle(0, -92, 54, 0xf4c3a2).setStrokeStyle(5, 0x9a5a39);
    const hair = this.add.ellipse(0, -111, 102, 66, 0x6e432d, 1).setStrokeStyle(3, 0x442719);
    const hairTuft = this.add.triangle(0, -145, -24, 16, 0, -14, 24, 16, 0x6e432d);

    const leftArm = this.add.container(-48, -5);
    leftArm.add([
      this.add.rectangle(0, 0, 24, 82, 0xe7b74d).setAngle(22).setStrokeStyle(3, 0x8b5a2d),
      this.add.circle(16, 35, 14, 0xf4c3a2).setStrokeStyle(2, 0x9a5a39),
    ]);

    this.seatedArm = this.add.container(48, -8);
    this.seatedArm.add([
      this.add.rectangle(0, 0, 24, 86, 0xe7b74d).setAngle(-28).setStrokeStyle(3, 0x8b5a2d),
      this.add.circle(-20, 35, 14, 0xf4c3a2).setStrokeStyle(2, 0x9a5a39),
    ]);

    this.seatedBoy.add([legs, torso, hood, head, hair, hairTuft, leftArm, this.seatedArm]);
  }

  private createPlayer(): void {
    this.player = this.physics.add.sprite(356, 654, 'boy')
      .setOrigin(0.5, 1)
      .setScale(this.playerScale)
      .setDepth(30)
      .setCollideWorldBounds(true);

    const source = this.textures.get('boy').getSourceImage() as HTMLImageElement;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setSize(source.width * 0.25, source.height * 0.12)
      .setOffset(source.width * 0.375, source.height * 0.84)
      .setDrag(1150, 1150)
      .setMaxVelocity(245, 185);

    this.physics.world.setBounds(105, 500, 1050, 175);

    this.playerShadow = this.add.ellipse(this.player.x, this.player.y + 4, 72, 20, 0x2b170d, 0.24).setDepth(29);

    this.carryBundle = this.add.container(this.player.x + 30, this.player.y - 122).setDepth(32).setVisible(false);
    const bundleBg = this.add.circle(0, 0, 31, 0xfff7dc, 0.97).setStrokeStyle(5, 0xf09a38);
    this.carryBundle.add(bundleBg);
    for (let i = 0; i < 5; i += 1) {
      this.carryBundle.add(this.add.rectangle(-13 + i * 7, -4, 4, 50, i % 2 ? 0x8e4e26 : 0xaa6032).setAngle(-8 + i * 4));
    }
    this.carryText = this.add.text(0, 17, '0', {
      fontFamily: 'Nunito, Arial, sans-serif',
      fontSize: '17px',
      fontStyle: 'bold',
      color: '#713716',
    }).setOrigin(0.5);
    this.carryBundle.add(this.carryText);
  }

  private createParticles(): void {
    this.sparkEmitter = this.add.particles(0, 0, 'spark-dot', {
      speed: { min: 35, max: 110 },
      angle: { min: 200, max: 340 },
      lifespan: 560,
      gravityY: 160,
      scale: { start: 1, end: 0 },
      emitting: false,
    }).setDepth(50);

    this.dustEmitter = this.add.particles(0, 0, 'dust-dot', {
      speed: { min: 8, max: 24 },
      angle: { min: 215, max: 325 },
      lifespan: 260,
      scale: { start: 0.8, end: 0 },
      alpha: { start: 0.45, end: 0 },
      emitting: false,
    }).setDepth(28);
  }

  private createMovementBounds(): void {
    const table = this.physics.add.staticImage(650, 495, '__DEFAULT').setVisible(false).setDisplaySize(715, 82).refreshBody();
    const cabinet = this.physics.add.staticImage(1127, 490, '__DEFAULT').setVisible(false).setDisplaySize(280, 66).refreshBody();
    this.physics.add.collider(this.player, table);
    this.physics.add.collider(this.player, cabinet);
  }

  private bindInputs(): void {
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.keys = this.input.keyboard!.addKeys('W,A,S,D,SPACE') as typeof this.keys;

    this.unsubscribers.push(
      gameBus.on<Direction>('move-start', (direction) => {
        if (this.phase === 'serve') {
          if (direction === 'left') this.changeTarget(-1);
          if (direction === 'right') this.changeTarget(1);
          return;
        }
        this.heldDirections.add(direction);
      }),
      gameBus.on<Direction>('move-stop', (direction) => this.heldDirections.delete(direction)),
      gameBus.on('action', () => this.performAction()),
      gameBus.on('start-level', () => {
        this.canMove = true;
        gameBus.emit('subtitle', { text: 'Đi đến ống đũa bên phải và lấy đủ 10 chiếc nhé!', tone: 'guide' });
      }),
      gameBus.on('pause-level', () => {
        this.canMove = false;
        this.player.setAcceleration(0, 0);
        this.player.setVelocity(0, 0);
      }),
      gameBus.on('resume-level', () => {
        if (!this.completed && !this.sitting) this.canMove = true;
      }),
    );

    this.keys.SPACE.on('down', () => this.performAction());
    this.cursors.left.on('down', () => {
      if (this.phase === 'serve') this.changeTarget(-1);
    });
    this.cursors.right.on('down', () => {
      if (this.phase === 'serve') this.changeTarget(1);
    });
  }

  update(): void {
    if (!this.player) return;

    this.playerShadow.setPosition(this.player.x, this.player.y + 4);
    this.carryBundle.setPosition(this.player.x + (this.player.flipX ? -32 : 32), this.player.y - 122);
    this.player.setDepth(30 + this.player.y / 100);

    if (!this.canMove || this.sitting || this.completed) {
      this.player.setAcceleration(0, 0);
      if (this.sitting) this.player.setVelocity(0, 0);
      return;
    }

    const left = this.cursors.left.isDown || this.keys.A.isDown || this.heldDirections.has('left');
    const right = this.cursors.right.isDown || this.keys.D.isDown || this.heldDirections.has('right');
    const up = this.cursors.up.isDown || this.keys.W.isDown || this.heldDirections.has('up');
    const down = this.cursors.down.isDown || this.keys.S.isDown || this.heldDirections.has('down');

    const input = new Phaser.Math.Vector2(Number(right) - Number(left), Number(down) - Number(up));
    const moving = input.lengthSq() > 0;

    if (moving) {
      input.normalize();
      this.player.setAcceleration(input.x * 1000, input.y * 760);
      if (input.x < -0.05) this.player.setFlipX(true);
      if (input.x > 0.05) this.player.setFlipX(false);
    } else {
      this.player.setAcceleration(0, 0);
    }

    const speed = (this.player.body as Phaser.Physics.Arcade.Body).speed;
    const walkAmount = Phaser.Math.Clamp(speed / 220, 0, 1);
    const stride = Math.sin(this.time.now / 80);
    const bounce = Math.abs(Math.sin(this.time.now / 90));

    this.player.setAngle(stride * 2.4 * walkAmount);
    this.player.setScale(
      this.playerScale * (1 + bounce * 0.03 * walkAmount),
      this.playerScale * (1 - bounce * 0.024 * walkAmount),
    );
    this.playerShadow.setScale(1 - bounce * 0.08 * walkAmount, 1 - bounce * 0.04 * walkAmount);

    if (speed > 55 && this.time.now > this.footstepTime) {
      this.footstepTime = this.time.now + 165;
      this.dustEmitter.explode(1, this.player.x, this.player.y - 2);
    }

    this.updateActionContext();
  }

  private updateActionContext(force = false): void {
    let next: ActionContext;

    if (this.phase === 'collect') {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.holderZone.x, this.holderZone.y);
      next = distance < 118
        ? { label: 'LẤY ĐŨA', enabled: this.collected < 10, hint: `Đã lấy ${this.collected}/10 chiếc` }
        : { label: 'LẤY ĐŨA', enabled: false, hint: 'Đi đến ống đũa bên phải' };
    } else if (this.phase === 'return') {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.seatZone.x, this.seatZone.y);
      next = distance < 112
        ? { label: 'NGỒI XUỐNG', enabled: true, hint: 'Ngồi vào ghế để chia đũa' }
        : { label: 'VỀ BÀN', enabled: false, hint: 'Mang đũa về chiếc ghế trống' };
    } else {
      const target = this.targets[this.selectedTarget];
      next = {
        label: target.served ? 'ĐÃ CÓ ĐŨA' : 'TRAO ĐŨA',
        enabled: !target.served && this.collected >= 2,
        hint: `Đang chọn: ${target.vi} · dùng ◀ ▶ để đổi`,
      };
    }

    if (
      force ||
      next.label !== this.actionContext.label ||
      next.enabled !== this.actionContext.enabled ||
      next.hint !== this.actionContext.hint
    ) {
      this.actionContext = next;
      gameBus.emit('action-context', next);
    }
  }

  private performAction(): void {
    if (this.completed || !this.actionContext.enabled) return;

    if (this.phase === 'collect') {
      this.collectOne();
      return;
    }

    if (this.phase === 'return') {
      this.sitDown();
      return;
    }

    this.serveSelectedTarget();
  }

  private collectOne(): void {
    if (this.collected >= 10) return;
    this.canMove = false;
    this.player.setVelocity(0, 0);

    const stick = this.add.rectangle(1114, 400, 7, 104, 0x985128)
      .setStrokeStyle(2, 0xffd99a)
      .setAngle(10)
      .setDepth(45);

    this.tweens.add({
      targets: stick,
      x: this.player.x + (this.player.flipX ? -20 : 20),
      y: this.player.y - 126,
      angle: 82,
      scale: 0.5,
      duration: 340,
      ease: 'Back.inOut',
      onComplete: () => {
        stick.destroy();
        this.collected += 1;
        const word = NUMBER_WORDS[this.collected - 1];
        this.carryBundle.setVisible(true);
        this.carryText.setText(String(this.collected));
        this.sparkEmitter.explode(7, this.player.x, this.player.y - 120);
        gameBus.emit('learning-word', {
          vietnamese: word.vi,
          english: word.en,
          kind: this.collected === 10 ? 'success' : 'tap',
        });

        if (this.collected === 10) {
          this.phase = 'return';
          gameBus.emit('subtitle', { text: 'Đủ 10 chiếc rồi! Hãy mang đũa về chiếc ghế trống.', tone: 'success' });
        }

        this.canMove = true;
        this.emitProgress();
        this.updateActionContext(true);
      },
    });
  }

  private sitDown(): void {
    if (this.phase !== 'return') return;
    this.canMove = false;
    this.sitting = true;
    this.player.setVelocity(0, 0);

    this.tweens.add({
      targets: this.player,
      x: this.seatZone.x,
      y: this.seatZone.y,
      duration: 420,
      ease: 'Sine.inOut',
      onComplete: () => {
        this.tweens.add({
          targets: [this.player, this.playerShadow, this.carryBundle],
          alpha: 0,
          duration: 260,
          onComplete: () => {
            this.player.setVisible(false);
            this.playerShadow.setVisible(false);
            this.carryBundle.setVisible(false);
            this.seatedBoy.setVisible(true).setAlpha(0).setScale(0.9);
            this.tweens.add({ targets: this.seatedBoy, alpha: 1, scale: 1, duration: 360, ease: 'Back.out' });
          },
        });

        this.phase = 'serve';
        this.selectedTarget = 0;
        this.updateTargetHighlight();
        gameBus.emit('subtitle', { text: 'Bé đã ngồi vào bàn. Dùng trái/phải để chọn người rồi trao 1 đôi đũa.', tone: 'guide' });
        this.emitProgress();
        this.updateActionContext(true);
      },
    });
  }

  private changeTarget(delta: number): void {
    if (this.phase !== 'serve' || this.completed) return;
    const total = this.targets.length;
    this.selectedTarget = (this.selectedTarget + delta + total) % total;
    this.updateTargetHighlight();
    this.updateActionContext(true);
    const target = this.targets[this.selectedTarget];
    gameBus.emit('learning-word', { vietnamese: target.vi, english: target.en, kind: 'tap' });
  }

  private updateTargetHighlight(): void {
    this.targets.forEach((target, index) => {
      target.glow.setAlpha(index === this.selectedTarget && !target.served ? 0.34 : 0);
    });
  }

  private serveSelectedTarget(): void {
    const target = this.targets[this.selectedTarget];
    if (!target || target.served || this.collected < 2) return;

    this.tweens.add({
      targets: this.seatedArm,
      angle: -30,
      x: 38,
      y: -20,
      duration: 180,
      yoyo: true,
      hold: 120,
    });

    const flyingPair = this.createPair(400, 535, 0.68).setDepth(48);
    this.tweens.add({
      targets: flyingPair,
      x: target.x + 28,
      y: target.y - 5,
      angle: 16,
      scale: 0.35,
      duration: 520,
      ease: 'Cubic.inOut',
      onComplete: () => {
        flyingPair.destroy();
        target.served = true;
        target.placedPair.setVisible(true);
        target.glow.setAlpha(0);
        this.collected -= 2;
        this.pairs += 1;
        this.sparkEmitter.explode(9, target.x, target.y - 10);

        gameBus.emit('learning-word', {
          vietnamese: `${target.vi} nhận một đôi đũa`,
          english: target.en,
          kind: 'success',
        });

        this.emitProgress();

        if (this.pairs === 5) {
          this.completed = true;
          this.targets.forEach((item) => item.glow.setAlpha(0));
          this.sparkEmitter.explode(30, 650, 445);
          gameBus.emit('learning-word', {
            vietnamese: 'Cả gia đình đã có đủ đũa!',
            english: 'Family',
            kind: 'complete',
          });
          this.time.delayedCall(1700, () => gameBus.emit('level-complete'));
          return;
        }

        this.selectNextUnserved();
        this.updateTargetHighlight();
        this.updateActionContext(true);
      },
    });
  }

  private selectNextUnserved(): void {
    for (let offset = 1; offset <= this.targets.length; offset += 1) {
      const index = (this.selectedTarget + offset) % this.targets.length;
      if (!this.targets[index].served) {
        this.selectedTarget = index;
        return;
      }
    }
  }

  private createPair(x: number, y: number, scale: number): Phaser.GameObjects.Container {
    const pair = this.add.container(x, y).setScale(scale);
    pair.add([
      this.add.rectangle(-6, 0, 6, 112, 0x8d4c24).setAngle(76).setStrokeStyle(2, 0xffd99a),
      this.add.rectangle(6, 0, 6, 112, 0xa96031).setAngle(76).setStrokeStyle(2, 0xffd99a),
    ]);
    return pair;
  }

  private emitProgress(): void {
    gameBus.emit('progress', {
      collected: this.collected,
      pairs: this.pairs,
      target: 10,
      phase: this.phase,
    });
  }
}
