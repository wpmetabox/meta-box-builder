const path = require( "path" );
const webpack = require( 'webpack' );

// https://www.cssigniter.com/how-to-use-external-react-components-in-your-gutenberg-blocks/
const externals = {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'codemirror': 'wp.CodeMirror',
    'clipboard': 'ClipboardJS',
};

module.exports = {
    entry: "./app/App.js",
    output: {
        path: path.join( __dirname, "assets/js" ),
        filename: "app.js"
    },
    externals,
    module: {
        rules: [ {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [ '@babel/preset-react', '@babel/preset-env' ],
                    plugins: [ '@babel/plugin-transform-runtime' ]
                }
            }
        } ]
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin( {
            maxChunks: 1
        } ),
    ]
};