import dotProp from 'dot-prop';
import { useFormContext } from 'react-hook-form';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Context } from '../../../context/CommonData/CommonDataContext';
import { ucwords, uniqid } from '../../../utility/functions';
import { Inserter } from '../../Common/Inserter';
import Content from './Content';
import Node from './Node';

const { useContext, useState, memo } = wp.element;
const { __ } = wp.i18n;

const Group = ( { id, field, parent = '' } ) => {
	const { getValues } = useFormContext();
	const [ subFields, setSubFields ] = useState( dotProp.get( field, 'fields', {} ) );
	const addSubField = type => setSubFields( prev => {
		const id = uniqid();
		return { ...prev, [ id ]: { type, name: ucwords( type ), id } };
	} );
	const removeSubField = subId => setSubFields( prev => {
		let newFields = { ...prev };
		dotProp.delete( newFields, subId );
		return newFields;
	} );
	const duplicateSubField = subId => setSubFields( prev => {
		const keys = Object.keys( prev );
		const index = keys.indexOf( subId );

		// Get existing values from the current field with react-hook-form and dotProp.
		const newId = uniqid();
		const values = getValues();
		let parentKey = parent.replace( /\[/g, '.' ).replace( /\]/g, '' ); // Convert [parent1][parent2] to .parent1.parent2
		let newField = dotProp.get( values, `fields${ parentKey }.${ id }.fields.${ subId }` );
		newField.id = newId;
		newField.name += __( ' (Copy)', 'meta-box-builder' );

		let entries = Object.entries( prev );
		let newFields = {};
		entries.splice( index + 1, 0, [ newId, newField ] );
		entries.forEach( ( [ key, value ] ) => newFields[ key ] = value );

		return newFields;
	} );

	const { MbFields } = useContext( Context );
	const data = { ...MbFields[ field.type ] };

	return (
		<>
			<Tabs forceRenderTabPanel={ true } className="og-item__body og-collapsible__body">
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
			</Tabs>
			<div className={ `og-group-fields og-field${ Object.keys( subFields ).length === 0 ? ' og-group-fields--empty' : '' }` }>
				<div className="og-label">{ __( 'Sub fields', 'meta-box-builder' ) }</div>
				<div className="og-input">
					{
						Object.entries( subFields ).map( ( [ subId, subField ] ) => <Node
							key={ subId }
							id={ subId }
							field={ subField }
							parent={ `${ parent }[${ id }][fields]` }
							removeField={ removeSubField }
							duplicateField={ duplicateSubField }
						/> )
					}
					<Inserter addField={ addSubField } />
				</div>
			</div>
		</>
	);
};

export default memo( ( Group ), ( prevProps, nextProps ) => prevProps.id === nextProps.id && prevProps.field.subFields === nextProps.field.subFields );
