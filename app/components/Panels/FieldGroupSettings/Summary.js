import { Button } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import Tooltip from "../../../controls/Tooltip";

const Summary = ( { show = false } ) => (
	<div className="mb-summary">
		<p>
			<label htmlFor="post_name">
				{ __( 'ID', 'meta-box-builder' ) }
				<Tooltip content={ __( 'Must be unique between field groups. Used to get data with views.', 'meta-box-builder' ) } />
			</label>
			<span>
				<input type="text" name="post_name" id="post_name" defaultValue={ MbbApp.slug } />
				<span className="og-description">{ __( 'Use only lowercase letters, numbers, underscores (and be careful dashes).', 'meta-box-builder' ) }</span>
			</span>
		</p>
		<p className="mb-summary__status"><label>{ __( 'Status', 'meta-box-builder' ) }</label> <span id="post_status">{ MbbApp.status }</span></p>
		<p><label>{ __( 'Published', 'meta-box-builder' ) }</label> { MbbApp.published }</p>
		{ MbbApp.modified && <p><label>{ __( 'Last modified', 'meta-box-builder' ) }</label> { MbbApp.modified }</p> }
		<p><label>{ __( 'Author', 'meta-box-builder' ) }</label> { MbbApp.author }</p>
		<p><Button href={ MbbApp.trash } isDestructive={ true } variant="secondary">{ __( 'Move to trash', 'meta-box-builder' ) }</Button></p>
	</div>
);

export default Summary;