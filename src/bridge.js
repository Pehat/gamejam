export const bridge = await new Promise((resolve) => {
    require(
        [
            'jsiso/canvas/Control',
            'jsiso/canvas/Input',
            'jsiso/json/load',
            'jsiso/img/load',
            'jsiso/tile/Field'
        ],
        (
            CanvasControl,
            InputControl,
            jsonLoad,
            imgLoad,
            TileField
        ) => {
            resolve({
                CanvasControl: CanvasControl,
                InputControl: InputControl,
                jsonLoad: jsonLoad,
                imgLoad: imgLoad,
                TileField: TileField
            });
        });
});