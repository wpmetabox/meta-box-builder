import { RadioControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { useToggle } from '../hooks/useToggle';
import DivRow from './DivRow';

const Radio = ( { componentId, label, name, options, defaultValue, updateField, ...rest } ) => {
	const toggle = useToggle( componentId );
	const [ value, setValue ] = useState( defaultValue );

	useEffect( () => {
		toggle();
		updateField && updateField( name, value );
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

export default Radio;