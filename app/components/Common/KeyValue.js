import DivRow from './DivRow';
import { xIcon } from '../../constants/icons';
import { useFormContext } from 'react-hook-form';
import { uniqid } from '../../utility/functions';

const { useState } = wp.element;
const { __ } = wp.i18n;

const KeyValue = ( { type, label, index, link = '', tooltip = '', button = __( '+ Add New', 'meta-box-builder' ) } ) => {
	const [ list, setList ] = useState( [] );
	const removeItem = id => setList( prevList => prevList.filter( item => item.uniqId !== id ) );

	let outputLabel = label;
	if ( link ) {
		outputLabel = `<a href="${ link }" target="_blank" rel="noreferrer noopener">${ label }</a>`;
	}

	return (
		<DivRow label={ outputLabel } tooltip={ tooltip }>
			{ list.map( ( item, i ) => <Item key={ item.uniqId } item={ item } removeItem={ removeItem } name={ `fields-${ index }-${ type }-${ i }` } /> ) }
			<button type="button" className="button" onClick={ () => setList( prevList => prevList.concat( { key: '', value: '', uniqId: uniqid() } ) ) }>{ button }</button>
		</DivRow>
	);
};

const Item = ( { name, item, removeItem } ) => {
	const { register } = useFormContext();

	return (
		<div className="og-attribute">
			<input type="text" placeholder={ __( 'Enter key', 'meta-box-builder' ) } ref={ register } name={ `${ name }-key` } defaultValue={ item.key } />
			<input type="text" placeholder={ __( 'Enter value', 'meta-box-builder' ) } ref={ register } name={ `${ name }-value` } defaultValue={ item.value } />
			<button type="button" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => removeItem( item.uniqId ) }>{ xIcon }</button>
		</div>
	);
};

export default KeyValue;