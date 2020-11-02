import Checkbox from '../../Common/Checkbox';
import CheckboxList from '../../Common/CheckboxList';
import Icon from '../../Common/Icon';
import Input from '../../Common/Input';
import Select from '../../Common/Select';
import Textarea from '../../Common/Textarea';
const { __ } = wp.i18n;
const { useState } = wp.element;

export const Block = () => {
	const [ iconType, setIconType ] = useState( 'dashicons' );
	const updateIconType = e => setIconType( e.target.value );

	return <>
		<h3>{ __( 'Options', 'meta-box-builder' ) }</h3>
		<Input name="description" label={ __( 'Description', 'meta-box-builder' ) } />
		<Select
			name="icon_type"
			label={ __( 'Icon type', 'meta-box-builder' ) }
			options={ { dashicons: __( 'Dashicons', 'meta-box-builder' ), svg: __( 'Custom SVG', 'meta-box-builder' ) } }
			defaultValue="dashicons"
			onChange={ updateIconType }
		/>
		{
			iconType === 'svg' &&
			<Textarea
				name="icon_svg"
				label={ __( 'SVG icon', 'meta-box-builder' ) }
				placeholder={ __( 'Paste the SVG content here', 'meta-box-builder' ) }
			/>
		}
		{ iconType === 'dashicons' && <Icon label={ __( 'Icon', 'meta-box-builder' ) } name="icon" /> }
		<Select
			name="category"
			label={ __( 'Category', 'meta-box-builder' ) }
			options={ {
				layout: __( 'Layout', 'meta-box-builder' ),
				common: __( 'Common', 'meta-box-builder' ),
				formatting: __( 'Formatting', 'meta-box-builder' ),
				widgets: __( 'Widgets', 'meta-box-builder' ),
				embed: __( 'Embed', 'meta-box-builder' ),
			} }
			defaultValue="layout"
		/>
		<Input name="keywords" label={ __( 'Keywords', 'meta-box-builder' ) } tooltip={ __( 'Separate by commas', 'meta-box-builder' ) } />
		<Select
			name="block_context"
			label={ __( 'Block Settings Position', 'meta-box-builder' ) }
			options={ {
				content: __( 'In the content area', 'meta-box-builder' ),
				side: __( 'On the right sidebar', 'meta-box-builder' ),
			} }
			defaultValue="layout"
		/>
		<CheckboxList
			name="supports[align]"
			label={ __( 'Alignment', 'meta-box-builder' ) }
			options={ {
				left  : __( 'Left', 'meta-box-builder' ),
				right : __( 'Right', 'meta-box-builder' ),
				center: __( 'Center', 'meta-box-builder' ),
				wide  : __( 'Wide', 'meta-box-builder' ),
				full  : __( 'Full', 'meta-box-builder' ),
			} }
		/>
		<Checkbox name="supports[anchor]" label={ __( 'Anchor', 'meta-box-builder' ) } />
		<Checkbox name="supports[customClassName]" label={ __( 'Custom CSS class name', 'meta-box-builder' ) } />
	</>;
};