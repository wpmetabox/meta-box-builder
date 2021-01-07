import dotProp from 'dot-prop';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { FieldIdsContext } from '../../../contexts/FieldIdsContext';
import { FieldsDataContext } from '../../../contexts/FieldsDataContext';
import { getFieldValue, ucwords, uniqid } from '../../../functions';
import { Inserter } from '../../Controls/Inserter';
import Content from './Content';
import Node from './Node';

const { useContext, useState, memo } = wp.element;
const { __ } = wp.i18n;

const Group = ( { id, field, parent = '' } ) => {
	const { updateFieldId, removeFieldId } = useContext( FieldIdsContext );
	const [ subFields, setSubFields ] = useState( Object.values( dotProp.get( field, 'fields', {} ) ) );

	const addSubField = type => setSubFields( prev => {
		const id = `${ type }_${ uniqid() }`;
		const newField = { _id: id, _new: true, id, type, name: ucwords( type, '_' ) };
		updateFieldId( id, newField );
		return [ ...prev, newField ];
	} );

	const removeSubField = subId => setSubFields( prev => {
		removeFieldId( id );
		return prev.filter( field => field._id !== subId );
	} );

	const duplicateSubField = subId => setSubFields( prev => {
		let newField = getFieldValue( `fields${ parent }[${ id }][fields][${ subId }]` );
		const newId = `${ dotProp.get( newField, 'type' ) }_${ uniqid() }`;
		newField.id = newId;
		newField._id = newId;
		newField.name += __( ' (Copy)', 'meta-box-builder' );

		updateFieldId( newId, newField );

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
				return newFields;
			}
			newFields[ index ] = newFields[ index - 1 ];
			newFields[ index - 1 ] = field;
		} else {
			if ( index === prev.length - 1 ) {
				return newFields;
			}
			newFields[ index ] = newFields[ index + 1 ];
			newFields[ index + 1 ] = field;
		}

		return newFields;
	} );

	const fieldsData = useContext( FieldsDataContext );
	const controls = [ ...fieldsData[ field.type ].controls ];

	return (
		<>
			<Tabs forceRenderTabPanel={ true } className="og-item__body og-collapsible__body">
				<TabList>
					<Tab>{ __( 'General', 'meta-box-builder' ) }</Tab>
					<Tab>{ __( 'Advanced', 'meta-box-builder' ) }</Tab>
				</TabList>
				<TabPanel>
					<Content id={ id } controls={ controls.filter( control => control.tab === 'general' ) } field={ field } parent={ parent } />
				</TabPanel>
				<TabPanel>
					<Content id={ id } controls={ controls.filter( control => control.tab === 'advanced' ) } field={ field } parent={ parent } />
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
