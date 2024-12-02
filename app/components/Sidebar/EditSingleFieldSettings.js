import { createPortal } from '@wordpress/element';
import useEditFieldSettingsPanel from "../../hooks/useEditFieldSettingsPanel";

const EditSingleFieldSettings = ( { id, children } ) => {
	const { activeFieldId, portalElement } = useEditFieldSettingsPanel();

	return portalElement && createPortal(
		<div className={ `og-edit-field-settings ${ id === activeFieldId ? 'og-edit-field-settings--show' : '' }` }>
			{ children }
		</div>,
		portalElement
	);
};

export default EditSingleFieldSettings;