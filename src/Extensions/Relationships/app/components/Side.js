import { Dashicon } from "@wordpress/components";
import { useReducer } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Field from './sections/Field';
import General from './sections/General';
import MetaBox from './sections/MetaBox';

const Side = ( { id, title } ) => {
	const [ expanded, toggle ] = useReducer( expanded => !expanded, true );

	return (
		<div className={ `og-item og-collapsible${ expanded ? ' og-collapsible--expanded' : '' }` }>
			<div className="og-item__header og-collapsible__header" onClick={ toggle } title={ __( 'Click to toggle side settings', 'meta-box-builder' ) }>
				<span className="og-item__title">{ title }</span>
				<span className="og-item__actions">
					<span className="og-item__action og-item__action--toggle" title={ __( 'Toggle settings', 'meta-box-builder' ) }><Dashicon icon="arrow-down" /></span>
				</span>
			</div>
			<General id={ id } />
			<MetaBox id={ id } />
			<Field id={ id } />
		</div>
	);
};

export default Side;