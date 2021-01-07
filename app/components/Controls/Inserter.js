import { FieldsDataContext } from '../../contexts/FieldsDataContext';
import { request } from '../../functions';

const { useContext, useEffect, useState } = wp.element;
const { Dropdown } = wp.components;
const { __ } = wp.i18n;

export const Inserter = ( { addField, type } ) => {
	const [ categories, setCategories ] = useState( [] );
	const [ searchParam, setSearchParam ] = useState( '' );
	const [ closeCallback, setCloseCallback ] = useState( () => { } );

	useEffect( () => {
		request( 'field-categories' ).then( setCategories );
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
						categories.length > 0
							? categories.map( category =>
								<Category key={ category.slug } category={ category } insert={ insert } searchParam={ searchParam } />
							)
							: <p>{ __( 'Fetching field types, please wait...', 'meta-box-builder' ) }</p>
					}
				</>
			) }
		/>
	);
};

const Category = ( { category, insert, searchParam } ) => {
	const fieldsData = useContext( FieldsDataContext );
	const s = searchParam.toLowerCase();
	const fields = Object.entries( fieldsData ).filter( ( [ type, field ] ) => field.category === category.slug && field.title.toLowerCase().includes( s ) );

	return fields.length > 0 && (
		<>
			<div className="og-inserter__title">{ category.title }</div>
			<div className="og-inserter__content">
				{
					fields.map( entry =>
						<div className="og-inserter__item" key={ entry[0] } data-type={ entry[0] } onClick={ insert }>{ entry[1].title }</div>
					)
				}
			</div>
		</>
	);
};