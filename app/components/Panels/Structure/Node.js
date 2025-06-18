import { Button, Icon, Tooltip } from '@wordpress/components';
import { useCopyToClipboard } from "@wordpress/compose";
import { memo, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { chevronDown, chevronUp } from "@wordpress/icons";
import { isEqual } from 'lodash';
import { getFieldIcon, scrollIntoView, ucwords } from "../../../functions";
import useFloatingStructurePanel from "../../../hooks/useFloatingStructurePanel";
import useNavPanel from "../../../hooks/useNavPanel";
import { setFieldActive } from "../../../list-functions";
import Actions from './Actions';
import Group from './Group';

const Node = ( { field, parent = '', ...fieldActions } ) => {
	const [ copied, setCopied ] = useState( false );
	const [ expanded, setExpanded ] = useState( true );
	const { floating } = useFloatingStructurePanel();
	const { setNavPanel } = useNavPanel();

	const copyRef = useCopyToClipboard( field.id, () => {
		setCopied( true );
		setTimeout( () => setCopied( false ), 2000 );
	} );

	const toggleGroup = e => {
		e.stopPropagation();
		setExpanded( prev => !prev );
	};

	const handleItemClick = () => {
		setFieldActive( field._id );
		scrollIntoView( `mb-field-${ field._id }` );
		if ( floating ) {
			setNavPanel( 'field-settings' );
		}
	};

	return field.type && (
		<div className={ `og-item og-item--${ field.type } ${ field._active ? 'og-item--active' : '' }` }>
			<div className="og-item__header" onClick={ handleItemClick }>
				{
					field.type === 'group'
						? (
							<Button
								icon={ expanded ? chevronUp : chevronDown }
								size="small"
								iconSize={ 16 }
								onClick={ toggleGroup }
								label={ expanded ? __( 'Hide sub-fields', 'meta-box-builder' ) : __( 'Show sub-fields', 'meta-box-builder' ) }
								showTooltip={ true }
								className="og-item__toggle"
							/>
						)
						: <Icon size={ 16 } icon={ getFieldIcon( field.type ) } className="og-item__icon" />
				}
				<div className="og-item__label">{ getFieldLabel( field ) }</div>
				<div className="og-item__id">
					<Tooltip text={ copied ? __( 'Copied!', 'meta-box-builder' ) : __( 'Click to copy', 'meta-box-builder' ) } delay={ 0 } placement="bottom" hideOnClick={ false }>
						<span ref={ copyRef }>{ field.id }</span>
					</Tooltip>
				</div>
				<Actions field={ field } { ...fieldActions } />
			</div>
			{
				field.type === 'group' && expanded && <Group field={ field } parent={ parent } />
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
