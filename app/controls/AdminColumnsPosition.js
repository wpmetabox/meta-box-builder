import { __ } from "@wordpress/i18n";
import useSettings from "../hooks/useSettings";
import { getAllFields } from "../list-functions";
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const AdminColumnsPosition = ( { name, componentId, defaultValue, ...rest } ) => {
	const { getObjectType } = useSettings();
	const objectType = getObjectType();

	const defaultColumns = {
		term: 'name',
		user: 'username'
	};
	const defaultColumn = defaultColumns[ objectType ] || 'title';

	// Select only text and select fields.
	let fields = getAllFields()
		.filter( field => [ 'text', 'select' ].includes( field.type ) )
		.map( field => [ field.id, `${ field.name } (${ field.id })` ] );

	fields = [ ...objectTypeFields( objectType ), ...fields ];

	return (
		<DivRow { ...rest }>
			<select name={ `${ name }[type]` } defaultValue={ defaultValue.type || 'after' }>
				<option value="after">{ __( 'After', 'meta-box-builder' ) }</option>
				<option value="before">{ __( 'Before', 'meta-box-builder' ) }</option>
				<option value="replace">{ __( 'Replace', 'meta-box-builder' ) }</option>
			</select>
			<FieldInserter id={ componentId } name={ `${ name }[column]` } defaultValue={ defaultValue.column || defaultColumn } items={ fields } isID={ true } exclude={ objectTypeFields( objectType ) } />
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