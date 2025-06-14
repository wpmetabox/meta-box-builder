import AddFieldPanel from "./Panels/AddFieldPanel";
import FieldGroupSettingsPanel from "./Panels/FieldGroupSettingsPanel";
import FieldSettingsPanel from "./Panels/FieldSettingsPanel";
import StructurePanel from "./Panels/StructurePanel";

const Nav = () => (
	<div className="mb-nav">
		<AddFieldPanel />
		<StructurePanel />
		<FieldGroupSettingsPanel />
		<FieldSettingsPanel />
	</div>
);

export default Nav;