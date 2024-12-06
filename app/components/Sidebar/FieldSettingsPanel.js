import { Panel } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import Clone from '../../controls/Clone';
import { ucwords } from '../../functions';
import useFieldSettingsPanel from '../../hooks/useFieldSettingsPanel';

const FieldSettingsPanel = ( { show = false } ) => {
	const ref = useRef();
	const { activeField, setPortalElement } = useFieldSettingsPanel();

	useEffect( () => {
		setPortalElement( ref.current ); // Setup the ref to the portal only once, when the component is rendered.
	}, [] );

	const fieldType = ucwords( activeField.type || '', '_' );

	const noCloneTypes = [
		'button', 'custom_html', 'divider', 'heading', 'tab', // Fields with no values
	];

	return (
		<Panel header={ fieldType } className={ `mb-panel ${ show ? 'mb-panel--show' : '' }` }>
			{
				activeField.type && !noCloneTypes.includes( activeField.type ) && <Clone />
			}
			<div className="mb-panel__inner" ref={ ref } />
		</Panel>
	);
};

export default FieldSettingsPanel;