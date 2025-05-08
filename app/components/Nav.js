import useNav from "../hooks/useNav";
import AddFieldPanel from "./Panels/AddFieldPanel";
import FieldGroupSettingsPanel from "./Panels/FieldGroupSettingsPanel";
import FieldSettingsPanel from "./Panels/FieldSettingsPanel";
import StructurePanel from "./Panels/StructurePanel";

const Nav = () => {
	const { navPanel } = useNav();

	return (
		<div className="mb-nav">
			<AddFieldPanel show={ navPanel === 'add_field' } />
			<StructurePanel show={ navPanel === 'structure' } />
			<FieldGroupSettingsPanel show={ navPanel === 'field_group_settings' } />
			<FieldSettingsPanel show={ navPanel === 'field_settings' } />
		</div>
	);
};

export default Nav;