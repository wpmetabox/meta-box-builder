import { __ } from "@wordpress/i18n";
import dotProp from 'dot-prop';
import Checkbox from './Checkbox';
import Input from './Input';

const CustomTable = ( { objectType, defaultValue } ) => {
	return ![ 'setting', 'block' ].includes( objectType ) && <>
		<Checkbox
			name="settings[custom_table][enable]"
			label={ `<a href="https://metabox.io/plugins/mb-custom-table/" target="_blank" rel="noopener noreferrer">${ __( 'Save data in a custom table', 'meta-box-builder' ) }</a>` }
			componentId="settings-table_enable"
			defaultValue={ dotProp.get( defaultValue, 'enable' ) }
		/>
		<Input
			name="settings[custom_table][name]"
			label={ __( 'Table name', 'meta-box-builder' ) }
			componentId="settings-table_name"
			defaultValue={ dotProp.get( defaultValue, 'name' ) }
			dependency="table_enable:true"
		/>
		<Checkbox
			name="settings[custom_table][prefix]"
			label={ __( 'Include table prefix', 'meta-box-builder' ) }
			componentId="settings-table_prefix"
			defaultValue={ dotProp.get( defaultValue, 'prefix' ) }
			dependency="table_enable:true"
		/>
		<Checkbox
			name="settings[custom_table][create]"
			label={ __( 'Create table automatically', 'meta-box-builder' ) }
			tooltip={ __( 'Enable this option will automatically create the table with all columns as TEXT. Create the table manually to set proper column types for a better performance.', 'meta-box-builder' ) }
			componentId="settings-table_create"
			defaultValue={ dotProp.get( defaultValue, 'create' ) }
			dependency="table_enable:true"
		/>
	</>;
};

export default CustomTable;