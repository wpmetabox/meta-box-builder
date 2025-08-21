import { Icon } from '@wordpress/components';
import { archive } from '@wordpress/icons';
import FieldLabel from './Elements/FieldLabel';

const Tab = ( { field, updateField } ) => (
	<div className="mb-field--tab__wrapper">
		<div className="mb-field--tab__content">
			<TabIcon field={ field } />
			<FieldLabel field={ field } updateField={ updateField } />
		</div>
	</div>
);

const TabIcon = ( { field } ) => {
	const maps = {
		url: field.icon_url && <img src={ field.icon_url } />,
		dashicons: field.icon && <span className={ `dashicons dashicons-${ field.icon }` }></span>,
		fontawesome: field.icon_fa && <span className={ field.icon_fa }></span>,
	};

	const defaultIcon = <Icon icon={ archive } />;

	return maps[ field.icon_type ] || defaultIcon;
};

export default Tab;