import apiFetch from '@wordpress/api-fetch';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import BlockListEditor from '../components/Modals/BlockListEditor';
import ManageBlockLists from '../components/Modals/ManageBlockLists';
import DivRow from './DivRow';

const BlockListSelect = ( { componentId, name, defaultValue, options, updateField, ...rest } ) => {
	const [ lists, setLists ] = useState( options || {} );
	const [ selected, setSelected ] = useState( defaultValue || '' );
	const [ showEditor, setShowEditor ] = useState( false );
	const [ showManage, setShowManage ] = useState( false );
	const [ editorListId, setEditorListId ] = useState( null );
	const [ returnToManage, setReturnToManage ] = useState( false );

	const fetchLists = () => {
		apiFetch( { path: '/mbb/allowed-block-lists' } )
			.then( setLists )
			.catch( () => {} );
	};

	const handleChange = e => {
		const value = e.target.value;
		setSelected( value );
		updateField( name, value );
	};

	const handleManageClose = () => {
		setShowManage( false );
		fetchLists();
	};

	const handleEdit = ( id, fromManage = false ) => {
		setEditorListId( id );
		setReturnToManage( fromManage );
		setShowEditor( true );
		setShowManage( false );
	};

	const handleAddNew = ( fromManage = false ) => {
		setEditorListId( null );
		setReturnToManage( fromManage );
		setShowEditor( true );
		setShowManage( false );
	};

	const handleEditorClose = () => {
		setShowEditor( false );
		setEditorListId( null );
		if ( returnToManage ) {
			setReturnToManage( false );
			setShowManage( true );
		}
	};

	const handleEditorSaved = savedId => {
		fetchLists();
		if ( savedId && ! returnToManage ) {
			setSelected( savedId );
			updateField( name, savedId );
		}
	};

	const handleSelectList = id => {
		setSelected( id );
		updateField( name, id );
		setShowManage( false );
		fetchLists();
	};

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<select id={ componentId } value={ selected } onChange={ handleChange }>
				<option value="">{ __( 'Allow all blocks', 'meta-box-builder' ) }</option>
				{
					Object.entries( lists ).map( ( [ id, list ] ) => <option key={ id } value={ id }>{ list.name }</option> )
				}
			</select>
			<div className="mbb-block-list-buttons og-description">
				<a href="#" onClick={ e => { e.preventDefault(); setShowManage( true ); } }>
					{ __( 'Manage lists', 'meta-box-builder' ) }
				</a>
				<span>|</span>
				<a href="#" onClick={ e => { e.preventDefault(); handleAddNew(); } }>
					{ __( 'Add new', 'meta-box-builder' ) }
				</a>
				{
					selected && (
						<>
							<span>|</span>
							<a href="#" onClick={ e => { e.preventDefault(); handleEdit( selected ); } }>
								{ __( 'Edit', 'meta-box-builder' ) }
							</a>
						</>
					)
				}
			</div>
			<ManageBlockLists
				isOpen={ showManage }
				onClose={ handleManageClose }
				onEdit={ id => handleEdit( id, true ) }
				onAddNew={ () => handleAddNew( true ) }
				onSelect={ handleSelectList }
			/>
			<BlockListEditor
				isOpen={ showEditor }
				onClose={ handleEditorClose }
				listId={ editorListId }
				onSaved={ handleEditorSaved }
			/>
		</DivRow>
	);
};

export default BlockListSelect;
