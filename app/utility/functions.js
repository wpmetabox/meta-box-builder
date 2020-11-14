import { DATA_LIST_TYPE, LIST_OPTION_TYPE } from '../constants/constants';

export const getLabel = ( name, type ) => {
	const labels = {
		taxonomy: "Taxonomy",
	};

	return ( name === 'std' && type === 'checkbox' ) ? "Checked?" : labels[ name ];
};

export const getElementControlName = ( name, type ) => {
	return toTitleCase( name );
};

export const fillFieldsValues = ( params ) => {
	let result = { settings: {} };
	const selectedData = { ...getSelectedList() };
	const listSelected = selectedData.items;
	const fieldParams = params.fields;

	listSelected.map( ( item, index ) => {
		if ( isNotGroupField( item.type ) ) {
			listSelected[ index ] = fillFieldData( item, fieldParams[ item.id ] );
		} else {
			listSelected[ index ] = fillGroupData( item, fieldParams );
		}
	} );
	result.fields = listSelected;

	for ( const key in params ) {
		if ( isSettingValue( key ) ) {
			result.settings[ key ] = params[ key ];
		}
	}

	return result;
};

const fillGroupData = ( item, params ) => {
	let result = { ...item };
	result = fillFieldData( item, params[ item.id ] );
	result.items.map( ( item, index ) => {
		if ( isNotGroupField( item.type ) ) {
			result.items[ index ] = fillFieldData( item, params[ item.id ] );
		} else {
			result.items[ index ] = fillGroupData( item, params );
		}
	} );

	return result;
};

const fillFieldData = ( item, data ) => {
	let result = { ...item };
	result.data.general = fillDataByKey( item.data.general, data );
	result.data.advanced = fillDataByKey( item.data.advanced, data );

	return result;
};

const fillDataByKey = ( items, data ) => {
	let result = {};
	Object.keys( items ).forEach( key => {
		if ( LIST_OPTION_TYPE.includes( key ) && data[ key ] ) {
			let optionalList = [];
			for ( let i = 0; i < data[ key ].length; i++ ) {
				optionalList[ i ] = {};
				optionalList[ i ][ 'key' ] = data[ key ][ i ][ 'key' ];
				optionalList[ i ][ 'value' ] = data[ key ][ i ][ 'value' ];
			}
			result[ key ] = { ...items[ key ], default: optionalList };
		} else if ( key === 'conditional_logic' && data[ key ] ) {
			const type = data[ key ][ 'type' ];
			const relation = data[ key ][ 'relation' ];

			let optionalList = [];
			for ( let i = 0; i < data[ key ][ 'logic' ][ 'length' ]; i++ ) {
				optionalList[ i ] = {};
				optionalList[ i ][ 'name' ] = data[ key ][ 'logic' ][ i ][ 'name' ];
				optionalList[ i ][ 'operator' ] = data[ key ][ 'logic' ][ i ][ 'operator' ];
				optionalList[ i ][ 'value' ] = data[ key ][ 'logic' ][ i ][ 'value' ];
			}

			result[ key ] = { ...items[ key ], default: { relation, type, list: optionalList } };
		} else {
			result[ key ] = { ...items[ key ], default: data[ key ] };
		}
	} );

	return result;
};

const isSettingValue = key => !key.includes( 'fields' );

export const getCopiedItemData = ( type, id ) => {
	const fields = JSON.parse( localStorage.getItem( 'MbFields' ) );
	let data = fields[ type ];
	let result = {};
	result.general = getGeneralData( data.general, id );
	result.advanced = getAdvancedData( data.advanced, id );
	return result;
};

const getGeneralData = ( generalItems, id ) => {
	let result = {};

	Object.keys( generalItems ).forEach( item => {
		const elementId = `fields-${ id }-${ item }`;
		let value = getElementValue( elementId );
		if ( typeof value === "boolean" ) {
			value = value;
		} else {
			value = value || generalItems[ item ].default;
		}
		// set id value is empty when copy field
		if ( item == 'id' ) {
			result[ item ] = { ...generalItems[ item ], default: '' };
		} else {
			result[ item ] = { ...generalItems[ item ], default: value };
		}

		if ( LIST_OPTION_TYPE.includes( item ) ) {
			let optionalList = [];
			for ( let i = 0; i < value; i++ ) {
				optionalList[ i ] = {};
				optionalList[ i ][ 'key' ] = getElementValue( `fields-${ id }-${ item }-${ i }-key` );
				optionalList[ i ][ 'value' ] = getElementValue( `fields-${ id }-${ item }-${ i }-value` );
			}

			result[ item ] = { ...generalItems[ item ], default: optionalList };
		}
	} );

	return result;
};

