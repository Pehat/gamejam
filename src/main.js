define([
    'level.js'
], function (playLevel) {
    var levels = [
        'res/maps/level0.json',
        'res/maps/level3.json',
        'res/maps/level2.json'
    ];

    var modPlayer;

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

    var lvlCounter = document.querySelector('#lvlcounter');
    function playLevelWrap(levelIdx) {
        if (levelIdx === levels.length) {
            lvlCounter.innerHTML = 'You\'ve beaten the architecture!';
            lvlCounter.style.color = 'red';
            var winImg = new Image();
            winImg.src = 'res/win.png';
            document.body.appendChild(winImg);
            return;
        }
        lvlCounter.innerHTML = 'Level ' + (levelIdx + 1);
        
        playLevel(levels[levelIdx]).then(function () { playLevelWrap(levelIdx + 1); });
    }
    
    var startButton = document.querySelector('#startgame');
    function startGame() {
        startButton.remove();
        var gameContainer = document.querySelector('#game_container');
        gameContainer.style = 'visibility: visible';
        modPlayer = new ChiptuneJsPlayer();
        modPlayer.onInitialized(() => {
            modPlayer.load('res/music/theme.xm');
        });
        playLevelWrap(0);
    }
    startButton.addEventListener('click', startGame);
});
