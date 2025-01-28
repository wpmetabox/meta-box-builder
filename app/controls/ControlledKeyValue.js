import { RawHTML, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';
import { uniqid } from "/functions";

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
	defaultValue = defaultValue || {};

	const add = () => {
		const newItem = { key: '', value: '', id: uniqid() };

		updateField( name, {
			...defaultValue,
			[ newItem.id ]: newItem,
		} );
	};

	const remove = id => {
		const newItems = { ...defaultValue };
		delete newItems[ id ];

		updateField( name, newItems );
	};

	const updateItem = ( id, prop, value ) => updateField( name, {
		...defaultValue,
		[ id ]: {
			...defaultValue[ id ],
			[ prop ]: value,
		}
	} );

	return (
		<DivRow className={ className } { ...rest }>
			{ description && <RawHTML className="og-description">{ description }</RawHTML> }
			{
				Object.values( defaultValue || {} ).map( item => (
					<Item
						key={ item.id }
						item={ item }
						remove={ remove }
						name={ `${ name }[${ item.id }]` }
						keysList={ keys }
						values={ `${ name }-values` }
						valuesList={ values }
						keyPlaceholder={ keyPlaceholder }
						valuePlaceholder={ valuePlaceholder }
						updateItem={ updateItem }
					/>
				) )
			}
			<button type="button" className="button" onClick={ add }>{ __( '+ Add New', 'meta-box-builder' ) }</button>
		</DivRow>
	);
};

const Item = ( { name, keysList, valuesList, item, remove, keyPlaceholder, valuePlaceholder, updateItem } ) => {
	const [ values, setValues ] = useState( valuesList );

	const handleSelect = ( inputRef, value ) => {
		inputRef.current.value = value;

		const newValuesList = objectDepth( valuesList ) == 1 ? valuesList : valuesList[ value ] ? valuesList[ value ] : valuesList[ 'default' ];
		setValues( newValuesList || [] );
	};

	const updateValue = ( inputRef, value ) => {
		inputRef.current.value = value;
		updateItem( item.id, 'value', value );
	};

	return (
		<div className="og-attribute">
			<input type="hidden" name={ `${ name }[id]` } defaultValue={ item.id } />
			<FieldInserter placeholder={ keyPlaceholder } name={ `${ name }[key]` } defaultValue={ item.key } items={ keysList } onSelect={ handleSelect } onChange={ handleSelect } />
			<FieldInserter placeholder={ valuePlaceholder } name={ `${ name }[value]` } defaultValue={ item.value } items={ values } onSelect={ updateValue } onChange={ updateValue } />
			<a href="#" className="og-remove" onClick={ () => remove( item.id ) }>{ __( 'Remove', 'meta-box-builder' ) }</a>
		</div>
	);
};

const objectDepth = object => Object( object ) === object ? 1 + Math.max( -1, ...Object.values( object ).map( objectDepth ) ) : 0;

export default KeyValue;