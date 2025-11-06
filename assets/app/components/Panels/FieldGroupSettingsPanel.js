import { Panel, PanelRow, Tooltip } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import { useShallow } from 'zustand/react/shallow';
import useSettings from '../../hooks/useSettings';
import Advanced from './FieldGroupSettings/Advanced';
import Block from './FieldGroupSettings/Block';
import BlockJSONSettings from './FieldGroupSettings/BlockJSONSettings';
import BlockRenderSettings from './FieldGroupSettings/BlockRenderSettings';
import ConditionalLogic from './FieldGroupSettings/ConditionalLogic';
import CustomTable from './FieldGroupSettings/CustomTable';
import IncludeExclude from './FieldGroupSettings/IncludeExclude';
import Location from './FieldGroupSettings/Location';
import Post from './FieldGroupSettings/Post';
import SettingsPage from './FieldGroupSettings/SettingsPage';
import ShowHide from './FieldGroupSettings/ShowHide';
import Tabs from './FieldGroupSettings/Tabs';
import Translation from './FieldGroupSettings/Translation';
import PersistentPanelBody from './PersistentPanelBody';

// Pattern to match invalid characters (anything not a-z, A-Z, 0-9, dash, underscore)
const invalidCharacters = /[^a-zA-Z0-9_-]/g;

