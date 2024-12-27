import { Flex, Icon } from '@wordpress/components';
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
		if ( inside( e.target, '.components-button' ) ) {
			return;
		}

		setActiveField( activeField._id === field._id ? {} : field );
		setSidebarPanel( activeField._id === field._id ? '' : 'field_settings' );
	};

	return field.type && (
		<div className={ `og-item og-item--${ field.type } ${ field._id === activeField._id ? 'og-item--active' : '' }` }>
			<Flex
				gap={ 1 }
				align="center"
				className="og-item__header"
				title={ __( 'Click to reveal field settings. Drag and drop to reorder fields.', 'meta-box-builder' ) }
				onClick={ toggleSettings }
			>
				<Icon size={ 16 } icon={ getFieldIcon( field.type ) } className="og-item__icon" />
				<div className="og-item__label">{ getFieldLabel( field ) }</div>
				<Actions field={ field } { ...fieldActions } />
			</Flex>
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
