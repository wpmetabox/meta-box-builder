import dotProp from 'dot-prop';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Checkbox from '../../Common/Checkbox';
import CheckboxList from '../../Common/CheckboxList';
import DivRow from '../../Common/DivRow';
import Icon from '../../Common/Icon';
import Input from '../../Common/Input';
import Select from '../../Common/Select';
import Textarea from '../../Common/Textarea';
const { __ } = wp.i18n;
const { useState, useEffect } = wp.element;
const { ColorPicker } = wp.components;

export const Block = ( { defaultValues } ) => {
	const [ iconType, setIconType ] = useState( dotProp.get( defaultValues, 'icon_type', 'dashicons' ) );
	const [ renderWith, setRenderWith ] = useState( dotProp.get( defaultValues, 'render_with', 'callback' ) );
	const updateIconType = e => setIconType( e.target.value );
	const updateRenderWith = e => setRenderWith( e.target.value );

	useEffect( () => {
		jQuery( '.og-color-picker input[type="text"]' ).wpColorPicker();
	}, [ iconType ] );

	return <>
		<h3>{ __( 'Block Settings', 'meta-box-builder' ) }</h3>
		<Input
			name="description"
			label={ __( 'Description', 'meta-box-builder' ) }
			componentId="settings-block-description"
			defaultValue={ dotProp.get( defaultValues, 'description' ) }
		/>
		<Select
			name="icon_type"
			label={ __( 'Icon type', 'meta-box-builder' ) }
			componentId="settings-block-icon_type"
			options={ { dashicons: __( 'Dashicons', 'meta-box-builder' ), svg: __( 'Custom SVG', 'meta-box-builder' ) } }
			defaultValue={ iconType }
			onChange={ updateIconType }
		/>
		{
			iconType === 'svg' &&
			<Textarea
				name="icon_svg"
				label={ __( 'SVG icon', 'meta-box-builder' ) }
				componentId="settings-block-icon_svg"
				placeholder={ __( 'Paste the SVG content here', 'meta-box-builder' ) }
				defaultValue={ dotProp.get( defaultValues, 'icon_svg' ) }
			/>
		}
		{ iconType === 'dashicons' && <Icon label={ __( 'Icon', 'meta-box-builder' ) } name="icon" defaultValue={ dotProp.get( defaultValues, 'icon' ) } /> }
		{
			iconType === 'dashicons' &&
			<Input
				name="icon_foreground"
				className="og-color-picker"
				componentId="settings-block-icon_foreground"
				label={ __( 'Custom icon color', 'meta-box-builder' ) }
				tooltip={ __( 'Leave empty to use default color', 'meta-box-builder' ) }
				defaultValue={ dotProp.get( defaultValues, 'icon_foreground' ) }
			/>
		}
		{
			iconType === 'dashicons' &&
			<Input
				name="icon_background"
				className="og-color-picker"
				componentId="settings-block-icon_background"
				label={ __( 'Custom icon background color', 'meta-box-builder' ) }
				tooltip={ __( 'Leave empty to use default color', 'meta-box-builder' ) }
				defaultValue={ dotProp.get( defaultValues, 'icon_background' ) }
			/>
		}
		<Select
			name="category"
			label={ __( 'Category', 'meta-box-builder' ) }
			componentId="settings-block-category"
			options={ {
				layout: __( 'Layout', 'meta-box-builder' ),
				common: __( 'Common', 'meta-box-builder' ),
				formatting: __( 'Formatting', 'meta-box-builder' ),
				widgets: __( 'Widgets', 'meta-box-builder' ),
				embed: __( 'Embed', 'meta-box-builder' ),
			} }
			defaultValue={ dotProp.get( defaultValues, 'category', 'layout' ) }
		/>
		<Input
			name="keywords"
			label={ __( 'Keywords', 'meta-box-builder' ) }
			componentId="settings-block-keywords"
			tooltip={ __( 'Separate by commas', 'meta-box-builder' ) }
			defaultValue={ dotProp.get( defaultValues, 'keywords' ) }
		/>
		<Select
			name="block_context"
			label={ __( 'Block Settings Position', 'meta-box-builder' ) }
			componentId="settings-block-block_context"
			options={ {
				content: __( 'In the content area', 'meta-box-builder' ),
				side: __( 'On the right sidebar', 'meta-box-builder' ),
			} }
			defaultValue={ dotProp.get( defaultValues, 'block_context', 'content' ) }
		/>
		<CheckboxList
			name="supports[align]"
			label={ __( 'Alignment', 'meta-box-builder' ) }
			componentId="settings-block-supports-align"
			options={ {
				left: __( 'Left', 'meta-box-builder' ),
				right: __( 'Right', 'meta-box-builder' ),
				center: __( 'Center', 'meta-box-builder' ),
				wide: __( 'Wide', 'meta-box-builder' ),
				full: __( 'Full', 'meta-box-builder' ),
			} }
			defaultValue={ dotProp.get( defaultValues, 'supports.align', [] ) }
		/>
		<Checkbox
			name="supports[anchor]"
			label={ __( 'Anchor', 'meta-box-builder' ) }
			componentId="settings-block-supports-anchor"
			defaultValue={ dotProp.get( defaultValues, 'supports.anchor', false ) }
		/>
		<Checkbox
			name="supports[customClassName]"
			label={ __( 'Custom CSS class name', 'meta-box-builder' ) }
			componentId="settings-block-supports-custom-class-name"
			defaultValue={ dotProp.get( defaultValues, 'supports.customClassName', false ) }
		/>

		<h3>{ __( 'Block Render Settings', 'meta-box-builder' ) }</h3>
		<Select
			name="render_width"
			label={ __( 'Render with', 'meta-box-builder' ) }
			componentId="settings-block-render_width"
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
				name="render_callback"
				label={ __( 'Render callback', 'meta-box-builder' ) }
				componentId="settings-block-render_callback"
				placeholder={ __( 'Enter PHP function name', 'meta-box-builder' ) }
				defaultValue={ dotProp.get( defaultValues, 'render_callback' ) }
			/>
		}
		{
			renderWith === 'template' &&
			<Input
				name="render_template"
				label={ __( 'Render template', 'meta-box-builder' ) }
				componentId="settings-block-render_template"
				placeholder={ __( 'Enter absolute path to the template file', 'meta-box-builder' ) }
				defaultValue={ dotProp.get( defaultValues, 'render_template' ) }
			/>
		}
		{
			renderWith === 'code' &&
			<DivRow label={ __( 'Render code', 'meta-box-builder' ) }>
				<CodeMirror name="render_code" options={ { mode: 'php', lineNumbers: true } } defaultValue={ dotProp.get( defaultValues, 'render_code' ) } />
				<table className="og-block-description">
					<tbody>
						<tr>
							<td><code>{ "{{ attribute }}" }</code></td>
							<td dangerouslySetInnerHTML={ { __html: __( 'Block attribute. Replace <code>attribute</code> with <code>anchor</code>, <code>align</code> or <code>className</code>).', 'meta-box-builder' ) } } />
						</tr>
						<tr>
							<td><code>{ "{{ field_id }}" }</code></td>
							<td dangerouslySetInnerHTML={ { __html: __( 'Field value. Replace <code>field_id</code> with a real field ID.', 'meta-box-builder' ) } } />
						</tr>
						<tr>
							<td><code>{ "{{ is_preview }}" }</code></td>
							<td dangerouslySetInnerHTML={ { __html: __( 'Whether in preview mode.', 'meta-box-builder' ) } } />
						</tr>
						<tr>
							<td><code>{ "{{ post_id }}" }</code></td>
							<td dangerouslySetInnerHTML={ { __html: __( 'Current post ID.', 'meta-box-builder' ) } } />
						</tr>
						<tr>
							<td><code>mb.function()</code></td>
							<td dangerouslySetInnerHTML={ { __html: __( 'Run a PHP/WordPress function via <code>mb</code> namespace. Replace <code>function</code> with a valid PHP/WordPress function name.', 'meta-box-builder' ) } } />
						</tr>
					</tbody>
				</table>
			</DivRow>
		}
		<Input
			name="enqueue_style"
			label={ __( 'Custom CSS', 'meta-box-builder' ) }
			componentId="settings-block-enqueue_style"
			placeholder={ __( 'Enter URL to the custom CSS file', 'meta-box-builder' ) }
			defaultValue={ dotProp.get( defaultValues, 'enqueue_style' ) }
		/>
		<Input
			name="enqueue_script"
			label={ __( 'Custom JavaScript', 'meta-box-builder' ) }
			componentId="settings-block-enqueue_script"
			placeholder={ __( 'Enter URL to the custom JavaScript file', 'meta-box-builder' ) }
			defaultValue={ dotProp.get( defaultValues, 'enqueue_script' ) }
		/>
		<Input
			name="enqueue_assets"
			label={ __( 'Custom assets callback', 'meta-box-builder' ) }
			componentId="settings-block-enqueue_assets"
			placeholder={ __( 'Enter PHP callback function name', 'meta-box-builder' ) }
			defaultValue={ dotProp.get( defaultValues, 'enqueue_assets' ) }
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