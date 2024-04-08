import create from 'zustand';
import { getSettings } from '../functions';

const sanitize = types => {
	let t = types && Array.isArray( types ) ? types : [ 'post' ];
	// Remove empty value.
	return t.filter( type => /\S/.test( type ) );
};

const settings = getSettings();

const useTaxonomyTypes = create( set => ( {
	types: sanitize( settings.taxonomies ),
	update: types => set( state => ( { types: sanitize( types ) } ) ),
} ) );

export default useTaxonomyTypes;