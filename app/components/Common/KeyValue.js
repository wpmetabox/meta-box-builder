import { useFormContext } from 'react-hook-form';
import { uniqid } from '../../utility/functions';
import DivRow from './DivRow';

const { useState } = wp.element;
const { __ } = wp.i18n;
const { Dashicon } = wp.components;

const KeyValue = ( {
	fieldId,
	defaultValue,
	listType,
	label,
	name,
	link = '',
	tooltip = '',
	keyPlaceholder = __( 'Enter key', 'meta-box-builder' ),
	valuePlaceholder = __( 'Enter value', 'meta-box-builder' ),
} ) => {

	const { register } = useFormContext();
	const [ list, setList ] = useState( defaultValue || [] );
	const removeItem = id => setList( prevList => prevList.filter( item => item.uniqId !== id ) );
	if ( link ) {
		label = `<a href="${ link }" target="_blank" rel="noreferrer noopener">${ label }</a>`;
	}

	return (
		<DivRow label={ label } tooltip={ tooltip }>
			{
				list.map( ( item, i ) => (
					<Item
						key={ item.uniqId }
						item={ item }
						removeItem={ removeItem }
						name={ `${ name }-${ i }` }
						keyPlaceholder={ keyPlaceholder }
						valuePlaceholder={ valuePlaceholder }
					/>
				) )
			}
			<input type='hidden' id={ name } name={ name } ref={ register } value={ list.length } />
			<button type="button" className="button" onClick={ () => setList( prevList => prevList.concat( { key: '', value: '', uniqId: uniqid() } ) ) }>{ __( '+ Add New', 'meta-box-builder' ) }</button>
		</DivRow>
	);
};

const Item = ( { name, item, removeItem, keyPlaceholder, valuePlaceholder } ) => {
	const { register } = useFormContext();

	return (
		<div className="og-attribute">
			<input type="text" placeholder={ keyPlaceholder } ref={ register } name={ `${ name }-key` } defaultValue={ item.key } />
			<input type="text" placeholder={ valuePlaceholder } ref={ register } name={ `${ name }-value` } defaultValue={ item.value } />
			<button type="button" className="og-remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => removeItem( item.uniqId ) }><Dashicon icon="dismiss" /></button>
		</div>
	);
};

export default KeyValue;