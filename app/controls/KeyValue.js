import { Dashicon } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import DataList from "./DataList";
import DivRow from "./DivRow";
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

	const add = () => setItems( prev => [ ...prev, { key: '', value: '', id: uniqid() } ] );
	const remove = id => setItems( prev => prev.filter( item => item.id !== id ) );

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
						values={ `${ name }-values` }
						keyPlaceholder={ keyPlaceholder }
						valuePlaceholder={ valuePlaceholder }
					/>
				) )
			}
			<button type="button" className="button" onClick={ add }>{ __( '+ Add New', 'meta-box-builder' ) }</button>
			<DataList id={ `${ name }-keys` } options={ keys } />
			<DataList id={ `${ name }-values` } options={ values } />
		</DivRow>
	);
};

const Item = ( { name, keys, values, item, remove, keyPlaceholder, valuePlaceholder } ) => (
	<div className="og-attribute">
		<input type="hidden" name={ `${ name }[id]` } defaultValue={ item.id } />
		<input type="text" placeholder={ keyPlaceholder } name={ `${ name }[key]` } defaultValue={ item.key } list={ keys } />
		<input type="text" placeholder={ valuePlaceholder } name={ `${ name }[value]` } defaultValue={ item.value } list={ values } />
		<button type="button" className="og-remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => remove( item.id ) }><Dashicon icon="dismiss" /></button>
	</div>
);

export default KeyValue;