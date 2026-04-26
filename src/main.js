import { playLevel } from './level.js';
import { ChiptuneJsPlayer } from 'https://DrSnuggles.github.io/chiptune/chiptune3.js';
import { AudioSprites } from  './audio_sprites.js';

function main() {
    var levels = [
        'res/maps/level0.json',
        'res/maps/level3.json',
        'res/maps/level2.json'
    ];

    var modPlayer;
    var audioSprites;

    async function loadAudioSprites() {
        if (audioSprites) {
            return;
        }
        audioSprites = new AudioSprites(
              'res/sound/sprites.wav',
              {
                xray: [0, 630],
                wall: [642, 45],
                step: [694, 47],
                done: [741, 665],
                button: [1405, 475]
              });
        await audioSprites.load();
    }

    window.toggleSound = function() {
        if (!audioSprites) {
            return;
        }
        var isSound = document.querySelector('#sound_toggle').checked;
        if (!isSound) {
            audioSprites.mute();
        } else {
            audioSprites.unmute();
        }
    }

    window.togglePlayer = function() {
        if (!modPlayer) {
            return;
        }
        var isMusic = document.querySelector('#music_toggle').checked;
        if (!isMusic) {
            modPlayer.pause();
        } else {
            modPlayer.unpause();
        }
    };
    
    window.toggleMenu = function() {
        var menu_toggle = document.querySelector("#menu");
        menu.classList.toggle('invisible');
    }
    
    var lvlCounter = document.querySelector('#lvlcounter');

    async function playLevelWrap(levelIdx) {
        lvlCounter.innerHTML = 'Level ' + (levelIdx + 1);
        await playLevel(levels[levelIdx], audioSprites);
    }
    
    var startButton = document.querySelector('#startgame');
    async function startGame() {
        var splash = document.querySelector('#splash');
        splash.remove();

        modPlayer = new ChiptuneJsPlayer();
        modPlayer.onInitialized(() => {
            modPlayer.load('res/music/theme.xm');
        });
        await loadAudioSprites();
        for (var levelIdx = 0; levelIdx < levels.length; ++levelIdx) {
            await playLevelWrap(levelIdx);
        }

        lvlCounter.innerHTML = 'You\'ve beaten the architecture!';
        lvlCounter.style.color = 'red';
        var winImg = new Image();
        winImg.src = 'res/win.png';
        document.body.appendChild(winImg);
    }
    startButton.addEventListener('click', startGame);
};

main();