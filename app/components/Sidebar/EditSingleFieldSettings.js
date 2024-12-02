import { createPortal } from '@wordpress/element';
import useEditFieldSettingsPanel from "../../hooks/useEditFieldSettingsPanel";

const EditSingleFieldSettings = ( { children } ) => {
	const { portalElement } = useEditFieldSettingsPanel();

	return portalElement && createPortal( children, portalElement );
};

export default EditSingleFieldSettings;