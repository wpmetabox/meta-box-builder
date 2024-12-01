import { __ } from "@wordpress/i18n";
import { Icon, category } from "@wordpress/icons";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Fields from './Tabs/Fields';
import Result from './Tabs/Result';

const Main = () => (
	<Tabs forceRenderTabPanel={ true } className="react-tabs mb-tabs">
		<TabList className="react-tabs__tab-list og-tabs--main">
			<Tab>
				<Icon icon={ category } />
				{ __( 'Fields', 'meta-box-builder' ) }
			</Tab>
			<Tab className="button button-small">{ __( 'Get PHP Code', 'meta-box-builder' ) }</Tab>
		</TabList>
		<TabPanel>
			<Fields fields={ MbbApp.fields } />
		</TabPanel>
		<TabPanel className="react-tabs__tab-panel og-tab-panel--settings">
			<Result endPoint="generate" />
		</TabPanel>
	</Tabs>
);

export default Main;