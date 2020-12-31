import { FieldIdsContext } from '../contexts/FieldIdsContext';
const { useContext } = wp.element;

export const Data = () => {
	const { fieldIds } = useContext( FieldIdsContext );

	return (
		<datalist id="field-ids">
			{ Object.entries( fieldIds ).map( ( [ id, field ] ) => <option key={ id } value={ field.id } /> ) }
		</datalist>
	);
};