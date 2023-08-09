import { useRef, useState } from "@wordpress/element";
import slugify from "slugify";

const noIds = [ 'custom_html', 'divider', 'heading' ];

const useFieldNameId = field => {
	const noId = [ 'custom_html', 'divider', 'heading' ].includes( field.type );

	const [ name, setName ] = useState( field.name || '' );
	const [ id, setId ] = useState( noId ? '' : ( field.id || '' ) );
	const isFirstEdit = useRef( !!field._new );

	const updateName = value => {
		setName( value );

		if ( noId || !isFirstEdit.current ) {
			return;
		}

		setId( slugify( value, {
			lower: true,
			replacement: '_',
			remove: /[*+~.()'"!:@]/g
		} ) );
	};

	const noAutoGenerateId = () => isFirstEdit.current = false;

	return {
		name,
		updateName,
		id,
		updateId: setId,
		noAutoGenerateId,
	};
};

export default useFieldNameId;