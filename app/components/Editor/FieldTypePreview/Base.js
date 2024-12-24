import { RawHTML } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { isPositiveInteger } from "../../../functions";
import useLists from "../../../hooks/useLists";
import FieldLabel from "../FieldLabel";

const Base = ( { field, updateField, children } ) => {
	return [ 'divider', 'heading' ].includes( field.type )
		? <Plain field={ field } children={ children } />
		: (
			<>
				{ field.before && <RawHTML>{ field.before }</RawHTML> }
				<div
					className={
						`rwmb-field
						rwmb-${ field.type }-wrapper
						${ field.class || '' }
						${ field.type === 'text_list' && !field.clone ? 'rwmb-text_list-non-cloneable' : '' }
						${ field.required ? 'required' : '' }`
					}
				>
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
							[ 'key_value' ].includes( field.type ) && <Description field={ field } />
						}
						{
							field.clone && !field.clone_empty_start && (
								<div className={ `rwmb-clone rwmb-${ field.type }-clone` }>
									{ children }
									<TextLimiter field={ field } />
								</div>
							)
						}
						<CloneButton field={ field } />
						{
							!field.clone && (
								<>
									{ children }
									<TextLimiter field={ field } />
								</>
							)
						}
						{
							![ 'checkbox', 'fieldset_text', 'key_value', 'switch' ].includes( field.type ) && <Description field={ field } />
						}
					</div>
				</div>
				{ field.after && <RawHTML>{ field.after }</RawHTML> }
			</>
		);
};

const Plain = ( { field, children } ) => (
	<>
		<RawHTML>{ field.before }</RawHTML>
		<div className={ `rwmb-field rwmb-${ field.type }-wrapper ${ field.class || '' }` } >
			{ children }
		</div>
		<RawHTML>{ field.after }</RawHTML>
	</>
);

const Description = ( { field } ) => field.desc && <p className="description">{ field.desc }</p>;
const CloneButton = ( { field } ) => {
	const { getForList } = useLists();

	if ( !field.clone ) {
		return;
	}

	// Do not show the clone button if the group has no subfields.
	if ( field.type === 'group' ) {
		const { fields } = getForList( field._id );
		if ( fields.length === 0 ) {
			return;
		}
	}

	return <a href="#" className="rwmb-button button add-clone">{ field.add_button || __( '+ Add more', 'meta-box-builder' ) }</a>;
};

const TextLimiter = ( { field } ) => {
	if ( ![ 'text', 'textarea', 'wysiwyg' ].includes( field.type ) ) {
		return;
	}
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