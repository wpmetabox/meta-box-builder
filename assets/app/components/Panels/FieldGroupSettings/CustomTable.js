import { Button, Tooltip } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import DivRow from "../../../controls/DivRow";
import PersistentPanelBodyWithToggle from "../../../controls/PersistentPanelBodyWithToggle";
import Toggle from "../../../controls/Toggle";
import UpgradePanelBody from "../../../controls/UpgradePanelBody";
import useModelSchema from "../../../hooks/useModelSchema";
import useSettings from "../../../hooks/useSettings";

const CustomTable = () => {
	const { getSetting, updateSetting, getObjectType } = useSettings();
	const setting = getSetting( 'custom_table', {} );
	const objectType = getObjectType();
	const openSchema = useModelSchema( state => state.openCustomTableSchema );

	const enableCustomTable = value => {
		updateSetting( 'custom_table.enable', value );
		// New tables default to include prefix; existing saves keep their stored value.
		if ( value && setting.prefix === undefined ) {
			updateSetting( 'custom_table.prefix', true );
		}
	};

	if ( !MbbApp.extensions.customTable ) {
		return !MbbApp.extensions.aio && (
			<UpgradePanelBody
				title={ __( 'Custom table', 'meta-box-builder' ) }
				description={ __( 'Save data in a custom table.', 'meta-box-builder' ) }
				utm_source="field_group_settings"
				utm_medium="custom_table"
			/>
		);
	}

	// Models own table schema via the model editor / schema modal.
	if ( objectType === 'model' ) {
		return null;
	}

	const canEditColumns = !! setting.enable && !! ( setting.name || '' ).trim();

	return (
		<PersistentPanelBodyWithToggle
			panelId="field-group-custom-table"
			title={ __( 'Custom table', 'meta-box-builder' ) }
			value={ !!setting.enable }
			toggleValue={ enableCustomTable }
			tooltip={ __( 'Save data in a custom table', 'meta-box-builder' ) }
		>
			<Toggle
				dependency="table_enable:true"
				name="custom_table.create"
				label={ __( 'Auto create table', 'meta-box-builder' ) }
				tooltip={ __( 'Create or update the database table from the column schema when you save this field group. Use Edit columns to set types and indexes.', 'meta-box-builder' ) }
				componentId="settings-table_create"
				defaultValue={ !!setting.create }
				updateField={ updateSetting }
			/>
			{
				!! setting.enable && !! setting.create && (
					<Toggle
						dependency="table_enable:true"
						name="custom_table.drop_on_delete"
						label={ __( 'Drop this table when deleting the field group', 'meta-box-builder' ) }
						componentId="settings-table_drop_on_delete"
						defaultValue={ !! setting.drop_on_delete }
						updateField={ updateSetting }
					/>
				)
			}
			<DivRow
				htmlFor="settings-table_name"
				dependency="table_enable:true"
				label={ __( 'Table name', 'meta-box-builder' ) }
				tooltip={ __( 'The name of the table to save the data.', 'meta-box-builder' ) }
				description={ __( 'Use only lowercase letters, numbers, and underscores.', 'meta-box-builder' ) }
			>
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
							key={ `prefix-${ setting.prefix ? '1' : '0' }` }
							type="checkbox"
							defaultChecked={ !! setting.prefix }
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
			{
				canEditColumns && (
					<DivRow dependency="table_enable:true">
						<Button
							variant="secondary"
							onClick={ openSchema }
							text={ __( 'Edit columns', 'meta-box-builder' ) }
						/>
					</DivRow>
				)
			}
		</PersistentPanelBodyWithToggle>
	);
};

export default CustomTable;
