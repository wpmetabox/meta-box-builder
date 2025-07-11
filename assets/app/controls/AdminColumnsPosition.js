import { __ } from "@wordpress/i18n";
import useAllFields from "../hooks/useAllFields";
import useSettings from "../hooks/useSettings";
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const AdminColumnsPosition = ( { componentId, defaultValue, updateField, ...rest } ) => {
	const { getObjectType } = useSettings();
	const objectType = getObjectType();

	const defaultColumns = {
		term: 'name',
		user: 'username'
	};
	const defaultColumn = defaultColumns[ objectType ] || 'title';

	let fields = useAllFields().map( field => [ field.id, `${ field.name } (${ field.id })` ] );
	fields = [ ...objectTypeFields( objectType ), ...fields ];

	const handleChangeType = e => updateField( 'admin_columns.position.type', e.target.value );
	const handleChangeColumn = ( inputRef, value ) => updateField( 'admin_columns.position.column', value );
	const handleSelectColumn = ( inputRef, value ) => {
		inputRef.current.value = value;
		updateField( 'admin_columns.position.column', value );
	};

	let type;
	let column;
	if ( typeof defaultValue === 'string' ) {
		const parts = defaultValue.split( ' ' );
		type = parts[ 0 ] || 'after';
		column = parts[ 1 ] || defaultColumn;
	} else {
		type = defaultValue.type || 'after';
		column = defaultValue.column || defaultColumn;
	}

	return (
		<DivRow { ...rest }>
			<select defaultValue={ type } onChange={ handleChangeType }>
				<option value="after">{ __( 'After', 'meta-box-builder' ) }</option>
				<option value="before">{ __( 'Before', 'meta-box-builder' ) }</option>
				<option value="replace">{ __( 'Replace', 'meta-box-builder' ) }</option>
			</select>
			<FieldInserter
				id={ componentId }
				defaultValue={ column }
				items={ fields }
				isID={ true }
				exclude={ objectTypeFields( objectType ) }
				onChange={ handleChangeColumn }
				onSelect={ handleSelectColumn }
			/>
		</DivRow>
	);
};

const objectTypeFields = objectType => {
	if ( objectType === 'term' ) {
		return [
			[ 'cb', __( 'Checkbox', 'meta-box-builder' ) ],
			[ 'name', __( 'Name', 'meta-box-builder' ) ],
			[ 'description', __( 'Description', 'meta-box-builder' ) ],
			[ 'slug', __( 'Slug', 'meta-box-builder' ) ],
			[ 'count', __( 'Count', 'meta-box-builder' ) ],
		];
	}

	if ( objectType === 'user' ) {
		return [
			[ 'cb', __( 'Checkbox', 'meta-box-builder' ) ],
			[ 'username', __( 'Username', 'meta-box-builder' ) ],
			[ 'name', __( 'Name', 'meta-box-builder' ) ],
			[ 'email', __( 'Email', 'meta-box-builder' ) ],
			[ 'role', __( 'Role', 'meta-box-builder' ) ],
			[ 'posts', __( 'Posts', 'meta-box-builder' ) ],
		];
	}

	return [
		[ 'cb', __( 'Checkbox', 'meta-box-builder' ) ],
		[ 'title', __( 'Title', 'meta-box-builder' ) ],
		[ 'author', __( 'Author', 'meta-box-builder' ) ],
		[ 'categories', __( 'Categories', 'meta-box-builder' ) ],
		[ 'tags', __( 'Tags', 'meta-box-builder' ) ],
		[ 'comments', __( 'Comments', 'meta-box-builder' ) ],
		[ 'date', __( 'Date', 'meta-box-builder' ) ],
	];
};

export default AdminColumnsPosition;