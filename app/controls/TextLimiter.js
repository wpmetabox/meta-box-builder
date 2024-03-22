import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const TextLimiter = ( { defaultValue, componentId, type, name, ...rest } ) => {
	return [ 'text', 'textarea', 'wysiwyg' ].includes( type ) &&
		<DivRow { ...rest }>
			<div className="og-attribute">
				<input
					type="text"
					id={ componentId }
					name={ `${ name }[limit]` }
					defaultValue={ defaultValue.limit }
				/>
				<div className="og-input">
					<select name={ `${ name }[limit_type]` } defaultValue={ defaultValue.limit_type || '' }>
						<option value="character">{ __( 'Characters', 'meta-box-builder' ) }</option>
						<option value="word">{ __( 'Words', 'meta-box-builder' ) }</option>
					</select>
				</div>
			</div>
		</DivRow>;
};

export default TextLimiter;