import useFieldIds from '../hooks/useFieldIds';
import useSettings from '../hooks/useSettings';
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

/**
 * Fix cursor jumping to the end of the `<input>` after typing.
 * @link https://github.com/facebook/react/issues/18404#issuecomment-605294038
 */
const GroupTitle = ( { name, componentId, defaultValue, nameIdData, ...rest } ) => {
	const { getPrefix } = useSettings();

	const ids = useFieldIds( state => state.ids );
	const fields = [ '{#}', ...Array.from( new Set( Object.values( ids ) ) ) ];

	const handleChange = ( inputRef, value ) => nameIdData.updateGroupTitle( value );

	const handleSelectItem = ( inputRef, value ) => {
		const title = value === '{#}' ? value : `{${ getPrefix() || '' }${ value }}`;
		inputRef.current.value += title;
		nameIdData.updateGroupTitle( inputRef.current.value );
	};

	return (
		<DivRow className="og-group-title" htmlFor={ componentId } { ...rest }>
			<FieldInserter id={ componentId } name={ name } defaultValue={ defaultValue } items={ fields } onChange={ handleChange } onSelect={ handleSelectItem } />
		</DivRow>
	);
};

export default GroupTitle;