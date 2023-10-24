import { Button, Dropdown } from "@wordpress/components";
import { useLayoutEffect, useRef, useState, useEffect } from '@wordpress/element';
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';
import useFieldIds from '../hooks/useFieldIds';
import { getSettings } from "../functions";

/**
 * Fix cursor jumping to the end of the `<input>` after typing.
 * @link https://github.com/facebook/react/issues/18404#issuecomment-605294038
 */
const GroupTitle = ( { name, componentId, nameIdData, ...rest } ) => {
	const ref = useRef();
	const [ selection, setSelection ] = useState();
	const settings = getSettings();

	const ids = useFieldIds( state => state.ids );
	const fields = [ '{#}', ...Array.from( new Set( Object.values( ids ) ) ) ];

	const handleChange = e => {
		nameIdData.updateGroupTitle( e.target.value );
		setSelection( [ e.target.selectionStart, e.target.selectionEnd ] );
	};

	const handleSelectItem = ( e, onToggle ) => {
		onToggle();
		const title = e.target.dataset.value === '{#}' ? e.target.dataset.value : `{${settings.prefix}${ e.target.dataset.value }}`
		nameIdData.updateGroupTitle( nameIdData.group_title + title );
	};

	useLayoutEffect( () => {
		if ( selection && ref.current ) {
			[ ref.current.selectionStart, ref.current.selectionEnd ] = selection;
		}
	}, [ selection ] );

	return (
		<DivRow className="og-group-title" htmlFor={ componentId } { ...rest }>
			<input
				ref={ ref }
				type="text"
				id={ componentId }
				name={ name }
				value={ nameIdData.group_title }
				onChange={ handleChange }
			/>
			<Dropdown
				className="og-dropdown og-sub-field"
				position="bottom left"
				renderToggle={ ( { onToggle } ) => <Button icon="ellipsis" onClick={ onToggle } /> }
				renderContent={ ( { onToggle } ) => <FieldInserter  items={ fields } hasSearch={ true } onSelect={ e => handleSelectItem( e, onToggle ) } /> }
			/>
		</DivRow>
	);
}

export default GroupTitle;