// Import the original config from the @wordpress/scripts package.
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const path = require( 'path' );

const externals = {
	...defaultConfig.externals,
	'jquery': 'jQuery',
	'jquery-ui': 'jQuery',
	codemirror: 'wp.CodeMirror',
	clipboard: 'ClipboardJS',
};

const createConfig = ( entry, filename, uniqueName ) => ( {
	...defaultConfig,
	entry,
	output: {
		path: path.resolve( path.dirname( filename ) ),
		filename: path.basename( filename ),
		// Keep cache-busting that @wordpress/scripts sets by default.
		// Overriding `output` without this leaves chunks as bare `5771.app.js`,
		// so browsers can pair a new app.js with a stale chunk after upgrades.
		chunkFilename: '[id].app.js?ver=[chunkhash]',
		uniqueName,
		clean: true,
	},
	externals,
} );

module.exports = [
	createConfig( './assets/app/App.js', 'assets/build/app.js', 'mbb-app' ),
	createConfig( './src/Extensions/SettingsPage/app/App.js', 'src/Extensions/SettingsPage/build/settings-page.js', 'mbb-settings-page' ),
	createConfig( './src/Extensions/Relationships/app/App.js', 'src/Extensions/Relationships/build/relationships.js', 'mbb-relationships' ),
	createConfig( './src/Extensions/CustomModel/app/App.js', 'src/Extensions/CustomModel/build/custom-model.js', 'mbb-custom-model' ),
];
