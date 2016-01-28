var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: "./scripts/example.js",
    output: {
        path: __dirname,
        filename: "./index.js"
    },
    module: {
        loaders: [
            {test: /\.js$/,  
              exclude: /node_modules/,
              loader: 'jsx-loader?harmony'},
            {
                // test: /\.css$/,
                // loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                test: /\.css$/, loader: "style!css"
            },
            { test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass")}
           
        ]
    },
    plugins: [
    new ExtractTextPlugin("index.css")
  ]
}