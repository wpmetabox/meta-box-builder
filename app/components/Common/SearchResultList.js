import { request } from '../../utility/functions';
const { useState, useEffect } = wp.element;

const SearchResultList = ( { searchParam, onSelectField } ) => {
	const [ fieldTypes, setFieldTypes ] = useState( {} );

	const getSearchResults = () => {
		let result = [];
		Object.values( fieldTypes ).forEach( list => {
			Object.keys( list ).forEach( type => {
				if ( list[ type ].toLowerCase().includes( searchParam.toLowerCase() ) ) {
					result.push( { type: type, title: list[ type ] } );
				}
			} );
		} );
		return result;
	};

	useEffect( () => {
		request( 'field-types' ).then( data => setFieldTypes( data ) );
	}, [] );

	const items = getSearchResults();

	return (
		<div className="og-sidebar__item og-search-results">
			{ items.map( ( item, index ) => <button type="button" className="button" key={ index } onClick={ () => onSelectField( item.type ) }>{ item.title }</button> ) }
		</div>
	);
};

export default SearchResultList;