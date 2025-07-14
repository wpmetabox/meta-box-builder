import { Tooltip } from '@wordpress/components';

const TooltipIcon = ( { field } ) => {
	if ( !field.tooltip?.enable || !field.tooltip?.content ) {
		return;
	}

	const icon = field.tooltip?.icon || 'info';
	let tooltip = '';

	if ( /^http/.test( icon ) ) {
		tooltip = <img src={ icon } className="mb-field__icon" />;
	}
	if ( icon === 'info' ) {
		tooltip = <span className="mb-field__icon dashicons dashicons-info" />;
	}
	if ( icon === 'help' ) {
		tooltip = <span className="mb-field__icon dashicons dashicons-editor-help" />;
	}
	if ( icon.includes( 'dashicons' ) ) {
		tooltip = <span className={ `mb-field__icon dashicons ${ icon }` } />;
	}

	return <Tooltip text={ field.tooltip?.content } delay={ 0 } placement="bottom">{ tooltip }</Tooltip>;
};

export default TooltipIcon;