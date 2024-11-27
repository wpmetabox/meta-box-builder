import { __ } from "@wordpress/i18n";
import DivRow from './DivRow';

const InputAttributes = ( { defaultValue, name, ...rest } ) => (
	<DivRow { ...rest }>
		<div className="og-multiple-choices">
			<label>
				<input type="hidden" name={ `${ name.replace( 'input_attributes', 'required' ) }` } value={ false } />
				<input
					type="checkbox"
					name={ `${ name.replace( 'input_attributes', 'required' ) }` }
					defaultChecked={ defaultValue.required }
					value={ true }
				/>
				<span>{ __( 'Required', 'meta-box-builder' ) }</span>
			</label>
			<label>
				<input type="hidden" name={ `${ name.replace( 'input_attributes', 'disabled' ) }` } value={ false } />
				<input
					type="checkbox"
					name={ `${ name.replace( 'input_attributes', 'disabled' ) }` }
					defaultChecked={ defaultValue.disabled }
					value={ true }
				/>
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
				<span>{ __( 'Readonly', 'meta-box-builder' ) }</span>
			</label>
		</div>
	</DivRow>
);

export default InputAttributes;