import createDataContext from '../createDataContext';
import fieldTypesReducer from './FieldTypesReducer';

const getFieldTypes = dispatch => (type) => {
    const url = `http://demo1.elightup.com/buse2/og/api.php?type=${type}&fbclid=IwAR2B6qpcOVyslcCOULR2vW6S-2r4MKLG44-hDtQlklQ1Dfb2TVzuFOJawVw`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            dispatch({ type, payload: data })
        })
};

export const { Provider, Context, actions } = createDataContext(
    fieldTypesReducer,
    { getFieldTypes },
    {}
);