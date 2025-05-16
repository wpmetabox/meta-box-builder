import { Icon, Tooltip } from '@wordpress/components';
import { useCopyToClipboard } from "@wordpress/compose";
import { memo, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { isEqual } from 'lodash';
import { getFieldIcon, scrollIntoView, ucwords } from "../../../functions";
import Actions from './Actions';
import Group from './Group';

const Node = ( { field, parent = '', ...fieldActions } ) => {
	const [ copied, setCopied ] = useState( false );

	const copyRef = useCopyToClipboard( field.id, () => {
		setCopied( true );
		setTimeout( () => setCopied( false ), 2000 );
	} );

	const scrollToField = () => scrollIntoView( `mb-field-${ field._id }` );

	return field.type && (
		<div className={ `og-item og-item--${ field.type }` }>
			<input type="hidden" name={ `fields${ parent }[${ field._id }]` } defaultValue={ JSON.stringify( field ) } />

			<div className="og-item__header" onClick={ scrollToField }>
				<Icon size={ 16 } icon={ getFieldIcon( field.type ) } className="og-item__icon" />
				<div className="og-item__label">{ getFieldLabel( field ) }</div>
				<div className="og-item__id">
					<Tooltip text={ copied ? __( 'Copied!', 'meta-box-builder' ) : __( 'Click to copy', 'meta-box-builder' ) } delay={ 0 } placement="bottom" hideOnClick={ false }>
						<span ref={ copyRef }>{ field.id }</span>
					</Tooltip>
				</div>
				<Actions field={ field } { ...fieldActions } />
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
