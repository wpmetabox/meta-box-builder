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

// Main Meta Box Builder app.
const main = {
	...defaultConfig,
	entry: './assets/app/App.js',
	output: {
		path: path.resolve( 'assets/build' ),
		filename: 'app.js'
	},
	externals,
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
};

// Relationships app.
const relationships = {
	...defaultConfig,
	entry: './src/Extensions/Relationships/app/App.js',
	output: {
		path: path.resolve( 'src/Extensions/Relationships/build' ),
		filename: 'relationships.js'
	},
	externals,
};

// module.exports = [ main, settingsPage, relationships ];
module.exports = [ main ];