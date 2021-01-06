import { request } from '../../functions';

const { useState, useEffect } = wp.element;
const { Dropdown } = wp.components;
const { __ } = wp.i18n;

export const Inserter = ( { addField, type } ) => {
	const [ categories, setCategories ] = useState( [] );
	const [ fieldTypes, setFieldTypes ] = useState( [] );
	const [ searchParam, setSearchParam ] = useState( '' );
	const [ closeCallback, setCloseCallback ] = useState( () => { } );

	useEffect( () => {
		request( 'field-categories' ).then( setCategories );
		request( 'field-types' ).then( setFieldTypes );
	}, [] );

	const search = e => setSearchParam( e.target.value );
	const open = ( toggle, close ) => {
		toggle();
		setCloseCallback( prevCallback => close );
	};
	const insert = e => {
		addField( e.target.dataset.type );
		closeCallback();
	};

	return (
		<Dropdown
			className="og-inserter"
			onClose={ () => setSearchParam( '' ) }
			renderToggle={ ( { onToggle, onClose } ) => (
				<button type="button" id={ `og-inserter${ type }` } className="button button-primary" onClick={ () => open( onToggle, onClose ) }>
					{ __( '+ Add Field', 'meta-box-builder' ) }
				</button>
			) }
			renderContent={ () => (
				<>
					<div className="og-inserter__search">
						<input type="search" placeholder={ __( 'Search for a field type', 'meta-box-builder' ) } onChange={ search } />
					</div>
					{
						categories.length > 0 && fieldTypes.length > 0
							? categories.map( category =>
								<Category key={ category.slug } category={ category } fieldTypes={ fieldTypes } insert={ insert } searchParam={ searchParam } />
							)
							: <p>{ __( 'Fetching field types, please wait...', 'meta-box-builder' ) }</p>
					}
				</>
			) }
		/>
	);
};

const Category = ( { category, fieldTypes, insert, searchParam } ) => {
	const s = searchParam.toLowerCase();
	const types = fieldTypes.filter( type => type.category === category.slug && type.title.toLowerCase().includes( s ) );

	return types.length > 0 && (
		<>
			<div className="og-inserter__title">{ category.title }</div>
			<div className="og-inserter__content">
				{
					types.map( ( { name, title } ) =>
						<div className="og-inserter__item" key={ name } data-type={ name } onClick={ insert }>{ title }</div>
					)
				}
			</div>
		</>
	);
};