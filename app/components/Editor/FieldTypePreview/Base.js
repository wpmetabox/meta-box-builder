import { RawHTML } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { isPositiveInteger } from "../../../functions";
import FieldLabel from "../FieldLabel";

const Base = ( { field, updateField, children } ) => (
	<>
		<RawHTML>{ field.before }</RawHTML>
		<div className={ `rwmb-field rwmb-${ field.type }-wrapper ${ field.class || '' } ${ field.required ? 'required' : '' }` }>
			{
				field.name && (
					<div className="rwmb-label">
						<label>
							<FieldLabel field={ field } updateField={ updateField } />
							{ field.required && <span className="rwmb-required">*</span> }
							<Tooltip field={ field } />
						</label>
						{
							field.label_description && <p className="description">{ field.label_description }</p>
						}
					</div>
				)
			}
			<div className="rwmb-input">
				{
					field.desc && [ 'key_value' ].includes( field.type ) && <p className="description">{ field.desc }</p>
				}
				{
					field.clone && !field.clone_empty_start && (
						<div className={ `rwmb-clone rwmb-${ field.type }-clone` }>
							{ children }
							<TextLimiter field={ field } />
						</div>
					)
				}
				{
					field.clone && <a href="#" className="rwmb-button button add-clone">{ field.add_button || __( '+ Add more', 'meta-box-builder' ) }</a>
				}
				{
					!field.clone && (
						<>
							{ children }
							<TextLimiter field={ field } />
						</>
					)
				}
				{
					field.desc && ![ 'checkbox', 'fieldset_text', 'key_value', 'switch' ].includes( field.type ) && <p className="description">{ field.desc }</p>
				}
			</div>
		</div>
		<RawHTML>{ field.after }</RawHTML>
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
	if ( !field.text_limiter?.limit || !isPositiveInteger( field.text_limiter.limit ) ) {
		return;
	}

	const type = field.text_limiter?.limit_type || 'character';
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

const Tooltip = ( { field } ) => {
	if ( !field.tooltip?.enable || !field.tooltip?.content ) {
		return;
	}

	const icon = field.tooltip?.icon || 'info';
	let tooltip = '';

	if ( /^http/.test( icon ) ) {
		tooltip = <img src={ icon } />;
	}
	if ( icon === 'info' ) {
		tooltip = <span className="dashicons dashicons-info" />;
	}
	if ( icon === 'help' ) {
		tooltip = <span className="dashicons dashicons-editor-help" />;
	}
	if ( icon.includes( 'dashicons' ) ) {
		tooltip = <span className={ `dashicons ${ icon }` } />;
	}

	return tooltip && <span className="mb-tooltip">{ tooltip }</span>;
};

export default Base;