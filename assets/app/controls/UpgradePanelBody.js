import { Button, Flex, Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { external } from '@wordpress/icons';

const UpgradeText = () => (
	<Flex gap={ 0 } align="center" className="mb-upgrade-panel-body-text">
		{ __( 'This feature is available in Meta Box AIO only.', 'meta-box-builder' ) }
		<Button
			variant="link"
			href="https://metabox.io/pricing/?utm_source=upgrade-panel&utm_medium=link&utm_campaign=builder"
			target="_blank"
			icon={ external }
			iconPosition="right"
			iconSize={ 18 }
			text={ __( 'Upgrade now', 'meta-box-builder' ) }
		/>
	</Flex>
);

export default ( { title } ) => (
	<div className="components-panel__body mb-upgrade-panel-body">
		<h2 className="components-panel__body-title">
			<Tooltip delay={ 0 } text={ <UpgradeText /> }>
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