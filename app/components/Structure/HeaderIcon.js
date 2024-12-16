import { Icon } from '@wordpress/components';
import { archive } from '@wordpress/icons';

const HeaderIcon = ( { field } ) => {
	if ( field.type !== 'tab' ) {
		return;
	}

	const maps = {
		url: field.icon_url && <img className="og-item__icon" src={ field.icon_url } />,
		dashicons: field.icon && <span className={ `og-item__icon dashicons dashicons-${ field.icon }` }></span>,
		fontawesome: field.icon_fa && <span className={ `og-item__icon ${ field.icon_fa }` }></span>,
	};

	const defaultIcon = <Icon className="og-item__icon" icon={ archive } />;

	return maps[ field.icon_type ] || defaultIcon;
};

export default HeaderIcon;