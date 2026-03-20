import apiFetch from '@wordpress/api-fetch';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import BlockListEditor from '../components/Modals/BlockListEditor';
import ManageBlockLists from '../components/Modals/ManageBlockLists';
import DivRow from './DivRow';

const BlockListSelect = ( { componentId, name, defaultValue, options, updateField, ...rest } ) => {
	const [ lists, setLists ] = useState( options || {} );
	const [ showEditor, setShowEditor ] = useState( false );
	const [ showManage, setShowManage ] = useState( false );
	const [ listId, setListId ] = useState( null );

	const fetchLists = () => {
		apiFetch( { path: '/mbb/allowed-block-lists' } )
			.then( setLists )
			.catch( () => {} );
	};

	const handleChange = e => updateField( name, e.target.value );

	const handleManageClose = () => {
		setShowManage( false );
		fetchLists();
	};

	const handleEdit = id => {
		setListId( id );
		setShowEditor( true );
		setShowManage( false );
	};

	const handleAddNew = () => {
		setListId( null );
		setShowEditor( true );
		setShowManage( false );
	};

	const handleEditorClose = () => {
		setShowEditor( false );
		setListId( null );
	};

	const handleEditorSaved = () => fetchLists();

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<select id={ componentId } defaultValue={ defaultValue || '' } onChange={ handleChange }>
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
					defaultValue && (
						<>
							<span>|</span>
							<a href="#" onClick={ e => { e.preventDefault(); handleEdit( defaultValue ); } }>
								{ __( 'Edit', 'meta-box-builder' ) }
							</a>
						</>
					)
				}
			</div>
			<ManageBlockLists
				isOpen={ showManage }
				onClose={ handleManageClose }
				onEdit={ handleEdit }
				onAddNew={ handleAddNew }
			/>
			<BlockListEditor
				isOpen={ showEditor }
				onClose={ handleEditorClose }
				listId={ listId }
				onSaved={ handleEditorSaved }
			/>
		</DivRow>
	);
};

export default BlockListSelect;
