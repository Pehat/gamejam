export const bridge = await new Promise((resolve) => {
    require(
        [
            'jsiso/canvas/Control',
            'jsiso/json/load',
            'jsiso/img/load',
            'jsiso/tile/Field'
        ],
        (
            CanvasControl,
            jsonLoad,
            imgLoad,
            TileField
        ) => {
            resolve({
                CanvasControl: CanvasControl,
                jsonLoad: jsonLoad,
                imgLoad: imgLoad,
                TileField: TileField
            });
        });
});