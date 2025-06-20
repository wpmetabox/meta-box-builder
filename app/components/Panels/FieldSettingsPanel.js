import { Flex, Icon, Panel } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import { getFieldIcon, ucwords } from '../../functions';
import useAllFields from '../../hooks/useAllFields';
import useFieldSettingsPanel from '../../hooks/useFieldSettingsPanel';

const FieldSettingsPanel = () => {
	const ref = useRef();
	const { setPortalElement } = useFieldSettingsPanel();
	const activeField = useAllFields().find( field => field._active ) || {};

	useEffect( () => {
		setPortalElement( ref.current ); // Setup the ref to the portal only once, when the component is rendered.
	}, [] );

	const header = (
		<Flex align="center" gap={ 1 }>
			{ activeField.type && <Icon icon={ getFieldIcon( activeField.type ) } /> }
			{ ucwords( activeField.type || '', '_' ) }
		</Flex>
	);

	return (
		<Panel header={ header } className="mb-panel mb-panel--field-settings mb-panel--field-settings">
			<div className="mb-panel__inner" ref={ ref } />
		</Panel>
	);
};

export default FieldSettingsPanel;