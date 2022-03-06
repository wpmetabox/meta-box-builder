import { Dropdown } from "@wordpress/components";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { FieldsDataContext } from '../../../contexts/FieldsDataContext';

export const Inserter = ( { addField, type } ) => {
	const { fieldCategories } = useContext( FieldsDataContext );
	const [ searchParam, setSearchParam ] = useState( '' );

	const search = e => setSearchParam( e.target.value );
	const insert = ( e, toggle ) => {
		addField( e.target.dataset.type );
		toggle();
	};

	return (
		<Dropdown
			className="og-inserter"
			onClose={ () => setSearchParam( '' ) }
			renderToggle={ ( { onToggle } ) => (
				<button type="button" id={ `og-inserter${ type }` } className="button button-primary" onClick={ onToggle }>
					{ __( '+ Add Field', 'meta-box-builder' ) }
				</button>
			) }
			renderContent={ ( { onToggle } ) => (
				<>
					<div className="og-inserter__search">
						<input type="search" placeholder={ __( 'Search for a field type', 'meta-box-builder' ) } onChange={ search } />
					</div>
					{
						fieldCategories.length > 0
							? fieldCategories.map( category =>
								<Category key={ category.slug } category={ category } insert={ e => insert( e, onToggle ) } searchParam={ searchParam } />
							)
							: <p>{ __( 'Fetching field types, please wait...', 'meta-box-builder' ) }</p>
					}
				</>
			) }
		/>
	);
};

const Category = ( { category, insert, searchParam } ) => {
	const { fieldTypes } = useContext( FieldsDataContext );
	const s = searchParam.toLowerCase();
	const fields = Object.entries( fieldTypes ).filter( ( [ type, field ] ) => field.category === category.slug && field.title.toLowerCase().includes( s ) );

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