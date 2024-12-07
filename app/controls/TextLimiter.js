import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const TextLimiter = ( { defaultValue, componentId, name, ...rest } ) => (
	<DivRow className="og-text-limit" htmlFor={ componentId } { ...rest }>
		<div className="og-input-group">
			<input
				type="number"
				min="0"
				id={ componentId }
				name={ `${ name }[limit]` }
				defaultValue={ defaultValue.limit }
			/>
			<select name={ `${ name }[limit_type]` } defaultValue={ defaultValue.limit_type || '' }>
				<option value="character">{ __( 'characters', 'meta-box-builder' ) }</option>
				<option value="word">{ __( 'words', 'meta-box-builder' ) }</option>
			</select>
		</div>
	</DivRow>
);

export default TextLimiter;