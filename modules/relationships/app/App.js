import dotProp from 'dot-prop';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Side from './Side';
import { AdminColumnsData } from '/components/AdminColumnsData';
import Result from '/components/Tabs/Result';
import Checkbox from '/controls/Checkbox';
import { get } from '/functions';
const { render, useEffect, useState } = wp.element;
const { __ } = wp.i18n;

const App = () => {
	useEffect( () => {
		// Don't submit form when press Enter.
		jQuery( '#post' ).on( 'keypress keydown keyup', 'input', function( e ) {
			if ( e.keyCode == 13 ) {
				e.preventDefault();
			}
		} );
	}, [] );

	const sides = get( 'relationships-sides' ) || [];

	return (
		<>
			<Tabs forceRenderTabPanel={ true }>
				<TabList>
					<Tab>{ __( 'Settings', 'meta-box-builder' ) }</Tab>
					<Tab className="button button-small">{ __( 'Get PHP Code', 'meta-box-builder' ) }</Tab>
				</TabList>
				<TabPanel>
					<Checkbox
						name="settings[reciprocal]"
						componentId="settings-reciprocal"
						label={ __( 'Reciprocal relationship' ) }
						defaultValue={ dotProp.get( MbbApp.settings, 'reciprocal', false ) }
						className="relationships-plain"
					/>
					{ sides.map( side => <Side key={ side.id } { ...side } /> ) }
				</TabPanel>
				<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
					<Result settings={ MbbApp.settings } endPoint="relationships-generate" />
				</TabPanel>
			</Tabs>
			<AdminColumnsData />
		</>
	);
};

render( <App />, document.getElementById( 'root' ) );