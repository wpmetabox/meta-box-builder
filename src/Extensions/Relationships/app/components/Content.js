import { __ } from "@wordpress/i18n";
import GeneralSettings from "./GeneralSettings";
import Side from "./Side";

const Content = () => (
	<div className="mb-content">
		<GeneralSettings />
		<Side id="from" title={ __( 'From', 'meta-box-builder' ) } />
		<Side id="to" title={ __( 'To', 'meta-box-builder' ) } />
	</div>
);


export default Content;