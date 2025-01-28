import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const InputAttributes = ( { defaultValue, name, ...rest } ) => (
	<DivRow { ...rest }>
		<div className="og-toggle-group">
			<label>
				<input type="hidden" name={ `${ name.replace( 'input_attributes', 'disabled' ) }` } value={ false } />
				<input
					type="checkbox"
					name={ `${ name.replace( 'input_attributes', 'disabled' ) }` }
					defaultChecked={ defaultValue.disabled }
					value={ true }
				/>
				<span className="dashicons dashicons-yes-alt"></span>
				<span>{ __( 'Disabled', 'meta-box-builder' ) }</span>
			</label>
			<label>
				<input type="hidden" name={ `${ name.replace( 'input_attributes', 'readonly' ) }` } value={ false } />
				<input
					type="checkbox"
					name={ `${ name.replace( 'input_attributes', 'readonly' ) }` }
					defaultChecked={ defaultValue.readonly }
					value={ true }
				/>
				<span className="dashicons dashicons-yes-alt"></span>
				<span>{ __( 'Readonly', 'meta-box-builder' ) }</span>
			</label>
		</div>
	</DivRow>
);

export default InputAttributes;