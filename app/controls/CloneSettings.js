import { Button, Dropdown, ToggleControl } from "@wordpress/components";
import { useEffect, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { close } from "@wordpress/icons";
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
	const toggle = name => value => updateField( name, value );
	const update = name => e => updateField( name, e.target.value );

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
				renderContent={ ( { onClose } ) => (
					<OutsideClickDetector onClickOutside={ onClose }>
						<Button icon={ close } onClick={ onClose } iconSize={ 16 } />

						<ToggleControl
							className="og-field"
							label={ __( 'Make the field cloneable', 'meta-box-builder' ) }
							checked={ defaultValue.clone }
							onChange={ toggle( 'clone' ) }
						/>
						<ToggleControl
							className="og-field"
							label={
								<>
									{ __( 'Start with no inputs', 'meta-box-builder' ) }
									<Tooltip content={ __( 'Show no inputs at first except the "+ Add more" button', 'meta-box-builder' ) } />
								</>
							}
							checked={ defaultValue.clone_empty_start }
							onChange={ toggle( 'clone_empty_start' ) }
						/>
						<ToggleControl
							className="og-field"
							label={ __( 'Allow to reorder clones', 'meta-box-builder' ) }
							checked={ defaultValue.sort_clone }
							onChange={ toggle( 'sort_clone' ) }
						/>
						<ToggleControl
							className="og-field"
							label={ __( 'Set default values for new clones', 'meta-box-builder' ) }
							checked={ defaultValue.clone_default }
							onChange={ toggle( 'clone_default' ) }
						/>
						<ToggleControl
							className="og-field"
							label={
								<>
									{ __( 'Save in multiple rows', 'meta-box-builder' ) }
									<Tooltip content={ __( 'Save each clone in a single row instead of saving all clones in one serialized row in the database', 'meta-box-builder' ) } />
								</>
							}
							checked={ defaultValue.clone_as_multiple }
							onChange={ toggle( 'clone_as_multiple' ) }
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
							<input type="text" id={ `${ componentId }-add_button` } defaultValue={ defaultValue.add_button } onChange={ update( 'add_button' ) } />
						</DivRow>
					</OutsideClickDetector>
				) }
			/>
		</>
	);
};

export default CloneSettings;