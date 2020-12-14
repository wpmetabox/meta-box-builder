import { getSelectedList, isNotGroupField, request } from '../../utility/functions';
import createDataContext from '../createDataContext';
import { GENERATE_PHP_CODE } from './GeneratorActions';
import generatorReducer from './GeneratorReducer';

const generatePHPCode = dispatch => async ( params ) => {
	const data = await request( 'generate', formatParams( params ), 'POST', false );
	dispatch( {
		type: GENERATE_PHP_CODE,
		payload: data,
		responseTime: ( new Date() ).getTime()
	} );
};

export const formatParams = ( params ) => {
	let result = new Map();
	const listSelected = getSelectedList();

	// format params setting tab
	for ( const key in params ) {
		if ( isSettingValue( key ) ) {
			result[ key ] = params[ key ];
		}
	}
	result.fields = [];
	listSelected.items.map( item => {
		if ( isNotGroupField( item.type ) ) {
			result.fields.push( params.fields[ item.id ] );
		} else {
			result.fields.push( formatGroupField( item, params.fields ) );
		}
	} );

	return result;
};

const isSettingValue = key => !key.includes( 'fields' );

const formatGroupField = ( item, params, result = {} ) => {
	const childrens = item.items;
	if ( childrens.length === 0 ) return;
	// fill group params
	const groupParams = params[ item.id ];
	for ( const key in groupParams ) {
		result[ key ] = groupParams[ key ];
	}
	// handle children fields
	if ( childrens ) {
		result.fields = [];
		childrens.map( children => {
			if ( isNotGroupField( children.type ) ) {
				result.fields.push( params[ children.id ] );
			} else {
				result.fields.push( formatGroupField( children, params ) );
			}
		} );
	}

	return result;
};


export const { Provider, Context, actions } = createDataContext(
	generatorReducer,
	{ generatePHPCode },
	{ data: '', responseTime: '' }
);