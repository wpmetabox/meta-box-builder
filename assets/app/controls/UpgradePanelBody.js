import { Button, Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import UpgradeText from '../components/common/UpgradeText';

export default ( { title, description = '', utm_source = 'field_group_settings', utm_medium = 'link' } ) => (
	<div className="components-panel__body mb-upgrade-panel-body">
		<h2 className="components-panel__body-title">
			<Tooltip delay={ 0 } text={
				<UpgradeText
					text={ `${ description } ${ __( 'Available in Meta Box AIO only.', 'meta-box-builder' ) }` }
					utm_source={ utm_source }
					utm_medium={ utm_medium }
				/>
			}>
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