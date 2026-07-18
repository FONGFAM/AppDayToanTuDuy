import Phaser from 'phaser';

export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const titleText = this.add.text(width / 2, height / 3, 'Bản Đồ Trưởng Thành', {
            fontSize: '48px',
            color: '#ff9900',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const startButton = this.add.text(width / 2, height / 2, '[ VÀO BÀI 2: BỮA CƠM GIA ĐÌNH ]', {
            fontSize: '32px',
            color: '#00cc00',
            backgroundColor: '#ffffff',
            padding: { x: 10, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        startButton.on('pointerdown', () => {
            this.scene.start('GameplayScene');
        });
    }
}
