import { Button, Flex, SearchControl, Tooltip } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { external } from '@wordpress/icons';
import { ReactSortable } from 'react-sortablejs';
import { getFieldIcon } from '../functions';
import useFieldTypes from '../hooks/useFieldTypes';

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

const UpgradeText = ( { utm_source, utm_medium } ) => (
	<Flex gap={ 0 } align="center" className="mb-upgrade-text">
		{ __( 'This feature is available in Meta Box AIO only.', 'meta-box-builder' ) }
		<Button
			variant="link"
			href={ `https://metabox.io/aio/?utm_source=${ utm_source }&utm_medium=${ utm_medium }&utm_campaign=builder` }
			target="_blank"
			icon={ external }
			iconPosition="right"
			iconSize={ 18 }
			text={ __( 'Upgrade now', 'meta-box-builder' ) }
		/>
	</Flex>
);

const FieldButton = ( { type, field, onSelect, addField } ) => {
	const handleClick = () => {
		addField( type );
		onSelect && onSelect();
	};

	return field.disabled
		? <Tooltip delay={ 0 } text={ <UpgradeText utm_source="add_field" utm_medium={ type } /> }>
			<Button
				icon={ getFieldIcon( type ) }
				className="mb-add-field__disabled"
				text={ `${ field.title } (${ __( 'Premium', 'meta-box-builder' ) })` }
			/>
		</Tooltip>
		: <Button icon={ getFieldIcon( type ) } onClick={ handleClick } text={ field.title } />;
};

export default AddFieldContent;