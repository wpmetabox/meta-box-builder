import { Button, SearchControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { getFieldIcon } from '../functions';
import useApi from "../hooks/useApi";

const AddFieldContent = ( { className = '', addField, onSelect } ) => {
	const [ searchQuery, setSearchQuery ] = useState( '' );

	return (
		<div className={ `og-add-field ${ className }` }>
			<SearchControl value={ searchQuery } onChange={ setSearchQuery } __nextHasNoMarginBottom />
			{
				searchQuery ?
					<SearchResult searchQuery={ searchQuery } onSelect={ onSelect } addField={ addField } />
					: <Categories onSelect={ onSelect } addField={ addField } />
			}
		</div>
	);
};

const Categories = ( { onSelect, addField } ) => {
	const fieldCategories = useApi( 'field-categories', [] );
	return fieldCategories.map( category => <Category key={ category.slug } category={ category } onSelect={ onSelect } addField={ addField } /> )
};

const Category = ( { category, onSelect, addField } ) => {
	const fieldTypes = useApi( 'field-types', {} );
	const fields = Object.entries( fieldTypes ).filter( ( [ type, field ] ) => field.category === category.slug );

	return (
		<>
			<div className="og-add-field__title">{ category.title }</div>
			<FieldList fields={ fields } onSelect={ onSelect } addField={ addField } />
		</>
	);
};

const SearchResult = ( { searchQuery, onSelect, addField } ) => {
	const fieldTypes = useApi( 'field-types', {} );
	const fields = Object.entries( fieldTypes ).filter( ( [ type, field ] ) => field.title.toLowerCase().includes( searchQuery.toLowerCase() ) );

	return <FieldList fields={ fields } onSelect={ onSelect } addField={ addField } />;
};

const FieldList = ( { fields, onSelect, addField } ) => (
	<div className="og-add-field__list">
		{
			fields.map( ( [ type, field ] ) =>
				<FieldButton key={ type } type={ type } title={ field.title } onSelect={ onSelect } addField={ addField } />
			)
		}
	</div>
);

const FieldButton = ( { type, title, onSelect, addField } ) => {
	const handleClick = () => {
		addField( type );
		onSelect && onSelect();
	};

	return <Button variant="tertiary" icon={ getFieldIcon( type ) } onClick={ handleClick }>{ title }</Button>;
};

export default AddFieldContent;