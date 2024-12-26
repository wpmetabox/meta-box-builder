import { RawHTML } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import useLists from "../../../hooks/useLists";
import FieldLabel from "./Elements/FieldLabel";
import TextLimiter from "./Elements/TextLimiter";
import Tooltip from "./Elements/Tooltip";

const Base = ( { field: f, updateField, children } ) => {
	const field = normalize( f );

	if ( field.type === 'tab' ) {
		return children;
	}

	if ( [ 'divider', 'heading' ].includes( field.type ) ) {
		return <Plain field={ field } children={ children } />;
	}

	return (
		<>
			<Before field={ field } />
			<div
				className={
					`rwmb-field
						rwmb-${ field.type }-wrapper
						${ field.class || '' }
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
			<After field={ field } />
		</>
	);
};

const Before = ( { field } ) => field.before && <RawHTML>{ field.before }</RawHTML>;
const After = ( { field } ) => field.after && <RawHTML>{ field.after }</RawHTML>;

const Plain = ( { field, children } ) => (
	<>
		<Before field={ field } />
		<div className={ `rwmb-field rwmb-${ field.type }-wrapper ${ field.class || '' }` } >
			{ children }
		</div>
		<After field={ field } />
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

const normalize = f => {
	let field = { ...f };

	if ( field.type === 'key_value' ) {
		field.clone = true;
	}

	let classNames = ( field.class || '' ).split( ' ' );

	if ( field.type === 'group' ) {
		if ( field.collapsible ) {
			classNames.push( 'rwmb-group-collapsible' );
		}
		if ( !field.clone ) {
			classNames.push( 'rwmb-group-non-cloneable' );
		}
	}

	if ( field.type === 'text_list' && !field.clone ) {
		classNames.push( 'rwmb-text_list-non-cloneable' );
	}

	field.class = [ ...new Set( classNames ) ].join( ' ' );

	return field;
};

export default Base;