import dotProp from 'dot-prop';
import { useFormContext } from 'react-hook-form';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { FieldsDataContext } from '../../../context/FieldsDataContext';
import { ucwords, uniqid } from '../../../functions';
import { Inserter } from '../../Common/Inserter';
import Content from './Content';
import Node from './Node';

const { useContext, useState, memo } = wp.element;
const { __ } = wp.i18n;

const Group = ( { id, field, parent = '' } ) => {
	const { getValues } = useFormContext();
	const [ subFields, setSubFields ] = useState( Object.values( dotProp.get( field, 'fields', {} ) ) );

	const addSubField = type => setSubFields( prev => {
		const id = uniqid();
		return [ ...prev, { type, name: ucwords( type ), id, _id: id } ];
	} );

	const removeSubField = subId => setSubFields( prev => prev.filter( field => field._id !== subId ) );

	const duplicateSubField = subId => setSubFields( prev => {
		// Get existing values from the current field with react-hook-form and dotProp.
		const newId = uniqid();
		const values = getValues();
		let parentKey = parent.replace( /\[/g, '.' ).replace( /\]/g, '' ); // Convert [parent1][parent2] to .parent1.parent2
		let newField = dotProp.get( values, `fields${ parentKey }.${ id }.fields.${ subId }` );
		newField.id = newId;
		newField._id = newId;
		newField.name += __( ' (Copy)', 'meta-box-builder' );

		const index = prev.findIndex( field => field._id === subId );
		let newFields = [ ...prev ];
		newFields.splice( index + 1, 0, newField );

		return newFields;
	} );

	const moveSubField = ( index, direction ) => setSubFields( prev => {
		let newFields = [ ...prev ];
		const field = newFields[ index ];
		if ( direction === 'up' ) {
			if ( 0 === index ) {
				return;
			}
			newFields[ index ] = newFields[ index - 1 ];
			newFields[ index - 1 ] = field;
		} else {
			if ( index === prev.length - 1 ) {
				return;
			}
			newFields[ index ] = newFields[ index + 1 ];
			newFields[ index + 1 ] = field;
		}

		return newFields;
	} );

	const fieldsData = useContext( FieldsDataContext );
	const data = { ...fieldsData[ field.type ] };

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
			<div className={ `og-group-fields og-field${ subFields.length === 0 ? ' og-group-fields--empty' : '' }` }>
				<div className="og-label">{ __( 'Sub fields', 'meta-box-builder' ) }</div>
				<div className="og-input">
					{
						subFields.map( ( subField, index ) => <Node
							key={ subField._id }
							id={ subField._id }
							field={ subField }
							index={ index }
							parent={ `${ parent }[${ id }][fields]` }
							removeField={ removeSubField }
							duplicateField={ duplicateSubField }
							moveField={ moveSubField }
						/> )
					}
					<Inserter addField={ addSubField } />
				</div>
			</div>
		</>
	);
};

export default memo( ( Group ), ( prevProps, nextProps ) => prevProps.id === nextProps.id && prevProps.field.subFields === nextProps.field.subFields );
