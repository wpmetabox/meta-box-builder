import dotProp from 'dot-prop';
import Checkbox from './Checkbox';
import Select from './Select';
const { __ } = wp.i18n;

const Post = ( { objectType, postTypes, settings } ) => {
	const isClassic = !MbbApp.postTypes.find( pt => postTypes.includes( pt.slug ) && pt.block_editor );

	let contextOptions = {
		normal: __( 'After content', 'meta-box-builder' ),
		side: __( 'Side', 'meta-box-builder' ),
	};
	if ( isClassic ) {
		contextOptions.form_top = __( 'Before post title', 'meta-box-builder' );
		contextOptions.after_title = __( 'After post title', 'meta-box-builder' );
	}

	return objectType === 'post' && postTypes.length > 0 && <>
		<Select
			name="settings[context]"
			label={ __( 'Position', 'meta-box-builder' ) }
			options={ contextOptions }
			defaultValue={ dotProp.get( settings, 'context', 'normal' ) }
			componentId="settings-context"
		/>
		<Select
			name="settings[priority]"
			label={ __( 'Priority', 'meta-box-builder' ) }
			options={ { high: __( 'High', 'meta-box-builder' ), low: __( 'Low', 'meta-box-builder' ) } }
			defaultValue={ dotProp.get( settings, 'priority', 'high' ) }
			componentId="settings-priority"
		/>
		<Select
			name="settings[style]"
			label={ __( 'Style', 'meta-box-builder' ) }
			options={ { default: __( 'Standard (WordPress meta box)', 'meta-box-builder' ), seamless: __( 'Seamless (no meta box)', 'meta-box-builder' ) } }
			defaultValue={ dotProp.get( settings, 'style', 'default' ) }
			componentId="settings-style"
		/>
		<Checkbox
			name="settings[closed]"
			label={ __( 'Collapsed by default', 'meta-box-builder' ) }
			tooltip={ __( 'Whether to collapse the meta box when page loads', 'meta-box-builder' ) }
			defaultValue={ dotProp.get( settings, 'closed', false ) }
			componentId="settings-closed"
		/>
		{
			isClassic &&
			<Checkbox
				name="settings[default_hidden]"
				label={ __( 'Hidden by default', 'meta-box-builder' ) }
				tooltip={ __( 'The meta box is hidden by default and requires users to select the corresponding checkbox in Screen Options to show it', 'meta-box-builder' ) }
				defaultValue={ dotProp.get( settings, 'default_hidden', false ) }
				componentId="settings-default_hidden"
			/>
		}
		{
			isClassic &&
			<Checkbox
				name="settings[autosave]"
				label={ __( 'Autosave', 'meta-box-builder' ) }
				defaultValue={ dotProp.get( settings, 'autosave', false ) }
				componentId="settings-autosave"
			/>
		}
	</>;
};

export default Post;