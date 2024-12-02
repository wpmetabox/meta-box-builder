import { Panel } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import useEditFieldSettingsPanel from '../../hooks/useEditFieldSettingsPanel';

const EditFieldSettingsPanel = ( { show = false } ) => {
	const ref = useRef();
	const { setPortalElement } = useEditFieldSettingsPanel();

	useEffect( () => {
		setPortalElement( ref.current ); // Setup the ref to the portal only once, when the component is rendered.
	}, [] );

	return <Panel ref={ ref } className={ `mb-panel ${ show ? 'mb-panel--show' : '' }` } />;
};

export default EditFieldSettingsPanel;