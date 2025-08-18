import { Icon } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { external } from "@wordpress/icons";

export default ( { text, utm_source, utm_medium, className = '' } ) => (
	<div className={ `mb-upgrade-text ${ className }` }>
		{ text }
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