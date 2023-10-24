import { RawHTML, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

const Search = ( { handleSearch } ) => (
	<div className="og-dropdown__search">
		<input onInput={ handleSearch } type="text" placeholder={ __( 'Search...', 'meta-box-builder' ) } />
	</div>
);

const Items = ( { items, searchTerm } ) => {
	const s = searchTerm.toLowerCase();
	items = items.filter( item => !s || item.toLowerCase().includes( s ) );

	return items.map( item => (
		<RawHTML key={ item } className="og-dropdown__item" data-value={ item }>
			{ item }
		</RawHTML>
	) );
};

const FieldInserter = ( { items = [], hasSearch = false, onSelect } ) => {
	const [ searchTerm, setSearchTerm ] = useState( '' );

	const handleClick = e => e.target.matches( '.og-dropdown__item' ) && onSelect( e );
	const handleSearch = e => setSearchTerm( e.target.value );

	return (
		<div onClick={ handleClick }>
			{ hasSearch && <Search handleSearch={ handleSearch } /> }
			{ items.length > 0 && <Items items={ items } searchTerm={ searchTerm } /> }
		</div>
	);
};

export default FieldInserter;