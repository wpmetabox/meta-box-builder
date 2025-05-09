import { Flex, Icon, Panel } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import { getFieldIcon, ucwords } from '../../functions';
import useFieldSettingsPanel from '../../hooks/useFieldSettingsPanel';
import useLists from '../../hooks/useLists';

const FieldSettingsPanel = ( { show = false } ) => {
	const ref = useRef();
	const { setPortalElement } = useFieldSettingsPanel();
	const { getAllFields } = useLists();
	const activeField = getAllFields().find( field => field._active ) || {};

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
		<Panel header={ header } className={ `mb-panel mb-panel--field-settings ${ show ? 'mb-panel--show' : '' }` }>
			<div className="mb-panel__inner" ref={ ref } />
		</Panel>
	);
};

export default FieldSettingsPanel;