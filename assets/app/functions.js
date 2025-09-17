import { archive, atSymbol, backup, border, brush, button, buttons, calendar, captureVideo, category, check, chevronUpDown, cloudUpload, code, color, commentAuthorAvatar, drawerRight, flipHorizontal, formatListBullets, fullscreen, gallery, grid, group, heading, image, lineDotted, link, mapMarker, page, pages, paragraph, postDate, postFeaturedImage, queryPaginationNumbers, separator, shield, starEmpty, table, tag, textColor, typography, unseen, video } from '@wordpress/icons';
import dotProp from 'dot-prop';
import { deburr, uniqBy, upperFirst } from 'lodash';

export const ucwords = ( string, delimitor = ' ', join = ' ' ) => string.split( delimitor ).map( upperFirst ).join( join );

export const uniqid = () => Math.random().toString( 36 ).substr( 2 );

export const ensureArray = arr => {
	if ( Array.isArray( arr ) ) {
		return arr;
	}
	if ( !arr ) {
		return [];
	}
	return typeof arr === 'object' ? Object.values( arr ) : [ arr ];
};

export const parseQueryString = queryString => {
	const params = new URLSearchParams( queryString );
	return convert( params );
};

// Convert form data and query string to objects.
const convert = params => {
	const data = {};

	for ( let [ key, value ] of params ) {
		key = bracketsToDots( key );
		const oldValue = dotProp.get( data, key );
		if ( oldValue !== undefined ) {
			value = Array.isArray( oldValue ) ? [ ...oldValue, value ] : [ oldValue, value ];
		}
		value = value === 'false' ? false : value;
		dotProp.set( data, key, value );
	}

	return data;
};

export const bracketsToDots = key => key.replace( '[]', '' ).replace( /\[(.+?)\]/g, '.$1' );

export const sanitizeId = text => deburr( text ).toLowerCase()
	.replace( /[^a-z0-9_]/g, '_' )           // Only accepts alphanumeric and underscores.
	.replace( /[ _]{2,}/g, '_' )             // Remove duplicated `_`.
	.replace( /^_/, '' ).replace( /_$/, '' ) // Trim `_`.
	.replace( /^\d+/, '' )                   // Don't start with numbers.
	.replace( /^_/, '' ).replace( /_$/, '' ) // Trim `_` again.
	;

export const inside = ( el, selectors ) => el.matches( selectors ) || el.closest( selectors ) !== null;

export const getFieldIcon = type => {
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
		email: atSymbol,
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

	// Allow to get icon from field types via MbbApp.field_types (for custom field types).
	return iconMap[ type ] || dotProp.get( MbbApp, `field_types.${ type }.icon`, 'button' );
};

export const getFullOptions = text => {
	if ( !text ) {
		return [];
	}

	const options = String( text ).split( "\n" ).map( option => {
		if ( !option.includes( ':' ) ) {
			return { value: option.trim(), label: option.trim() };
		}
		const parts = option.split( ':' );
		return { value: parts[ 0 ].trim(), label: parts.slice( 1 ).join( ":" ).trim() };
	} );

	// Do not allow duplicate values.
	return uniqBy( options, 'value' );
};

// Do nothing callback function for field preview inputs
export const doNothing = () => {};

export const updateNewPostUrl = () => {
	const postId = document.querySelector( '#post_ID' )?.value;
	if ( !postId ) {
		return;
	}

	// Only update URL if we're on the new post page.
	if ( location.href.includes( 'post-new.php' ) ) {
		history.replaceState( {}, '', `${ MbbApp.adminUrl }post.php?post=${ postId }&action=edit` );
	}
};

export const maybeArrayToObject = ( arr, key ) => {
	if ( Array.isArray( arr ) ) {
		return arr.reduce( ( obj, item ) => {
			obj[ item[ key ] ] = item;
			return obj;
		}, {} );
	}

	return typeof arr === 'object' ? arr : {};
};

