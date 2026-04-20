export function pathResolve(file, baseFile) {
    return baseFile.split('/').slice(0, -1).concat(file).join('/');
};