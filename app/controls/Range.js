import { RangeControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import DivRow from './DivRow';

const Range = ( { name, defaultValue, ...rest } ) => {
	const [ value, setValue ] = useState( defaultValue );

	return <DivRow { ...rest }>
		<RangeControl min={ 1 } max={ 12 } initialPosition={ 12 } value={ value } onChange={ setValue } />
		<input type="hidden" name={ name } defaultValue={ value } />
	</DivRow>;
};

export default Range;