import { Button, Dropdown } from "@wordpress/components";
import { useCallback, useEffect, useRef, useState } from "@wordpress/element";
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

const CloneSettings = ( { componentId, defaultValue, updateField, ...rest } ) => {
	const toggle = name => e => updateField( name, e.target.checked );
	const update = name => e => updateField( name, e.target.value );

	// Live update to the input, and debounce update to the field.
	const [ add_button, setAddButton ] = useState( defaultValue.add_button );
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
					<label className={ `og-status ${ defaultValue.clone ? 'og-status--active' : '' }` } onClick={ onToggle }>
						{ __( 'Cloneable', 'meta-box-builder' ) }
					</label>
				) }
				renderContent={ ( { onToggle } ) => (
					<OutsideClickDetector onClickOutside={ onToggle }>
						<Button icon={ close } onClick={ onToggle } iconSize={ 16 } />

						<Toggle
							label={ __( 'Make the field cloneable', 'meta-box-builder' ) }
							defaultValue={ defaultValue.clone }
							componentId={ `${ componentId }-clone` }
							onChange={ toggle( 'clone' ) }
						/>
						<Toggle
							label={ __( 'Start with no inputs', 'meta-box-builder' ) }
							tooltip={ __( 'Show no inputs at first except the "+ Add more" button', 'meta-box-builder' ) }
							onChange={ toggle( 'clone_empty_start' ) }
							defaultValue={ defaultValue.clone_empty_start }
							componentId={ `${ componentId }-clone_empty_start` }
						/>
						<Toggle
							label={ __( 'Allow to reorder clones', 'meta-box-builder' ) }
							onChange={ toggle( 'sort_clone' ) }
							defaultValue={ defaultValue.sort_clone }
							componentId={ `${ componentId }-sortable` }
						/>
						<Toggle
							label={ __( 'Set default values for new clones', 'meta-box-builder' ) }
							onChange={ toggle( 'clone_default' ) }
							defaultValue={ defaultValue.clone_default }
							componentId={ `${ componentId }-clone_default` }
						/>
						<Toggle
							label={ __( 'Save in multiple rows', 'meta-box-builder' ) }
							tooltip={ __( 'Save each clone in a single row instead of saving all clones in one serialized row in the database', 'meta-box-builder' ) }
							onChange={ toggle( 'clone_as_multiple' ) }
							defaultValue={ defaultValue.clone_as_multiple }
							componentId={ `${ componentId }-clone_as_multiple` }
						/>
						<DivRow label={ __( 'Number of clones', 'meta-box-builder' ) }>
							<div className="og-input-group">
								<label htmlFor={ `${ componentId }-min_clone` }>{ __( 'Min', 'meta-box-builder' ) }</label>
								<input
									type="number"
									min="0"
									id={ `${ componentId }-min_clone` }
									defaultValue={ defaultValue.min_clone }
									onChange={ update( 'min_clone' ) }
								/>
								<label htmlFor={ `${ componentId }-max_clone` }>{ __( 'Max', 'meta-box-builder' ) }</label>
								<input
									type="number"
									min="0"
									id={ `${ componentId }-max_clone` }
									defaultValue={ defaultValue.max_clone }
									onChange={ update( 'max_clone' ) }
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