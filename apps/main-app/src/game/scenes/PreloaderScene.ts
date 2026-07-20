import Phaser from 'phaser';

export class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('PreloaderScene');
    }

    preload() {
        // Display loading text/bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: 'Loading...',
            style: {
                font: '30px Arial',
                color: '#000000'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        // TODO: Load assets (images, audio) here later
    }

    create() {
        // Move to the next scene once loading is complete
        this.scene.start('MainMenuScene');
    }
}
