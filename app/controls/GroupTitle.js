import { __ } from "@wordpress/i18n";
import useLists from '../hooks/useLists';
import useSettings from '../hooks/useSettings';
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

/**
 * Fix cursor jumping to the end of the `<input>` after typing.
 * @link https://github.com/facebook/react/issues/18404#issuecomment-605294038
 */
const GroupTitle = ( { name, componentId, field, updateField, ...rest } ) => {
	const { getPrefix } = useSettings();

	const { getAllFields } = useLists();
	const ignoreTypes = [ 'background', 'button', 'custom_html', 'divider', 'heading', 'tab', 'group' ];
	let fields = getAllFields()
		.filter( f => !ignoreTypes.includes( f.type ) )
		.map( f => [ f.id, `${ f.name } (${ f.id })` ] );

	fields = [ [ '{#}', __( 'Entry index', 'meta-box-builder' ) ], ...fields ];

	const handleChange = ( inputRef, value ) => updateField( 'group_title', value );

	const handleSelectItem = ( inputRef, value ) => {
		const title = value === '{#}' ? value : `{${ getPrefix() }${ value }}`;
		inputRef.current.value += title;
		updateField( 'group_title', inputRef.current.value );
	};

	return (
		<DivRow className="og-group-title" htmlFor={ componentId } { ...rest }>
			<FieldInserter id={ componentId } name={ name } defaultValue={ field.group_title } items={ fields } onChange={ handleChange } onSelect={ handleSelectItem } />
		</DivRow>
	);
};

export default GroupTitle;