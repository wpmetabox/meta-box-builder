import { Tooltip } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import DivRow from "../../../controls/DivRow";
import Toggle from "../../../controls/Toggle";
import useSettings from "../../../hooks/useSettings";

const CustomTable = () => {
	const { getSetting } = useSettings();
	const setting = getSetting( 'custom_table', {} );

	return <>
		<Toggle
			name="settings[custom_table][enable]"
			label={ __( 'Save data in a custom table', 'meta-box-builder' ) }
			componentId="settings-table_enable"
			defaultValue={ !!setting.enable }
		/>
		<Toggle
			dependency="table_enable:true"
			name="settings[custom_table][create]"
			label={ __( 'Auto create table', 'meta-box-builder' ) }
			tooltip={ __( 'This settings will create the table with all columns as TEXT. Create the table manually to set proper column types for a better performance.', 'meta-box-builder' ) }
			componentId="settings-table_create"
			defaultValue={ !!setting.create }
		/>
		<DivRow htmlFor="settings-table_name" dependency="table_enable:true" label={ `<span class="og-indent"></span>${ __( 'Table name', 'meta-box-builder' ) }` }>
			<div className="og-input-group">
				<input
					type="text"
					size={ 16 }
					id="settings-table_name"
					name="settings[custom_table][name]"
					defaultValue={ setting.name }
				/>
				<label>
					<input type="hidden" name="settings[custom_table][prefix]" value={ false } />
					<input
						type="checkbox"
						name="settings[custom_table][prefix]"
						defaultChecked={ !!setting.prefix }
						value={ true }
					/>
					<span className="dashicons dashicons-yes-alt"></span>
					<Tooltip text={ __( 'Include the table prefix set in wp-config.php', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
						<span>{ __( 'Include prefix', 'meta-box-builder' ) }</span>
					</Tooltip>
				</label>
			</div>
		</DivRow>
	</>;
};

export default CustomTable;