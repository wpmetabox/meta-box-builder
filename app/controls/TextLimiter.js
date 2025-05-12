import { useCallback } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import { debounce } from 'lodash';
import DivRow from './DivRow';

const TextLimiter = ( { defaultValue, componentId, name, updateField, ...rest } ) => {
	const updateLimit = useCallback(
		debounce( e => updateField( 'text_limiter', {
			...defaultValue,
			limit: e.target.value
		} ), 300 ),
		[] // empty deps means it runs once
	);

	const updateType = e => updateField( 'text_limiter', {
		...defaultValue,
		limit_type: e.target.value
	} );

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<div className="og-input-group og-input-group--small">
				<input
					type="number"
					min="0"
					id={ componentId }
					name={ `${ name }[limit]` }
					defaultValue={ defaultValue.limit }
					onChange={ updateLimit }
				/>
				<select
					name={ `${ name }[limit_type]` }
					defaultValue={ defaultValue.limit_type || '' }
					onChange={ updateType }
				>
					<option value="character">{ __( 'characters', 'meta-box-builder' ) }</option>
					<option value="word">{ __( 'words', 'meta-box-builder' ) }</option>
				</select>
			</div>
		</DivRow>
	);
};

export default TextLimiter;