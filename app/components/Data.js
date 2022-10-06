import { useFieldIdsStore } from '../contexts/FieldIdsContext';

export const Data = () => {
	const fieldIds = useFieldIdsStore( state => state.fieldIds );

	return (
		<datalist id="field-ids">
			{ Object.entries( fieldIds ).map( ( [ id, fieldId ] ) => <option key={ id } value={ fieldId } /> ) }
		</datalist>
	);
};