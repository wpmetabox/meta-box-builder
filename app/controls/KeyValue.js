import { Dashicon } from "@wordpress/components";
import { useState } from "@wordpress/element";
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
	...rest
} ) => {
	const [ items, setItems ] = useState( Object.values( defaultValue || {} ) );
	const [ dependencyValues, setDependencyValues ] = useState( Object.values( {} ) );

	const add = () => setItems( prev => [ ...prev, { key: '', value: '', id: uniqid() } ] );
	const remove = id => setItems( prev => prev.filter( item => item.id !== id ) );

	if ( keys.length > 0 ) {
		keys.map( ( item, index ) => {
			if ( !item.includes( ':[' ) ) {
				return;
			}
			let temp = item.split( ':[' );
			keys[ index ] = temp[0];

			setDependencyValues( prev => ( { ...prev, [ temp[0] ]: temp[1].slice( 0, -1 ) } ) );
		} );
	}

	return (
		<DivRow { ...rest }>
			{
				items.map( item => (
					<Item
						key={ item.id }
						item={ item }
						remove={ remove }
						name={ `${ name }[${ item.id }]` }
						keys={ `${ name }-keys` }
						keysList={ keys }
						dependencyValues={dependencyValues}
						values={ `${ name }-values` }
						valuesList={ values }
						keyPlaceholder={ keyPlaceholder }
						valuePlaceholder={ valuePlaceholder }
					/>
				) )
			}
			<button type="button" className="button" onClick={ add }>{ __( '+ Add New', 'meta-box-builder' ) }</button>
		</DivRow>
	);
};

const Item = ( { name, keys, keysList, dependencyValues, valuesList, item, remove, keyPlaceholder, valuePlaceholder } ) => {
	const [ values, setValues ] = useState( valuesList );

	const handleSelect = ( inputRef, value ) => {
		setValues( valuesList );
		inputRef.current.value = value;

		if ( Object.keys( dependencyValues ).length == 0 ) {
			return;
		}

		Object.keys( dependencyValues ).map( item => {
			if ( value !== item ) {
				return;
			}

			const tempVal = dependencyValues[ value ].split( ',' );
			tempVal.map( ( temp, index ) => {
				// Check if dependency values not in valuesList
				if ( !valuesList.includes( temp ) ) {
					tempVal.splice( index, 1 );
				}
			} );
			setValues( tempVal );
		} );
	};

	return (
		<div className="og-attribute">
			<input type="hidden" name={ `${ name }[id]` } defaultValue={ item.id } />
			<FieldInserter placeholder={ keyPlaceholder } name={ `${ name }[key]` } defaultValue={ item.key } items={ keysList }  onSelect={ handleSelect } onChange={ handleSelect } />
			<FieldInserter placeholder={ valuePlaceholder } name={ `${ name }[value]` } defaultValue={ item.value } items={ values } />
			<button type="button" className="og-remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => remove( item.id ) }><Dashicon icon="dismiss" /></button>
		</div>
	);
};

export default KeyValue;