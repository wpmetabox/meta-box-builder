import { GENERATE_PHP_CODE, ERROR } from './GeneratorActions';

const generatorReducer = (state, action) => {
    switch (action.type) {
        case GENERATE_PHP_CODE:
            return { ...state, data: action.payload,responseTime: action.responseTime };
        case ERROR:
            return { ...state, responseTime: action.responseTime };
        default:
            return state;
    }
};

export default generatorReducer;