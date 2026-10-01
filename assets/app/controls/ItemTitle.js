import { __ } from "@wordpress/i18n";
import useModelSchema from '../hooks/useModelSchema';
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const SUPPORT_COLUMNS = [ 'author', 'published_date', 'modified_date' ];

const getColumnNames = model => {
	if ( !model ) {
		return [];
	}

	const supports = Array.isArray( model.supports ) ? model.supports : [];
	const defaults = [
		'ID',
		...SUPPORT_COLUMNS.filter( col => supports.includes( col ) ),
	];
	const custom = ( model.column_names || [] ).filter( col => !defaults.includes( col ) );

	return [ ...defaults, ...custom ];
};

const ItemTitle = ( { name, componentId, field, updateField, model: modelNameProp, defaultValue, ...rest } ) => {
	const models = useModelSchema( state => state.models );
	const modelName = modelNameProp ?? field?.model ?? '';
	const model = models.find( m => m.name === modelName );
	const items = getColumnNames( model ).map( col => [ col, col ] );

	const settingKey = name && !String( name ).includes( '[' ) ? name : 'item_title';
	const value = defaultValue ?? field?.item_title ?? '';

	const handleChange = ( inputRef, next ) => updateField( settingKey, next );

	const handleSelectItem = ( { current: input }, col ) => {
		const start = input.selectionStart;
		input.value = input.value.slice( 0, start ) + `{${ col }}` + input.value.slice( input.selectionEnd );
		input.selectionStart = input.selectionEnd = start + col.length + 2;
		updateField( settingKey, input.value );
	};

	return (
		<DivRow className="og-item-title" htmlFor={ componentId } { ...rest }>
			<FieldInserter
				id={ componentId }
				defaultValue={ value }
				items={ items }
				onChange={ handleChange }
				onSelect={ handleSelectItem }
				placeholder={ __( 'Column or template, e.g. {email} — {amount}', 'meta-box-builder' ) }
			/>
		</DivRow>
	);
};

export default ItemTitle;
