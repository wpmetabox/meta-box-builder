import { RawHTML, useCallback, useEffect, useState } from '@wordpress/element';
import { __, sprintf } from "@wordpress/i18n";
import { debounce } from 'lodash';
import useApi from "../hooks/useApi";
import DivRow from './DivRow';

/**
 * Fix cursor jumping to the end of the `<input>` after typing.
 * @link https://github.com/facebook/react/issues/18404#issuecomment-605294038
 */
const Id = ( { field, name, componentId, updateField, ...rest } ) => {
	const ids = useApi( 'fields-ids', [] );
	const [ existingFieldGroup, setExistingFieldGroup ] = useState( {} );
	const [ duplicate, setDuplicate ] = useState( false );
	const [ value, setValue ] = useState( field.id );

	// Live update value with incoming change.
	useEffect( () => {
		setValue( field.id );
	}, [ field.id, field._id_changed ] );

	// Live update to the input, and debounce update to the field.
	const handleChange = e => setValue( e.target.value );
	const debouncedUpdate = useCallback(
		debounce( val => {
			checkDuplicateId( val );
			updateField( 'id', val );
		}, 300 ),
		[] // empty deps means it runs once
	);
	useEffect( () => {
		debouncedUpdate( value );
	}, [ value, debouncedUpdate ] );

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
				name={ name }
				value={ value }
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