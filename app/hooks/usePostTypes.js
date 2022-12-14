import create from 'zustand';
import { ensureArray, getSettings } from '../functions';

const sanitize = types => {
	// Remove empty value.
	let t = types.filter( type => /\S/.test( type ) );
	return t.length > 0 ? t : [ 'post' ];
};

const settings = getSettings();

const usePostTypes = create( set => ( {
	types: ensureArray( sanitize( settings.post_types ) ),
	update: types => set( state => ( { types: sanitize( types ) } ) ),
} ) );

export default usePostTypes;