const inspectBabelLoader = function (source) {
    if (this.resourcePath.includes('src/index.jsx')) {
        console.log(source);
    }
    return source;
};

module.exports = inspectBabelLoader;