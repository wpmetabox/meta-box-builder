import { Icon, TabPanel } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { code } from '@wordpress/icons';
import General from './sections/General';
import Labels from './sections/Labels';
import PHP from './PHP';
import Supports from './sections/Supports';

const tabs = [
	{
		name: 'general',
		title: __( 'General', 'meta-box-builder' ),
	},
	{
		name: 'labels',
		title: __( 'Labels', 'meta-box-builder' ),
	},
	{
		name: 'supports',
		title: __( 'Supports', 'meta-box-builder' ),
	},
	{
		name: 'code',
		icon: <Icon icon={ code } />,
		title: __( 'Get PHP Code', 'meta-box-builder' ),
		className: 'mb-code-tab components-button is-small has-icon',
	},
];

const panels = {
	general: <General />,
	labels: <Labels />,
	supports: <Supports />,
	code: <PHP />,
};

const Main = () => (
	<div className="mb-main">
		<div className="wp-header-end" />

		<TabPanel className="mb-box" tabs={ tabs }>
			{ tab => panels[ tab.name ] }
		</TabPanel>
	</div>
);

export default Main;
