import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Side from './Side';
import Result from '/components/Tabs/Result';
import { request } from '/functions';
const { render, useEffect, useState } = wp.element;
const { __ } = wp.i18n;

const App = () => {
	const [ sides, setSides ] = useState( [] );

	useEffect( () => {
		request( 'relationships-sides' ).then( setSides );
	}, [] );

	return (
		<Tabs forceRenderTabPanel={ true }>
			<TabList>
				<Tab>{ __( 'Settings', 'meta-box-builder' ) }</Tab>
				<Tab className="button button-small">{ __( 'Get PHP Code', 'meta-box-builder' ) }</Tab>
			</TabList>
			<TabPanel>
				{ sides.map( side => <Side key={ side.id } { ...side } /> ) }
			</TabPanel>
			<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
				<Result settings={ MbbApp.settings } endPoint="relationships-generate" />
			</TabPanel>
		</Tabs>
	);
};

render( <App />, document.getElementById( 'root' ) );