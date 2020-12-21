import { request } from '../../functions';
import createDataContext from '../createDataContext';
import { GENERATE_PHP_CODE } from './GeneratorActions';
import generatorReducer from './GeneratorReducer';

const generatePHPCode = dispatch => async ( params ) => {
	const data = await request( 'generate', params, 'POST', false );
	dispatch( {
		type: GENERATE_PHP_CODE,
		payload: data,
		responseTime: ( new Date() ).getTime()
	} );
};

export const { Provider, Context, actions } = createDataContext(
	generatorReducer,
	{ generatePHPCode },
	{ data: '', responseTime: '' }
);