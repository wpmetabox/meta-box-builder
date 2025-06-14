import { useCallback } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import { debounce } from 'lodash';
import useSettings from '../hooks/useSettings';
import getList from '../list-functions';
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const GroupTitle = ( { name, componentId, field, updateField, ...rest } ) => {
	const { getPrefix } = useSettings();

	let fields = getList( field._id )( state => state.fields );

	const ignoreTypes = [ 'background', 'button', 'custom_html', 'divider', 'heading', 'tab', 'group' ];
	fields = fields
		.filter( f => !ignoreTypes.includes( f.type ) )
		.map( f => [ f.id, `${ f.name } (${ f.id })` ] );

	fields = [ [ '{#}', __( 'Entry index (#)', 'meta-box-builder' ) ], ...fields ];

	const handleChange = useCallback(
		debounce( ( inputRef, value ) => updateField( 'group_title', value ), 100 ),
		[] // empty deps means it runs once
	);

	const handleSelectItem = ( inputRef, value ) => {
		const title = value === '{#}' ? value : `{${ getPrefix() }${ value }}`;
		inputRef.current.value += title;
		updateField( 'group_title', inputRef.current.value );
	};

	return (
		<DivRow className="og-group-title" htmlFor={ componentId } { ...rest }>
			<FieldInserter id={ componentId } defaultValue={ field.group_title } items={ fields } onChange={ handleChange } onSelect={ handleSelectItem } />
		</DivRow>
	);
};

export default GroupTitle;