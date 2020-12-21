import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Context } from '../../../context/CommonData/CommonDataContext';
import Content from './Content';

const { useContext, useState, memo } = wp.element;
const { __ } = wp.i18n;

const FieldSelected = ( { id, field, parent = '' } ) => {
	const { MbFields } = useContext( Context );
	const data = { ...MbFields[ field.type ] };

	if ( [ 'divider', 'tab' ].includes( field.type ) ) {
		return <div className="og-item__body og-collapsible__body">
			<Content id={ id } data={ data.general } field={ field } />
		</div>;
	}

	return <Tabs forceRenderTabPanel={ true } className="og-item__body og-collapsible__body">
		<TabList>
			<Tab>{ __( 'General', 'meta-box-builder' ) }</Tab>
			<Tab>{ __( 'Advanced', 'meta-box-builder' ) }</Tab>
		</TabList>
		<TabPanel>
			<Content id={ id } data={ data.general } field={ field } parent={ parent } />
		</TabPanel>
		<TabPanel>
			<Content id={ id } data={ data.advanced } field={ field } parent={ parent } />
		</TabPanel>
	</Tabs>;
};

export default memo( ( FieldSelected ), ( prevProps, nextProps ) => prevProps.id === nextProps.id );