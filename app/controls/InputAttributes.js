import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const InputAttributes = ( { defaultValue, updateField, ...rest } ) => {
	const update = key => e => updateField( key, e.target.checked );

	return (
		<DivRow { ...rest }>
			<div className="og-toggle-group">
				<label>
					<input type="checkbox" checked={ defaultValue.disabled } onChange={ update( 'disabled' ) } />
					<span className="dashicons dashicons-yes-alt"></span>
					<span>{ __( 'Disabled', 'meta-box-builder' ) }</span>
				</label>
				<label>
					<input type="checkbox" checked={ defaultValue.readonly } onChange={ update( 'readonly' ) } />
					<span className="dashicons dashicons-yes-alt"></span>
					<span>{ __( 'Readonly', 'meta-box-builder' ) }</span>
				</label>
			</div>
		</DivRow>
	);
};

export default InputAttributes;