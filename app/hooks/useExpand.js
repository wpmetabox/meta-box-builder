import { useReducer } from "@wordpress/element";

const reducer = ( state, { type, _id } ) => {
	if ( type === 'toggle-all' ) {
		const current = !state.expandAll;
		return {
			expandAll: current,
			fields: state.fields.map( field => ( { ...field, expand: current } ) ),
		};
	}

	// Toggle field.
	let fields = [ ...state.fields ];
	const index = fields.findIndex( field => field._id === _id );
	fields[ index ].expand = !fields[ index ].expand;

	return {
		expandAll: state.expandAll,
		fields,
	};
};

const createInitialState = fields => ( {
	expandAll: false,
	fields: fields.map( field => ( {
		_id: field._id,
		expand: false,
	} ) ),
} );

const useExpand = fields => {
	const [ state, dispatch ] = useReducer( reducer, fields, createInitialState );

	return {
		state,
		dispatch,
	};
};

export default useExpand;