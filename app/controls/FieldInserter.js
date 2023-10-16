import { RawHTML } from '@wordpress/element';


const FieldInserter = ( { items = [], hasSearch = false, onSelect } ) => {
	const handleClick = e => e.target.matches( '.og-dropdown__item' ) && onSelect( e );

	return (
		<div onClick={ handleClick }>
			{ items.length > 0 &&
				items.map( item => <RawHTML key={ item } className="og-dropdown__item" data-value={ item }>
					{ item }
				</RawHTML> )
			}
		</div>
	);
};

export default FieldInserter;