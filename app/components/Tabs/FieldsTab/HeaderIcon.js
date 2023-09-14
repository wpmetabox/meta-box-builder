const HeaderIcon = ( { field, iconData } ) => {
	if ( field.type !== 'tab' || !iconData.icon) {
		return;
	}

	const cssClasses = iconData.icon.includes( 'fa' ) ? '' : 'dashicons dashicons-';

	return <span className={ `og-item__icon ${cssClasses}${ iconData.icon }` }></span>;
};

export default HeaderIcon;