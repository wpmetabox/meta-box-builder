import { useFieldIdsStore } from '../contexts/FieldIdsContext';

export const Data = () => {
	const ids = useFieldIdsStore( state => state.ids );

	return (
		<datalist id="field-ids">
			{ Object.entries( ids ).map( ( [ id, fieldId ] ) => <option key={ id } value={ fieldId } /> ) }
		</datalist>
	);
};