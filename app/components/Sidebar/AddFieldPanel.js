import { Button, Panel, SearchControl } from '@wordpress/components';
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { getFieldIcon } from '../../functions';
import useApi from "../../hooks/useApi";
import useLists from '../../hooks/useLists';

const AddFieldPanel = ( { show = true } ) => {
	const [ searchQuery, setSearchQuery ] = useState( '' );

	return (
		<Panel header={ __( 'Add a new field', 'meta-box-builder' ) } className={ `mb-panel ${ show ? 'mb-panel--show' : '' }` }>
			<div className='mb-panel__inner og-add-field'>
				<SearchControl value={ searchQuery } onChange={ setSearchQuery } __nextHasNoMarginBottom />
				{
					searchQuery ?
						<SearchResult searchQuery={ searchQuery } />
						: <Categories />
				}
			</div>
		</Panel>
	);
};

const Categories = () => {
	const [ activeCategory, setActiveCategory ] = useState( 'basic' );

	const fieldCategories = useApi( 'field-categories', [] );

	return fieldCategories.length > 0
		? fieldCategories.map( category =>
			<Category
				key={ category.slug }
				open={ category.slug === activeCategory }
				onClick={ () => setActiveCategory( activeCategory === category.slug ? '' : category.slug ) }
				category={ category }
			/>
		)
		: <p>{ __( 'Fetching field types, please wait...', 'meta-box-builder' ) }</p>;
};

const Category = ( { category, onClick, open } ) => {
	const fieldTypes = useApi( 'field-types', {} );
	const fields = Object.entries( fieldTypes ).filter( ( [ type, field ] ) => field.category === category.slug );

	return fields.length > 0 && (
		<>
			<div className="og-add-field__title">{ category.title }</div>
			<FieldList fields={ fields } />
		</>
	);
};

const SearchResult = ( { searchQuery } ) => {
	const fieldTypes = useApi( 'field-types', {} );
	const fields = Object.entries( fieldTypes ).filter( ( [ type, field ] ) => field.title.toLowerCase().includes( searchQuery.toLowerCase() ) );

	return <FieldList fields={ fields } />;
};

const FieldList = ( { fields } ) => (
	<div className="og-add-field__list">
		{
			fields.map( ( [ type, field ] ) =>
				<FieldButton key={ type } type={ type } title={ field.title } />
			)
		}
	</div>
);

const FieldButton = ( { type, title } ) => {
	const { addField } = useLists();
	const add = () => addField( 'root', type );

	return <Button variant="tertiary" icon={ getFieldIcon( type ) } onClick={ add }>{ title }</Button>;
};

export default AddFieldPanel;