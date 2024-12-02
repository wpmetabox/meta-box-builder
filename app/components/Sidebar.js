import useSidebarPanel from "../hooks/useSidebarPanel";
import AddFieldPanel from "./Sidebar/AddFieldPanel";
import EditFieldSettingsPanel from "./Sidebar/EditFieldSettingsPanel";
import FieldGroupSettingsPanel from "./Sidebar/FieldGroupSettingsPanel";

const Sidebar = () => {
	const { sidebarPanel } = useSidebarPanel();

	return (
		<div className="mb-sidebar">
			<AddFieldPanel show={ sidebarPanel === 'add_field' } />
			<FieldGroupSettingsPanel show={ sidebarPanel === 'field_group_settings' } />
			<EditFieldSettingsPanel show={ sidebarPanel === 'edit_field_settings' } />
		</div>
	);
};

export default Sidebar;