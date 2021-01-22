import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Result from './Result';
import Side from './Side';
import { request } from '/functions';
const { render, useEffect, useState } = wp.element;
const { __ } = wp.i18n;

const App = () => {
	const [ sides, setSides ] = useState( [] );
	const [ tabIndex, setTabIndex ] = useState( false );

	useEffect( () => {
		request( 'relationships-sides' ).then( setSides );
	}, [] );

	return (
		<Tabs forceRenderTabPanel={ true } onSelect={ setTabIndex }>
			<TabList>
				<Tab>{ __( 'Settings', 'meta-box-builder' ) }</Tab>
				<Tab className="button button-small">{ __( 'Get PHP Code', 'meta-box-builder' ) }</Tab>
			</TabList>
			<TabPanel>
				{ sides.map( side => <Side key={ side.id } { ...side } /> ) }
			</TabPanel>
			<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
				<Result key={ tabIndex } />
			</TabPanel>
		</Tabs>
	);
};

render( <App />, document.getElementById( 'root' ) );