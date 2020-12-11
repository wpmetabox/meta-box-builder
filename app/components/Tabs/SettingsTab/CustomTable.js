import dotProp from 'dot-prop';
import Checkbox from '../../Common/Checkbox';
import Input from '../../Common/Input';
const { __ } = wp.i18n;
const { useState } = wp.element;

export const CustomTable = ( { defaultValues } ) => {
	return <>
		<Checkbox
			name="table_enable"
			label={ `<a href="https://metabox.io/plugins/mb-custom-table/" target="_blank" rel="noopener noreferrer">${ __( 'Save data in a custom table', 'meta-box-builder' ) }</a>` }
			componentId="settings-table_enable"
			defaultValue={ dotProp.get( defaultValues, 'table_enable' ) }
		/>
		<Input
			name="table_name"
			label={ __( 'Table name', 'meta-box-builder' ) }
			componentId="settings-table_name"
			defaultValue={ dotProp.get( defaultValues, 'table_name' ) }
			dependency="table_enable:true"
		/>
		<Checkbox
			name="table_prefix"
			label={ __( 'Include table prefix', 'meta-box-builder' ) }
			componentId="settings-table_prefix"
			defaultValue={ dotProp.get( defaultValues, 'table_prefix' ) }
			dependency="table_enable:true"
		/>
		<Checkbox
			name="table_create"
			label={ __( 'Create table automatically', 'meta-box-builder' ) }
			tooltip={ __( 'Enable this option will automatically create the table with all columns as TEXT. Create the table manually to set proper column types for a better performance.', 'meta-box-builder' ) }
			componentId="settings-table_create"
			defaultValue={ dotProp.get( defaultValues, 'table_create' ) }
			dependency="table_enable:true"
		/>
	</>;
};