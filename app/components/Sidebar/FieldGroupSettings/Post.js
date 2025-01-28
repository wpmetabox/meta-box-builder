import { __ } from "@wordpress/i18n";
import Select from "../../../controls/Select";
import Toggle from "../../../controls/Toggle";
import ToggleGroup from "../../../controls/ToggleGroup";
import useSettings from "../../../hooks/useSettings";

const Post = () => {
	const { getPostTypes, getSetting } = useSettings();
	const postTypes = getPostTypes();

	const isClassic = !MbbApp.postTypes.find( pt => postTypes.includes( pt.slug ) && pt.block_editor );

	let ContextControl = ToggleGroup;
	let contextOptions = {
		normal: __( 'After content', 'meta-box-builder' ),
		side: __( 'Side', 'meta-box-builder' ),
	};
	if ( isClassic ) {
		ContextControl = Select;
		contextOptions.form_top = __( 'Before post title', 'meta-box-builder' );
		contextOptions.after_title = __( 'After post title', 'meta-box-builder' );
	}

	return <>
		<ContextControl
			name="settings[context]"
			label={ __( 'Position', 'meta-box-builder' ) }
			options={ contextOptions }
			defaultValue={ getSetting( 'context', 'normal' ) }
		/>
		<ToggleGroup
			name="settings[priority]"
			label={ __( 'Priority', 'meta-box-builder' ) }
			options={ { high: __( 'High', 'meta-box-builder' ), low: __( 'Low', 'meta-box-builder' ) } }
			defaultValue={ getSetting( 'priority', 'high' ) }
		/>
		<ToggleGroup
			name="settings[style]"
			label={ __( 'Style', 'meta-box-builder' ) }
			options={ { default: __( 'Standard', 'meta-box-builder' ), seamless: __( 'Seamless', 'meta-box-builder' ) } }
			defaultValue={ getSetting( 'style', 'default' ) }
		/>
		<Toggle
			name="settings[closed]"
			label={ __( 'Collapsed by default', 'meta-box-builder' ) }
			tooltip={ __( 'Whether to collapse the meta box when page loads', 'meta-box-builder' ) }
			defaultValue={ !!getSetting( 'closed', false ) }
		/>
		{
			isClassic &&
			<Toggle
				name="settings[default_hidden]"
				label={ __( 'Hidden by default', 'meta-box-builder' ) }
				tooltip={ __( 'The meta box is hidden by default and requires users to select the corresponding checkbox in Screen Options to show it', 'meta-box-builder' ) }
				defaultValue={ !!getSetting( 'default_hidden', false ) }
			/>
		}
		{
			isClassic &&
			<Toggle
				name="settings[autosave]"
				label={ __( 'Autosave', 'meta-box-builder' ) }
				defaultValue={ !!getSetting( 'autosave', false ) }
			/>
		}
		{
			MbbApp.extensions.revision &&
			<Toggle
				name="settings[revision]"
				label={ __( 'Enable revision', 'meta-box-builder' ) }
				tooltip={ __( 'Track changes of custom fields with revisions', 'meta-box-builder' ) }
				defaultValue={ !!getSetting( 'revision', false ) }
			/>
		}
	</>;
};

export default Post;