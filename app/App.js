import dotProp from 'dot-prop';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Data } from './components/Data';
import FieldsTab from './components/Tabs/FieldsTab';
import Result from './components/Tabs/Result';
import SettingsTab from './components/Tabs/SettingsTab';
import { ConditionalLogicProvider } from './contexts/ConditionalLogicContext';
import { FieldsDataProvider } from './contexts/FieldsDataContext';

const { __ } = wp.i18n;
const { render } = wp.element;

const App = () => (
	<FieldsDataProvider>
		<ConditionalLogicProvider>
			<Tabs forceRenderTabPanel={ true }>
				<TabList>
					<Tab>{ __( 'Fields', 'meta-box-builder' ) }</Tab>
					<Tab>{ __( 'Settings', 'meta-box-builder' ) }</Tab>
					<Tab className="button button-small">{ __( 'Get PHP Code', 'meta-box-builder' ) }</Tab>
				</TabList>
				<TabPanel>
					<FieldsTab fields={ dotProp.get( MbbApp, 'fields', {} ) } />
				</TabPanel>
				<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
					<SettingsTab defaultValues={ dotProp.get( MbbApp, 'settings', {} ) } />
				</TabPanel>
				<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
					<Result />
				</TabPanel>
			</Tabs>
			<Data />
		</ConditionalLogicProvider>
	</FieldsDataProvider>
);

render( <App />, document.getElementById( 'root' ) );