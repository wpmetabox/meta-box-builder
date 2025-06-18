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
		position: { top: 160, right: 90 }
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
		offsetX: 0,
		offsetY: 0,
		setFloating: floating => {
			set( { floating } );
			saveToStorage( 'floating', floating );
		},
		setVisible: visible => {
			set( { visible } );
			saveToStorage( 'visible', visible );
		},
		move: ( offsetX, offsetY ) => set( { offsetX, offsetY } ),
		setPosition: ( offsetX, offsetY ) => set( state => {
			const position = state.position;
			const newPosition = {
				top: position.top + offsetY,
				right: position.right - offsetX,
			};
			saveToStorage( 'position', newPosition );
			return { position: newPosition, offsetX: 0, offsetY: 0 };
		} ),
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