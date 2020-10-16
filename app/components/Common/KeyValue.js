import DivRow from './DivRow';
import AdvancedAdditionalItem from './Elements/AdvancedAdditionalItem.js';
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
			{
				list.map( ( item, i ) => (
					<AdvancedAdditionalItem data={ item } key={ item.uniqId } index={ i } removeItem={ removeItem } name={ `fields-${ index }` } type={ type } />
				) )
			}
			<button type="button" className="button" onClick={ () => setList( prevList => prevList.concat( { key: '', label: '', uniqId: uniqid() } ) ) }>{ button }</button>
		</DivRow>
	);
};

export default KeyValue;