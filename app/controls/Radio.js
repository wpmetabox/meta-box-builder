import { RadioControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { useToggle } from '../hooks/useToggle';
import DivRow from './DivRow';

const Radio = ( { componentId, label, name, options, defaultValue, updateField, ...rest } ) => {
	const toggle = useToggle( componentId );
	const [ value, setValue ] = useState( defaultValue );

	// useEffect to make useToggle work AFTER DOM is changed.
	useEffect( () => {
		toggle();
		updateField( name, value );
	}, [ value ] );

	const radioOpions = Object.entries( options ).map( ( [ value, label ] ) => ( { value, label } ) );

	// Use a hidden controlled input to make useToggle work.
	return <DivRow { ...rest }>
		<RadioControl
			label={ label }
			onChange={ setValue }
			options={ radioOpions }
			selected={ value }
		/>
		<input type="hidden" id={ componentId } value={ value } />
	</DivRow>;
};

export default Radio;