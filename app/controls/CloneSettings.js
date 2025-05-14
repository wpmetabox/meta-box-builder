import { Button, Dropdown } from "@wordpress/components";
import { useCallback, useEffect, useReducer, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { close } from "@wordpress/icons";
import { debounce } from 'lodash';
import DivRow from "./DivRow";
import Tooltip from "./Tooltip";

const OutsideClickDetector = ( { onClickOutside, children } ) => {
	const ref = useRef();

	useEffect( () => {
		const handleClickOutside = e => {
			if ( ref.current && !ref.current.contains( e.target ) ) {
				onClickOutside?.();
			}
		};

		document.addEventListener( 'mousedown', handleClickOutside );
		return () => {
			document.removeEventListener( 'mousedown', handleClickOutside );
		};
	}, [ onClickOutside ] );

	return <div ref={ ref }>{ children }</div>;
};

const CloneSettings = ( { name, componentId, defaultValue, updateField, ...rest } ) => {
	const [ sort_clone, toggleSortClone ] = useReducer( on => !on, defaultValue.sort_clone );
	const [ clone_default, toggleCloneDefault ] = useReducer( on => !on, defaultValue.clone_default );
	const [ clone_as_multiple, toggleCloneAsMultiple ] = useReducer( on => !on, defaultValue.clone_as_multiple );
	const [ min_clone, setMinClone ] = useState( defaultValue.min_clone );
	const [ max_clone, setMaxClone ] = useState( defaultValue.max_clone );
	const [ add_button, setAddButton ] = useState( defaultValue.add_button );

	const toggleClone = e => updateField( 'clone', e.target.checked );
	const toggleCloneEmptyStart = e => updateField( 'clone_empty_start', e.target.checked );

	// Live update to the input, and debounce update to the field.
	const updateAddButton = e => setAddButton( e.target.value );
	const debouncedUpdateAddButton = useCallback(
		debounce( value => updateField( 'add_button', value ), 300 ),
		[] // empty deps means it runs once
	);
	useEffect( () => {
		debouncedUpdateAddButton( add_button );
	}, [ add_button, debouncedUpdateAddButton ] );

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
						<input type="hidden" name={ `${ name.replace( 'clone_settings', 'sort_clone' ) }` } value={ sort_clone } />
						<input type="hidden" name={ `${ name.replace( 'clone_settings', 'clone_default' ) }` } value={ clone_default } />
						<input type="hidden" name={ `${ name.replace( 'clone_settings', 'clone_empty_start' ) }` } value={ defaultValue.clone_empty_start } />
						<input type="hidden" name={ `${ name.replace( 'clone_settings', 'clone_as_multiple' ) }` } value={ clone_as_multiple } />
						<input type="hidden" name={ `${ name.replace( 'clone_settings', 'min_clone' ) }` } value={ min_clone } />
						<input type="hidden" name={ `${ name.replace( 'clone_settings', 'max_clone' ) }` } value={ max_clone } />
						<input type="hidden" name={ `${ name.replace( 'clone_settings', 'add_button' ) }` } value={ add_button } />
					</>
				) }
				renderContent={ ( { onToggle } ) => (
					<OutsideClickDetector onClickOutside={ onToggle }>
						<Button icon={ close } onClick={ onToggle } iconSize={ 16 } />

						<Toggle
							label={ __( 'Make the field cloneable', 'meta-box-builder' ) }
							defaultValue={ defaultValue.clone }
							componentId={ `${ componentId }-clone` }
							onChange={ toggleClone }
						/>
						<Toggle
							label={ __( 'Start with no inputs', 'meta-box-builder' ) }
							tooltip={ __( 'Show no inputs at first except the "+ Add more" button', 'meta-box-builder' ) }
							onChange={ toggleCloneEmptyStart }
							defaultValue={ defaultValue.clone_empty_start }
							componentId={ `${ componentId }-clone_empty_start` }
						/>
						<Toggle
							label={ __( 'Allow to reorder clones', 'meta-box-builder' ) }
							onChange={ toggleSortClone }
							defaultValue={ sort_clone }
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
							<input type="text" id={ `${ componentId }-add_button` } value={ add_button } onChange={ updateAddButton } />
						</DivRow>
					</OutsideClickDetector>
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