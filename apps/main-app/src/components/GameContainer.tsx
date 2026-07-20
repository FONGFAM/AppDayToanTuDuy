import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { gameConfig } from '../game/config';

const GameContainer: React.FC = () => {
    const gameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        // Initialize Phaser Game only once when component mounts
        if (!gameRef.current) {
            gameRef.current = new Phaser.Game(gameConfig);
        }

        return () => {
            // Cleanup Phaser instance when React component unmounts
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, []);

    return (
        <div 
            id="phaser-game-container" 
            style={{ 
                width: '100%', 
                height: '100vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: '#e0e0e0' 
            }}
        />
    );
};

export default GameContainer;
