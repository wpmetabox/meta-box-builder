import { request } from '../../functions';
import createDataContext from '../createDataContext';
import { GET_MB_FIELDS } from './CommonDataActions';
import commonDataReducer from './CommonDataReducer';

const getMBFields = dispatch => () => {
    request( 'fields' ).then( data => dispatch( { type: GET_MB_FIELDS, payload: data } ) );
};

export const { Provider, Context, actions } = createDataContext(
    commonDataReducer,
    { getMBFields },
    { MbFields: [] }
);