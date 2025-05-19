import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const InputAttributes = ( { defaultValue, updateField, ...rest } ) => {
	const updateDisabled = e => updateField( 'disabled', e.target.checked );
	const updateReadonly = e => updateField( 'readonly', e.target.checked );

	return (
		<DivRow { ...rest }>
			<div className="og-toggle-group">
				<label>
					<input type="checkbox" checked={ defaultValue.disabled } onChange={ updateDisabled } />
					<span className="dashicons dashicons-yes-alt"></span>
					<span>{ __( 'Disabled', 'meta-box-builder' ) }</span>
				</label>
				<label>
					<input type="checkbox" checked={ defaultValue.readonly } onChange={ updateReadonly } />
					<span className="dashicons dashicons-yes-alt"></span>
					<span>{ __( 'Readonly', 'meta-box-builder' ) }</span>
				</label>
			</div>
		</DivRow>
	);
};

export default InputAttributes;