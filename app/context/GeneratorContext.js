import createDataContext from './createDataContext';
import generatorReducer from './GeneratorReducer';
import { GENERATE_PHP_CODE } from './GeneratorActions';
import { getSelectedList } from '../utility/functions';

const generatePHPCode = dispatch => params => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify( formatParams( params ) )
	};
	fetch( `${ MbbApp.rest }/mbb-parser/meta-box`, requestOptions )
		.then( response => response.json() )
		.then( data => dispatch( { type: GENERATE_PHP_CODE, payload: data, responseTime: ( new Date() ).getTime() } ) )
		.catch( error => console.log( error ) );
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
			result.fields.push( formatField( item.id, params ) );
		} else {
			result.fields.push( formatGroupField( item, params ) );
		}
	} );

	return result;
};

const isSettingValue = key => !key.includes( 'fields' );

const isNotGroupField = type => type !== 'group';

const isOwnField = ( key, id ) => key.includes( id );

const getKeyValue = key => key.split( '-' ).slice( -1 ).pop();


const formatField = ( id, params ) => {
	let result = {};
	for ( const key in params ) {
		if ( isOwnField( key, id ) ) {
			const keyValue = getKeyValue( key );
			result[ keyValue ] = params[ key ];
		}
	}

	return result;
};

const formatGroupField = ( item, params, result = {} ) => {
	const childrens = item.items;
	if ( childrens.length === 0 ) return;
	// fill group params
	for ( const key in params ) {
		if ( isOwnField( key, item.id ) ) {
			const keyValue = getKeyValue( key );
			result[ keyValue ] = params[ key ];
		}
	}
	// handle children fields
	if ( childrens ) {
		result.fields = [];
		childrens.map( children => {
			if ( isNotGroupField( children.type ) ) {
				result.fields.push( formatField( children.id, params ) );
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