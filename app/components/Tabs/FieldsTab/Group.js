import dotProp from 'dot-prop';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { uniqid } from '../../../utility/functions';
import { Inserter } from '../../Common/Inserter';
import Content from './Content';
import Node from './Node';

const { useState, memo } = wp.element;
const { __ } = wp.i18n;

const Group = ( { id, field } ) => {
	const [ fields, setFields ] = useState( dotProp.get( field, fields, {} ) );
	const addField = type => setFields( prevFields => ( { ...prevFields, [ uniqid() ]: { type } } ) );

	return (
		<>
			<Tabs forceRenderTabPanel={ true } className="og-item__body og-collapsible__body">
				<TabList>
					<Tab>{ __( 'General', 'meta-box-builder' ) }</Tab>
					<Tab>{ __( 'Advanced', 'meta-box-builder' ) }</Tab>
				</TabList>
				<TabPanel>
					<Content id={ id } data={ data.general } field={ field } />
				</TabPanel>
				<TabPanel>
					<Content id={ id } data={ data.advanced } field={ field } />
				</TabPanel>
			</Tabs>
			<div className={ `og-group-fields og-field${ Object.values( fields ).length === 0 ? ' og-group-fields--empty' : '' }` }>
				<div className="og-label">{ __( 'Sub fields', 'meta-box-builder' ) }</div>
				<div className="og-input">
					{ Object.values( fields ).map( ( [ id, field ] ) => <Node key={ id } id={ id } field={ field } /> ) }
					<Inserter addField={ addField } />
				</div>
			</div>
		</>
	);
};

export default memo( ( Group ), ( prevProps, nextProps ) => prevProps.id === nextProps.id && prevProps.fields === nextProps.fields );
