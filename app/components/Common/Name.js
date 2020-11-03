import { useFormContext } from 'react-hook-form';
import slugify from 'slugify';
import DivRow from './DivRow';
const { __ } = wp.i18n;
const { useEffect } = wp.element;

const Name = ( { name, ...rest } ) => {
	const { register } = useFormContext();
	useEffect( () => {
		document.getElementById( `og-item__title__${ rest.fieldId }` ).textContent = rest.defaultValue || __( '(No label)', 'meta-box-builder' );
	}, [] );

	const onChange = e => {
		document.getElementById( `og-item__title__${ rest.fieldId }` ).textContent = e.target.value || __( '(No label)', 'meta-box-builder' );
		document.getElementById( `fields-${ rest.fieldId }-id` ).value = slugify( e.target.value, { lower: true, replacement: '_' } );
	};

	return (
		<DivRow htmlFor={ name } { ...rest }>
			<input type="text" id={ name } defaultValue={ rest.defaultValue } name={ name } ref={ register } onChange={ onChange } />
		</DivRow>
	);
};
export default Name;