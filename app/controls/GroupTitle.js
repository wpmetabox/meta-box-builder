import { Button, Dropdown } from "@wordpress/components";
import { useLayoutEffect, useRef, useState, useEffect, RawHTML } from '@wordpress/element';
import DivRow from './DivRow';
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

	const handleChange = e => {
		nameIdData.updateGroupTitle( e.target.value );
		setSelection( [ e.target.selectionStart, e.target.selectionEnd ] );
	};

	const handleSelectItem = ( e, onToggle ) => {
		onToggle();
		nameIdData.updateGroupTitle( nameIdData.group_title + `{${settings.prefix} ${ e.target.dataset.value }}` );
	};

	useLayoutEffect( () => {
		if ( selection && ref.current ) {
			[ ref.current.selectionStart, ref.current.selectionEnd ] = selection;
		}
	}, [ selection ] );

	return ( <>
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
				renderContent={ ( { onToggle } ) => <SubFieldInserter onSelect={ e => handleSelectItem( e, onToggle ) } /> }
			/>
		</DivRow>
	</>);
}

const SubFieldInserter = ( { onSelect } ) => {
	const ids = useFieldIds( state => state.ids );
	const fields = Array.from( new Set( Object.values( ids ) ) );
	const handleClick = e => e.target.matches( '.og-dropdown__item' ) && onSelect( e );

	return (
		<div onClick={ handleClick }>
			{ fields.length > 0 &&
				fields.map( field => <RawHTML key={ field } className="og-dropdown__item" data-value={ field }>
					{ field }
				</RawHTML> )
			}
		</div>
	);
};

export default GroupTitle;