import apiFetch from '@wordpress/api-fetch';
import { registerCoreBlocks } from '@wordpress/block-library';
import { getBlockType } from '@wordpress/blocks';
import { Button, Flex, Modal, SearchControl, TextControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { blockDefault, Icon } from '@wordpress/icons';

registerCoreBlocks();

const BlockIcon = ( { block } ) => {
	const blockData = block.name.includes( 'core/' ) ? getBlockType( block.name ) : block;
	const icon = blockData?.icon?.src ?? blockData?.icon ?? blockDefault;

	return (
		<span className="mbb-block-icon">
			{
				typeof icon === 'string'
				? <span className={ `dashicons dashicons-${ icon }` }></span>
				: ( typeof icon === 'function' ? <Icon icon={ icon } size={ 20 } /> : icon )
			}
		</span>
	);
};

const sortBlocks = ( a, b ) => a.title.localeCompare( b.title );

const BlockListEditor = ( { isOpen, onClose, listId, onSaved } ) => {
	const [ name, setName ] = useState( '' );
	const [ allBlocks, setAllBlocks ] = useState( {} );
	const [ selectedBlocks, setSelectedBlocks ] = useState( [] );
	const [ saving, setSaving ] = useState( false );
	const [ error, setError ] = useState( '' );
	const [ availableSearch, setAvailableSearch ] = useState( '' );
	const [ selectedSearch, setSelectedSearch ] = useState( '' );

	const selectedValues = new Set( selectedBlocks.map( block => block.name ) );
	const available = Object.values( allBlocks ).filter( block => ! selectedValues.has( block.name ) );

	const filteredAvailable = available.filter( block => block.title.toLowerCase().includes( availableSearch.toLowerCase() ) ).sort( sortBlocks );
	const filteredSelected = selectedBlocks.filter( block => block.title.toLowerCase().includes( selectedSearch.toLowerCase() ) ).sort( sortBlocks );

	useEffect( () => {
		if ( ! isOpen ) {
			return;
		}

		const blocksPromise = apiFetch( { path: '/mbb/blocks' } );

		if ( listId ) {
			Promise.all( [
				blocksPromise,
				apiFetch( { path: '/mbb/allowed-block-lists' } ),
			] ).then( ( [ blocks, lists ] ) => {
				setAllBlocks( blocks );
				const list = lists[ listId ];
				if ( list ) {
					setName( list.name );
					const selected = ( list.blocks || [] ).map( name => blocks[ name ] ).filter( Boolean );
					setSelectedBlocks( selected );
				}
			} ).catch( () => setAllBlocks( {} ) );
		} else {
			blocksPromise
				.then( setAllBlocks )
				.catch( () => setAllBlocks( {} ) );
			setName( '' );
			setSelectedBlocks( [] );
		}

		setAvailableSearch( '' );
		setSelectedSearch( '' );
		setError( '' );
	}, [ isOpen, listId ] );

	const moveToSelected = block => setSelectedBlocks( prev => [ ...prev, block ] );
	const moveToAvailable = block => setSelectedBlocks( prev => prev.filter( b => b.name !== block.name ) );

	const handleSave = async ( asNew = false, newName = null ) => {
		setSaving( true );
		setError( '' );
		try {
			await apiFetch( {
				path: '/mbb/allowed-block-lists',
				method: 'POST',
				data: {
					...( ! asNew && listId ? { id: listId } : {} ),
					name: asNew ? newName : name.trim(),
					blocks: selectedBlocks.map( block => block.name ),
				},
			} );
			onSaved();
			onClose();
		} catch ( e ) {
			setError( e.message || __( 'An error occurred while saving.', 'meta-box-builder' ) );
		}
		setSaving( false );
	};

	const handleSaveAsNew = () => {
		const newName = window.prompt( __( 'Enter a name for the new list:', 'meta-box-builder' ), name );
		if ( newName !== null && newName.trim() ) {
			handleSave( true, newName.trim() );
		}
	};

	if ( ! isOpen ) {
		return null;
	}

	return (
		<Modal
			title={ listId ? __( 'Edit List', 'meta-box-builder' ) : __( 'Add New List', 'meta-box-builder' ) }
			onRequestClose={ onClose }
			className="mbb-modal mbb-block-list-editor"
			size="large"
		>
			<TextControl label={ __( 'List Name', 'meta-box-builder' ) } value={ name } onChange={ setName } required __next40pxDefaultSize />

			<div className="mbb-block-list-columns">
				<div className="mbb-block-list-column">
					<h4>{ __( 'Available Blocks', 'meta-box-builder' ) }</h4>
					<SearchControl
						value={ availableSearch }
						onChange={ setAvailableSearch }
						placeholder={ __( 'Search blocks...', 'meta-box-builder' ) }
						__nextHasNoMarginBottom
					/>
					<div className="mbb-block-list-items">
						{
							filteredAvailable.map( block => (
								<div key={ block.name } className="mbb-block-item" onClick={ () => moveToSelected( block ) }>
									<BlockIcon block={ block } />
									<span className="mbb-block-label">{ block.title }</span>
								</div>
							) )
						}
					</div>
				</div>

				<div className="mbb-block-list-column">
					<h4>{ __( 'Selected Blocks', 'meta-box-builder' ) }</h4>
					<SearchControl
						value={ selectedSearch }
						onChange={ setSelectedSearch }
						placeholder={ __( 'Search blocks...', 'meta-box-builder' ) }
						__nextHasNoMarginBottom
					/>
					<div className="mbb-block-list-items">
						{
							filteredSelected.map( block => (
								<div key={ block.name } className="mbb-block-item" onClick={ () => moveToAvailable( block ) }>
									<BlockIcon block={ block } />
									<span className="mbb-block-label">{ block.title }</span>
								</div>
							) )
						}
					</div>
				</div>
			</div>

			{ error && <div className="mbb-modal__error">{ error }</div> }

			<Flex gap={ 2 } align="center" justify="flex-end" className="mbb-modal__footer">
				{
					listId && (
						<Button variant="secondary" onClick={ handleSaveAsNew } disabled={ saving }>
							{ __( 'Save as', 'meta-box-builder' ) }
						</Button>
					)
				}
				<Button variant="primary" onClick={ () => handleSave() } disabled={ saving || ! name.trim() }>
					{ __( 'Save', 'meta-box-builder' ) }
				</Button>
			</Flex>
		</Modal>
	);
};

export default BlockListEditor;
