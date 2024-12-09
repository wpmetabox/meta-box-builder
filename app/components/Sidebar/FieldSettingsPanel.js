import { Panel } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import { ucwords } from '../../functions';
import useFieldSettingsPanel from '../../hooks/useFieldSettingsPanel';

const FieldSettingsPanel = ( { show = false } ) => {
	const ref = useRef();
	const { activeField, setPortalElement } = useFieldSettingsPanel();

	useEffect( () => {
		setPortalElement( ref.current ); // Setup the ref to the portal only once, when the component is rendered.
	}, [] );

	const fieldType = ucwords( activeField.type || '', '_' );

	return (
		<Panel header={ fieldType } className={ `mb-panel ${ show ? 'mb-panel--show' : '' }` }>
			<div className="mb-panel__inner" ref={ ref } />
		</Panel>
	);
};

export default FieldSettingsPanel;