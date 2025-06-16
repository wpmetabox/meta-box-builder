import DivRow from './DivRow';

const FontAwesome = ( { name, componentId, defaultValue, updateField, ...rest } ) => {
	const handleChange = e => updateField( name, e.target.value );

	return (
		<DivRow htmlFor={ componentId } className="og-icon" { ...rest }>
			<div className='og-icon-selected'>
				<span className={ `icon-fontawesome ${ defaultValue }` }></span>
				<input
					type="text"
					className="og-icon-search"
					defaultValue={ defaultValue }
					onChange={ handleChange }
				/>
			</div>
		</DivRow >
	);
};

export default FontAwesome;