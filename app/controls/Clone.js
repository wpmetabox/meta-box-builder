import { Button, Dropdown } from "@wordpress/components";
import { useReducer, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { close } from "@wordpress/icons";
import DivRow from "./DivRow";
import Tooltip from "./Tooltip";

const Clone = ( { name, componentId, defaultValue, ...rest } ) => {
	const [ clone, toggleClone ] = useReducer( on => !on, defaultValue.clone );
	const [ sortable, toggleSortable ] = useReducer( on => !on, defaultValue.sortable );
	const [ clone_default, toggleCloneDefault ] = useReducer( on => !on, defaultValue.clone_default );
	const [ clone_empty_start, toggleCloneEmptyStart ] = useReducer( on => !on, defaultValue.clone_empty_start );
	const [ clone_as_multiple, toggleCloneAsMultiple ] = useReducer( on => !on, defaultValue.clone_as_multiple );
	const [ min_clone, setMinClone ] = useState( defaultValue.min_clone );
	const [ max_clone, setMaxClone ] = useState( defaultValue.max_clone );
	const [ add_button, setAddButton ] = useState( defaultValue.add_button );

	return (
		<>
			<Dropdown
				popoverProps={ { placement: 'bottom-end' } }
				className="og-clone"
				contentClassName="og og-clone__content"
				focusOnMount={ false }
				renderToggle={ ( { onToggle } ) => (
					<>
						<label className={ `og-status ${ clone ? 'og-status--active' : '' }` } onClick={ onToggle }>
							{ __( 'Clone', 'meta-box-builder' ) }
						</label>

						<input type="hidden" name={ name } value={ clone } />
						<input type="hidden" name={ `${ name.replace( 'clone', 'sortable' ) }` } value={ sortable } />
						<input type="hidden" name={ `${ name.replace( 'clone', 'clone_default' ) }` } value={ clone_default } />
						<input type="hidden" name={ `${ name.replace( 'clone', 'clone_empty_start' ) }` } value={ clone_empty_start } />
						<input type="hidden" name={ `${ name.replace( 'clone', 'clone_as_multiple' ) }` } value={ clone_as_multiple } />
						<input type="hidden" name={ `${ name.replace( 'clone', 'min_clone' ) }` } value={ min_clone } />
						<input type="hidden" name={ `${ name.replace( 'clone', 'max_clone' ) }` } value={ max_clone } />
						<input type="hidden" name={ `${ name.replace( 'clone', 'add_button' ) }` } value={ add_button } />
					</>
				) }
				renderContent={ ( { onToggle } ) => (
					<>
						<Button icon={ close } onClick={ onToggle } iconSize={ 16 } />

						<Toggle
							label={ __( 'Enable clone', 'meta-box-builder' ) }
							tooltip={ __( 'Make the field cloneable (repeatable)', 'meta-box-builder' ) }
							defaultValue={ clone }
							componentId={ `${ componentId }-clone` }
							onChange={ toggleClone }
						/>
						<Toggle
							label={ __( 'Sortable', 'meta-box-builder' ) }
							tooltip={ __( 'Allow to drag-and-drop reorder clones', 'meta-box-builder' ) }
							onChange={ toggleSortable }
							defaultValue={ sortable }
							componentId={ `${ componentId }-sortable` }
						/>
						<Toggle
							label={ __( 'Clone default value', 'meta-box-builder' ) }
							tooltip={ __( 'Set default values for new clones', 'meta-box-builder' ) }
							onChange={ toggleCloneDefault }
							defaultValue={ clone_default }
							componentId={ `${ componentId }-clone_default` }
						/>
						<Toggle
							label={ __( 'Start from no inputs', 'meta-box-builder' ) }
							tooltip={ __( 'Start from no inputs except the "+ Add more" button', 'meta-box-builder' ) }
							onChange={ toggleCloneEmptyStart }
							defaultValue={ clone_empty_start }
							componentId={ `${ componentId }-clone_empty_start` }
						/>
						<Toggle
							label={ __( 'Save in multiple rows', 'meta-box-builder' ) }
							tooltip={ __( 'Save each clone in a single row instead of saving all clones in one serialized row in the database', 'meta-box-builder' ) }
							onChange={ toggleCloneAsMultiple }
							defaultValue={ clone_as_multiple }
							componentId={ `${ componentId }-clone_as_multiple` }
						/>
						<DivRow label={ __( 'Number of clones', 'meta-box-builder' ) }>
							<div className="og-input-group">
								<label htmlFor={ `${ componentId }-min_clone` }>{ __( 'Min', 'meta-box-builder' ) }</label>
								<input
									type="number"
									min="0"
									id={ `${ componentId }-min_clone` }
									defaultValue={ min_clone }
									onChange={ e => setMinClone( e.target.value ) }
								/>
								<label htmlFor={ `${ componentId }-max_clone` }>{ __( 'Max', 'meta-box-builder' ) }</label>
								<input
									type="number"
									min="0"
									id={ `${ componentId }-max_clone` }
									defaultValue={ max_clone }
									onChange={ e => setMaxClone( e.target.value ) }
								/>
							</div>
						</DivRow>
						<DivRow
							htmlFor={ `${ componentId }-add_button` }
							label={ __( 'Add more text', 'meta-box-builder' ) }
							description={ __( 'Custom text for the the "+ Add more" button. Leave empty to use the default text.', 'meta-box-builder' ) }
						>
							<input type="text" id={ `${ componentId }-add_button` } defaultValue={ add_button } onChange={ e => setAddButton( e.target.value ) } />
						</DivRow>
					</>
				) }
			/>
		</>
	);
};

const Toggle = ( { componentId, label, defaultValue, tooltip, onChange } ) => (
	<DivRow>
		<label className="og-toggle">
			<input type="checkbox" id={ componentId } onChange={ onChange } defaultChecked={ defaultValue } />
			<div className="og-toggle__switch"></div>
			{ label }
			{ tooltip && <Tooltip id={ componentId } content={ tooltip } /> }
		</label>
	</DivRow>
);

export default Clone;