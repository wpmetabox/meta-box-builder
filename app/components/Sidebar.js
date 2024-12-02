import AddFieldPanel from "./Sidebar/AddFieldPanel";
import EditFieldSettingsPanel from "./Sidebar/EditFieldSettingsPanel";
import FieldGroupSettingsPanel from "./Sidebar/FieldGroupSettingsPanel";

const Sidebar = ( { panel } ) => (
	<div className="mb-sidebar">
		<AddFieldPanel show={ panel === 'add_field' } />
		<FieldGroupSettingsPanel show={ panel === 'field_group_settings' } />
		<EditFieldSettingsPanel show={ panel === 'edit_field_settings' } />
	</div>
);

export default Sidebar;