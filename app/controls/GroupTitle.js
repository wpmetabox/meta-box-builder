import { Button, Dropdown } from "@wordpress/components";
import { useContext } from '@wordpress/element';
import { SettingsContext } from "../contexts/SettingsContext";
import useFieldIds from '../hooks/useFieldIds';
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

/**
 * Fix cursor jumping to the end of the `<input>` after typing.
 * @link https://github.com/facebook/react/issues/18404#issuecomment-605294038
 */
const GroupTitle = ( { name, componentId, placeholder, defaultValue, nameIdData, ...rest } ) => {
	const { settings } = useContext( SettingsContext );

	const ids = useFieldIds( state => state.ids );
	const fields = [ '{#}', ...Array.from( new Set( Object.values( ids ) ) ) ];

	const handleSelectItem = ( inputRef, value ) => {
		const title = value === '{#}' ? value : `{${settings.prefix}${ value }}`;
		inputRef.current.value = inputRef.current.value + title;
	};

	return (
		<DivRow className="og-group-title" htmlFor={ componentId } { ...rest }>
			<FieldInserter name={ name }  defaultValue={ defaultValue } placeholder={ placeholder } items={ fields } onSelect={ handleSelectItem } />
		</DivRow>
	);
}

export default GroupTitle;