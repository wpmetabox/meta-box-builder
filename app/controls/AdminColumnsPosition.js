import { __ } from "@wordpress/i18n";
import useObjectType from "../hooks/useObjectType";
import DivRow from './DivRow';
import { useContext } from '@wordpress/element';
import { SettingsContext } from "../contexts/SettingsContext";
import useFieldIds from '../hooks/useFieldIds';
import FieldInserter from './FieldInserter';

const AdminColumnsPosition = ( { name, componentId, defaultValue, ...rest } ) => {
	const { settings } = useContext( SettingsContext );
	const objectType = useObjectType( state => state.type );
	const defaultColumns = {
		term: 'name',
		user: 'username'
	}
	const defaultColumn = defaultColumns[ objectType ] || 'title';

	const ids = Array.from( new Set( Object.values( useFieldIds( state => state.ids ) ) ) );
	const fullIDs = ids.map( id => `${ settings.prefix }${ id }` );
	const fields = [ ...objectTypeFields( objectType ) , ...fullIDs ];

	return (
		<DivRow { ...rest }>
			<select name={ `${ name }[type]` } defaultValue={ defaultValue.type || 'after' }>
				<option value="after">{ __( 'After', 'meta-box-builder' ) }</option>
				<option value="before">{ __( 'Before', 'meta-box-builder' ) }</option>
				<option value="replace">{ __( 'Replace', 'meta-box-builder' ) }</option>
			</select>
			<FieldInserter id={ componentId } name={ `${ name }[column]` } defaultValue={ defaultValue.column || defaultColumn } items={ fields } />
		</DivRow>
	);
};

const objectTypeFields = ( { objectType } ) => {
	if ( objectType === 'term' ) {
		return [ 'cb, name, description, slug, count' ];
	}

	if ( objectType === 'user' ) {
		return [ 'cb, username, name, email, role, posts' ];
	}

	return [ 'cb', 'title', 'author', 'categories', 'tags', 'comments', 'date' ];
};

export default AdminColumnsPosition;