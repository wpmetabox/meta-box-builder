import DivRow from './DivRow';

const InputGroup = ( {
	label1,
	label2,
	key1,
	key2,
	defaultValue,
	componentId,
	componentName,
	name,
	...rest
} ) => (
	<DivRow { ...rest }>
		<div className="og-input-group">
			<label htmlFor={ `${ componentId }-${ key1 }` }>{ label1 }</label>
			<input
				type="text"
				id={ `${ componentId }-${ key1 }` }
				name={ `${ name.replace( componentName, key1 ) }` }
				defaultValue={ defaultValue[ key1 ] }
			/>
			<label htmlFor={ `${ componentId }-${ key2 }` }>{ label2 }</label>
			<input
				type="text"
				id={ `${ componentId }-${ key2 }` }
				name={ `${ name.replace( componentName, key2 ) }` }
				defaultValue={ defaultValue[ key2 ] }
			/>
		</div>
	</DivRow>
);

export default InputGroup;