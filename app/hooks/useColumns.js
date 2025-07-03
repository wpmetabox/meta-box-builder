import { create } from 'zustand';

const useColumns = create( ( set, get ) => ( {
	fieldIds: [],
	addFieldId: fieldId => set( state => ( { fieldIds: [ ...state.fieldIds, fieldId ] } ) ),
	removeFieldId: fieldId => set( state => ( { fieldIds: state.fieldIds.filter( id => id !== fieldId ) } ) ),
	hasCustomColumns: () => get().fieldIds.length > 0,
} ) );

export default useColumns;