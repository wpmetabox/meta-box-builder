export const { SearchResultList } = ( { searchParam, onSelectField, fieldTypes } ) => {
	let items = [];
	Object.values( fieldTypes ).forEach( list => {
		Object.keys( list ).forEach( type => {
			if ( list[ type ].toLowerCase().includes( searchParam.toLowerCase() ) ) {
				items.push( { type: type, title: list[ type ] } );
			}
		} );
	} );

	return (
		<div className="og-inserter__content">
			{ items.map( ( item, index ) => <button type="button" className="button" key={ index } onClick={ () => onSelectField( item.type ) }>{ item.title }</button> ) }
		</div>
	);
};