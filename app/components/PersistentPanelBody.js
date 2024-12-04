import { PanelBody } from '@wordpress/components';

const PersistentPanelBody = ( { children, ...rest } ) => (
	<PanelBody scrollAfterOpen={ false } { ...rest }>
		{
			// Use render props to avoid removing { children } from DOM as we use uncontrolled inputs.
			() => <div className="og-panel-body">{ children }</div>
		}
	</PanelBody>
);

export default PersistentPanelBody;