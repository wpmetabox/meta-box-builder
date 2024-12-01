import { Flex } from "@wordpress/components";
import { RawHTML, useEffect, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { UnControlled as CodeMirror } from 'react-codemirror2';
import DivRow from '../../controls/DivRow';
import Input from '../../controls/Input';
import Select from '../../controls/Select';
import useSettings from "../../hooks/useSettings";

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

const BlockRenderSettings = () => {
	const { getSetting } = useSettings();
	const [ renderWith, setRenderWith ] = useState( getSetting( 'render_with', 'callback' ) );
	const [ codeEditor, setCodeEditor ] = useState();

	const [ views, setViews ] = useState( MbbApp.views );
	const [ renderView, setRenderView ] = useState( getSetting( 'render_view' ) );

	const addViewButtonRef = useRef();
	const editViewButtonRef = useRef();

	const codeRef = useRef();

	const updateRenderWith = e => setRenderWith( e.target.value );

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
		<Select
			name="settings[render_with]"
			label={ __( 'Render with', 'meta-box-builder' ) }
			componentId="settings-block-render_with"
			options={ renderWithOptions }
			defaultValue={ renderWith }
			onChange={ updateRenderWith }
		/>
		{
			renderWith === 'callback' &&
			<Input
				name="settings[render_callback]"
				label={ __( 'Render callback', 'meta-box-builder' ) }
				componentId="settings-block-render_callback"
				placeholder={ __( 'Enter PHP function name', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'render_callback', '' ) }
			/>
		}
		{
			renderWith === 'template' &&
			<Input
				name="settings[render_template]"
				label={ __( 'Render template', 'meta-box-builder' ) }
				componentId="settings-block-render_template"
				placeholder={ __( 'Enter absolute path to the template file', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'render_template', '' ) }
			/>
		}
		{
			renderWith === 'code' &&
			<DivRow label={ __( 'Render code', 'meta-box-builder' ) }>
				<CodeMirror
					options={ { mode: 'php' } }
					value={ getSetting( 'render_code', '' ) }
					onChange={ ( editor, data, value ) => codeRef.current.value = value }
					editorDidMount={ setCodeEditor }
				/>
				<input type="hidden" name="settings[render_code]" ref={ codeRef } defaultValue={ getSetting( 'render_code', '' ) } />
				<table className="og-block-description">
					<tbody>
						<tr>
							<td><code>{ "{{ attribute }}" }</code></td>
							<td><RawHTML>{ __( 'Block attribute. Replace <code>attribute</code> with <code>anchor</code>, <code>align</code> or <code>className</code>).', 'meta-box-builder' ) }</RawHTML></td>
						</tr>
						<tr>
							<td><code>{ "{{ field_id }}" }</code></td>
							<td><RawHTML>{ __( 'Field value. Replace <code>field_id</code> with a real field ID.', 'meta-box-builder' ) }</RawHTML></td>
						</tr>
						<tr>
							<td><code>{ "{{ is_preview }}" }</code></td>
							<td><RawHTML>{ __( 'Whether in preview mode.', 'meta-box-builder' ) }</RawHTML></td>
						</tr>
						<tr>
							<td><code>{ "{{ post_id }}" }</code></td>
							<td><RawHTML>{ __( 'Current post ID.', 'meta-box-builder' ) }</RawHTML></td>
						</tr>
						<tr>
							<td><code>mb.function()</code></td>
							<td><RawHTML>{ __( 'Run a PHP/WordPress function via <code>mb</code> namespace. Replace <code>function</code> with a valid PHP/WordPress function name.', 'meta-box-builder' ) }</RawHTML></td>
						</tr>
					</tbody>
				</table>
			</DivRow>
		}

		{
			renderWith === 'view' && MbbApp.extensions.views &&
			<DivRow htmlFor="settings-block-render_view" label={ __( 'Select a view', 'meta-box-builder' ) } className="og-field--block-view">
				<select
					name="settings[render_view]"
					id="settings-block-render_view"
					value={ renderView }
					onChange={ handleSelectView }
				>
					<option value="">{ __( 'Select a view', 'meta-box-builder' ) }</option>
					{
						Object.entries( views ).map( ( [ id, view ] ) => (
							<option key={ id } data-id={ id } value={ view.post_name }>{ view.post_title }</option>
						) )
					}
				</select>

				<Flex justify="left">
					<a href="#" ref={ addViewButtonRef } data-url={ MbbApp.viewAddUrl }>{ __( '+ Add View', 'meta-box-builder' ) }</a>
					{
						renderView && <a href="#" ref={ editViewButtonRef }>{ __( 'Edit View', 'meta-box-builder' ) }</a>
					}
				</Flex>
			</DivRow>
		}

		<Input
			name="settings[enqueue_style]"
			label={ __( 'Custom CSS', 'meta-box-builder' ) }
			componentId="settings-block-enqueue_style"
			placeholder={ __( 'Enter URL to the custom CSS file', 'meta-box-builder' ) }
			defaultValue={ getSetting( 'enqueue_style', '' ) }
		/>
		<Input
			name="settings[enqueue_script]"
			label={ __( 'Custom JavaScript', 'meta-box-builder' ) }
			componentId="settings-block-enqueue_script"
			placeholder={ __( 'Enter URL to the custom JavaScript file', 'meta-box-builder' ) }
			defaultValue={ getSetting( 'enqueue_script', '' ) }
		/>
		<Input
			name="settings[enqueue_assets]"
			label={ __( 'Custom assets callback', 'meta-box-builder' ) }
			componentId="settings-block-enqueue_assets"
			placeholder={ __( 'Enter PHP callback function name', 'meta-box-builder' ) }
			defaultValue={ getSetting( 'enqueue_assets', '' ) }
		/>

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

export default BlockRenderSettings;