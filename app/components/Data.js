import useFieldIds from '../hooks/useFieldIds';

export const Data = ( { id = "field-ids", children } ) => {
	const ids = useFieldIds( state => state.ids );

	return (
		<datalist id={ id }>
			{ children }
			{ Object.entries( ids ).map( ( [ id, fieldId ] ) => <option key={ id } value={ fieldId } /> ) }
		</datalist>
	);
};