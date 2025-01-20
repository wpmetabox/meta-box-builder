import { Panel } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import useFieldSettingsPortal from '../../hooks/useFieldSettingsPortal';

const FieldSettingsPanel = ( { show = false } ) => {
	const ref = useRef();
	const { setPortalElement } = useFieldSettingsPortal();

	useEffect( () => {
		setPortalElement( ref.current ); // Setup the ref to the portal only once, when the component is rendered.
	}, [] );

	return (
		<Panel className={ `mb-panel mb-panel--field-settings ${ show ? 'mb-panel--show' : '' }` }>
			<div className="mb-panel__inner" ref={ ref } />
		</Panel>
	);
};

export default FieldSettingsPanel;