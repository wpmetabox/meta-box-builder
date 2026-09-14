import { Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import DivRow from "../../../controls/DivRow";
import UpgradePanelBody from "../../../controls/UpgradePanelBody";
import { ensureArray } from "../../../functions";
import useModelSchema from "../../../hooks/useModelSchema";
import useSettings from "../../../hooks/useSettings";
import PersistentPanelBody from "../PersistentPanelBody";

const ModelCustomTable = () => {
	const { getSetting } = useSettings();
	const openSchema = useModelSchema( state => state.openSchema );
	const models = useModelSchema( state => state.models );
	const modelName = ensureArray( getSetting( 'models', [] ) )[ 0 ] || '';
	const selectedModel = modelName ? models.find( model => model.name === modelName ) : null;
	const table = selectedModel?.table || '';

	if ( ! MbbApp.extensions.customTable ) {
		return ! MbbApp.extensions.aio && (
			<UpgradePanelBody
				title={ __( 'Custom table', 'meta-box-builder' ) }
				description={ __( 'Save data in a custom table.', 'meta-box-builder' ) }
				utm_source="field_group_settings"
				utm_medium="custom_table"
			/>
		);
	}

	return (
		<PersistentPanelBody
			panelId="field-group-custom-table"
			title={ __( 'Custom table', 'meta-box-builder' ) }
		>
			<DivRow
				htmlFor="settings-table_name"
				label={ __( 'Table name', 'meta-box-builder' ) }
				tooltip={ __( 'Defined by the selected custom model.', 'meta-box-builder' ) }
			>
				<input
					type="text"
					size={ 16 }
					id="settings-table_name"
					value={ table }
					readOnly
					disabled
				/>
			</DivRow>
			{
				!! table && (
					<DivRow>
						<Button
							variant="secondary"
							size="compact"
							onClick={ openSchema }
							text={ __( 'Edit columns', 'meta-box-builder' ) }
						/>
					</DivRow>
				)
			}
		</PersistentPanelBody>
	);
};

export default ModelCustomTable;