const Header = () => {
	const spanRef = useRef();
	const inputRef = useRef();
	const preventedKeypressRef = useRef( false );

	// Prevent the default behavior of "Enter" key and restrict character input
	const handleKeyDown = e => {
		preventedKeypressRef.current = false; // Reset flag

		if ( e.key === 'Enter' ) {
			e.preventDefault();
			preventedKeypressRef.current = true;
			return;
		}

		// Allow control keys (backspace, delete, arrow keys, etc.)
		const controlKeys = [
			'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight',
			'Home', 'End'
		];

		if ( controlKeys.includes( e.key ) ) {
			return;
		}

		// Allow Ctrl/Cmd combinations (copy, paste, select all, etc.)
		if ( e.ctrlKey || e.metaKey ) {
			return;
		}

		// Only allow alphanumeric characters, dashes, and underscores
		if ( invalidCharacters.test( e.key ) ) {
			e.preventDefault();
			preventedKeypressRef.current = true;
		}
	};

	const handleChange = e => {
		// If we just prevented a keypress, don't process the input event
		if ( preventedKeypressRef.current ) {
			preventedKeypressRef.current = false;
			return;
		}

		// Get plain text content (this strips HTML)
		const content = e.target.textContent || '';
		const filteredContent = content.replace( invalidCharacters, '' );

		// Check if the element contains any HTML nodes other than text
		const hasHtmlNodes = Array.from( e.target.childNodes ).some(
			node => node.nodeType !== Node.TEXT_NODE
		);

		// Update the input value and dispatch the input event to trigger the change detection
		inputRef.current.value = filteredContent;
		const event = new Event( 'input' );
		inputRef.current.dispatchEvent( event );

		if ( content !== filteredContent || hasHtmlNodes ) {
			// Store the current cursor position relative to the text content
			let cursorPosition = 0;
			const selection = window.getSelection();

			if ( selection.rangeCount > 0 ) {
				const range = selection.getRangeAt( 0 );
				// Get text content before the cursor position
				const beforeCursor = range.cloneRange();
				beforeCursor.selectNodeContents( e.target );
				beforeCursor.setEnd( range.endContainer, range.endOffset );
				cursorPosition = beforeCursor.toString().length;
			}

			// Clean the content by setting textContent (removes all HTML)
			spanRef.current.textContent = filteredContent;

			// Update the input value and dispatch the input event to trigger the change detection
			inputRef.current.value = filteredContent;
			const event = new Event( 'input' );
			inputRef.current.dispatchEvent( event );

			// Calculate new cursor position after filtering
			const textBeforeCursor = content.substring( 0, cursorPosition );
			const filteredTextBeforeCursor = textBeforeCursor.replace( invalidCharacters, '' );
			const newCursorPosition = Math.min( filteredTextBeforeCursor.length, filteredContent.length );

			// Restore cursor position
			if ( spanRef.current.firstChild && newCursorPosition >= 0 ) {
				const range = document.createRange();
				range.setStart( spanRef.current.firstChild, newCursorPosition );
				range.collapse( true );
				selection.removeAllRanges();
				selection.addRange( range );
			}
		}
	};

	return (
		<>
			<span className="mb-panel__header">{ __( 'Field group settings', 'meta-box-builder' ) }</span>
			<div className="mb-field-group-id">
				{ __( 'ID', 'meta-box-builder' ) }:&nbsp;
				<Tooltip text={ __( 'Click to edit. Must be unique between field groups. Use only lowercase letters, numbers, underscores, and dashes.', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<span
						id="post_name"
						ref={ spanRef }
						contentEditable
						suppressContentEditableWarning={ true }
						onKeyDown={ handleKeyDown }
						onInput={ handleChange }
					>{ MbbApp.slug }</span>
				</Tooltip>
				{/* Hidden input to trigger change detection */ }
				<input type="hidden" id="post_name_input" ref={ inputRef } value={ MbbApp.slug } />
			</div>
		</>
	);
};

const FieldGroupSettingsPanel = () => {
	const objectType = useSettings( useShallow( state => state.getObjectType() ) );
	const validateAndUpdateObjectType = useSettings( state => state.validateAndUpdateObjectType );

	// Validate and update object type after component mount to avoid setState during render
	useEffect( () => {
		validateAndUpdateObjectType();
	}, [ objectType ] );

	return (
		<Panel header={ <Header /> } className="mb-panel mb-panel--field-group-settings">
			<div className="mb-panel__inner">
				<PersistentPanelBody panelId="field-group-location" title={ __( 'Location', 'meta-box-builder' ) }>
					<PanelRow><Location /></PanelRow>
					{
						MbbApp.extensions.includeExclude && objectType !== 'block' &&
						<PanelRow><IncludeExclude /></PanelRow>
					}
				</PersistentPanelBody>
				{
					objectType === 'post' &&
					<PersistentPanelBody panelId="field-group-settings" title={ __( 'Settings', 'meta-box-builder' ) }>
						<Post />
					</PersistentPanelBody>
				}
				{
					objectType === 'setting' &&
					<PersistentPanelBody panelId="field-group-settings" title={ __( 'Settings', 'meta-box-builder' ) }>
						<SettingsPage />
					</PersistentPanelBody>
				}
				{
					objectType === 'block' &&
					<PersistentPanelBody panelId="field-group-block-settings" title={ __( 'Block settings', 'meta-box-builder' ) }>
						<Block />
					</PersistentPanelBody>
				}
				{
					objectType === 'block' &&
					<PersistentPanelBody panelId="field-group-block-render-settings" title={ __( 'Block render settings', 'meta-box-builder' ) }>
						<BlockRenderSettings />
					</PersistentPanelBody>
				}
				{ objectType === 'block' && <BlockJSONSettings /> }
				{
					MbbApp.extensions.showHide && objectType !== 'block' &&
					<ShowHide />
				}
				{ objectType !== 'block' && <ConditionalLogic /> }
				{
					MbbApp.extensions.tabs &&
					<PersistentPanelBody panelId="field-group-tab-settings" title={ __( 'Tab settings', 'meta-box-builder' ) }>
						<Tabs />
					</PersistentPanelBody>
				}
				{
					![ 'setting', 'block' ].includes( objectType ) &&
					<CustomTable />
				}
				{
					MbbApp.polylang &&
					<PersistentPanelBody panelId="field-group-translation" title={ __( 'Translation', 'meta-box-builder' ) }>
						<Translation />
					</PersistentPanelBody>
				}
				<PersistentPanelBody panelId="field-group-advanced" title={ __( 'Advanced', 'meta-box-builder' ) } initialOpen={ false }>
					<Advanced />
				</PersistentPanelBody>
			</div>
		</Panel>
	);
};

export default FieldGroupSettingsPanel;