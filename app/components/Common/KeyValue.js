import { useFormContext } from 'react-hook-form';
import { uniqid } from '../../functions';
import DivRow from './DivRow';

const { useState } = wp.element;
const { __ } = wp.i18n;
const { Dashicon } = wp.components;

const KeyValue = ( {
	defaultValue,
	componentId,
	label,
	name,
	link = '',
	tooltip = '',
	keyPlaceholder = __( 'Enter key', 'meta-box-builder' ),
	valuePlaceholder = __( 'Enter value', 'meta-box-builder' ),
} ) => {
	const [ items, setItems ] = useState( Object.values( defaultValue ) );

	const addItem = () => setItems( prevItems => prevItems.concat( { key: '', value: '', id: uniqid() } ) );
	const removeItem = id => setItems( prevItems => prevItems.filter( item => item.id !== id ) );

	if ( link ) {
		label = `<a href="${ link }" target="_blank" rel="noreferrer noopener">${ label }</a>`;
	}
	return (
		<DivRow label={ label } tooltip={ tooltip }>
			{
				items.map( item => (
					<Item
						key={ item.id }
						item={ item }
						removeItem={ removeItem }
						id={ `${ componentId }-${ item.id }` }
						name={ `${ name }[${ item.id }]` }
						keyPlaceholder={ keyPlaceholder }
						valuePlaceholder={ valuePlaceholder }
					/>
				) )
			}
			<input type='hidden' id={ componentId } name={ name } value={ JSON.stringify( items ) } />
			<button type="button" className="button" onClick={ addItem }>{ __( '+ Add New', 'meta-box-builder' ) }</button>
		</DivRow>
	);
};

const Item = ( { name, item, removeItem, keyPlaceholder, valuePlaceholder, id } ) => {
	const { register } = useFormContext();

	return (
		<div className="og-attribute">
			<input type="hidden" ref={ register } name={ `${ name }[id]` } defaultValue={ item.id } />
			<input type="text" placeholder={ keyPlaceholder } ref={ register } id={ `${ id }-key` } name={ `${ name }[key]` } defaultValue={ item.key } />
			<input type="text" placeholder={ valuePlaceholder } ref={ register } id={ `${ id }-value` } name={ `${ name }[value]` } defaultValue={ item.value } />
			<button type="button" className="og-remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => removeItem( item.id ) }><Dashicon icon="dismiss" /></button>
		</div>
	);
};

export default KeyValue;