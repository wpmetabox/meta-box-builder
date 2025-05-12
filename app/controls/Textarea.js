import { useCallback } from '@wordpress/element';
import { debounce } from 'lodash';
import TextareaAutosize from 'react-textarea-autosize';
import DivRow from './DivRow';

const Textarea = ( {
	componentId,
	name,
	defaultValue,
	placeholder,
	textareaClassName = '',
	updateField,
	...rest
} ) => {
	const handleChange = useCallback(
			debounce( e => updateField && updateField( name, e.target.value ), 300 ),
			[] // empty deps means it runs once
		);

	return (
		<DivRow { ...rest } htmlFor={ componentId }>
			<TextareaAutosize
				id={ componentId }
				name={ name }
				minRows={ 2 }
				maxRows={ 6 }
				placeholder={ placeholder }
				className={ textareaClassName }
				defaultValue={ defaultValue }
				onChange={ handleChange }
			/>
		</DivRow>
	);
};

export default Textarea;