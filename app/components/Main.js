import useMainArea from "../hooks/useMainArea";
import Form from './Form';
import PHP from "./PHP";
import ThemeCode from "./ThemeCode/ThemeCode";

const Main = () => {
	const { area } = useMainArea();

	return (
		<div className="mb-main">
			<div className="wp-header-end" />

			<Form show={ area === 'fields' } />
			<PHP show={ area === 'php' } />
			<ThemeCode show={ area === 'theme_code' } />
		</div>
	);
};

export default Main;