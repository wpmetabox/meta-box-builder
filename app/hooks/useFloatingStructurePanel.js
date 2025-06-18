import { create } from 'zustand';

const STORAGE_KEY = 'mbb_structure_panel';

const getInitialState = () => {
	const stored = localStorage.getItem( STORAGE_KEY );
	if ( stored ) {
		const data = JSON.parse( stored );
		return {
			floating: data.floating || false,
			visible: data.visible !== undefined ? data.visible : true,
			position: data.position || { top: 200, right: 200 }
		};
	}

	return {
		floating: false,
		visible: true,
		position: { top: 200, right: 200 }
	};
};

const saveToStorage = ( key, value ) => {
	let state = getInitialState();
	state[ key ] = value;
	localStorage.setItem( STORAGE_KEY, JSON.stringify( state ) );
};

const useFloatingStructurePanel = create( ( set, get ) => {
	const initialState = getInitialState();

	return {
		...initialState,
		setFloating: floating => {
			set( { floating } );
			saveToStorage( 'floating', floating );
		},
		setVisible: visible => {
			set( { visible } );
			saveToStorage( 'visible', visible );
		},
		setPosition: position => {
			set( { position } );
			saveToStorage( 'position', position );
		},
		toggleVisible: () => {
			set( state => {
				const visible = !state.visible;
				saveToStorage( 'visible', visible );
				return { visible };
			} );
		}
	};
} );

export default useFloatingStructurePanel;