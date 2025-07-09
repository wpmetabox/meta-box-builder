import { Tooltip } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import DivRow from "../../../controls/DivRow";
import PanelBodyWithToggle from "../../../controls/PanelBodyWithToggle";
import Toggle from "../../../controls/Toggle";
import useSettings from "../../../hooks/useSettings";

const CustomTable = () => {
	const { getSetting, updateSetting } = useSettings();
	const setting = getSetting( 'custom_table', {} );

	return (
		<PanelBodyWithToggle
			title={ __( 'Custom table', 'meta-box-builder' ) }
			value={ !!setting.enable }
			toggleValue={ value => updateSetting( 'custom_table.enable', value ) }
			tooltip={ __( 'Save data in a custom table', 'meta-box-builder' ) }
		>
			<Toggle
				dependency="table_enable:true"
				name="custom_table.create"
				label={ __( 'Auto create table', 'meta-box-builder' ) }
				tooltip={ __( 'This settings will create the table with all columns as TEXT. Create the table manually to set proper column types for a better performance.', 'meta-box-builder' ) }
				componentId="settings-table_create"
				defaultValue={ !!setting.create }
				updateField={ updateSetting }
			/>
			<DivRow htmlFor="settings-table_name" dependency="table_enable:true" label={ __( 'Table name', 'meta-box-builder' ) }>
				<div className="og-input-group">
					<input
						type="text"
						size={ 16 }
						id="settings-table_name"
						defaultValue={ setting.name }
						onChange={ e => updateSetting( 'custom_table.name', e.target.value ) }
					/>
					<label>
						<input
							type="checkbox"
							defaultChecked={ !!setting.prefix }
							value={ true }
							onChange={ e => updateSetting( 'custom_table.prefix', e.target.checked ) }
						/>
						<span className="dashicons dashicons-yes-alt"></span>
						<Tooltip text={ __( 'Include the table prefix set in wp-config.php', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
							<span>{ __( 'Include prefix', 'meta-box-builder' ) }</span>
						</Tooltip>
					</label>
				</div>
			</DivRow>
		</PanelBodyWithToggle>
	);
};

export default CustomTable;