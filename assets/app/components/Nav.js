import useResizable from "../hooks/useResizable";
import AddFieldPanel from "./Panels/AddFieldPanel";
import FieldGroupSettingsPanel from "./Panels/FieldGroupSettingsPanel";
import FieldSettingsPanel from "./Panels/FieldSettingsPanel";
import StructurePanel from "./Panels/StructurePanel";
import Resizer from "./Resizer";

const Nav = () => {
	const { handleMouseDown } = useResizable( {
		callback: width => document.querySelector( '.mb' )?.style.setProperty( '--nav-width', `${ width }px` ),
	} );

	return (
		<div className="mb-nav">
			<AddFieldPanel />
			<StructurePanel />
			<FieldGroupSettingsPanel />
			<FieldSettingsPanel />

			<Resizer onMouseDown={ handleMouseDown } />
		</div>
	);
};

export default Nav;