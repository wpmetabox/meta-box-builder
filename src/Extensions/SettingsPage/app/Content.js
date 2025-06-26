import Advanced from "./components/Advanced";
import Appearance from "./components/Appearance";
import General from "./components/General";
import Menu from "./components/Menu";

const Content = () => {
	return (
		<>
			<Menu />
			<hr />
			<General />
			<hr />
			<Appearance />
			<hr />
			<Advanced />
		</>
	);
};

export default Content;