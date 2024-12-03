import { RadioControl } from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import DashiconPicker from '../../../controls/DashiconPicker';
import Input from '../../../controls/Input';
import ReactSelect from '../../../controls/ReactSelect';
import Select from '../../../controls/Select';
import Textarea from '../../../controls/Textarea';
import Toggle from "../../../controls/Toggle";
import useSettings from "../../../hooks/useSettings";
import { ensureArray } from '/functions';

const Block = () => {
	const { getSetting } = useSettings();
	const [ iconType, setIconType ] = useState( getSetting( 'icon_type', 'dashicons' ) );
	const [ context, setContext ] = useState( getSetting( 'block_context', 'side' ) );

	useEffect( () => {
		jQuery( '.og-color-picker input[type="text"]' ).wpColorPicker();
	}, [ iconType ] );

	const updateIconType = e => setIconType( e.target.value );

	return <>
		<Input
			name="settings[description]"
			label={ __( 'Description', 'meta-box-builder' ) }
			componentId="settings-block-description"
			defaultValue={ getSetting( 'description', '' ) }
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
				defaultValue={ getSetting( 'icon_svg', '' ) }
			/>
		}
		{
			iconType === 'dashicons' &&
			<DashiconPicker
				label={ __( 'Icon', 'meta-box-builder' ) }
				name="settings[icon]"
				defaultValue={ getSetting( 'icon' ) }
			/>
		}
		{
			iconType === 'dashicons' &&
			<Input
				name="settings[icon_foreground]"
				className="og-color-picker"
				componentId="settings-block-icon_foreground"
				label={ __( 'Icon color', 'meta-box-builder' ) }
				tooltip={ __( 'Leave empty to use default color', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'icon_foreground', '' ) }
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
				defaultValue={ getSetting( 'icon_background', '' ) }
			/>
		}
		<Select
			name="settings[category]"
			label={ __( 'Category', 'meta-box-builder' ) }
			componentId="settings-block-category"
			options={ MbbApp.blockCategories }
			defaultValue={ getSetting( 'category', '' ) }
		/>
		<Input
			name="settings[keywords]"
			label={ __( 'Keywords', 'meta-box-builder' ) }
			componentId="settings-block-keywords"
			tooltip={ __( 'Separate by commas', 'meta-box-builder' ) }
			defaultValue={ getSetting( 'keywords', '' ) }
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
			selected={ context }
			onChange={ setContext }
		/>
		<input type="hidden" name="settings[block_context]" value={ context } />
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
			defaultValue={ ensureArray( getSetting( 'supports', {} ).align || [] ) }
		/>

		<Toggle
			name="settings[supports][customClassName]"
			label={ __( 'Custom CSS class name', 'meta-box-builder' ) }
			componentId="settings-block-supports-custom-class-name"
			defaultValue={ !!getSetting( 'supports', {} ).customClassName }
		/>
	</>;
};

export default Block;