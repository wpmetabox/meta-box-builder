import DivRow from './DivRow';

const InputGroup = ( {
	label1,
	label2,
	key1,
	key2,
	defaultValue,
	componentId,
	updateField,
	...rest
} ) => {
	const update = key => e => updateField( key, e.target.value );

	return (
		<DivRow { ...rest }>
			<div className="og-input-group">
				<label htmlFor={ `${ componentId }-${ key1 }` }>{ label1 }</label>
				<input
					type="text"
					id={ `${ componentId }-${ key1 }` }
					defaultValue={ defaultValue[ key1 ] }
					onChange={ update( key1 ) }
				/>
				<label htmlFor={ `${ componentId }-${ key2 }` }>{ label2 }</label>
				<input
					type="text"
					id={ `${ componentId }-${ key2 }` }
					defaultValue={ defaultValue[ key2 ] }
					onChange={ update( key2 ) }
				/>
			</div>
		</DivRow>
	);
};

export default InputGroup;