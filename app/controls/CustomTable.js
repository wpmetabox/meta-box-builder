import { Tooltip } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import useObjectType from "../hooks/useObjectType";
import Checkbox from './Checkbox';
import DivRow from "./DivRow";

const CustomTable = ( { defaultValue } ) => {
	const objectType = useObjectType( state => state.type );
	return ![ 'setting', 'block' ].includes( objectType ) && <>
		<Checkbox
			name="settings[custom_table][enable]"
			label={ `<a href="https://metabox.io/plugins/mb-custom-table/" target="_blank" rel="noopener noreferrer">${ __( 'Save data in a custom table', 'meta-box-builder' ) }</a>` }
			componentId="settings-table_enable"
			defaultValue={ !!defaultValue.enable }
		/>
		<DivRow htmlFor="settings-table_name" dependency="table_enable:true" label={ __( 'Table name', 'meta-box-builder' ) }>
			<div className="og-input-group">
				<input
					type="text"
					size={ 16 }
					id="settings-table_name"
					name="settings[custom_table][name]"
					defaultValue={ defaultValue.name }
				/>
				<label>
					<input type="hidden" name="settings[custom_table][prefix]" value={ false } />
					<input
						type="checkbox"
						name="settings[custom_table][prefix]"
						defaultChecked={ !!defaultValue.prefix }
						value={ true }
					/>
					<span className="dashicons dashicons-yes-alt"></span>
					<span>{ __( 'Include table prefix', 'meta-box-builder' ) }</span>
				</label>
				<label>
					<input type="hidden" name="settings[custom_table][create]" value={ false } />
					<input
						type="checkbox"
						name="settings[custom_table][create]"
						defaultChecked={ !!defaultValue.create }
						value={ true }
					/>
					<span className="dashicons dashicons-yes-alt"></span>
					<Tooltip text={ __( 'Auto create the table with all columns as TEXT. Create the table manually to set proper column types for a better performance.', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
						<span>{ __( 'Auto create', 'meta-box-builder' ) }</span>
					</Tooltip>
				</label>
			</div>
		</DivRow>
	</>;
};

export default CustomTable;