import dotProp from 'dot-prop';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import FieldsTab from './Tabs/FieldsTab';
import Result from './Tabs/Result';
import SettingsTab from './Tabs/SettingsTab';

const { __ } = wp.i18n;

const MainTabs = () => (
	<Tabs forceRenderTabPanel={ true }>
		<TabList>
			<Tab>{ __( 'Fields', 'meta-box-builder' ) }</Tab>
			<Tab>{ __( 'Settings', 'meta-box-builder' ) }</Tab>
			<Tab className="button button-small">{ __( 'Get PHP Code', 'meta-box-builder' ) }</Tab>
		</TabList>
		<TabPanel>
			<FieldsTab fields={ Object.values( dotProp.get( MbbApp.data_raw, 'fields', {} ) ) } />
		</TabPanel>
		<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
			<SettingsTab defaultValues={ MbbApp.data_raw } />
		</TabPanel>
		<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
			<Result />
		</TabPanel>
	</Tabs>
);

export default MainTabs;