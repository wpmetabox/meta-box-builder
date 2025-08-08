import { Button, SearchControl, Tooltip } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ReactSortable } from 'react-sortablejs';
import { getFieldIcon } from '../functions';
import useFieldTypes from '../hooks/useFieldTypes';
import UpgradeText from './common/UpgradeText';

const AddFieldContent = ( { className = '', addField, onSelect } ) => {
	const [ searchQuery, setSearchQuery ] = useState( '' );

	return (
		<div className={ `mb-add-field ${ className }` }>
			<SearchControl value={ searchQuery } onChange={ setSearchQuery } __nextHasNoMarginBottom />
			<Categories searchQuery={ searchQuery } onSelect={ onSelect } addField={ addField } />
		</div>
	);
};

const Categories = props => MbbApp.fieldCategories.map( category => <Category key={ category.slug } category={ category } { ...props } /> );

const Category = ( { category, searchQuery, onSelect, addField } ) => {
	const { fieldTypes } = useFieldTypes();
	const fields = Object.entries( fieldTypes ).filter( ( [ type, field ] ) => field.category === category.slug && field.title.toLowerCase().includes( searchQuery.toLowerCase() ) );

	return fields.length > 0 &&
		<>
			<div className="mb-add-field__title">{ category.title }</div>
			<FieldList fields={ fields } onSelect={ onSelect } addField={ addField } />
		</>;
};

const FieldList = ( { fields, onSelect, addField } ) => (
	<ReactSortable
		className="mb-add-field__list"
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
				<div key={ type } data-type={ type } className="mb-add-field__item">
					<FieldButton type={ type } field={ field } onSelect={ onSelect } addField={ addField } />
				</div>
			)
		}
	</ReactSortable>
);

const FieldButton = ( { type, field, onSelect, addField } ) => {
	const handleClick = () => {
		addField( type );
		onSelect && onSelect();
	};

	return field.disabled
		? <Tooltip delay={ 0 } text={
			<UpgradeText
				text={ __( 'This field type is available in Meta Box AIO only.', 'meta-box-builder' ) }
				utm_source="add_field"
				utm_medium={ type }
			/>
		}>
			<Button
				icon={ getFieldIcon( type ) }
				className="mb-add-field__disabled"
				text={ `${ field.title } (${ __( 'Premium', 'meta-box-builder' ) })` }
			/>
		</Tooltip>
		: <Button icon={ getFieldIcon( type ) } onClick={ handleClick } text={ field.title } />;
};

export default AddFieldContent;