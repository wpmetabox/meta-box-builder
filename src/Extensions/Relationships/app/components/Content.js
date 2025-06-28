import GeneralSettings from "./GeneralSettings";
import Side from "./Side";

const Content = ( { sides } ) => {
	return (
		<>
			<GeneralSettings />
			{ sides.map( side => <Side key={ side.id } { ...side } /> ) }
		</>
	);
};

export default Content;