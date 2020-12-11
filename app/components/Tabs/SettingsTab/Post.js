import dotProp from 'dot-prop';
import Checkbox from '../../Common/Checkbox';
import Select from '../../Common/Select';
const { __ } = wp.i18n;

export const Post = ( { postTypes, defaultValues } ) => {
	const isClassic = !MbbApp.postTypes.find( pt => postTypes.includes( pt.slug ) && pt.block_editor );

	let contextOptions = {
		normal: __( 'After content', 'meta-box-builder' ),
		side: __( 'Side', 'meta-box-builder' ),
	};
	if ( isClassic ) {
		contextOptions.form_top = __( 'Before post title', 'meta-box-builder' );
		contextOptions.after_title = __( 'After post title', 'meta-box-builder' );
	}

	return <>
		<Select
			name="position"
			label={ __( 'Position', 'meta-box-builder' ) }
			options={ contextOptions }
			defaultValue={ dotProp.get( defaultValues, 'position', 'normal' ) }
		/>
		<Select
			name="priority"
			label={ __( 'Priority', 'meta-box-builder' ) }
			options={ { high: __( 'High', 'meta-box-builder' ), low: __( 'Low', 'meta-box-builder' ) } }
			defaultValue={ dotProp.get( defaultValues, 'priority', 'high' ) }
		/>
		<Select
			name="style"
			label={ __( 'Style', 'meta-box-builder' ) }
			options={ { default: __( 'Standard (WordPress meta box)', 'meta-box-builder' ), seamless: __( 'Seamless (no meta box)', 'meta-box-builder' ) } }
			defaultValue={ dotProp.get( defaultValues, 'style', 'default' ) }
		/>
		{
			isClassic &&
			<Checkbox
				name="default_hidden"
				label={ __( 'Hidden by default', 'meta-box-builder' ) }
				tooltip={ __( 'The meta box is hidden by default and requires users to select the corresponding checkbox in Screen Options to show it', 'meta-box-builder' ) }
				defaultValue={ dotProp.get( defaultValues, 'default_hidden', false ) }
			/>
		}
		{
			isClassic &&
			<Checkbox name="autosave" label={ __( 'Autosave', 'meta-box-builder' ) } defaultValue={ dotProp.get( defaultValues, 'autosave', false ) } />
		}
	</>;
};