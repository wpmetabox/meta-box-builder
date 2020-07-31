import createDataContext from './createDataContext';
import generatorReducer from './GeneratorReducer';
import {GENERATE_PHP_CODE} from './GeneratorActions';

const generatePHPCode = dispatch => params => {
    const isTest = window.location.href.includes('localhost');
    let url = isTest ? 'http://localhost/metaboxio/wp-json/mbb-parser/meta-box' : 'https://metabox.io/wp-json/mbb-parser/meta-box';
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formatParams(params))
    };
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => dispatch({ type: GENERATE_PHP_CODE, payload: data, responseTime: (new Date()).getTime() }))
        .catch(error => console.log(error));
};

const formatParams = (params) => {
    let result = new Map();
    // format fields params
    Object.keys(params).forEach((keyName, keyIndex) => {
        if (!keyName.includes('fields')) {
            result[keyName] = Object.values(params)[keyIndex]
            return;
        }
        // create params for selected fields
        const keys = keyName.split('-');
        keys.reduce((result, value, index) => {
            if (!result[value]) {
                result[value] = {}
            }
            if (index === keys.length - 1) {
                result[value] = Object.values(params)[keyIndex]
            }
            return result[value]
        }, result);
    })

    return result
}

export const { Provider, Context, actions } = createDataContext(
    generatorReducer,
    { generatePHPCode },
    { data: '', responseTime: '' }
);