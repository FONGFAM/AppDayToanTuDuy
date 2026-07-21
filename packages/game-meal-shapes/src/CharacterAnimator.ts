import Phaser from "phaser";

export interface CharacterPartKeys {
  head?: string;
  body?: string;
  armLeft?: string;
  armRight?: string;
  legLeft?: string;
  legRight?: string;
}

export interface CharacterAnimatorOptions {
  x: number;
  y: number;
  scale?: number;
  depth?: number;
  partKeys?: CharacterPartKeys;
}

export class CharacterAnimator {
  public container: Phaser.GameObjects.Container;
  private scene: Phaser.Scene;
  private tweens: Phaser.Tweens.Tween[] = [];
  
  private head!: Phaser.GameObjects.GameObject;
  private body!: Phaser.GameObjects.GameObject;
  private armLeft!: Phaser.GameObjects.GameObject;
  private armRight!: Phaser.GameObjects.GameObject;
  private legLeft!: Phaser.GameObjects.GameObject;
  private legRight!: Phaser.GameObjects.GameObject;

  private speechBubble?: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene, options: CharacterAnimatorOptions) {
    this.scene = scene;
    this.container = scene.add.container(options.x, options.y);
    if (options.depth !== undefined) this.container.setDepth(options.depth);

    this.buildParts(options.partKeys);

    const targetScale = options.scale ?? 0.5;
    this.container.setScale(0);
    this.scene.tweens.add({
      targets: this.container,
      scale: targetScale,
      duration: 600,
      ease: "Back.out"
    });

    this.play("breathe");
  }

  private buildParts(keys?: CharacterPartKeys): void {
    const hasTexture = (key?: string) => key && this.scene.textures.exists(key);

    if (keys && hasTexture(keys.body)) {
      this.body = this.scene.add.image(0, 0, keys.body!);
      this.head = this.scene.add.image(0, -320, keys.head || keys.body!);
      this.legLeft = this.scene.add.image(-90, 320, keys.legLeft || keys.body!);
      this.legRight = this.scene.add.image(90, 320, keys.legRight || keys.body!);
      
      const aLeft = this.scene.add.image(-170, -100, keys.armLeft || keys.body!);
      aLeft.setOrigin(0.8, 0.2);
      this.armLeft = aLeft;

      const aRight = this.scene.add.image(170, -100, keys.armRight || keys.body!);
      aRight.setOrigin(0.2, 0.2);
      this.armRight = aRight;

      (this.head as Phaser.GameObjects.Image).setOrigin(0.5, 0.9);
      (this.head as Phaser.GameObjects.Image).y += (this.head as Phaser.GameObjects.Image).height * 0.4;
    } else {
      const b = this.scene.add.rectangle(0, 0, 100, 120, 0x93e1d8).setStrokeStyle(6, 0x2b2d42);
      const neck = this.scene.add.rectangle(0, -60, 30, 40, 0xffd6ba).setStrokeStyle(6, 0x2b2d42);
      
      const headCont = this.scene.add.container(0, -90);
      const headEllipse = this.scene.add.ellipse(0, 0, 140, 120, 0xffd6ba).setStrokeStyle(6, 0x2b2d42);
      const eyeL = this.scene.add.circle(-25, -10, 8, 0x2b2d42);
      const eyeR = this.scene.add.circle(25, -10, 8, 0x2b2d42);
      const mouth = this.scene.add.arc(0, 15, 15, 0, 180, false, 0x2b2d42).setStrokeStyle(4, 0x2b2d42);
      headCont.add([headEllipse, eyeL, eyeR, mouth]);

      const aLeftCont = this.scene.add.container(-60, -40);
      const aLeftRect = this.scene.add.rectangle(0, 40, 35, 100, 0xffd6ba).setStrokeStyle(6, 0x2b2d42);
      aLeftCont.add(aLeftRect);

      const aRightCont = this.scene.add.container(60, -40);
      const aRightRect = this.scene.add.rectangle(0, 40, 35, 100, 0xffd6ba).setStrokeStyle(6, 0x2b2d42);
      const sleeve = this.scene.add.rectangle(0, 10, 40, 45, 0x93e1d8).setStrokeStyle(6, 0x2b2d42);
      aRightCont.add([aRightRect, sleeve]);

      const lL = this.scene.add.rectangle(-25, 80, 35, 80, 0x5c3a21).setStrokeStyle(6, 0x2b2d42);
      const lR = this.scene.add.rectangle(25, 80, 35, 80, 0x5c3a21).setStrokeStyle(6, 0x2b2d42);

      this.body = b;
      this.head = headCont;
      this.armLeft = aLeftCont;
      this.armRight = aRightCont;
      this.legLeft = lL;
      this.legRight = lR;

      this.container.add([neck]);
    }

    this.container.add([
      this.armLeft,
      this.legLeft,
      this.legRight,
      this.body,
      this.head,
      this.armRight
    ]);
  }

  public stopTweens(): void {
    this.tweens.forEach(t => t.stop());
    this.tweens = [];
  }

  public play(animName: "idle" | "breathe" | "wave" | "nod" | "shake" | "cheer" | "walk"): void {
    this.stopTweens();

    if (animName === "breathe" || animName === "idle") {
      const breatheBody = this.scene.tweens.add({
        targets: [this.body, this.armLeft, this.armRight, this.legLeft, this.legRight],
        y: "+=5",
        duration: 1400,
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut"
      });
      const breatheHead = this.scene.tweens.add({
        targets: this.head,
        y: "+=8",
        duration: 1400,
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut"
      });
      this.tweens.push(breatheBody, breatheHead);

      if (animName === "idle") {
        const headTilt = this.scene.tweens.add({
          targets: this.head,
          angle: { from: -3, to: 3 },
          duration: 2200,
          yoyo: true,
          repeat: -1,
          ease: "Sine.inOut"
        });
        this.tweens.push(headTilt);
      }
    } else if (animName === "wave") {
      this.play("breathe");
      const waveArm = this.scene.tweens.add({
        targets: this.armRight,
        angle: { from: -10, to: 100 },
        duration: 700,
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut"
      });
      this.tweens.push(waveArm);
    } else if (animName === "nod") {
      this.play("breathe");
      const nodHead = this.scene.tweens.add({
        targets: this.head,
        angle: { from: 0, to: 12 },
        duration: 350,
        yoyo: true,
        repeat: 3,
        ease: "Quad.inOut"
      });
      this.tweens.push(nodHead);
    } else if (animName === "shake") {
      const shakeHead = this.scene.tweens.add({
        targets: this.head,
        angle: { from: -15, to: 15 },
        duration: 250,
        yoyo: true,
        repeat: 3,
        ease: "Quad.inOut"
      });
      this.tweens.push(shakeHead);
    } else if (animName === "cheer") {
      const cheerJump = this.scene.tweens.add({
        targets: this.container,
        y: "-=40",
        duration: 400,
        yoyo: true,
        repeat: -1,
        ease: "Sine.out"
      });
      const cheerArmR = this.scene.tweens.add({
        targets: this.armRight,
        angle: 120,
        duration: 300,
        ease: "Back.out"
      });
      const cheerArmL = this.scene.tweens.add({
        targets: this.armLeft,
        angle: -120,
        duration: 300,
        ease: "Back.out"
      });
      this.tweens.push(cheerJump, cheerArmR, cheerArmL);
    } else if (animName === "walk") {
      const legLMove = this.scene.tweens.add({
        targets: this.legLeft,
        angle: { from: -20, to: 20 },
        duration: 400,
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut"
      });
      const legRMove = this.scene.tweens.add({
        targets: this.legRight,
        angle: { from: 20, to: -20 },
        duration: 400,
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut"
      });
      const bodyBob = this.scene.tweens.add({
        targets: this.container,
        y: "+=10",
        duration: 200,
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut"
      });
      this.tweens.push(legLMove, legRMove, bodyBob);
    }
  }

  public say(text: string, duration: number = 3000): Promise<void> {
    if (this.speechBubble) {
      this.speechBubble.destroy();
    }

    const bubbleContainer = this.scene.add.container(0, -220);
    
    const textObj = this.scene.add.text(0, 0, text, {
      fontFamily: "iruKaEdu",
      fontSize: "22px",
      color: "#2b2d42",
      align: "center",
      wordWrap: { width: 220 }
    }).setOrigin(0.5);

    const bounds = textObj.getBounds();
    const bgWidth = Math.max(bounds.width + 30, 100);
    const bgHeight = bounds.height + 20;

    const bg = this.scene.add.graphics();
    bg.fillStyle(0xffffff, 0.95);
    bg.lineStyle(4, 0x2b2d42, 1);
    bg.fillRoundedRect(-bgWidth / 2, -bgHeight / 2, bgWidth, bgHeight, 16);
    bg.strokeRoundedRect(-bgWidth / 2, -bgHeight / 2, bgWidth, bgHeight, 16);

    bg.fillStyle(0xffffff, 0.95);
    bg.fillTriangle(-10, bgHeight / 2, 10, bgHeight / 2, 0, bgHeight / 2 + 12);
    bg.lineStyle(4, 0x2b2d42, 1);
    bg.strokeLineShape(new Phaser.Geom.Line(-10, bgHeight / 2, 0, bgHeight / 2 + 12));
    bg.strokeLineShape(new Phaser.Geom.Line(10, bgHeight / 2, 0, bgHeight / 2 + 12));

    bubbleContainer.add([bg, textObj]);
    bubbleContainer.setScale(0);
    this.container.add(bubbleContainer);
    this.speechBubble = bubbleContainer;

    this.scene.tweens.add({
      targets: bubbleContainer,
      scale: 1,
      duration: 300,
      ease: "Back.out"
    });

    return new Promise((resolve) => {
      this.scene.time.delayedCall(duration, () => {
        if (this.speechBubble) {
          this.scene.tweens.add({
            targets: this.speechBubble,
            scale: 0,
            duration: 200,
            onComplete: () => {
              this.speechBubble?.destroy();
              this.speechBubble = undefined;
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    });
  }

  public moveTo(x: number, y: number, duration: number = 2000): Promise<void> {
    this.play("walk");
    return new Promise((resolve) => {
      this.scene.tweens.add({
        targets: this.container,
        x,
        y,
        duration,
        ease: "Linear",
        onComplete: () => {
          this.play("idle");
          resolve();
        }
      });
    });
  }

  public destroy(): void {
    this.stopTweens();
    this.container.destroy();
  }
}
