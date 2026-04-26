export const bridge = await new Promise((resolve) => {
    require(
        [
            'jsiso/json/load',
            'jsiso/img/load',
            'jsiso/tile/Field'
        ],
        (
            jsonLoad,
            imgLoad,
            TileField
        ) => {
            resolve({
                jsonLoad: jsonLoad,
                imgLoad: imgLoad,
                TileField: TileField
            });
        });
});