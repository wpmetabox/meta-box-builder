import { GET_MB_FIELDS } from './CommonDataActions';

const commonDataReducer = ( state, action ) => {
    switch ( action.type ) {
        case GET_MB_FIELDS:
            localStorage.setItem( 'MbFields', JSON.stringify( action.payload ) );
            return { ...state, MbFields: action.payload };
        default:
            return state;
    }
};

export default commonDataReducer;