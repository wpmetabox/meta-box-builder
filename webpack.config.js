// Import the original config from the @wordpress/scripts package.
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const path = require( 'path' );
const webpack = require( 'webpack' );

const externals = {
	...defaultConfig.externals,
	codemirror: 'wp.CodeMirror',
	clipboard: 'ClipboardJS',
};

const resolve = {
	roots: [ path.resolve( 'app' ) ]
};

// Main Meta Box Builder app.
const main = {
	...defaultConfig,
	externals,
	resolve,
	entry: './app/App.js',
	output: {
		path: path.resolve( __dirname, 'assets/js/build' ),
		filename: 'app.js'
	},
};

// Settings page app.
const settingsPage = {
	...defaultConfig,
	externals,
	resolve,
	entry: './modules/settings-page/app/App.js',
	output: {
		path: path.resolve( 'modules/settings-page/assets' ),
		filename: 'settings-page.js'
	},
};

// Relationships app.
const relationships = {
	...defaultConfig,
	externals,
	resolve,
	entry: './modules/relationships/app/App.js',
	output: {
		path: path.resolve( 'modules/relationships/assets' ),
		filename: 'relationships.js'
	},
};

module.exports = [ main ];
// module.exports = [ main, settingsPage, relationships ];