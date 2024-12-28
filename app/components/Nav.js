import useNav from "../hooks/useNav";
import AddFieldPanel from "./Nav/AddFieldPanel";
import StructurePanel from "./Nav/StructurePanel";

const Nav = () => {
	const { navPanel } = useNav();

	return (
		<div className="mb-nav">
			<AddFieldPanel show={ navPanel === 'add_field' } />
			<StructurePanel show={ navPanel === 'structure' } />
		</div>
	);
};

export default Nav;