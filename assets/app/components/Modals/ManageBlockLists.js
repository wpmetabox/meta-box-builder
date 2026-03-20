import { __ } from '@wordpress/i18n';
import { Modal, Button, Flex } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const ManageBlockLists = ( { isOpen, onClose, onEdit, onAddNew } ) => {
	const [ lists, setLists ] = useState( {} );
	const [ loading, setLoading ] = useState( true );
	const [ deleting, setDeleting ] = useState( null );

	const fetchLists = () => {
		apiFetch( { path: '/mbb/allowed-block-lists' } )
			.then( data => {
				setLists( data );
				setLoading( false );
			} )
			.catch( () => setLoading( false ) );
	};

	useEffect( () => {
		if ( isOpen ) {
			fetchLists();
		}
	}, [ isOpen ] );

	const handleDelete = async ( id ) => {
		if ( ! confirm( __( 'Are you sure you want to delete this list?', 'meta-box-builder' ) ) ) {
			return;
		}

		setDeleting( id );
		try {
			await apiFetch( {
				path: `/mbb/allowed-block-lists/${ id }`,
				method: 'DELETE',
			} );
			fetchLists();
		} catch ( e ) {
			// eslint-disable-next-line no-console
			console.error( e );
		}
		setDeleting( null );
	};

	const handleExport = () => {
		apiFetch( { path: '/mbb/allowed-block-lists/export' } ).then(
			( data ) => {
				const blob = new Blob( [ JSON.stringify( data, null, 2 ) ], {
					type: 'application/json',
				} );
				const url = URL.createObjectURL( blob );
				const a = document.createElement( 'a' );
				a.href = url;
				a.download = 'allowed-block-lists.json';
				a.click();
				URL.revokeObjectURL( url );
			}
		);
	};

	const handleImport = () => {
		const input = document.createElement( 'input' );
		input.type = 'file';
		input.accept = '.json';
		input.onchange = async ( e ) => {
			const file = e.target.files[ 0 ];
			if ( ! file ) {
				return;
			}

			const reader = new FileReader();
			reader.onload = async ( event ) => {
				try {
					const importedLists = JSON.parse( event.target.result );
					await apiFetch( {
						path: '/mbb/allowed-block-lists/import',
						method: 'POST',
						data: { lists: importedLists },
					} );
					fetchLists();
				} catch ( err ) {
					// eslint-disable-next-line no-console
					console.error( err );
				}
			};
			reader.readAsText( file );
		};
		input.click();
	};

	if ( ! isOpen ) {
		return null;
	}

	return (
		<Modal
			title={ __( 'Manage Block Lists', 'meta-box-builder' ) }
			onRequestClose={ onClose }
			className="mbb-modal"
			size="large"
		>
			<Flex className="mbb-modal__header" justify="space-between" align="center">
				<Button variant="primary" onClick={ onAddNew }>
					{ __( 'Add New', 'meta-box-builder' ) }
				</Button>

				<Flex gap={ 2 } justify="flex-end">
					<Button variant="link" onClick={ handleExport }>
						{ __( 'Export', 'meta-box-builder' ) }
					</Button>
					<span>|</span>
					<Button variant="link" onClick={ handleImport }>
						{ __( 'Import', 'meta-box-builder' ) }
					</Button>
				</Flex>
			</Flex>

			<table className="widefat">
				<thead>
					<tr>
						<th>{ __( 'ID', 'meta-box-builder' ) }</th>
						<th>{ __( 'Name', 'meta-box-builder' ) }</th>
						<th>{ __( 'Block Count', 'meta-box-builder' ) }</th>
						<th>{ __( 'Actions', 'meta-box-builder' ) }</th>
					</tr>
				</thead>
				<tbody>
					{
						loading
						? (
							<tr>
								<td colSpan={ 4 }>
									{ __( 'Loading…', 'meta-box-builder' ) }
								</td>
							</tr>
						)
						: Object.keys( lists ).length === 0
						? (
							<tr>
								<td colSpan={ 4 }>
									{ __( 'No lists found.', 'meta-box-builder' ) }
								</td>
							</tr>
						)
						: (
							Object.entries( lists ).map( ( [ id, list ] ) => (
								<tr key={ id }>
									<td>{ id }</td>
									<td>{ list.name }</td>
									<td>{ list.blocks?.length || 0 }</td>
									<td>
										<Flex gap={ 2 } justify="flex-start">
											<Button variant="link" onClick={ () => onEdit( id ) }>
												{ __( 'Edit', 'meta-box-builder' ) }
											</Button>
											<Button
												variant="link"
												isDestructive
												onClick={ () => handleDelete( id ) }
												disabled={ deleting === id }
											>
												{ __( 'Delete', 'meta-box-builder' ) }
											</Button>
										</Flex>
									</td>
								</tr>
							) )
						)
					}
				</tbody>
			</table>
		</Modal>
	);
};

export default ManageBlockLists;
