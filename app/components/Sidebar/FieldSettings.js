import { createPortal } from '@wordpress/element';
import useFieldSettingsPanel from "../../hooks/useFieldSettingsPanel";

const FieldSettings = ( { id, children } ) => {
	const { activeFieldId, portalElement } = useFieldSettingsPanel();

	return portalElement && createPortal(
		<div className={ `og-field-settings ${ id === activeFieldId ? 'og-field-settings--show' : '' }` }>
			{ children }
		</div>,
		portalElement
	);
};

export default FieldSettings;