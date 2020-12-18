import dotProp from 'dot-prop';
import { ucwords, uniqid } from '../../utility/functions';
import { Inserter } from '../Common/Inserter';
import Node from './FieldsTab/Node';

const { useState, memo } = wp.element;
const { __ } = wp.i18n;

const FieldsTab = ( props ) => {
	const [ fields, setFields ] = useState( props.fields );
	const addField = type => setFields( prev => {
		const id = uniqid();
		return { ...prev, [ id ]: { type, name: ucwords( type ), id } };
	} );
	const removeField = id => setFields( prev => {
		let newFields = { ...prev };
		dotProp.delete( newFields, id );
		return newFields;
	} );

	return (
		<>
			{ Object.values( fields ).length === 0 && <p className="og-none" dangerouslySetInnerHTML={ { __html: __( 'There are no fields here. Click the <strong>+ Add Field</strong> to add a new field.', 'meta-box-builder' ) } } /> }
			<div className="og-fields">
				{
					Object.entries( fields ).map( ( [ id, field ] ) =>
						<Node key={ id } id={ id } field={ field } removeField={ removeField } />
					)
				}
			</div>
			<Inserter addField={ addField } />
		</>
	);
};

export default memo( FieldsTab );
