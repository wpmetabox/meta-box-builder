import { RadioControl } from "@wordpress/components";
import { useEffect, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Icon from '../../controls/Icon';
import Input from '../../controls/Input';
import ReactSelect from '../../controls/ReactSelect';
import Select from '../../controls/Select';
import Textarea from '../../controls/Textarea';
import Toggle from "../../controls/Toggle";
import { fetcher, getSettings } from "../../functions";
import { ensureArray } from '/functions';

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

const Block = () => {
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
		<Input
			name="settings[description]"
			label={ __( 'Description', 'meta-box-builder' ) }
			componentId="settings-block-description"
			value={ settings.description }
			onChange={ e => setSettings( { ...settings, description: e.target.value } ) }
		/>
		<Select
			name="settings[icon_type]"
			label={ __( 'Icon type', 'meta-box-builder' ) }
			componentId="settings-block-icon_type"
			options={ { dashicons: __( 'Dashicons', 'meta-box-builder' ), svg: __( 'Custom SVG', 'meta-box-builder' ) } }
			defaultValue={ iconType }
			onChange={ updateIconType }
		/>
		{
			iconType === 'svg' &&
			<Textarea
				name="settings[icon_svg]"
				label={ __( 'SVG icon', 'meta-box-builder' ) }
				componentId="settings-block-icon_svg"
				placeholder={ __( 'Paste the SVG content here', 'meta-box-builder' ) }
				defaultValue={ settings.icon_svg }
			/>
		}
		{ iconType === 'dashicons' && <Icon label={ __( 'Icon', 'meta-box-builder' ) } name="settings[icon]" defaultValue={ settings.icon } /> }
		{
			iconType === 'dashicons' &&
			<Input
				name="settings[icon_foreground]"
				className="og-color-picker"
				componentId="settings-block-icon_foreground"
				label={ __( 'Icon color', 'meta-box-builder' ) }
				tooltip={ __( 'Leave empty to use default color', 'meta-box-builder' ) }
				defaultValue={ settings.icon_foreground }
			/>
		}
		{
			iconType === 'dashicons' &&
			<Input
				name="settings[icon_background]"
				className="og-color-picker"
				componentId="settings-block-icon_background"
				label={ __( 'Icon background color', 'meta-box-builder' ) }
				tooltip={ __( 'Leave empty to use default color', 'meta-box-builder' ) }
				defaultValue={ settings.icon_background }
			/>
		}
		<Select
			name="settings[category]"
			label={ __( 'Category', 'meta-box-builder' ) }
			componentId="settings-block-category"
			options={ MbbApp.blockCategories }
			defaultValue={ settings.category }
		/>
		<Input
			name="settings[keywords]"
			label={ __( 'Keywords', 'meta-box-builder' ) }
			componentId="settings-block-keywords"
			tooltip={ __( 'Separate by commas', 'meta-box-builder' ) }
			defaultValue={ settings.keywords }
		/>
		<RadioControl
			className="og-field"
			label={ __( 'Block settings position', 'meta-box-builder' ) }
			options={ [
				{
					label: __( 'In the content area', 'meta-box-builder' ),
					value: 'normal',
				},
				{
					label: __( 'On the right sidebar', 'meta-box-builder' ),
					value: 'side',
				},
			] }
			selected={ settings.block_context || 'side' }
			onChange={ value => setSettings( { ...settings, block_context: value } ) }
		/>
		<ReactSelect
			name="settings[supports][align][]"
			label={ __( 'Alignment', 'meta-box-builder' ) }
			componentId="settings-block-supports-align"
			options={ {
				left: __( 'Left', 'meta-box-builder' ),
				right: __( 'Right', 'meta-box-builder' ),
				center: __( 'Center', 'meta-box-builder' ),
				wide: __( 'Wide', 'meta-box-builder' ),
				full: __( 'Full', 'meta-box-builder' ),
			} }
			defaultValue={ ensureArray( settings.supports?.align || [] ) }
		/>

		<Toggle
			name="settings[supports][customClassName]"
			label={ __( 'Custom CSS class name', 'meta-box-builder' ) }
			componentId="settings-block-supports-custom-class-name"
			defaultValue={ !!settings.supports?.customClassName }
		/>
	</>;
};

export default Block;