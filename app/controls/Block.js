import { RawHTML, useEffect, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { fetcher, getSettings } from "../functions";
import useObjectType from "../hooks/useObjectType";
import Checkbox from './Checkbox';
import DivRow from './DivRow';
import Icon from './Icon';
import Input from './Input';
import ReactSelect from './ReactSelect';
import Select from './Select';
import Textarea from './Textarea';
import { ensureArray } from '/functions';

const Block = () => {
	const settings = getSettings();
	const [ iconType, setIconType ] = useState( settings.icon_type || 'dashicons' );
	const [ renderWith, setRenderWith ] = useState( settings.render_with || 'callback' );
	const [ codeEditor, setCodeEditor ] = useState();
	const codeRef = useRef();
	const objectType = useObjectType( state => state.type );

	useEffect( () => {
		jQuery( '.og-color-picker input[type="text"]' ).wpColorPicker();
	}, [ iconType ] );

	const updateIconType = e => setIconType( e.target.value );
	const updateRenderWith = e => setRenderWith( e.target.value );

	const [ blockPathError, setBlockPathError ] = useState( MbbApp.data?.block_path_error );

	const checkFuturePathPermission = async ( _, path ) => {
		const res = await fetcher( 'is-future-path-writable', { path } );
		const errorMessage = res ? '' : __( 'The path is not writable.', 'meta-box-builder' );

		setBlockPathError( errorMessage );
	};


	useEffect( () => {
		if ( codeEditor ) {
			setTimeout( () => codeEditor.refresh(), 3000 );
		}
	}, [ codeEditor ] );

	return objectType === 'block' && <>
		<Input
			name="settings[description]"
			label={ __( 'Description', 'meta-box-builder' ) }
			componentId="settings-block-description"
			defaultValue={ settings.description }
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
		<Select
			name="settings[block_context]"
			label={ __( 'Block Settings Position', 'meta-box-builder' ) }
			componentId="settings-block-block_context"
			options={ {
				normal: __( 'In the content area', 'meta-box-builder' ),
				side: __( 'On the right sidebar', 'meta-box-builder' ),
			} }
			defaultValue={ settings.block_context || 'normal' }
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

		<Checkbox
			name="settings[supports][customClassName]"
			label={ __( 'Custom CSS class name', 'meta-box-builder' ) }
			componentId="settings-block-supports-custom-class-name"
			defaultValue={ !!settings.supports?.customClassName }
		/>

		<h3>{ __( 'Block Render Settings', 'meta-box-builder' ) }</h3>
		<Select
			name="settings[render_with]"
			label={ __( 'Render with', 'meta-box-builder' ) }
			componentId="settings-block-render_with"
			options={ {
				callback: __( 'PHP callback function', 'meta-box-builder' ),
				template: __( 'Template file', 'meta-box-builder' ),
				code: __( 'Code', 'meta-box-builder' ),
			} }
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
				defaultValue={ settings.render_callback }
			/>
		}
		{
			renderWith === 'template' &&
			<Input
				name="settings[render_template]"
				label={ __( 'Render template', 'meta-box-builder' ) }
				componentId="settings-block-render_template"
				placeholder={ __( 'Enter absolute path to the template file', 'meta-box-builder' ) }
				defaultValue={ settings.render_template }
			/>
		}
		{
			renderWith === 'code' &&
			<DivRow label={ __( 'Render code', 'meta-box-builder' ) }>
				<CodeMirror
					options={ { mode: 'php' } }
					value={ settings.render_code }
					onChange={ ( editor, data, value ) => codeRef.current.value = value }
					editorDidMount={ setCodeEditor }
				/>
				<input type="hidden" name="settings[render_code]" ref={ codeRef } defaultValue={ settings.render_code } />
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

		<Input
			name="settings[enqueue_style]"
			label={ __( 'Custom CSS', 'meta-box-builder' ) }
			componentId="settings-block-enqueue_style"
			placeholder={ __( 'Enter URL to the custom CSS file', 'meta-box-builder' ) }
			defaultValue={ settings.enqueue_style }
		/>
		<Input
			name="settings[enqueue_script]"
			label={ __( 'Custom JavaScript', 'meta-box-builder' ) }
			componentId="settings-block-enqueue_script"
			placeholder={ __( 'Enter URL to the custom JavaScript file', 'meta-box-builder' ) }
			defaultValue={ settings.enqueue_script }
		/>
		<Input
			name="settings[enqueue_assets]"
			label={ __( 'Custom assets callback', 'meta-box-builder' ) }
			componentId="settings-block-enqueue_assets"
			placeholder={ __( 'Enter PHP callback function name', 'meta-box-builder' ) }
			defaultValue={ settings.enqueue_assets }
		/>

<h3>{ __( 'Block JSON Settings', 'meta-box-builder' ) }</h3>
		<Checkbox
			name="settings[block_json][enable]"
			label={ __( 'Generate block.json', 'meta-box-builder' ) }
			componentId="settings-block_json_enable"
			defaultValue={ !!settings.block_json?.enable }
		/>

		<Input
			name="settings[block_json][path]"
			label={ __( 'Block folder', 'meta-box-builder' ) }
			componentId="settings-block-path"
			description={ __( 'Enter absolute path to the folder containing the <code>block.json</code> and block asset files. <b>Do not include the block name (e.g. field group ID)</b>. The full path for the block files will be like <code>path/to/folder/block-name/block.json</code>.', 'meta-box-builder' ) }
			defaultValue={ settings.block_json?.path }
			error={ blockPathError }
			updateFieldData={ checkFuturePathPermission }
			dependency="block_json_enable:true"
		/>

		<DivRow label={ __( 'Supported variables', 'meta-box-builder' ) } >
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

export default Block;