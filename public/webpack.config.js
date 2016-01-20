module.exports = {
    entry: "./script/example.js",
    output: {
        path: __dirname,
        filename: "./index.js"
    },
    module: {
        loaders: [
            { test: /\.scss$/, loader: "style!css!sass" }
        ]
    }
};