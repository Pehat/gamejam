const INPUT_MAP = {
    keyboard: {
        'ArrowUp': 'UP',
        'ArrowDown': 'DOWN',
        'ArrowLeft': 'LEFT',
        'ArrowRight': 'RIGHT',
        'KeyZ': 'TELEPORT_UP',
        'KeyX': 'TELEPORT_DOWN'
    },
    gamepad: {
        11: 'UP',
        12: 'DOWN',
        13: 'LEFT',
        14: 'RIGHT',
        0: 'TELEPORT_UP',
        1: 'TELEPORT_DOWN'
    }
};

var input_state = {
    'UP': false,
    'DOWN': false,
    'LEFT': false,
    'RIGHT': false,
    'TELEPORT_UP': false,
    'TELEPORT_DOWN': false
};

var actions_handler = null;

function keyDownListener(e) {
    const action = INPUT_MAP.keyboard[e.code];
    if (action && actions_handler) actions_handler(action);
}

export function registerKeyboardHandler(canvas) {
    canvas.addEventListener('keydown', keyDownListener);
}

export function unregisterKeyboardHandler(canvas) {
    canvas.removeEventListener('keydown', keyDownListener);
}

export function registerGamepadHandler(canvas) {
    // TODO: implement
}

function pointerDownListener(e) {
    const key = e.target.getAttribute('data-key');
    if (key) {
        e.preventDefault();
        const action = INPUT_MAP.keyboard[e.code];
        if (action && actions_handler) actions_handler(action);
    }
}

export function registerTouchHandler(ui_layer) {
    ui_layer.addEventListener('pointerdown', pointerDownListener);
}

export function unregisterTouchHandler(ui_layer) {
    ui_layer.removeEventListener('pointerdown', pointerDownListener);
}

export function registerActionsHandler(handler) { actions_handler = handler; }
export function getCurrentInputState() { return input_state; }

