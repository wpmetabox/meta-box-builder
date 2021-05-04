import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Content from './Content';
import Result from '/components/Tabs/Result';
const { render, useEffect } = wp.element;
const { __ } = wp.i18n;

const App = () => {
	useEffect( () => {
		// Don't submit form when press Enter.
		jQuery( '#post' ).on( 'keypress keydown keyup', function( e ) {
			if ( e.keyCode == 13 ) {
				e.preventDefault();
			}
		} );
	} );

	return (
		<Tabs forceRenderTabPanel={ true }>
			<TabList>
				<Tab>{ __( 'Settings', 'meta-box-builder' ) }</Tab>
				<Tab className="button button-small">{ __( 'Get PHP Code', 'meta-box-builder' ) }</Tab>
			</TabList>
			<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
				<Content />
			</TabPanel>
			<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
				<Result settings={ MbbApp.settings } endPoint="settings-page-generate" />
			</TabPanel>
		</Tabs>
	);
};

render( <App />, document.getElementById( 'root' ) );