import { __ } from "@wordpress/i18n";
import useModelSchema from '../hooks/useModelSchema';
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const SUPPORT_COLUMNS = [ 'author', 'published_date', 'modified_date' ];

const getModels = storeModels => {
	if ( Array.isArray( storeModels ) && storeModels.length ) {
		return storeModels;
	}
	if ( Array.isArray( MbbApp.model_list ) ) {
		return MbbApp.model_list;
	}
	return Array.isArray( MbbApp.models ) ? MbbApp.models : [];
};

const getCustomColumnNames = model => {
	if ( !model ) {
		return [];
	}

	const hasColumns = Array.isArray( model.columns )
		? model.columns.length > 0
		: model.columns && Object.keys( model.columns ).length > 0;
	const source = hasColumns ? model.columns : ( model.db_columns || {} );

	if ( Array.isArray( source ) ) {
		return source.map( item => item?.name ).filter( Boolean );
	}

	return Object.keys( source );
};

const getColumnNames = model => {
	if ( !model ) {
		return [];
	}

	const supports = Array.isArray( model.supports ) ? model.supports : [];
	const defaults = [
		'ID',
		...SUPPORT_COLUMNS.filter( col => supports.includes( col ) ),
	];
	const custom = getCustomColumnNames( model ).filter( col => !defaults.includes( col ) );

	return [ ...defaults, ...custom ];
};

const ItemTitle = ( { name, componentId, field, updateField, model: modelNameProp, defaultValue, ...rest } ) => {
	const storeModels = useModelSchema( state => state.models );
	const modelName = modelNameProp ?? field?.model ?? '';
	const model = getModels( storeModels ).find( m => m.name === modelName );
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
