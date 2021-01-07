import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { FieldsDataContext } from '../../../contexts/FieldsDataContext';
import Content from './Content';

const { useContext, useState, memo } = wp.element;
const { __ } = wp.i18n;

const FieldSelected = ( { id, field, parent = '', updateFieldType } ) => {
	const fieldsData = useContext( FieldsDataContext );
	const controls = [ ...fieldsData[ field.type ].controls ];

	if ( [ 'divider', 'tab' ].includes( field.type ) ) {
		return <div className="og-item__body og-collapsible__body">
			<Content id={ id } controls={ controls.filter( control => control.tab === 'general' ) } field={ field } updateFieldType={ updateFieldType } />
		</div>;
	}

	return <Tabs forceRenderTabPanel={ true } className="og-item__body og-collapsible__body">
		<TabList>
			<Tab>{ __( 'General', 'meta-box-builder' ) }</Tab>
			<Tab>{ __( 'Advanced', 'meta-box-builder' ) }</Tab>
		</TabList>
		<TabPanel>
			<Content id={ id } controls={ controls.filter( control => control.tab === 'general' ) } field={ field } parent={ parent } updateFieldType={ updateFieldType } />
		</TabPanel>
		<TabPanel>
			<Content id={ id } controls={ controls.filter( control => control.tab === 'advanced' ) } field={ field } parent={ parent } />
		</TabPanel>
	</Tabs>;
};

export default memo( ( FieldSelected ), ( prevProps, nextProps ) => prevProps.id === nextProps.id && prevProps.field.type === nextProps.field.type );