import createDataContext from './createDataContext';
import generatorReducer from './GeneratorReducer';
import { GENERATE_PHP_CODE } from './GeneratorActions';
import { getSelectedList } from '../utility/functions';

const generatePHPCode = dispatch => params => {
    const isTest = window.location.href.includes('localhost');
    let url = isTest ? 'http://localhost/metaboxio/wp-json/mbb-parser/meta-box' : 'https://metabox.io/wp-json/mbb-parser/meta-box';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formatParams(params))
    };
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => dispatch({ type: GENERATE_PHP_CODE, payload: data, responseTime: (new Date()).getTime() }))
        .catch(error => console.log(error));
};

const formatParams = (params) => {
    let result = new Map();
    const listSelected = getSelectedList();
    console.log('lll', listSelected)
    console.log('ppp', params)

    // format params setting tab
    const settingParams = Object.keys(params).filter(key => !key.includes('fields'));
    settingParams.map((item, index) => result[item] = settingParams[index]);

    result = loopChildren(listSelected.items, Object.keys(params), result);

    console.log('rrrr', result)
    // Object.keys(params).forEach((keyName, keyIndex) => {
    //     if (!keyName.includes('fields')) {
    //         result[keyName] = Object.values(params)[keyIndex]
    //         return;
    //     }
    //     // create params for selected fields
    //     console.log('@@@', Object.values(params)[keyIndex])

    //     listSelected.items.reduce((list, val, idx) => {
    //         const keys = keyName.split('-');
    //         keys.reduce((result, value, index) => {
    //             if (!result[value]) {
    //                 result[value] = {}
    //             }
    //             if (index === keys.length - 1) {
    //                 result[value] = Object.values(params)[keyIndex]
    //             }
    //             return result[value]
    //         }, result);
    //     })

    // })


    // const list = new Map()
    // listSelected.items.reduce((list, val, idx) => {
    //     console.log('@@@',list)
    //     console.log('vvv',val)
    //     console.log('iiii',idx)
    // },list)
    console.log('rrrr', result)

    return result
}

const formatField = (item, allParams, result) => {
    const fieldParams = allParams.filter(key => key.includes(item.id));
    console.log('@@@',fieldParams)
    console.log('hahah',result)
    fieldParams.map((keyName, keyIndex) => {
        const keys = keyName.split('-');
        keys.reduce((result, value, index) => {
            if (!result[value]) {
                result[value] = {}
            }
            if (index === keys.length - 1) {
                result[value] = allParams[keyIndex]
            }
        }, {});
    });

    return result;
}

const loopChildren = (items, allParams, result) => {
    if (items.length === 0) return
    items.map(item => {
        result = formatField(item, allParams, result)
        if (isGroupField()) {
            result = loopChildren(item.items, result[item.id])
        }
    })

    return result
}

const isGroupField = type => type === 'group'

export const { Provider, Context, actions } = createDataContext(
    generatorReducer,
    { generatePHPCode },
    { data: '', responseTime: '' }
);