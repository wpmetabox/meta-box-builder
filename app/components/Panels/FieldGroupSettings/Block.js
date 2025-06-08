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
	const { getSetting, updateSetting } = useSettings();
	const [ iconType, setIconType ] = useState( getSetting( 'icon_type', 'dashicons' ) );
	const [ context, setContext ] = useState( getSetting( 'block_context', 'side' ) );

	useEffect( () => {
		jQuery( '.og-color-picker input[type="text"]' ).wpColorPicker();
	}, [ iconType ] );

	const updateIconType = e => setIconType( e.target.value );

	return <>
		<Input
			name="description"
			label={ __( 'Description', 'meta-box-builder' ) }
			componentId="settings-block-description"
			defaultValue={ getSetting( 'description', '' ) }
			updateField={ updateSetting }
		/>
		<Select
			name="icon_type"
			label={ __( 'Icon type', 'meta-box-builder' ) }
			componentId="settings-block-icon_type"
			options={ { dashicons: __( 'Dashicons', 'meta-box-builder' ), svg: __( 'Custom SVG', 'meta-box-builder' ) } }
			defaultValue={ iconType }
			onChange={ updateIconType }
			updateField={ updateSetting }
		/>
		{
			iconType === 'svg' &&
			<Textarea
				name="icon_svg"
				label={ __( 'SVG icon', 'meta-box-builder' ) }
				componentId="settings-block-icon_svg"
				placeholder={ __( 'Paste the SVG content here', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'icon_svg', '' ) }
				updateField={ updateSetting }
			/>
		}
		{
			iconType === 'dashicons' &&
			<DashiconPicker
				label={ __( 'Icon', 'meta-box-builder' ) }
				name="icon"
				defaultValue={ getSetting( 'icon' ) }
				updateField={ updateSetting }
			/>
		}
		{
			iconType === 'dashicons' &&
			<Input
				name="icon_foreground"
				className="og-color-picker"
				componentId="settings-block-icon_foreground"
				label={ __( 'Icon color', 'meta-box-builder' ) }
				tooltip={ __( 'Leave empty to use default color', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'icon_foreground', '' ) }
				updateField={ updateSetting }
			/>
		}
		{
			iconType === 'dashicons' &&
			<Input
				name="icon_background"
				className="og-color-picker"
				componentId="settings-block-icon_background"
				label={ __( 'Icon background color', 'meta-box-builder' ) }
				tooltip={ __( 'Leave empty to use default color', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'icon_background', '' ) }
				updateField={ updateSetting }
			/>
		}
		<Select
			name="category"
			label={ __( 'Category', 'meta-box-builder' ) }
			componentId="settings-block-category"
			options={ MbbApp.blockCategories }
			defaultValue={ getSetting( 'category', '' ) }
			updateField={ updateSetting }
		/>
		<Input
			name="keywords"
			label={ __( 'Keywords', 'meta-box-builder' ) }
			componentId="settings-block-keywords"
			tooltip={ __( 'Separate by commas', 'meta-box-builder' ) }
			defaultValue={ getSetting( 'keywords', '' ) }
			updateField={ updateSetting }
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
			onChange={ value => {
				setContext( value );
				updateSetting( 'block_context', value );
			} }
		/>
		<ReactSelect
			name="supports.align"
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
			onChange={ items => updateSetting( 'supports.align', items ? items.map( item => item.value ) : [] ) }
		/>

		<Toggle
			name="supports.customClassName"
			label={ __( 'Custom CSS class name', 'meta-box-builder' ) }
			componentId="settings-block-supports-custom-class-name"
			defaultValue={ !!getSetting( 'supports', {} ).customClassName }
			updateField={ updateSetting }
		/>
	</>;
};

export default Block;