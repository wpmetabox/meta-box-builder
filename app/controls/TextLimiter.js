import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const TextLimiter = ( { defaultValue, componentId, type, name, ...rest } ) => {
	return [ 'text', 'textarea', 'wysiwyg' ].includes( type ) &&
		<DivRow { ...rest }>
			<div className="og-text-limit">
				<input
					type="text"
					id={ componentId }
					name={ `${ name }[limit]` }
					defaultValue={ defaultValue.limit }
				/>
				<select name={ `${ name }[limit_type]` } defaultValue={ defaultValue.limit_type || '' }>
					<option value="character">{ __( 'characters', 'meta-box-builder' ) }</option>
					<option value="word">{ __( 'words', 'meta-box-builder' ) }</option>
				</select>
			</div>
		</DivRow>;
};

export default TextLimiter;