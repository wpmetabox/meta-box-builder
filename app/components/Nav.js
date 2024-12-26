import useNav from "../hooks/useNav";
import AddFieldPanel from "./Nav/AddFieldPanel";

const Nav = () => {
	const { navPanel } = useNav();

	return (
		<div className="mb-nav">
			<AddFieldPanel show={ navPanel === 'add_field' } />
		</div>
	);
};

export default Nav;