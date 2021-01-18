const path = require( 'path' );
const webpack = require( 'webpack' );

// https://www.cssigniter.com/how-to-use-external-react-components-in-your-gutenberg-blocks/
const externals = {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'codemirror': 'wp.CodeMirror',
    'clipboard': 'ClipboardJS',
};

const commonModules = {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: [ '@babel/plugin-transform-react-jsx' ]
                }
            }
        },
    ]
};

// Main Meta Box Builder app.
const main = {
    entry: './app/App.js',
    output: {
        path: path.join( __dirname, 'assets/js' ),
        filename: 'app.js'
    },
    externals,
    module: commonModules,
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin( {
            maxChunks: 1
        } ),
    ]
};

// Settings page app.
const settingsPage = {
    entry: './modules/settings-page/app/App.js',
    output: {
        path: path.resolve( __dirname, './modules/settings-page/assets' ),
        filename: 'settings-page.js'
    },
    externals,
    module: commonModules
};

module.exports = [ main, settingsPage ];