import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Content from './Content';
const { __ } = wp.i18n;

const Side = ( { id, title, controls } ) => {
	return (
		<div className="og-item og-relationship-side">
			<div className="og-item__header og-relationship-side__header">
				<span className="og-item__title">{ title }</span>
			</div>
			<Tabs forceRenderTabPanel={ true } className="og-item__body og-relationship-side__body">
				<TabList>
					<Tab>{ __( 'General', 'meta-box-builder' ) }</Tab>
					<Tab>{ __( 'Meta Box', 'meta-box-builder' ) }</Tab>
					<Tab>{ __( 'Field', 'meta-box-builder' ) }</Tab>
				</TabList>
				<TabPanel>
					<Content id={ id } controls={ controls.filter( control => control.tab === 'general' ) } />
				</TabPanel>
				<TabPanel>
					<Content id={ id } controls={ controls.filter( control => control.tab === 'meta_box' ) } />
				</TabPanel>
				<TabPanel>
					<Content id={ id } controls={ controls.filter( control => control.tab === 'field' ) } />
				</TabPanel>
			</Tabs>
		</div>
	);
};

export default Side;