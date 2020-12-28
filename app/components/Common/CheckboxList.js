import DivRow from './DivRow';

const CheckboxList = ( { name, componentId, options, className, defaultValue = [], ...rest } ) => {
	className = `og-field--checkbox-list ${ className || '' }`;

	// Allow HTML to output Post Type (<code>slug</code>)
	return <DivRow className={ className } { ...rest }>
		{
			Object.entries( options ).map( ( [ value, label ] ) =>
				<label key={ value }>
					<input type="checkbox" name={ `${ name }[]` } value={ value } defaultChecked={ defaultValue.includes( value ) } />
					<span dangerouslySetInnerHTML={ { __html: label } } />
				</label>
			)
		}
	</DivRow>;
};

export default CheckboxList;