import { __ } from "@wordpress/i18n";
import FieldLabel from "../FieldLabel";

const Text = ( { field, updateField } ) => (
	<>
		{ field.before }
		<div className={ `rwmb-field rwmb-${ field.type }-wrapper ${ field.class } ${ field.required ? 'required' : '' }` }>
			<div className="rwmb-label">
				<label>
					<FieldLabel field={ field } updateField={ updateField } />
				</label>
				{ field.required && <span className="rwmb-required">*</span> }
				{
					field.label_description && <p className="description">{ field.label_description }</p>
				}
			</div>
			<div className="rwmb-input">
				<input type="text" placeholder={ field.placeholder } size={ field.size } />
				{
					field.clone && <a href="#" className="rwmb-button button add-clone">{ field.add_button || __( '+ Add more', 'meta-box-builder' ) }</a>
				}
				{
					field.desc && <p className="description">{ field.desc }</p>
				}
			</div>
		</div>
		{ field.after }
	</>
);

export default Text;