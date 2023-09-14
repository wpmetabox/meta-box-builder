import { useState } from "@wordpress/element";

const useFieldIcon = field => {
	const [ icon, updateIcon ] = useState( field.icon || '' );

	return {
		icon,
		updateIcon,
	};
};

export default useFieldIcon;