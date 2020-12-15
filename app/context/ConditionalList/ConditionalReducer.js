const conditionalReducer = ( state, action ) => {
	switch ( action.type ) {
		case 'initial':
			return action.payload;
		case 'add':
			const payload = action.payload;
			const key = Object.keys( payload )[ 0 ];

			return {
				...state,
				[ key ]: {
					...state[ key ],
					...payload[ key ]
				}
			};
		case 'remove':
			let newResult = { ...state };
			delete newResult[ action.payload.id ];
			return newResult;
		default:
			break;
	}
};

export default conditionalReducer;