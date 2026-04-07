define([
    'level.js',
    'chiptune2/chiptune2'
], function (playLevel) {
    var levels = [
        'res/maps/level0.json',
        'res/maps/level3.json',
        'res/maps/level2.json'
    ];

    var modPlayer;
    var modTimeout;
    var isMusic;

    function loopPlayer() {
        if (!modPlayer) {
            return;
        }
        modPlayer.load('res/music/theme.xm', function(buffer) {
            modPlayer.play(buffer);
            modPlayer.togglePause(buffer);
            modTimeout = setTimeout(loopPlayer, 1000 * modPlayer.duration());
            modPlayer.play(buffer);
        });
    }

    window.togglePlayer = function() {
        if (!modPlayer) {
            return;
        }
        isMusic = document.querySelector('#music_toggle').checked;
        if (!isMusic) {
            modPlayer.stop();
            clearTimeout(modTimeout);
        } else {
            loopPlayer();
        }
    }

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
        
        modPlayer = new ChiptuneJsPlayer(new ChiptuneJsConfig(1));
        isMusic = document.querySelector('#music_toggle').checked;
        loopPlayer();
        playLevelWrap(0);
    }
    startButton.addEventListener('click', startGame);
});
