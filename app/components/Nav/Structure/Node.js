import { Icon } from '@wordpress/components';
import { memo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { isEqual } from 'lodash';
import { getFieldIcon, inside } from "../../../functions";
import useFieldSettingsPanel from "../../../hooks/useFieldSettingsPanel";
import useSidebarPanel from "../../../hooks/useSidebarPanel";
import Actions from './Actions';
import Group from './Group';

const Node = ( { field, parent = '', ...fieldActions } ) => {
	const { activeField, setActiveField } = useFieldSettingsPanel();
	const { setSidebarPanel } = useSidebarPanel();

	const toggleSettings = e => {
		if ( inside( e.target, '.og-item__editable,.og-column--actions,.og-column--label,.components-menu-item__item,.og-add-field' ) ) {
			return;
		}

		setActiveField( activeField._id === field._id ? {} : field );
		setSidebarPanel( activeField._id === field._id ? '' : 'field_settings' );
	};

	return field.type && (
		<div className={ `og-item og-item--${ field.type } ${ field._id === activeField._id ? 'og-item--active' : '' }` }>
			<div
				className="og-item__header"
				title={ __( 'Click to reveal field settings. Drag and drop to reorder fields.', 'meta-box-builder' ) }
				onClick={ toggleSettings }
			>
				<span className="og-column--label">
					<Icon icon={ getFieldIcon( field.type ) } />
					{ getFieldLabel( field ) }
				</span>
				<span className="og-column--space"></span>
				<span className="og-column--actions og-item__actions">
					<Actions field={ field } { ...fieldActions } />
				</span>
			</div>
			{
				field.type === 'group' && <Group field={ field } parent={ parent } />
			}
		</div>
	);
};

const getFieldLabel = field => [ 'hidden', 'divider' ].includes( field.type )
	? ucwords( field.type )
	: field.name || field.group_title || __( '(No label)', 'meta-box-builder' );

export default memo( Node, ( prev, next ) => {
	delete prev.field.fields;
	delete next.field.fields;

	return prev.parent === next.parent && isEqual( prev.field, next.field );
} );
