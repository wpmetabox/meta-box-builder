import useFieldIds from '../hooks/useFieldIds';

export const Data = ( { id = "field-ids", children } ) => {
	const ids = useFieldIds( state => state.ids );
	const fields = Array.from( new Set( Object.values( ids ) ) );
	return (
		<datalist id={ id }>
			{ children }
			{ fields.map( ( fieldId, id ) => <option key={ id } value={ fieldId } /> ) }
		</datalist>
	);
};