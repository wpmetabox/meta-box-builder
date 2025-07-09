import useResizablePanel from "../hooks/useResizablePanel";
import AddFieldPanel from "./Panels/AddFieldPanel";
import FieldGroupSettingsPanel from "./Panels/FieldGroupSettingsPanel";
import FieldSettingsPanel from "./Panels/FieldSettingsPanel";
import StructurePanel from "./Panels/StructurePanel";
import { Icon } from "@wordpress/components";
import { moreVertical } from "@wordpress/icons";

const Nav = () => {
	const { handleMouseDown } = useResizablePanel();

	return (
		<div className="mb-nav">
			<AddFieldPanel />
			<StructurePanel />
			<FieldGroupSettingsPanel />
			<FieldSettingsPanel />

			<div className="mb-nav__resize-handle" onMouseDown={ handleMouseDown }>
				<Icon icon={ moreVertical } />
			</div>
		</div>
	);
};

export default Nav;