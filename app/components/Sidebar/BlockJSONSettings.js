import { Flex } from "@wordpress/components";
import { useEffect, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Checkbox from '../../controls/Checkbox';
import DivRow from '../../controls/DivRow';
import Input from '../../controls/Input';
import { fetcher, getSettings } from "../../functions";

const renderWithOptions = {
	callback: __( 'PHP callback function', 'meta-box-builder' ),
	template: __( 'Template file', 'meta-box-builder' ),
	code: __( 'Code', 'meta-box-builder' ),
};

if ( MbbApp.extensions.views ) {
	renderWithOptions[ 'view' ] = __( 'View', 'meta-box-builder' );
}

const getRenderViewId = ( renderView ) => {
	const view = Object.values( MbbApp.views )?.find( view => view.post_name === renderView );

	return view?.ID;
};

const BlockJSONSettings = () => {
	const [ settings, setSettings ] = useState( getSettings() );
	const [ iconType, setIconType ] = useState( settings.icon_type || 'dashicons' );
	const [ renderWith, setRenderWith ] = useState( settings.render_with || 'callback' );
	const [ codeEditor, setCodeEditor ] = useState();

	const [ views, setViews ] = useState( MbbApp.views );
	const [ renderView, setRenderView ] = useState( settings.render_view );

	const addViewButtonRef = useRef();
	const editViewButtonRef = useRef();

	const codeRef = useRef();

	useEffect( () => {
		jQuery( '.og-color-picker input[type="text"]' ).wpColorPicker();
	}, [ iconType ] );

	const updateIconType = e => setIconType( e.target.value );
	const updateRenderWith = e => setRenderWith( e.target.value );

	const [ blockPathError, setBlockPathError ] = useState( MbbApp.data?.block_path_error );
	const [ isNewer, setIsNewer ] = useState( false );

	const modalConfig = {
		hideElement: '#editor .interface-interface-skeleton__footer, .edit-post-fullscreen-mode-close',
		isBlockEditor: false,
		callback: ( $modal, $modalContent ) => {
			// Set the default type to block when adding a new view
			$modalContent.find( '#type' ).val( 'block' );
		},
		closeModalCallback: ( $modal, $input ) => {
			const postId = $modal.find( '#post_ID' ).val();
			const postName = $modal.find( '#post_name' ).val();
			const postTitle = $modal.find( '#title' ).val();

			setViews( {
				...views,
				[ postId ]: { ID: postId, post_name: postName, post_title: postTitle }
			} );
			setRenderView( postName );
		},
	};
	/**
	 * Get local path data, including whether the path is writable, block.json version.
	 *
	 * @param any _
	 * @param string path
	 */
	const getLocalPathData = async ( _, path ) => {
		const postName = document.getElementById( 'post_name' ).value;

		if ( !postName ) {
			return;
		}

		const { is_writable, is_newer } = await fetcher( 'local-path-data', {
			path,
			version: settings.block_json?.version || 0,
			postName
		} );

		const errorMessage = is_writable ? '' : __( 'The path is not writable.', 'meta-box-builder' );

		setIsNewer( is_newer );
		setBlockPathError( errorMessage );
	};

	const showEditViewModal = e => {
		const $this = jQuery( e );

		$this.attr( 'data-url', MbbApp.viewEditUrl + getRenderViewId( renderView ) + '&action=edit' );

		$this.rwmbModal( { ...modalConfig, isEdit: true } );
	};

	const showAddViewModal = e => {
		const $this = jQuery( e );

		$this.rwmbModal( { ...modalConfig, isEdit: true } );
	};

	const handleSelectView = e => {
		setRenderView( e.target.value );
	};

	useEffect( () => {
		if ( !settings.block_json?.path ) {
			return;
		}

		getLocalPathData( null, settings.block_json?.path );
	}, [] );

	useEffect( () => {
		if ( codeEditor ) {
			setTimeout( () => codeEditor.refresh(), 3000 );
		}
	}, [ codeEditor ] );

	useEffect( () => {
		showAddViewModal( addViewButtonRef?.current );
	}, [ addViewButtonRef.current, renderWith ] );

	useEffect( () => {
		showEditViewModal( editViewButtonRef?.current );
	}, [ editViewButtonRef.current, renderWith, renderView ] );

	return <>
		<Checkbox
			name="settings[block_json][enable]"
			label={ __( 'Generate block.json', 'meta-box-builder' ) }
			componentId="settings-block_json_enable"
			defaultValue={ !!settings.block_json?.enable }
		/>

		<Input
			name="settings[block_json][path]"
			label={ `<span class="og-indent"></span>${ __( 'Block folder', 'meta-box-builder' ) }` }
			componentId="settings-block-path"
			description={ __( 'Enter absolute path to the folder containing the <code>block.json</code> and block asset files. <b>Do not include the block name (e.g. field group ID)</b>. The full path for the block files will be like <code>path/to/folder/block-name/block.json</code>.', 'meta-box-builder' ) }
			defaultValue={ settings.block_json?.path }
			error={ blockPathError }
			updateFieldData={ getLocalPathData }
			dependency="block_json_enable:true"
		/>

		<input type="hidden" name="settings[block_json][version]" value={ settings.block_json?.version } />

		{ isNewer &&
			<DivRow label={ `<span class="og-indent"></span>${ __( 'Synchronize block.json', 'meta-box-builder' ) }` }>
				<Flex direction="column">
					<div dangerouslySetInnerHTML={ {
						__html: __( 'We detected a newer version of <code>block.json</code> from the current folder, do you want to override settings from this path?', 'meta-box-builder' )
					} }></div>

					<div>
						<input
							name="override_block_json"
							value={ __( 'Override Block JSON', 'meta-box-builder' ) }
							type="submit"
							class="button secondary"
							onClick={ ( e ) => {
								if ( !confirm( __( 'Are you sure you want to override the block.json settings?', 'meta-box-builder' ) ) ) {
									e.preventDefault();
								}
							} }
						/>
					</div>
				</Flex>
			</DivRow>
		}

		<DivRow label={ `<span class="og-indent"></span>${ __( 'Supported variables', 'meta-box-builder' ) }` } >
			<table className="og-block-description">
				<tbody>
					<tr>
						<td><code>{ "{{ site.path }}" }</code></td>
						<td>{ __( 'Site path', 'meta-box-builder' ) }</td>
					</tr>
					<tr>
						<td><code>{ "{{ site.url }}" }</code></td>
						<td>{ __( 'Site URL', 'meta-box-builder' ) }</td>
					</tr>
					<tr>
						<td><code>{ "{{ theme.path }}" }</code></td>
						<td>{ __( 'Path to the current [child] theme directory', 'meta-box-builder' ) }</td>
					</tr>
					<tr>
						<td><code>{ "{{ theme.url }}" }</code></td>
						<td>{ __( 'URL to the current [child] theme directory', 'meta-box-builder' ) }</td>
					</tr>
				</tbody>
			</table>
		</DivRow>
	</>;
};

export default BlockJSONSettings;