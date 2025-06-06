import { Button } from "@wordpress/components";
import { RawHTML, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';
import { maybeArrayToObject, uniqid } from "/functions";

const KeyValue = ( {
	defaultValue,
	name,
	keyPlaceholder = __( 'Enter key', 'meta-box-builder' ),
	valuePlaceholder = __( 'Enter value', 'meta-box-builder' ),
	keys = [],
	values = [],
	description = '',
	className = 'og-attribute-wrapper',
	updateField,
	...rest
} ) => {
	const items = maybeArrayToObject( defaultValue, 'id' );

	const add = () => {
		const newItem = { key: '', value: '', id: uniqid() };

		updateField( name, {
			...items,
			[ newItem.id ]: newItem,
		} );
	};

	const remove = id => {
		const newItems = { ...items };
		delete newItems[ id ];

		updateField( name, newItems );
	};

	const updateItem = ( id, prop, value ) => updateField( name, {
		...items,
		[ id ]: {
			...items[ id ],
			[ prop ]: value,
		}
	} );

	return (
		<DivRow className={ className } { ...rest }>
			{ description && <RawHTML className="og-description">{ description }</RawHTML> }
			{
				Object.values( items || {} ).map( item => (
					<Item
						key={ item.id }
						item={ item }
						remove={ remove }
						keysList={ keys }
						values={ `${ name }-values` }
						valuesList={ values }
						keyPlaceholder={ keyPlaceholder }
						valuePlaceholder={ valuePlaceholder }
						updateItem={ updateItem }
					/>
				) )
			}
			<Button variant="secondary" onClick={ add } text={ __( '+ Add New', 'meta-box-builder' ) } />
		</DivRow>
	);
};

const Item = ( { keysList, valuesList, item, remove, keyPlaceholder, valuePlaceholder, updateItem } ) => {
	const [ values, setValues ] = useState( valuesList );

	const updateKey = ( inputRef, value ) => {
		inputRef.current.value = value;
		updateItem( item.id, 'key', value );

		const newValuesList = objectDepth( valuesList ) == 1 ? valuesList : ( Array.isArray( valuesList[ value ] ) ? valuesList[ value ] : valuesList[ 'default' ] );
		setValues( newValuesList || [] );
	};

	const updateValue = ( inputRef, value ) => {
		inputRef.current.value = value;
		updateItem( item.id, 'value', value );
	};

	return (
		<div className="og-attribute">
			<FieldInserter placeholder={ keyPlaceholder } defaultValue={ item.key } items={ keysList } onSelect={ updateKey } onChange={ updateKey } />
			<FieldInserter placeholder={ valuePlaceholder } defaultValue={ item.value } items={ values } onSelect={ updateValue } onChange={ updateValue } />
			<Button variant="link" isDestructive={ true } onClick={ () => remove( item.id ) } text={ __( 'Remove', 'meta-box-builder' ) } />
		</div>
	);
};

const objectDepth = object => Object( object ) === object ? 1 + Math.max( -1, ...Object.values( object ).map( objectDepth ) ) : 0;

export default KeyValue;