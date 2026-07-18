import Phaser from 'phaser';
import type { Avatar } from '../components/AvatarScreen';
import { KitchenScene } from './scenes/KitchenScene';
import { MealShapesScene } from './scenes/MealShapesScene';

export function createGame(parent: HTMLElement, avatar: Avatar, lessonId: string): Phaser.Game {
  const activeSceneClass = lessonId === 'family-meal-shapes' ? MealShapesScene : KitchenScene;

  return new Phaser.Game({
    type: Phaser.CANVAS,
    parent,
    width: 1280,
    height: 720,
    backgroundColor: '#fff3d4',
    transparent: false,
    physics: {
      default: 'arcade',
      arcade: { gravity: { x: 0, y: 0 }, debug: false },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1280,
      height: 720,
    },
    input: { activePointers: 3, touch: { capture: true } },
    render: { antialias: true, pixelArt: false, roundPixels: true },
    callbacks: {
      preBoot: (game) => {
        game.registry.set('avatar', avatar);
        game.registry.set('lessonId', lessonId);
      },
    },
    scene: [activeSceneClass],
  });
}
