import DivRow from './DivRow';
import { xIcon } from '../../constants/icons';
import { useFormContext } from 'react-hook-form';
import { uniqid } from '../../utility/functions';

const { useState } = wp.element;
const { __ } = wp.i18n;

const KeyValue = ( {
	index,
	type,
	label,
	link = '',
	tooltip = '',
	keyPlaceholder = __( 'Enter key', 'meta-box-builder' ),
	valuePlaceholder = __( 'Enter value', 'meta-box-builder' ),
} ) => {
	const [ list, setList ] = useState( [] );
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
						name={ `fields-${ index }-${ type }-${ i }` }
						keyPlaceholder={ keyPlaceholder }
						valuePlaceholder={ valuePlaceholder }
					/>
				) )
			}
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
			<button type="button" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => removeItem( item.uniqId ) }>{ xIcon }</button>
		</div>
	);
};

export default KeyValue;