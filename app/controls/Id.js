import { useLayoutEffect, useRef, useState, RawHTML } from '@wordpress/element';
import { __, sprintf } from "@wordpress/i18n";
import useApi from "../hooks/useApi";
import DivRow from './DivRow';

/**
 * Fix cursor jumping to the end of the `<input>` after typing.
 * @link https://github.com/facebook/react/issues/18404#issuecomment-605294038
 */
const Id = ( { name, componentId, nameIdData, ...rest } ) => {
	const ref = useRef();
	const [ selection, setSelection ] = useState();
	const ids = useApi( 'fields-ids', [] );
	const [ link, setLink ] = useState();
	const [ duplicate, setDuplicate ] = useState( false );

	const handleChange = e => {
		setTimeout( () => checkDuplicateId( e.target.value ), 200 );
		nameIdData.updateId( e.target.value );
		setSelection( [ e.target.selectionStart, e.target.selectionEnd ] );
	};

	const checkDuplicateId = value => {
		if( ids[ value ] === undefined ) {
			return;
		}
		setLink( ids[ value ] );
		setDuplicate( true );
	}

	useLayoutEffect( () => {
		if ( selection && ref.current ) {
			[ ref.current.selectionStart, ref.current.selectionEnd ] = selection;
		}
	}, [ selection ] );

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input
				ref={ ref }
				type="text"
				id={ componentId }
				name={ name }
				value={ nameIdData.id }
				onChange={ handleChange }
				pattern="[A-Za-z0-9\-_]+"
			/>
			{ duplicate && <RawHTML className="og-description og-error">{ sprintf( __( 'This ID value already exists, you should change the value or edit exists Fields Group <a href="%s">here</a>.', 'slim-seo' ), link ) }</RawHTML> }
		</DivRow>
	);
};

export default Id;