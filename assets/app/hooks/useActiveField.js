import { create } from 'zustand';

const useActiveField = create( set => ( {
	fieldId: null,
	setFieldActive: fieldId => set( { fieldId } ),
} ) );

export default useActiveField;