const getAdvancedData = ( advancedItems, id ) => {
	let result = {};
	Object.keys( advancedItems ).forEach( item => {
		const elementId = `fields-${ id }-${ item }`;
		let value = getElementValue( elementId );
		if ( typeof value === "boolean" ) {
			value = value;
		} else {
			value = value || advancedItems[ item ].default;
		}

		if ( item === 'conditional_logic' ) {
			const type = getElementValue( `fields-${ id }-${ item }-type` );
			const relation = getElementValue( `fields-${ id }-${ item }-relation` );

			let optionalList = [];
			for ( let i = 0; i < value; i++ ) {
				optionalList[ i ] = {};
				optionalList[ i ][ 'name' ] = getElementValue( `fields-${ id }-${ item }-${ i }-name` );
				optionalList[ i ][ 'operator' ] = getElementValue( `fields-${ id }-${ item }-${ i }-operator` );
				optionalList[ i ][ 'value' ] = getElementValue( `fields-${ id }-${ item }-${ i }-value` );
			}

			result[ item ] = { ...advancedItems[ item ], default: { relation, type, list: optionalList } };
		} else if ( LIST_OPTION_TYPE.includes( item ) ) {
			let optionalList = [];
			for ( let i = 0; i < value; i++ ) {
				optionalList[ i ] = {};
				optionalList[ i ][ 'key' ] = getElementValue( `fields-${ id }-${ item }-${ i }-key` );
				optionalList[ i ][ 'value' ] = getElementValue( `fields-${ id }-${ item }-${ i }-value` );
			}

			result[ item ] = { ...advancedItems[ item ], default: optionalList };
		} else if ( DATA_LIST_TYPE.includes( item ) ) {
			let dataList = [];
			let idDataList = document.getElementsByName( `fields-${ id }-datalist-id` )[ 0 ]?.value;
			const listValue = document.getElementsByName( `fields-${ id }-datalist-options-0` );

			listValue.forEach( input => {
				dataList.push( input.value );
			} );

			result[ item ] = { ...advancedItems[ item ], id: idDataList, items: dataList };
		} else {
			result[ item ] = { ...advancedItems[ item ], default: value };
		}
	} );

	return result;
};

const getElementValue = id => {
	const element = document.querySelector( `[id="${ id }"]` );
	if ( !element ) {
		return null;
	}
	if ( [ 'SELECT', 'TEXTAREA' ].includes( element.tagName ) || [ 'text', 'number', 'email', 'hidden' ].includes( element.type ) ) {
		return element.value;
	}
	if ( 'checkbox' === element.type ) {
		return element?.checked;
	}
	if ( 'radio' === element.type ) {
		return document.querySelector( `[name="${ name }"]:checked` ).value;
	}
};

export const addGroupChild = ( groupId, childList ) => {
	const selectedList = getSelectedList();
	const updatedList = findNode( groupId, selectedList, childList );
	updateSelectedList( updatedList );

	return updatedList;
};

const findNode = ( id, node, childList ) => {
	if ( node.items.length > 0 ) {
		const exactedField = node.items.filter( item => item.id === id );
		if ( exactedField.length > 0 ) {
			exactedField[ 0 ].items = childList;
		} else {
			node.items.map( ( item ) => findNode( id, item, childList ) );
		}
	}

	return node;
};

export const isNotGroupField = type => type !== 'group';

export const updateSelectedList = data => localStorage.setItem( 'selectedList', JSON.stringify( data ) );

export const getSelectedList = () => JSON.parse( localStorage.getItem( 'selectedList' ) );

export const ucfirst = string => string.charAt( 0 ).toUpperCase() + string.slice( 1 );

const toTitleCase = string => string.split( '_' ).map( ucfirst ).join( '' );

export const uniqid = () => Math.random().toString( 36 ).substr( 2 );

export const objectToArray = object => Object.entries( object ).map( ( [ value, label ] ) => ( { value, label } ) );

let apiCache = {};
export const request = async ( apiName, params = {}, method = 'GET' ) => {
	let options = {
		method,
		headers: { 'X-WP-Nonce': MbbApp.nonce, 'Content-Type': 'application/json' },
	};
	let cacheKey = apiName;
	if ( 'POST' === method ) {
		options.body = JSON.stringify( params );
		cacheKey += options.body;
	} else {
		apiName += '?' + ( new URLSearchParams( params ) ).toString();
		cacheKey = apiName;
	}

	if ( apiCache[ cacheKey ] ) {
		return apiCache[ cacheKey ];
	}

	const result = await fetch( `${ MbbApp.rest }/mbb/${ apiName }`, options ).then( response => response.json() );
	apiCache[ cacheKey ] = result;
	return result;
};