import { FieldIdsContext } from '/contexts/FieldIdsContext';
const { useContext } = wp.element;

export const AdminColumnsData = () => {
	const { fieldIds } = useContext( FieldIdsContext );

	return (
		<datalist id="admin-columns">
			<option value="cb" />
			<option value="title" />
			<option value="author" />
			<option value="categories" />
			<option value="tags" />
			<option value="comments" />
			<option value="date" />
			{ Object.entries( fieldIds ).map( ( [ id, field ] ) => <option key={ id } value={ field.id } /> ) }
		</datalist>
	);
};