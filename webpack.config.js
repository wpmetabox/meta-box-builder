// Import the original config from the @wordpress/scripts package.
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const path = require( 'path' );
const webpack = require( 'webpack' );

const externals = {
	...defaultConfig.externals,
	'jquery': 'jQuery',
	'jquery-ui': 'jQuery',
	codemirror: 'wp.CodeMirror',
	clipboard: 'ClipboardJS',
};

const resolve = {
	roots: [ path.resolve( 'app' ) ]
};

// Main Meta Box Builder app.
const main = {
	...defaultConfig,
	entry: './app/App.js',
	output: {
		path: path.resolve( 'assets/js/build' ),
		filename: 'app.js'
	},
	externals,
	resolve,
};

// Settings page app.
const settingsPage = {
	...defaultConfig,
	entry: './src/Extensions/SettingsPage/app/App.js',
	output: {
		path: path.resolve( 'src/Extensions/SettingsPage/build' ),
		filename: 'settings-page.js'
	},
	externals,
	resolve,
};

// Relationships app.
const relationships = {
	...defaultConfig,
	entry: './modules/relationships/app/App.js',
	output: {
		path: path.resolve( 'modules/relationships/assets' ),
		filename: 'relationships.js'
	},
	externals,
	resolve,
};

module.exports = [ main ];
// module.exports = [ main, settingsPage, relationships ];