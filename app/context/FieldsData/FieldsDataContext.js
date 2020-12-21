import { request } from '../../functions';
import createDataContext from '../createDataContext';
import fieldsDataReducer from './FieldsDataReducer';

const getFieldsData = dispatch => () => {
    request( 'fields' ).then( data => dispatch( { type: 'get', payload: data } ) );
};

export const { Provider, Context, actions } = createDataContext(
    fieldsDataReducer,
    { getFieldsData },
    { fieldsData: {} }
);