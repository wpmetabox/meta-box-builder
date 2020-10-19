import { useFormContext } from 'react-hook-form';
import DivRow from './DivRow';
const { __ } = wp.i18n;

const Name = ( { name, ...rest } ) => {
	const { register } = useFormContext();
	const onChange = e => {
		document.getElementById( `og-item__title__${ rest.index }` ).textContent = e.target.value || __( '(No label)', 'meta-box-builder' );
	};

	return (
		<DivRow htmlFor={ name } { ...rest }>
			<input type="text" id={ name } name={ name } ref={ register } onChange={ onChange } />
		</DivRow>
	);
};
export default Name;