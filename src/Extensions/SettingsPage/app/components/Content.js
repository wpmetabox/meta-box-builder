import Advanced from "./sections/Advanced";
import Appearance from "./sections/Appearance";
import General from "./sections/General";
import Menu from "./sections/Menu";

const Content = () => {
	return (
		<>
			<General />
			<hr />
			<Menu />
			<hr />
			<Appearance />
			<hr />
			<Advanced />
		</>
	);
};

export default Content;