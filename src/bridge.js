export const bridge = await new Promise((resolve) => {
    require(
        [
            'jsiso/canvas/Control',
            'jsiso/canvas/Input',
            'jsiso/json/load',
            'jsiso/img/load',
            'jsiso/tile/Field',
            'util/clamp',
            'util/pathResolve'
        ],
        (
            CanvasControl,
            InputControl,
            jsonLoad,
            imgLoad,
            TileField,
            clamp,
            pathResolve
        ) => {
            resolve({
                CanvasControl: CanvasControl,
                InputControl: InputControl,
                jsonLoad: jsonLoad,
                imgLoad: imgLoad,
                TileField: TileField,
                clamp: clamp,
                pathResolve: pathResolve
            });
        });
});