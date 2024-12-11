import { Button, Panel, SearchControl } from '@wordpress/components';
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { archive, backup, border, brush, button, buttons, calendar, captureVideo, category, check, chevronUpDown, cloudUpload, code, color, commentAuthorAvatar, drawerRight, flipHorizontal, formatListBullets, fullscreen, gallery, grid, group, heading, image, inbox, lineDotted, link, mapMarker, page, pages, paragraph, postDate, postFeaturedImage, queryPaginationNumbers, separator, shield, starEmpty, table, tag, textColor, typography, unseen, video } from '@wordpress/icons';
import useApi from "../../hooks/useApi";

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

	console.debug( Object.keys( fieldTypes ) );

	return fields.length > 0 && (
		<>
			<div className="og-add-field__title">{ category.title }</div>
			<FieldList fields={ fields } addField={ addField } />
		</>
	);
};

const SearchResult = ( { searchQuery, addField } ) => {
	const fieldTypes = useApi( 'field-types', {} );
	const fields = Object.entries( fieldTypes ).filter( ( [ type, field ] ) => field.title.toLowerCase().includes( searchQuery.toLowerCase() ) );

	return <FieldList fields={ fields } addField={ addField } />;
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

const FieldButton = ( { type, title, addField } ) => <Button variant="tertiary" icon={ getFieldIcon( type ) } onClick={ e => addField( type ) }>{ title }</Button>;

const getFieldIcon = type => {
	const iconMap = {
		autocomplete: lineDotted,
		background: brush,
		button: button,
		button_group: buttons,
		checkbox: check,
		checkbox_list: formatListBullets,
		color: color,
		custom_html: code,
		date: postDate,
		datetime: calendar,
		divider: separator,
		email: inbox,
		fieldset_text: grid,
		file: page,
		file_advanced: pages,
		file_input: flipHorizontal,
		file_upload: cloudUpload,
		map: mapMarker,
		heading: heading,
		hidden: unseen,
		icon: starEmpty,
		image: image,
		image_advanced: gallery,
		image_select: fullscreen,
		image_upload: cloudUpload,
		key_value: category,
		number: chevronUpDown,
		oembed: video,
		osm: mapMarker,
		password: shield,
		post: postFeaturedImage,
		radio: border,
		range: queryPaginationNumbers,
		select: chevronUpDown,
		select_advanced: chevronUpDown,
		sidebar: drawerRight,
		single_image: image,
		slider: queryPaginationNumbers,
		switch: border,
		taxonomy: tag,
		taxonomy_advanced: tag,
		text: textColor,
		text_list: table,
		textarea: paragraph,
		time: backup,
		user: commentAuthorAvatar,
		url: link,
		video: captureVideo,
		wysiwyg: typography,
		group: group,
		tab: archive,
	};

	if ( iconMap[ type ] ) {
		return iconMap[ type ];
	}
};

export default AddFieldPanel;