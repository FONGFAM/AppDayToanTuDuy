import Phaser from 'phaser';

export class GameplayScene extends Phaser.Scene {
    constructor() {
        super('GameplayScene');
    }

    create() {
        const width = this.cameras.main.width;
        
        this.add.text(width / 2, 50, 'Bài 2: Bữa cơm gia đình', {
            fontSize: '36px',
            color: '#333333'
        }).setOrigin(0.5);

        this.add.text(width / 2, 120, 'Prototype: Kéo thả và Nhận diện Hình khối', {
            fontSize: '24px',
            color: '#666666'
        }).setOrigin(0.5);

        // TODO: Implement drag and drop logic from Kichban_Bai2_BuaComGiaDinh.md
        
        // Temporary back button
        const backBtn = this.add.text(50, 50, '<- Quay lại', {
            fontSize: '20px',
            color: '#0000ff'
        }).setInteractive({ useHandCursor: true });

        backBtn.on('pointerdown', () => {
            this.scene.start('MainMenuScene');
        });
    }
}
