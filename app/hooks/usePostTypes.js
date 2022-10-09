import create from 'zustand';
import { ensureArray, getSettings } from '../functions';

const settings = getSettings();

const usePostTypes = create( set => ( {
	types: ensureArray( settings.post_types || [ 'post' ] ),
	update: types => set( state => ( { types } ) )
} ) );

export default usePostTypes;