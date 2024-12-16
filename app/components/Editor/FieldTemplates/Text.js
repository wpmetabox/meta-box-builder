import { __ } from "@wordpress/i18n";
import { isPositiveInteger } from "../../../functions";
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
				{
					field.clone && !field.clone_empty_start && (
						<div className="rwmb-clone">
							<Input field={ field } />
						</div>
					)
				}
				{
					field.clone && <a href="#" className="rwmb-button button add-clone">{ field.add_button || __( '+ Add more', 'meta-box-builder' ) }</a>
				}
				{ !field.clone && <Input field={ field } /> }
				{
					field.desc && <p className="description">{ field.desc }</p>
				}
			</div>
		</div>
		{ field.after }
	</>
);

const Input = ( { field } ) => {
	const prepend = field.prepend && <span className="rwmb-input-group-text">{ field.prepend }</span>;
	const append = field.append && <span className="rwmb-input-group-text">{ field.append }</span>;
	const input = <input type="text" placeholder={ field.placeholder } size={ field.size } />;

	const output = prepend || append
		? <div className="rwmb-input-group">{ prepend }{ input }{ append }</div>
		: input;

	return (
		<>
			{ output }
			<TextLimiter field={ field } />
		</>
	);
};

const TextLimiter = ( { field } ) => {
	if ( !field.text_limiter.limit || !isPositiveInteger( field.text_limiter.limit ) ) {
		return;
	}

	const type = field.text_limiter.limit_type || 'character';
	const text = 'word' === type ? __( 'Word Count', 'meta-box-builder' ) : __( 'Character Count', 'meta-box-builder' );

	return (
		<div className="text-limiter">
			<span>
				{ text }:&nbsp;
				<span className="counter">0</span>/<span className="maximum">{ field.text_limiter.limit }</span>
			</span>
		</div>
	);
};

export default Text;