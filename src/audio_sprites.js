export class AudioSprites {
    constructor(url, sprites) {
        this.url = url;
        this.sprites = sprites;
        this.context = new window.AudioContext();
        this.buffer = null;
        this.is_muted = false;
    }

    async load() {
        const response = await fetch(this.url);
        const arrayBuffer = await response.arrayBuffer();
        this.buffer = await this.context.decodeAudioData(arrayBuffer);
    }

    mute() { this.is_muted = true; }
    unmute() { this.is_muted = false; }

    play(name) {
        if (this.is_muted || !this.buffer || !this.sprites[name]) return;

        const [start, duration] = this.sprites[name];
        const source = this.context.createBufferSource();
        source.buffer = this.buffer;
        source.connect(this.context.destination);

        source.start(0, start / 1000, duration / 1000);
    }
}