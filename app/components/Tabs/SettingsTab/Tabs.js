import Checkbox from '../../Common/Checkbox';
import Select from '../../Common/Select';
const { __ } = wp.i18n;

export const Tabs = () => (
	<>
		<Select
			name="tab_style"
			label={ __( 'Tab style', 'meta-box-builder' ) }
			options={ {
				default: __( 'Default', 'meta-box-builder' ),
				box: __( 'Box', 'meta-box-builder' ),
				left: __( 'Left', 'meta-box-builder' ),
			} }
			defaultValue="default"
		/>
		<Checkbox name="tab_wrapper" label={ __( 'Show meta box wrapper', 'meta-box-builder' ) } />
	</>
);