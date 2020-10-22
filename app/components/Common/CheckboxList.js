import DivRow from './DivRow';
import { useFormContext } from 'react-hook-form';

const CheckboxList = ( { name, options, className, defaultValue, ...rest } ) => {
	const { register } = useFormContext();

	className = `og-field--checkbox-list ${ className || '' }`;

	// Allow HTML to output Post Type (<code>slug</code>)
	return <DivRow className={ className } { ...rest }>
		{
			Object.entries( options ).map( ( [ value, label ] ) =>
				<label key={ value }>
					<input type="checkbox" ref={ register } name={ `${ name }[]` } value={ value } defaultChecked={ defaultValue.includes( value ) } />
					<span dangerouslySetInnerHTML={ { __html: label } } />
				</label>
			)
		}
	</DivRow>;
};

export default CheckboxList;