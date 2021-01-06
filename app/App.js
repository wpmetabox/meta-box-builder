import dotProp from 'dot-prop';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Data } from './components/Data';
import Fields from './components/Tabs/Fields';
import Result from './components/Tabs/Result';
import Settings from './components/Tabs/Settings';
import { FieldControlsProvider } from './contexts/FieldControlsContext';
import { FieldIdsProvider } from './contexts/FieldIdsContext';
const { __ } = wp.i18n;
const { render, useEffect, useState } = wp.element;

const App = () => {
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
		<FieldControlsProvider>
			<FieldIdsProvider>
				<Tabs forceRenderTabPanel={ true } selectedIndex={ tabIndex } onSelect={ index => setTabIndex( index ) }>
					<TabList>
						<Tab>{ __( 'Fields', 'meta-box-builder' ) }</Tab>
						<Tab>{ __( 'Settings', 'meta-box-builder' ) }</Tab>
						<Tab className="button button-small">{ __( 'Get PHP Code', 'meta-box-builder' ) }</Tab>
					</TabList>
					<TabPanel>
						<Fields fields={ dotProp.get( MbbApp, 'fields', {} ) } />
					</TabPanel>
					<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
						<Settings defaultValues={ dotProp.get( MbbApp, 'settings', {} ) } />
					</TabPanel>
					<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
						<Result defaultValues={ dotProp.get( MbbApp, 'settings', {} ) } />
					</TabPanel>
				</Tabs>
				<Data />
				<input type="hidden" name="data[tab_index]" defaultValue={ tabIndex } />
			</FieldIdsProvider>
		</FieldControlsProvider>
	);
};

render( <App />, document.getElementById( 'root' ) );