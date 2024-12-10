import { Button, Panel, SearchControl } from '@wordpress/components';
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import useApi from "../../hooks/useApi";
import PersistentPanelBody from '../PersistentPanelBody';

const AddFieldPanel = ( { show = true } ) => {
	const addField = () => {};

	const [ searchQuery, setSearchQuery ] = useState( '' );

	return (
		<Panel header={ __( 'Add a new field', 'meta-box-builder' ) } className={ `mb-panel ${ show ? 'mb-panel--show' : '' }` }>
			<div className='mb-panel__inner og-add-field'>
				<SearchControl value={ searchQuery } onChange={ setSearchQuery } __nextHasNoMarginBottom />
				{
					searchQuery ?
						<SearchResult searchQuery={ searchQuery } addField={ addField } />
						: <Categories addField={ addField } />
				}
			</div>
		</Panel>
	);
};

const Categories = ( { addField } ) => {
	const [ activeCategory, setActiveCategory ] = useState( 'basic' );

	const fieldCategories = useApi( 'field-categories', [] );

	return fieldCategories.length > 0
		? fieldCategories.map( category =>
			<Category
				key={ category.slug }
				open={ category.slug === activeCategory }
				onClick={ () => setActiveCategory( activeCategory === category.slug ? '' : category.slug ) }
				category={ category }
				addField={ addField }
			/>
		)
		: <p>{ __( 'Fetching field types, please wait...', 'meta-box-builder' ) }</p>;
};

const Category = ( { category, addField, onClick, open } ) => {
	const fieldTypes = useApi( 'field-types', {} );
	const fields = Object.entries( fieldTypes ).filter( ( [ type, field ] ) => field.category === category.slug );

	return fields.length > 0 && (
		<PersistentPanelBody title={ category.title } onClick={ onClick } open={ open }>
			<FieldList fields={ fields } addField={ addField } />
		</PersistentPanelBody>
	);
};

const SearchResult = ( { searchQuery, addField } ) => {
	const fieldTypes = useApi( 'field-types', {} );
	const fields = Object.entries( fieldTypes ).filter( ( [ type, field ] ) => field.title.toLowerCase().includes( searchQuery.toLowerCase() ) );

	return (
		<div className='og-add-field__search-results'>
			<FieldList fields={ fields } addField={ addField } />
		</div>
	);
};

const FieldList = ( { fields, addField } ) => (
	<div className="og-add-field__list">
		{
			fields.map( ( [ type, field ] ) =>
				<FieldButton key={ type } type={ type } title={ field.title } addField={ addField } />
			)
		}
	</div>
);

const FieldButton = ( { type, title, addField } ) => <Button variant="secondary" onClick={ e => addField( type ) }>{ title }</Button>;

export default AddFieldPanel;