import { CHECKBOX_LIST_TYPE, LIST_OPTION_TYPE } from '../constants/constants';

export const getLabel = ( name, type ) => {
	const labels = {
		taxonomy: "Taxonomy",
	};

	return ( name === 'std' && type === 'checkbox' ) ? "Checked?" : labels[ name ];
};

export const getElementControlName = ( name, type ) => {
	return toTitleCase( name );
};

export const fillFieldsValues = ( params, conditionalList ) => {
	let result = { settings: {} };
	const selectedData = { ...getSelectedList() };
	const fieldParams = params.fields;

	result.fields = selectedData.items.map( item => {
		return item.type === 'group' ? fillGroupData( item, fieldParams ) : fillFieldData( item, fieldParams[ item.id ] );
	} );

	for ( const key in params ) {
		if ( isSettingValue( key ) ) {
			result.settings[ key ] = params[ key ];
		}
	}
	result.conditionalList = JSON.stringify( conditionalList );

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
	result.data.general = fillDataByKey( item.data.general, data, item.id );
	result.data.advanced = fillDataByKey( item.data.advanced, data, item.id );

	return result;
};

const fillDataByKey = ( items, data, uniqId ) => {
	let result = {};
	Object.keys( items ).forEach( key => {
		// handle Key value
		if ( LIST_OPTION_TYPE.includes( key ) && data[ key ] && typeof data[ key ] === 'object' ) {
			const optionalList = Object.values( data[ key ] );
			result[ key ] = { ...items[ key ], default: optionalList };
		} else if ( key === 'conditional_logic' && data[ key ] && typeof data[ key ] === 'object' ) {
			// handle conditional logic
			const type = data[ key ][ 'type' ];
			const relation = data[ key ][ 'relation' ];
			const optionalList = Object.values( data[ key ][ 'rules' ] );

			result[ key ] = { ...items[ key ], default: { relation, type, rules: optionalList } };
		} else if ( key === 'icon' ) {
			const icons = document.getElementsByClassName( `fields-${ uniqId }-icon` );
			Object.values( icons ).map( icon => {
				if ( icon.checked ) {
					const value = icon.value;
					result[ key ] = { ...items[ key ], default: value };
				}
			} );
		} else if ( CHECKBOX_LIST_TYPE.includes( key ) ) {
			// handle post type (checkbox list)
			let postTypeList = [];
			const checkedList = document.getElementsByClassName( `fields-${ uniqId }-checklist` );
			Object.values( checkedList ).map( input => {
				const value = input.value;
				if ( input.checked ) {
					postTypeList.push( value );
				}
			} );

			result[ key ] = { ...items[ key ], default: postTypeList };
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
	result.advanced = data.advanced && type !== 'divider' ? getAdvancedData( data.advanced, id ) : {};
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
		if ( item === 'id' ) {
			result[ item ] = { ...generalItems[ item ], default: '' };
		} else {
			result[ item ] = { ...generalItems[ item ], default: value };
		}
		if ( item === 'icon' ) {
			const icons = document.getElementsByClassName( `fields-${ id }-icon` );
			Object.values( icons ).map( icon => {
				if ( icon.checked ) {
					const value = icon.value;
					result[ item ] = { ...generalItems[ item ], default: value };
				}
			} );
		} else if ( CHECKBOX_LIST_TYPE.includes( item ) ) {
			let postTypeList = [];
			const checkedList = document.getElementsByClassName( `fields-${ id }-checklist` );
			Object.values( checkedList ).map( input => {
				const value = input.value;
				if ( input.checked ) {
					postTypeList.push( value );
				}
			} );

			result[ item ] = { ...generalItems[ item ], default: postTypeList };
		} else if ( LIST_OPTION_TYPE.includes( item ) && generalItems[ item ].component === 'KeyValue' ) {
			let list = JSON.parse( value );
			list = list.map( keyValue => ( {
				...keyValue,
				key: getElementValue( `fields-${ id }-${ item }-${ keyValue.uniqId }-key` ),
				value: getElementValue( `fields-${ id }-${ item }-${ keyValue.uniqId }-value` )
			} ) );
			result[ item ] = { ...generalItems[ item ], default: list };
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
			// is checkbox value
			value = value;
		} else {
			// assign value if exist
			value = value || advancedItems[ item ].default;
		}

		if ( item === 'conditional_logic' ) {
			// handle conditional logic
			const type = getElementValue( `fields-${ id }-${ item }-type` );
			const relation = getElementValue( `fields-${ id }-${ item }-relation` );
			let rules = JSON.parse( value );
			rules = rules.map( rule => ( {
				...rule,
				name: getElementValue( `fields-${ id }-${ item }-rules-${ rule.id }-name` ),
				operator: getElementValue( `fields-${ id }-${ item }-rules-${ rule.id }-operator` ),
				value: getElementValue( `fields-${ id }-${ item }-rules-${ rule.id }-value` ),
			} ) );

			result[ item ] = { ...advancedItems[ item ], default: { relation, type, rules } };
		} else if ( LIST_OPTION_TYPE.includes( item ) ) {
			//handle key value
			let list = JSON.parse( value );
			list = list.map( keyValue => ( {
				...keyValue,
				key: getElementValue( `fields-${ id }-${ item }-${ keyValue.uniqId }-key` ),
				value: getElementValue( `fields-${ id }-${ item }-${ keyValue.uniqId }-value` )
			} ) );
			result[ item ] = { ...advancedItems[ item ], default: list };
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
	let cacheKey = JSON.stringify( { apiName, params, method } );
	if ( apiCache[ cacheKey ] ) {
		return apiCache[ cacheKey ];
	}

	let options = {
		method,
		headers: { 'X-WP-Nonce': MbbApp.nonce, 'Content-Type': 'application/json' },
	};
	if ( 'POST' === method ) {
		options.body = JSON.stringify( params );
	} else {
		apiName += '?' + ( new URLSearchParams( params ) ).toString();
	}
	const result = await fetch( `${ MbbApp.rest }/mbb/${ apiName }`, options ).then( response => response.json() );
	apiCache[ cacheKey ] = result;
	return result;
};