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
			</div>
			<div className="rwmb-input">
				<input type="text" />
			</div>
		</div>
		{ field.after }
	</>
);

export default Text;