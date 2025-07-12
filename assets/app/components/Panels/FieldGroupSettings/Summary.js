import { Button } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import Tooltip from "../../../controls/Tooltip";

const Summary = ( { show = false } ) => (
	<div className="mb-summary">
		<p>
			<label htmlFor="post_name">
				{ __( 'ID', 'meta-box-builder' ) }
				<Tooltip content={ __( 'Must be unique between field groups.', 'meta-box-builder' ) } />
			</label>
			<span>
				<input type="text" name="post_name" id="post_name" defaultValue={ MbbApp.slug } />
				<span className="og-description">{ __( 'Use only lowercase letters, numbers, underscores (and be careful dashes).', 'meta-box-builder' ) }</span>
			</span>
		</p>
	</div>
);

export default Summary;