import useSidebarPanel from "../hooks/useSidebarPanel";
import FieldGroupSettingsPanel from "./Sidebar/FieldGroupSettingsPanel";
import FieldSettingsPanel from "./Sidebar/FieldSettingsPanel";

const Sidebar = () => {
	const { sidebarPanel } = useSidebarPanel();

	return (
		<div className="mb-sidebar">
			<FieldGroupSettingsPanel show={ sidebarPanel === 'field_group_settings' } />
			<FieldSettingsPanel show={ sidebarPanel === 'field_settings' } />
		</div>
	);
};

export default Sidebar;