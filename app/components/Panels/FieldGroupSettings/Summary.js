import { Button } from '@wordpress/components';
import { __ } from "@wordpress/i18n";

const Summary = ( { show = false } ) => (
	<div className="mb-summary">
		<p>
			<label htmlFor="post_name">{ __( 'ID', 'meta-box-builder' ) }</label>
			<input type="text" name="post_name" id="post_name" defaultValue={ MbbApp.slug } />
		</p>
		<p className="mb-summary__status"><label>{ __( 'Status', 'meta-box-builder' ) }</label> <span id="post_status">{ MbbApp.status }</span></p>
		<p><label>{ __( 'Published', 'meta-box-builder' ) }</label> { MbbApp.published }</p>
		{ MbbApp.modified && <p><label>{ __( 'Last modified', 'meta-box-builder' ) }</label> { MbbApp.modified }</p> }
		<p><label>{ __( 'Author', 'meta-box-builder' ) }</label> { MbbApp.author }</p>
		<p><Button href={ MbbApp.trash } isDestructive={ true } variant="secondary">{ __( 'Move to trash', 'meta-box-builder' ) }</Button></p>
	</div>
);

export default Summary;