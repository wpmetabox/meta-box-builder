const fieldsDataReducer = ( state, action ) => {
    switch ( action.type ) {
        case 'get':
            return { ...state, fieldsData: action.payload };
        default:
            return state;
    }
};

export default fieldsDataReducer;