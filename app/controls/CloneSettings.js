import { Button, Dropdown } from "@wordpress/components";
import { useReducer, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { close } from "@wordpress/icons";
import DivRow from "./DivRow";
import Tooltip from "./Tooltip";

const CloneSettings = ( { name, componentId, defaultValue, updateField, ...rest } ) => {
	const [ sortable, toggleSortable ] = useReducer( on => !on, defaultValue.sortable );
	const [ clone_default, toggleCloneDefault ] = useReducer( on => !on, defaultValue.clone_default );
	const [ clone_as_multiple, toggleCloneAsMultiple ] = useReducer( on => !on, defaultValue.clone_as_multiple );
	const [ min_clone, setMinClone ] = useState( defaultValue.min_clone );
	const [ max_clone, setMaxClone ] = useState( defaultValue.max_clone );

	const toggleClone = e => updateField( 'clone', e.target.checked );
	const toggleCloneEmptyStart = e => updateField( 'clone_empty_start', e.target.checked );
	const updateAddButton = e => updateField( 'add_button', e.target.value );

	return (
		<>
			<Dropdown
				popoverProps={ { placement: 'bottom-end' } }
				className="og-clone"
				contentClassName="og og-clone__content"
				focusOnMount={ false }
				renderToggle={ ( { onToggle } ) => (
					<>
						<label className={ `og-status ${ defaultValue.clone ? 'og-status--active' : '' }` } onClick={ onToggle }>
							{ __( 'Cloneable', 'meta-box-builder' ) }
						</label>

						<input type="hidden" name={ `${ name.replace( 'clone_settings', 'clone' ) }` } value={ defaultValue.clone } />
						<input type="hidden" name={ `${ name.replace( 'clone_settings', 'sortable' ) }` } value={ sortable } />
						<input type="hidden" name={ `${ name.replace( 'clone_settings', 'clone_default' ) }` } value={ clone_default } />
						<input type="hidden" name={ `${ name.replace( 'clone_settings', 'clone_empty_start' ) }` } value={ defaultValue.clone_empty_start } />
						<input type="hidden" name={ `${ name.replace( 'clone_settings', 'clone_as_multiple' ) }` } value={ clone_as_multiple } />
						<input type="hidden" name={ `${ name.replace( 'clone_settings', 'min_clone' ) }` } value={ min_clone } />
						<input type="hidden" name={ `${ name.replace( 'clone_settings', 'max_clone' ) }` } value={ max_clone } />
						<input type="hidden" name={ `${ name.replace( 'clone_settings', 'add_button' ) }` } value={ defaultValue.add_button } />
					</>
				) }
				renderContent={ ( { onToggle } ) => (
					<>
						<Button icon={ close } onClick={ onToggle } iconSize={ 16 } />

						<Toggle
							label={ __( 'Make the field cloneable', 'meta-box-builder' ) }
							defaultValue={ defaultValue.clone }
							componentId={ `${ componentId }-clone` }
							onChange={ toggleClone }
						/>
						<Toggle
							label={ __( 'Start from no inputs', 'meta-box-builder' ) }
							tooltip={ __( 'Start from no inputs except the "+ Add more" button', 'meta-box-builder' ) }
							onChange={ toggleCloneEmptyStart }
							defaultValue={ defaultValue.clone_empty_start }
							componentId={ `${ componentId }-clone_empty_start` }
						/>
						<Toggle
							label={ __( 'Allow to reorder clones', 'meta-box-builder' ) }
							onChange={ toggleSortable }
							defaultValue={ sortable }
							componentId={ `${ componentId }-sortable` }
						/>
						<Toggle
							label={ __( 'Set default values for new clones', 'meta-box-builder' ) }
							onChange={ toggleCloneDefault }
							defaultValue={ clone_default }
							componentId={ `${ componentId }-clone_default` }
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
							<input type="text" id={ `${ componentId }-add_button` } value={ defaultValue.add_button } onChange={ updateAddButton } />
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

export default CloneSettings;