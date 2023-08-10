import { useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import slugify from "slugify";
import { ucwords } from "../functions";

const noIds = [ 'custom_html', 'divider', 'heading' ];

const useFieldNameId = field => {
	const hasId = ![ 'custom_html', 'divider', 'heading' ].includes( field.type );
	const hasLabel = ![ 'hidden', 'divider' ].includes( field.type );

	const [ name, setName ] = useState( field.name || '' );
	const [ id, updateId ] = useState( hasId ? field.id || '' : '' );
	const [ group_title, updateGroupTitle ] = useState( field.group_title || '' );

	const isFirstEdit = useRef( !!field._new );

	const updateName = value => {
		setName( value );

		if ( hasId && isFirstEdit.current ) {
			updateId( slugify( value, {
				lower: true,
				replacement: '_',
				remove: /[*+~.()'"!:@]/g
			} ) );
		}
	};

	const noAutoGenerateId = () => isFirstEdit.current = false;

	const label = hasLabel ? name || group_title || __( '(No label)', 'meta-box-builder' ) : ucwords( field.type );

	return {
		name,
		id,
		group_title,
		label,
		updateName,
		updateId,
		updateGroupTitle,
		noAutoGenerateId,
	};
};

export default useFieldNameId;