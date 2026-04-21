export class AudioSprites {
    constructor(url, sprites) {
        this.url = url;
        this.sprites = sprites;
        this.context = new window.AudioContext();
        this.buffer = null;
    }

    async load() {
        const response = await fetch(this.url);
        const arrayBuffer = await response.arrayBuffer();
        this.buffer = await this.context.decodeAudioData(arrayBuffer);
    }

    play(name) {
        if (!this.buffer || !this.sprites[name]) return;

        const [start, duration] = this.sprites[name];
        const source = this.context.createBufferSource();
        source.buffer = this.buffer;
        source.connect(this.context.destination);

        source.start(0, start / 1000, duration / 1000);
    }
}