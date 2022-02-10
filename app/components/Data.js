import { useContext } from "@wordpress/element";
import { FieldIdsContext } from '../contexts/FieldIdsContext';

export const Data = () => {
	const { fieldIds } = useContext( FieldIdsContext );

	return (
		<datalist id="field-ids">
			{ Object.entries( fieldIds ).map( ( [ id, field ] ) => <option key={ id } value={ field.id } /> ) }
		</datalist>
	);
};