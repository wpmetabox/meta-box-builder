import ConditionalLogic from "../../../controls/ConditionalLogic";
import useSettings from "../../../hooks/useSettings";

export default () => {
	const { getSetting, updateSetting } = useSettings();
	const setting = getSetting( 'conditional_logic', {} );

	return <ConditionalLogic panelId="field-group-conditional-logic" defaultValue={ setting } updateField={ updateSetting } />;
};
