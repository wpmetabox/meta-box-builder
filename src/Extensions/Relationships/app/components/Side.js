import { PanelBody, TabPanel } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import Field from './sections/Field';
import General from './sections/General';
import MetaBox from './sections/MetaBox';

const Side = ( { id, title } ) => {

	const tabs = [
		{
			name: 'general',
			title: __( 'General', 'meta-box-builder' ),
		},
		{
			name: 'meta-box',
			title: __( 'Meta Box', 'meta-box-builder' ),
		},
		{
			name: 'field',
			title: __( 'Field', 'meta-box-builder' ),
		},
	];

	const tabPanels = {
		general: <General id={ id } />,
		'meta-box': <MetaBox id={ id } />,
		field: <Field id={ id } />,
	};

	return (
		<PanelBody title={ title }>
			<TabPanel tabs={ tabs }>
				{ tab => tabPanels[ tab.name ] }
			</TabPanel>
		</PanelBody>
	);
};

export default Side;