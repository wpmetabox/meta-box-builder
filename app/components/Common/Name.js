import { useFormContext } from 'react-hook-form';
import slugify from 'slugify';
import DivRow from './DivRow';
const { __ } = wp.i18n;

const Name = ( { name, ...rest } ) => {
	const { register } = useFormContext();
	const onChange = e => {
		document.getElementById( `og-item__title__${ rest.fieldId }` ).textContent = e.target.value || __( '(No label)', 'meta-box-builder' );
		document.getElementById( `fields-${ rest.fieldId }-id` ).value = slugify( e.target.value, { lower: true, replacement: '_' } );
	};

	return (
		<DivRow htmlFor={ name } { ...rest }>
			<input type="text" id={ name } name={ name } ref={ register } onChange={ onChange } />
		</DivRow>
	);
};
export default Name;