import { useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import slugify from "slugify";

const noIds = [ 'custom_html', 'divider', 'heading' ];

const useFieldNameId = field => {
	const noId = [ 'custom_html', 'divider', 'heading' ].includes( field.type );

	const [ name, setName ] = useState( field.name || '' );
	const [ id, updateId ] = useState( noId ? '' : ( field.id || '' ) );
	const [ group_title, setGroupTitle ] = useState( field.group_title || '' );
	const [ label, setLabel ] = useState( [ 'hidden', 'divider' ].includes( field.type ) ? ucwords( field.type ) : field.name || field.group_title || __( '(No label)', 'meta-box-builder' ) );

	const isFirstEdit = useRef( !!field._new );

	const updateName = value => {
		setName( value );

		setLabel( [ 'hidden', 'divider' ].includes( field.type ) ? ucwords( field.type ) : value || group_title || __( '(No label)', 'meta-box-builder' ) );

		if ( noId || !isFirstEdit.current ) {
			return;
		}

		updateId( slugify( value, {
			lower: true,
			replacement: '_',
			remove: /[*+~.()'"!:@]/g
		} ) );
	};

	const updateGroupTitle = value => {
		setGroupTitle( value );
		setLabel( [ 'hidden', 'divider' ].includes( field.type ) ? ucwords( field.type ) : name || value || __( '(No label)', 'meta-box-builder' ) );
	}

	const noAutoGenerateId = () => isFirstEdit.current = false;

	return {
		...field,
		name,
		id,
		label,
		updateName,
		updateId,
		updateGroupTitle,
		noAutoGenerateId,
	};
};

export default useFieldNameId;