import { Panel, PanelBody } from '@wordpress/components';
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import useApi from "../../hooks/useApi";

const AddFieldPanel = ( { show = true } ) => {
	const addField = () => {};
	const fieldCategories = useApi( 'field-categories', [] );
	const [ searchParam, setSearchParam ] = useState( '' );

	const search = e => setSearchParam( e.target.value );
	const insert = ( e, toggle ) => {
		addField( e.target.dataset.type );
		toggle();
	};

	return (
		<Panel header={ __( 'Add a new field', 'meta-box-builder' ) } className={ `mb-panel ${ show ? 'mb-panel--show' : '' }` }>
			<PanelBody title={ __( 'Add a new field', 'meta-box-builder' ) } opened={ true }>
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
			</PanelBody>
		</Panel>
	);
};

const Category = ( { category, insert, searchParam } ) => {
	const fieldTypes = useApi( 'field-types', {} );
	const s = searchParam.toLowerCase();
	const fields = Object.entries( fieldTypes ).filter( ( [ type, field ] ) => field.category === category.slug && field.title.toLowerCase().includes( s ) );

	return fields.length > 0 && (
		<>
			<div className="og-inserter__title">{ category.title }</div>
			<div className="og-inserter__content">
				{
					fields.map( ( [ type, { title, description } ] ) =>
						<div className="og-inserter__item" key={ type } data-type={ type } onClick={ insert } title={ description }>{ title }</div>
					)
				}
			</div>
		</>
	);
};

export default AddFieldPanel;