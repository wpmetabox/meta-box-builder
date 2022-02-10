import DivRow from './DivRow';
import { uniqid } from '/functions';

const { useState } = wp.element;
const { __ } = wp.i18n;
const { Dashicon } = wp.components;

const KeyValue = ( {
	defaultValue,
	name,
	keyPlaceholder = __( 'Enter key', 'meta-box-builder' ),
	valuePlaceholder = __( 'Enter value', 'meta-box-builder' ),
	options = [],
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
						list={ `${ name }-options` }
						keyPlaceholder={ keyPlaceholder }
						valuePlaceholder={ valuePlaceholder }
					/>
				) )
			}
			<button type="button" className="button" onClick={ addItem }>{ __( '+ Add New', 'meta-box-builder' ) }</button>
			{
				options.length > 0 &&
				<datalist id={ `${ name }-options` }>
					{
						options.map( option => <option key={ option }>{ option }</option> )
					}
				</datalist>
			}
		</DivRow>
	);
};

const Item = ( { name, list, item, removeItem, keyPlaceholder, valuePlaceholder } ) => (
	<div className="og-attribute">
		<input type="hidden" name={ `${ name }[id]` } defaultValue={ item.id } />
		<input type="text" placeholder={ keyPlaceholder } name={ `${ name }[key]` } defaultValue={ item.key } list={ list } />
		<input type="text" placeholder={ valuePlaceholder } name={ `${ name }[value]` } defaultValue={ item.value } />
		<button type="button" className="og-remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => removeItem( item.id ) }><Dashicon icon="dismiss" /></button>
	</div>
);

export default KeyValue;