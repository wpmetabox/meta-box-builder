import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const TextLimiter = ( { defaultValue, componentId, updateField, ...rest } ) => {
	const updateLimit =  e => updateField( 'text_limiter.limit', e.target.value );
	const updateType = e => updateField( 'text_limiter.limit_type', e.target.value );

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<div className="og-input-group og-input-group--small">
				<input
					type="number"
					min="0"
					id={ componentId }
					defaultValue={ defaultValue.limit }
					onChange={ updateLimit }
				/>
				<select defaultValue={ defaultValue.limit_type || '' } onChange={ updateType }>
					<option value="character">{ __( 'characters', 'meta-box-builder' ) }</option>
					<option value="word">{ __( 'words', 'meta-box-builder' ) }</option>
				</select>
			</div>
		</DivRow>
	);
};

export default TextLimiter;