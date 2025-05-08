import { Button, SearchControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { ReactSortable } from 'react-sortablejs';
import { getFieldIcon } from '../functions';
import useApi from "../hooks/useApi";

const AddFieldContent = ( { className = '', addField, onSelect } ) => {
	const [ searchQuery, setSearchQuery ] = useState( '' );

	return (
		<div className={ `og-add-field ${ className }` }>
			<SearchControl value={ searchQuery } onChange={ setSearchQuery } __nextHasNoMarginBottom />
			<Categories searchQuery={ searchQuery } onSelect={ onSelect } addField={ addField } />
		</div>
	);
};

const Categories = props => {
	const fieldCategories = useApi( 'field-categories', [] );
	return fieldCategories.map( category => <Category key={ category.slug } category={ category } { ...props } /> );
};

const Category = ( { category, searchQuery, onSelect, addField } ) => {
	const fieldTypes = useApi( 'field-types', {} );
	const fields = Object.entries( fieldTypes ).filter( ( [ type, field ] ) => field.category === category.slug && field.title.toLowerCase().includes( searchQuery.toLowerCase() ) );

	return fields.length > 0 &&
		<>
			<div className="og-add-field__title">{ category.title }</div>
			<FieldList fields={ fields } onSelect={ onSelect } addField={ addField } />
		</>;
};

const FieldList = ( { fields, onSelect, addField } ) => (
	<ReactSortable
		className="og-add-field__list"
		delay={ 0 }
		delayOnTouchOnly={ false }
		touchStartThreshold={ 0 }
		group={ {
			name: 'add',
			pull: 'clone', // Ability to move from the list: give and keep a copy
			put: false, // Do not allow to add from other lists
		} }
		sort={ false } // Do not sort
		list={ Object.keys( fields ) }
		setList={ () => {} } // Do nothing
	>
		{
			fields.map( ( [ type, field ] ) =>
				<div key={ type } data-type={ type } className="og-add-field__item">
					<FieldButton type={ type } title={ field.title } onSelect={ onSelect } addField={ addField } />
				</div>
			)
		}
	</ReactSortable>
);

const FieldButton = ( { type, title, onSelect, addField } ) => {
	const handleClick = () => {
		addField( type );
		onSelect && onSelect();
	};

	return <Button variant="tertiary" icon={ getFieldIcon( type ) } onClick={ handleClick }>{ title }</Button>;
};

export default AddFieldContent;