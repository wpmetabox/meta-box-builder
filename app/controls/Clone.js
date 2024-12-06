import { Button, Dropdown } from "@wordpress/components";
import { useReducer } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { close } from "@wordpress/icons";
import CloneQuantity from "./CloneQuantity";
import Input from "./Input";
import Toggle from "./Toggle";

const Clone = () => {
	const name = 'asdf';
	const setting = { enable: false };
	const [ enable, toggleCloneSettings ] = useReducer( on => !on, setting.enable );

	const toggle = ( onToggle, onClose ) => {
		// Current ON, turn OFF: do not show settings
		if ( enable === true ) {
			toggleCloneSettings();
			onClose();
			return;
		}

		// Current OFF, turn ON: show settings
		toggleCloneSettings();
		onToggle();
	};

	return (
		<>
			<Dropdown
				popoverProps={ { placement: 'bottom-end' } }
				className="og-clone"
				contentClassName="og og-clone__content"
				focusOnMount={ false }
				renderToggle={ ( { onToggle, onClose } ) => (
					<>
						<label className="og-status">
							<input type="hidden" name={ name } value={ false } />
							<input type="checkbox" name={ name } onChange={ () => toggle( onToggle, onClose ) } defaultChecked={ enable } value={ true } />
							{ __( 'Clone', 'meta-box-builder' ) }
						</label>
					</>
				) }
				renderContent={ ( { onToggle } ) => (
					<>
						<Button icon={ close } onClick={ onToggle } iconSize={ 16 } />

						<Toggle
							label={ __( 'Sortable', 'meta-box-builder' ) }
							tooltip={ __( 'Allow to drag-and-drop reorder clones', 'meta-box-builder' ) }
							name={ `${ name }[sortable]` }
						/>
						<Toggle
							label={ __( 'Clone default value', 'meta-box-builder' ) }
							tooltip={ __( 'Set default values for new clones', 'meta-box-builder' ) }
							name={ `${ name }[clone_default]` }
						/>
						<Toggle
							label={ __( 'Start from no inputs', 'meta-box-builder' ) }
							tooltip={ __( 'Start from no inputs except the "+ Add more" button', 'meta-box-builder' ) }
							name={ `${ name }[clone_empty_start]` }
						/>
						<Toggle
							label={ __( 'Save in multiple rows', 'meta-box-builder' ) }
							tooltip={ __( 'Save each clone in a single row instead of saving all clones in one serialized row in the database', 'meta-box-builder' ) }
							name={ `${ name }[clone_as_multiple]` }
						/>
						<CloneQuantity
							label={ __( 'Number of clones', 'meta-box-builder' ) }
							name={ name }
							componentId={ name }
							defaultValue={ {} }
						/>
						<Input
							label={ __( 'Add more text', 'meta-box-builder' ) }
							defaultValue=""
							description={ __( 'Custom text for the the "+ Add more" button. Leave empty to use the default text.', 'meta-box-builder' ) }
						/>
					</>
				) }
			/>
		</>
	);
};

export default Clone;