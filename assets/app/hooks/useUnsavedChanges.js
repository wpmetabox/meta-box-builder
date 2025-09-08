import { useEffect, useRef, useState } from '@wordpress/element';
import { isEqual } from 'lodash';
import { buildFieldsTree, lists } from '../list-functions';
import useSettings from './useSettings';

const useUnsavedChanges = () => {
	const [ hasUnsavedChanges, setHasUnsavedChanges ] = useState( false );
	const initialSettings = useRef( null );
	const initialFields = useRef( null );
	const initialTitle = useRef( null );
	const initialName = useRef( null );

	const captureInitialState = () => {
		initialSettings.current = useSettings.getState().settings;
		initialFields.current = buildFieldsTree();
		initialTitle.current = document.querySelector( '#post_title' ).value;
		initialName.current = document.querySelector( '#post_name' ).textContent;
		setHasUnsavedChanges( false );
	};

	// Capture initial state to compare against for change detection
	useEffect( captureInitialState, [] );

	const detectChanges = () => {
		const currentSettings = useSettings.getState().settings;
		const currentFields = buildFieldsTree();
		const currentTitle = document.querySelector( '#post_title' ).value;
		const currentName = document.querySelector( '#post_name' ).textContent;

		const settingsChanged = !isEqual( currentSettings, initialSettings.current );
		const fieldsChanged = !isEqual( currentFields, initialFields.current );
		const titleChanged = currentTitle.current !== initialTitle.current;
		const nameChanged = currentName.current !== initialName.current;

		setHasUnsavedChanges( settingsChanged || fieldsChanged || titleChanged || nameChanged );
	};

	// Reset state to ensure save operation completes before comparison
	// Expose to the global scope to be used in the save.js file.
	window.mbbMarkAsSaved = captureInitialState;

	// Prevent accidental navigation (refresh, close tab, back, forward) when there are unsaved changes
	useEffect( () => {
		const handleBeforeUnload = event => {
			if ( hasUnsavedChanges ) {
				event.preventDefault();
			}
		};

		window.addEventListener( 'beforeunload', handleBeforeUnload );

		return () => {
			window.removeEventListener( 'beforeunload', handleBeforeUnload );
		};
	}, [ hasUnsavedChanges ] );

	// Monitor settings changes to trigger change detection
	useEffect( () => {
		const unsubscribe = useSettings.subscribe( detectChanges );
		return unsubscribe;
	}, [] );

	// Monitor field changes from all lists to trigger change detection
	useEffect( () => {
		const unsubscribes = [];

		lists.forEach( store => {
			const unsubscribe = store.subscribe( detectChanges );
			unsubscribes.push( unsubscribe );
		} );
		document.querySelector( '#post_title' ).addEventListener( 'input', detectChanges );
		document.querySelector( '#post_name_input' ).addEventListener( 'input', detectChanges );

		return () => {
			unsubscribes.forEach( unsubscribe => unsubscribe() );
			document.querySelector( '#post_title' ).removeEventListener( 'input', detectChanges );
			document.querySelector( '#post_name_input' ).removeEventListener( 'input', detectChanges );
		};
	}, [] );

	return {
		hasUnsavedChanges,
	};
};

export default useUnsavedChanges;
