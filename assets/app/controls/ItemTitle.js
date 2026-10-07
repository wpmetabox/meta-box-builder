import { __ } from '@wordpress/i18n';
import useModelSchema from '../hooks/useModelSchema';
import { getColumnNames as columnNamesFromMap } from '../utils/modelColumns';
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const getModelColumns = model => {
	if ( ! model ) {
		return [];
	}

	const supports = Array.isArray( model.supports ) ? model.supports : [];
	const defaults = [ 'ID', ...supports ];
	const dbColumns = model.db_columns || {};
	const named = Object.keys( dbColumns ).length
		? columnNamesFromMap( dbColumns )
		: columnNamesFromMap( model.columns || {} );
	const custom = named.filter( col => !defaults.includes( col ) );

	return [ ...defaults, ...custom ];
};

const ItemTitle = ( { componentId, field, updateField, model: modelNameProp, defaultValue = '', ...rest } ) => {
	const models = useModelSchema( state => state.models );
	const modelName = modelNameProp ?? field?.model ?? '';
	const model = models.find( m => m.name === modelName );
	const items = getModelColumns( model ).map( col => [ col, col ] );

	const handleChange = ( _, value ) => updateField( 'item_title', value );

	const handleSelectItem = ( { current: input }, col ) => {
		const start = input.selectionStart;
		input.value = input.value.slice( 0, start ) + `{${ col }}` + input.value.slice( input.selectionEnd );
		input.selectionStart = input.selectionEnd = start + col.length + 2;
		updateField( 'item_title', input.value );
	};

	return (
		<DivRow className="og-item-title" htmlFor={ componentId } { ...rest }>
			<FieldInserter
				id={ componentId }
				defaultValue={ defaultValue }
				items={ items }
				onChange={ handleChange }
				onSelect={ handleSelectItem }
				placeholder={ __( 'Column or template, e.g. {email} — {amount}', 'meta-box-builder' ) }
			/>
		</DivRow>
	);
};

export default ItemTitle;
