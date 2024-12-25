const Tooltip = ( { field } ) => {
	if ( !field.tooltip?.enable || !field.tooltip?.content ) {
		return;
	}

	const icon = field.tooltip?.icon || 'info';
	let tooltip = '';

	if ( /^http/.test( icon ) ) {
		tooltip = <img src={ icon } />;
	}
	if ( icon === 'info' ) {
		tooltip = <span className="dashicons dashicons-info" />;
	}
	if ( icon === 'help' ) {
		tooltip = <span className="dashicons dashicons-editor-help" />;
	}
	if ( icon.includes( 'dashicons' ) ) {
		tooltip = <span className={ `dashicons ${ icon }` } />;
	}

	return tooltip && <span className="mb-tooltip">{ tooltip }</span>;
};

export default Tooltip;