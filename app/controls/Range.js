import { RangeControl } from '@wordpress/components';
import DivRow from './DivRow';

const Range = ( { name, defaultValue, updateField, ...rest } ) => {
	const update = value => updateField( name, value );

	return (
		<DivRow { ...rest }>
			<RangeControl min={ 1 } max={ 12 } initialPosition={ 12 } value={ defaultValue } onChange={ update } />
		</DivRow>
	);
};

export default Range;