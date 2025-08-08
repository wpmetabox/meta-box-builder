import { Button, Icon, Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { external } from '@wordpress/icons';

const UpgradeText = ( { description, utm_source, utm_medium } ) => (
	<div className="mb-upgrade-text">
		{ description }
		&nbsp;
		{ __( 'Available in Meta Box AIO only.', 'meta-box-builder' ) }
		&nbsp;
		<a
			href={ `https://metabox.io/aio/?utm_source=${ utm_source }&utm_medium=${ utm_medium }&utm_campaign=builder` }
			target="_blank"
		>
			{ __( 'Upgrade now', 'meta-box-builder' ) }
			<Icon icon={ external } size={ 14 } />
		</a>
	</div>
);

export default ( { title, description = '', utm_source = 'field_group_settings', utm_medium = 'link' } ) => (
	<div className="components-panel__body mb-upgrade-panel-body">
		<h2 className="components-panel__body-title">
			<Tooltip delay={ 0 } text={ <UpgradeText description={ description } utm_source={ utm_source } utm_medium={ utm_medium } /> }>
				<Button __next40pxDefaultSize className="components-panel__body-toggle">
					<span className="components-panel__arrow">
						{ __( '(Premium)', 'meta-box-builder' ) }
					</span>
					{ title }
				</Button>
			</Tooltip>
		</h2>
	</div>
);