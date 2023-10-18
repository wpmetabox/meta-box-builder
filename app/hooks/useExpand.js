import { useReducer } from "@wordpress/element";

function reducer( state, { type, _id } ) {
	switch ( type ) {
		case 'expand-all':
			return state.map( field => ( { ...field, expand: true } ) );
		case 'collapse-all':
			return state.map( field => ( { ...field, expand: false } ) );
		case 'toggle-all':
			return state.map( field => ( { ...field, expand: false } ) );
		case 'toggle':
			const index = state.findIndex( field => field._id === _id );
			let newState = [ ...state ];
			newState[ index ].expand = !newState[ index ].expand;
			return newState;
	}
}

const useExpand = fields => {
	const initialState = fields.map( field => ( {
		_id: field._id,
		expand: false,
	} ) );

	const [ state, dispatch ] = useReducer( reducer, initialState );

	return {
		state,
		dispatch,
	};
};

export default useExpand;