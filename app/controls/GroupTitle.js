import useLists from '../hooks/useLists';
import useSettings from '../hooks/useSettings';
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

/**
 * Fix cursor jumping to the end of the `<input>` after typing.
 * @link https://github.com/facebook/react/issues/18404#issuecomment-605294038
 */
const GroupTitle = ( { name, componentId, defaultValue, nameIdData, ...rest } ) => {
	const { getPrefix } = useSettings();

	const { getAllFields } = useLists();
	const ignoreTypes = [ 'background', 'button', 'custom_html', 'divider', 'heading', 'tab', 'group' ];
	let fields = getAllFields()
		.filter( field => !ignoreTypes.includes( field.type ) )
		.map( field => [ field.id, field.name ] );

	fields = [ [ '{#}', '{#}' ], ...fields ];

	const handleChange = ( inputRef, value ) => nameIdData.updateGroupTitle( value );

	const handleSelectItem = ( inputRef, value ) => {
		const title = value === '{#}' ? value : `{${ getPrefix() }${ value }}`;
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