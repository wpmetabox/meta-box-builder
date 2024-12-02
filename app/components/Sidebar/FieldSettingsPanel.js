import { Panel } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import useFieldSettingsPanel from '../../hooks/useFieldSettingsPanel';

const FieldSettingsPanel = ( { show = false } ) => {
	const ref = useRef();
	const { setPortalElement } = useFieldSettingsPanel();

	useEffect( () => {
		setPortalElement( ref.current ); // Setup the ref to the portal only once, when the component is rendered.
	}, [] );

	return <Panel ref={ ref } className={ `mb-panel ${ show ? 'mb-panel--show' : '' }` } />;
};

export default FieldSettingsPanel;