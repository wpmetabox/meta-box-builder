import { DATA_LIST_TYPE, LIST_OPTION_TYPE } from '../constants/constants';
import { keepValueNodeFrom } from './updateSelectedList';

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
	const listSelected = { ...getSelectedList() };
	listSelected.items.map( ( item, index ) => {
		listSelected.items[ index ] = getFieldValue( item );
	} );
	result.fields = listSelected;
	for ( const key in params ) {
		if ( isSettingValue( key ) ) {
			result.settings[ key ] = params[ key ];
		}
	}

	return result;
};

const isSettingValue = key => !key.includes( 'fields' );

const getFieldValue = ( item ) => {
	return keepValueNodeFrom( item );
};

export const getDataCopiedItem = ( type, id ) => {
	const fields = JSON.parse( localStorage.getItem( 'MbFields' ) );
	let data = fields[ type ];
	let result = {};
	result.general = getGeneralData( data.general, id );
	result.advanced = getAdvancedData( data.advanced, id );

	return result;
};

const getGeneralData = ( generalItems, id ) => {
	let result = {};
	const multipleInputTypes = [ 'fieldset_text', 'text_list' ];

	Object.keys( generalItems ).forEach( item => {
		const elementName = `fields-${ id }-${ item }`;
		let value = getElementValue( elementName );
		value = value || generalItems[ item ].default;
		if ( item == 'id' ) {
			result[ item ] = { ...generalItems[ item ], default: '' };
		} else {
			result[ item ] = { ...generalItems[ item ], default: value };
		}


		if ( item === 'options' && multipleInputTypes.includes( item ) ) {
			let options = [];
			for ( let i = 0; i < value; i++ ) {
				options[ i ] = {};
				options[ i ][ 'key' ] = getElementValue( `fields-${ id }-${ item }-${ i }-key` );
				options[ i ][ 'label' ] = getElementValue( `fields-${ id }-${ item }-${ i }-value` );
			}
			result[ item ] = options;
		}
	} );

	return result;
};

const getAdvancedData = ( advancedItems, id ) => {
	let result = {};
	Object.keys( advancedItems ).forEach( item => {
		const elementName = `fields-${ id }-${ item }`;
		let value = getElementValue( elementName );
		value = value || advancedItems[ item ].default;

		if ( LIST_OPTION_TYPE.includes( item ) ) {
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

export const parseFields = ( listFields ) => {
	return listFields.map( ( item ) => formatField( item ) );
};

const formatField = ( field ) => {
	JSON.parse( localStorage.getItem( 'MbFields' ) );
	let result = { data: { ...fields[ field.type ] }, id: field.id, type: field.type };


	Object.keys( field ).map( key => {
		if ( result.data.general.hasOwnProperty( key ) ) {
			result.data.general[ key ] = field[ key ];
		}
		if ( result.data.advanced.hasOwnProperty( key ) ) {
			result.data.general[ key ] = field[ key ];
		}
	} );


	return result;
};

const getElementValue = name => {
	const element = document.querySelector( `[name="${ name }"]` );
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
};

const findNode = ( id, node, childList ) => {
	if ( node.items.length > 0 ) {
		const exactedFiled = node.items.filter( item => item.id === id );
		if ( exactedFiled ) {
			exactedFiled[ 0 ].items = childList;
		} else {
			node.items.map( ( item ) => findNode( id, item, childList ) );
		}
	}

	return node;
};


export const updateSelectedList = data => localStorage.setItem( 'selectedList', JSON.stringify( data ) );

export const getSelectedList = () => JSON.parse( localStorage.getItem( 'selectedList' ) );


export const ucfirst = string => string.charAt( 0 ).toUpperCase() + string.slice( 1 );
const toTitleCase = string => string.split( '_' ).map( ucfirst ).join( '' );

export const uniqid = () => Math.random().toString( 36 ).substr( 2 );

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
	}

	if ( apiCache[ cacheKey ] ) {
		return apiCache[ cacheKey ];
	}

	const result = await fetch( `${ MbbApp.rest }/mbb/${ apiName }`, options ).then( response => response.json() );
	apiCache[ cacheKey ] = result;
	return result;
};