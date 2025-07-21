import { RawHTML, useState } from '@wordpress/element';
import { __, sprintf } from "@wordpress/i18n";
import { useFetch } from "../hooks/useFetch";
import DivRow from './DivRow';

const Id = ( { field, componentId, updateField, ...rest } ) => {
	const { data: ids } = useFetch( { api: 'fields-ids', defaultValue: [] } );
	const [ existingFieldGroup, setExistingFieldGroup ] = useState( {} );
	const [ duplicate, setDuplicate ] = useState( false );

	// Check if this is a post field (has _original_type)
	const isPostField = field._original_type && field._original_type.startsWith( 'post_' );

	// Don't show the ID control for post fields as it's always fixed.
	if ( isPostField ) {
		return null;
	}

	const handleChange = e => {
		// Don't allow changes for post fields
		if ( isPostField ) {
			return;
		}

		updateField( 'id', e.target.value );
		updateField( '_id_changed', true );
		checkDuplicateId( e.target.value );
	};

	const checkDuplicateId = value => {
		// Has a duplicate and not the current field
		if ( ids[ value ] !== undefined && ids[ value ]?._id !== field._id ) {
			setExistingFieldGroup( ids[ value ] );
			setDuplicate( true );
			return;
		}

		setExistingFieldGroup( {} );
		setDuplicate( false );
	};

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input
				type="text"
				id={ componentId }
				value={ field.id }
				onChange={ handleChange }
				pattern="[A-Za-z0-9\-_]+"
			/>
			{
				duplicate &&
				<RawHTML className="og-description og-error">
					{
						sprintf(
							__( 'This ID already exists in the field group <a href="%s">%s</a>, please change it or edit that field group to avoid duplication.', 'meta-box-builder' ),
							existingFieldGroup.link,
							existingFieldGroup.title
						)
					}
				</RawHTML>
			}
		</DivRow>
	);
};

export default Id;