import { useCallback } from '@wordpress/element';
import { debounce } from 'lodash';
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
	const updateKey1 = useCallback(
		debounce( e => updateField( key1, e.target.value ), 300 ),
		[] // empty deps means it runs once
	);

	const updateKey2 = useCallback(
		debounce( e => updateField( key2, e.target.value ), 300 ),
		[] // empty deps means it runs once
	);

	// Use `defaultValue` instead of `value` because updates are debounced.
	return (
		<DivRow { ...rest }>
			<div className="og-input-group">
				<label htmlFor={ `${ componentId }-${ key1 }` }>{ label1 }</label>
				<input
					type="text"
					id={ `${ componentId }-${ key1 }` }
					defaultValue={ defaultValue[ key1 ] }
					onChange={ updateKey1 }
				/>
				<label htmlFor={ `${ componentId }-${ key2 }` }>{ label2 }</label>
				<input
					type="text"
					id={ `${ componentId }-${ key2 }` }
					defaultValue={ defaultValue[ key2 ] }
					onChange={ updateKey2 }
				/>
			</div>
		</DivRow>
	);
};

export default InputGroup;