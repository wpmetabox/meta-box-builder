import { memo, useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { FieldsDataContext } from '../../../contexts/FieldsDataContext';
import Content from './Content';

const Field = props => {
	const { fieldTypes } = useContext( FieldsDataContext );
	const controls = [ ...fieldTypes[ props.field.type ].controls ];
	const general = controls.filter( control => control.tab === 'general' );
	const advanced = controls.filter( control => control.tab === 'advanced' );

	if ( advanced.length === 0 ) {
		return <div className="og-item__body og-collapsible__body">
			<Content { ...props } controls={ general } />
		</div>;
	}

	return <Tabs forceRenderTabPanel={ true } className="og-item__body og-collapsible__body">
		<TabList>
			<Tab>{ __( 'General', 'meta-box-builder' ) }</Tab>
			<Tab>{ __( 'Advanced', 'meta-box-builder' ) }</Tab>
		</TabList>
		<TabPanel>
			<Content { ...props } controls={ general } />
		</TabPanel>
		<TabPanel>
			<Content { ...props } controls={ advanced } />
		</TabPanel>
	</Tabs>;
};

export default memo( ( Field ), ( prevProps, nextProps ) => prevProps.id === nextProps.id && prevProps.field.type === nextProps.field.type );