import { Dashicon } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import DivRow from "./DivRow";
import { uniqid } from "/functions";

const KeyValue = ( {
	defaultValue,
	name,
	keyPlaceholder = __( 'Enter key', 'meta-box-builder' ),
	valuePlaceholder = __( 'Enter value', 'meta-box-builder' ),
	options = [],
	values = [],
	...rest
} ) => {
	const [ items, setItems ] = useState( Object.values( defaultValue || {} ) );

	const addItem = () => setItems( prev => [ ...prev, { key: '', value: '', id: uniqid() } ] );
	const removeItem = id => setItems( prev => prev.filter( item => item.id !== id ) );

	return (
		<DivRow { ...rest }>
			{
				items.map( item => (
					<Item
						key={ item.id }
						item={ item }
						removeItem={ removeItem }
						name={ `${ name }[${ item.id }]` }
						listKeys={ `${ name }-keys` }
						listValues={ `${ name }-values` }
						keyPlaceholder={ keyPlaceholder }
						valuePlaceholder={ valuePlaceholder }
					/>
				) )
			}
			<button type="button" className="button" onClick={ addItem }>{ __( '+ Add New', 'meta-box-builder' ) }</button>
			{
				options.length > 0 &&
				<datalist id={ `${ name }-keys` }>
					{
						options.map( option => <option key={ option }>{ option }</option> )
					}
				</datalist>
			}
			{
				values.length > 0 &&
				<datalist id={ `${ name }-values` }>
					{
						values.map( value => <option key={ value }>{ value }</option> )
					}
				</datalist>
			}
		</DivRow>
	);
};

const Item = ( { name, listKeys, listValues, item, removeItem, keyPlaceholder, valuePlaceholder } ) => (
	<div className="og-attribute">
		<input type="hidden" name={ `${ name }[id]` } defaultValue={ item.id } />
		<input type="text" placeholder={ keyPlaceholder } name={ `${ name }[key]` } defaultValue={ item.key } list={ listKeys } />
		<input type="text" placeholder={ valuePlaceholder } name={ `${ name }[value]` } defaultValue={ item.value } list={ listValues } />
		<button type="button" className="og-remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => removeItem( item.id ) }><Dashicon icon="dismiss" /></button>
	</div>
);

export default KeyValue;