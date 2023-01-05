import { render, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { AdminColumnsData } from './components/AdminColumnsData';
import { Data } from './components/Data';
import Codes from "./components/Tabs/Codes";
import Fields from './components/Tabs/Fields';
import Result from './components/Tabs/Result';
import Settings from './components/Tabs/Settings';
import { getSettings } from './functions';

const App = () => {
	const settings = getSettings();
	const forceValidate = () => document.querySelector( '#post' ).removeAttribute( 'novalidate' );
	useEffect( () => {
		const publishButton = document.querySelector( '#publish' );
		const saveButton = document.querySelector( '#save-post' );
		if ( publishButton ) {
			publishButton.addEventListener( 'click', forceValidate );
		}
		if ( saveButton ) {
			saveButton.addEventListener( 'click', forceValidate );
		}

		// Don't submit form when press Enter.
		jQuery( '#post' ).on( 'keypress keydown keyup', 'input', function( e ) {
			if ( e.keyCode == 13 ) {
				e.preventDefault();
			}
		} );
	}, [] );

	return (
		<>
			<Tabs forceRenderTabPanel={ true }>
				<TabList>
					<Tab>{ __( 'Fields', 'meta-box-builder' ) }</Tab>
					<Tab>{ __( 'Settings', 'meta-box-builder' ) }</Tab>
					<Tab className="button button-small">{ __( 'Get PHP Code', 'meta-box-builder' ) }</Tab>
				</TabList>
				<TabPanel>
					<Fields fields={ MbbApp.fields } />
				</TabPanel>
				<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
					<Settings />
				</TabPanel>
				<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
					<Result endPoint="generate" />
				</TabPanel>
			</Tabs>
			<Data />
			<AdminColumnsData />
			<br />
			{
				MbbApp.fields.length > 0 &&
				<div className="postbox og-theme-code">
					<div className="postbox-header">
						<h2 className="hndle ui-sortable-handle">{ __( "Theme code", "meta-box-builder" ) }</h2>
					</div>
					<div className="inside">
						<Codes
							settings={ settings }
							fields={ MbbApp.fields }
						/>
					</div>
				</div>
			}
		</>
	);
};

render( <App />, document.getElementById( 'root' ) );