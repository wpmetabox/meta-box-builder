import { RadioControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { useToggle } from '../hooks/useToggle';
import DivRow from './DivRow';

const Range = ( { componentId, label, name, options, defaultValue, updateFieldData, ...rest } ) => {
	const toggle = useToggle( componentId );
	const [ value, setValue ] = useState( defaultValue );

	useEffect( () => {
		toggle();
		updateFieldData && updateFieldData( name, value );
	}, [ value ] );

	const radioOpions = Object.entries( options ).map( ( [ value, label ] ) => ( { value, label } ) );

	return <DivRow { ...rest }>
		<RadioControl
			label={ label }
			onChange={ setValue }
			options={ radioOpions }
			selected={ value }
		/>
		<input type="hidden" id={ componentId } name={ name } defaultValue={ value } />
	</DivRow>;
};

export default Range;