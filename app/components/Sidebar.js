import { Button, Panel, PanelBody, PanelRow } from '@wordpress/components';
import { __ } from "@wordpress/i18n";

const Sidebar = () => (
	<Panel className="mb-sidebar">
		<PanelBody title={ __( 'Summary', 'meta-box-builder' ) } initialOpen={ true }>
			<PanelRow className="summary">
				<p className="status"><label>{ __( 'Status', 'meta-box-builder' ) }</label> { MbbApp.status }</p>
				<p><label>{ __( 'Published', 'meta-box-builder' ) }</label> { MbbApp.published }</p>
				{ MbbApp.modifiedtime && <p><label>{ __( 'Last modified', 'meta-box-builder' ) }</label> { MbbApp.modifiedtime }</p> }
				<p><label>{ __( 'Author', 'meta-box-builder' ) }</label> { MbbApp.author }</p>
				<p><Button href={ MbbApp.trash } isDestructive={ true } variant="secondary">{ __( 'Move to trash', 'meta-box-builder' ) }</Button></p>
			</PanelRow>
		</PanelBody>
		<PanelBody title={ __( 'Write a review', 'meta-box-builder' ) } initialOpen={ true }>
			<PanelRow>
				<p>{ __( 'If you like this plugin, please write a review on WordPress.org to help us spread the word. We really appreciate that!', 'meta-box-builder' ) }</p>
				<p><a href="https://wordpress.org/support/plugin/meta-box/reviews/" target="_blank">{ __( 'Write a review', 'meta-box-builder' ) } &rarr;</a></p>
			</PanelRow>
		</PanelBody>
	</Panel>
);

export default Sidebar;