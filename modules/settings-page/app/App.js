import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Content from './Content';
import Result from '/components/Tabs/Result';
const { render } = wp.element;
const { __ } = wp.i18n;

const App = () => (
	<Tabs forceRenderTabPanel={ true }>
		<TabList>
			<Tab>{ __( 'Settings', 'meta-box-builder' ) }</Tab>
			<Tab className="button button-small">{ __( 'Get PHP Code', 'meta-box-builder' ) }</Tab>
		</TabList>
		<TabPanel>
			<Content />
		</TabPanel>
		<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
			<Result settings={ MbbApp.settings } endPoint="settings-page-generate" />
		</TabPanel>
	</Tabs>
);

render( <App />, document.getElementById( 'root' ) );