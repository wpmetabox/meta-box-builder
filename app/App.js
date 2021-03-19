import dotProp from 'dot-prop';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { AdminColumnsData } from './components/AdminColumnsData';
import { Data } from './components/Data';
import Fields from './components/Tabs/Fields';
import Result from './components/Tabs/Result';
import Settings from './components/Tabs/Settings';
import { FieldIdsProvider } from './contexts/FieldIdsContext';
import { FieldsDataProvider } from './contexts/FieldsDataContext';
import { SettingsDataProvider } from './contexts/SettingsDataContext';
import { parseQueryString } from './functions';
const { __ } = wp.i18n;
const { render, useEffect, useState } = wp.element;

const urlParams = parseQueryString( window.location.search );
const settings = { ...dotProp.get( MbbApp, 'settings', {} ), ...urlParams.settings };

const App = ( { settings } ) => {
	const [ tabIndex, setTabIndex ] = useState( dotProp.get( MbbApp, 'data.tab_index', 0 ) );

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
	}, [] );

	return (
		<FieldsDataProvider>
			<FieldIdsProvider>
				<SettingsDataProvider>
					<Tabs forceRenderTabPanel={ true } defaultIndex={ dotProp.get( MbbApp, 'data.tab_index', 0 ) } onSelect={ setTabIndex }>
						<TabList>
							<Tab>{ __( 'Fields', 'meta-box-builder' ) }</Tab>
							<Tab>{ __( 'Settings', 'meta-box-builder' ) }</Tab>
							<Tab className="button button-small">{ __( 'Get PHP Code', 'meta-box-builder' ) }</Tab>
						</TabList>
						<TabPanel>
							<Fields fields={ dotProp.get( MbbApp, 'fields', {} ) } />
						</TabPanel>
						<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
							<Settings settings={ settings } />
						</TabPanel>
						<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
							<Result settings={ settings } endPoint="generate" />
						</TabPanel>
					</Tabs>
					<Data />
					<AdminColumnsData />
					<input type="hidden" name="data[tab_index]" defaultValue={ tabIndex } />
				</SettingsDataProvider>
			</FieldIdsProvider>
		</FieldsDataProvider>
	);
};

render( <App settings={ settings } />, document.getElementById( 'root' ) );