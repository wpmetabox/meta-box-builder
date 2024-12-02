import { Panel } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import usePortal from '../../hooks/usePortal';

const EditFieldSettingsPanel = ( { show = false } ) => {
	const ref = useRef();
	const { setup } = usePortal();

	useEffect( () => {
		setup( ref.current ); // Setup the ref to the portal only once, when the component is rendered.
	}, [] );

	return <Panel ref={ ref } className={ `mb-panel ${ show ? 'mb-panel--show' : '' }` } />;
};

export default EditFieldSettingsPanel;