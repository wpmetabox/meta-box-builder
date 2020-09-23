const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')

// https://www.cssigniter.com/how-to-use-external-react-components-in-your-gutenberg-blocks/
const externals = {
	'react': 'React',
	'react-dom': 'ReactDOM',
	'codemirror': 'wp.CodeMirror',
	'clipboard': 'ClipboardJS',
};

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/build"),
        filename: "bundle.min.js"
    },
    externals,
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract(
                {
                    fallback: 'style-loader',
                    use: ['css-loader']
                }
            )
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader'
                }
            ]
        }
        ]
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
          }),
        new HtmlWebPackPlugin({
            hash: true,
            filename: "index.html",  //target html
            template: "./public/index.html" //source html
        }),
        new ExtractTextPlugin({ filename: 'css/style.css' }),
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "static/css/bundle.min.css",
        }),
    ]
}