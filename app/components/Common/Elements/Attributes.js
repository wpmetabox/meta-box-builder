import DivRow from '../DivRow';
import AdvancedAdditionalItem from './AdvancedAdditionalItem.js';

const { __ } = wp.i18n;
const { useState } = wp.element;

const Attributes = props => {
	const [ list, setList ] = useState( [] );
	const removeItem = id => {
		setList( prevList => prevList.filter( item => item.unixId !== id ) );
	};

	return (
		<DivRow label={ `<a href="https://docs.metabox.io/extensions/meta-box-builder/#custom-attributes" target="_blank" rel="noreferrer noopener">${ __( 'Custom attributes', 'meta-box-builder' ) }</a>`}>
			{
				list.map( ( item, index ) => (
					<AdvancedAdditionalItem data={ item } key={ item.unixId } index={ index } removeItem={ removeItem } name={ `fields-${ props.index }` } type='attributes' />
				) )
			}
			<button type="button" className="button" onClick={ () => setList( prevList => prevList.concat( { key: '', label: '', unixId: Math.random().toString( 36 ).slice( -5 ) } ) ) }>{ __( '+ Add Attribute', 'meta-box-builder' ) }</button>
		</DivRow>
	);
};

export default Attributes;