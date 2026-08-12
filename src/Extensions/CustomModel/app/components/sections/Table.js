import { Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ColumnsEditor from '../../../../../../assets/app/controls/ColumnsEditor';
import DivRow from '../../../../../../assets/app/controls/DivRow';
import useAutofill from '../../hooks/useAutofill';

const Table = () => {
	const { getSetting, updateWithAutofill } = useAutofill();
	const singularName = getSetting( 'labels.singular_name', '' );
	const tableKey = getSetting( '_table_changed' ) ? 'table-manual' : singularName;

	return (
		<div className="mb-content">
			<p className="og-description">
				{ __( 'A custom model stores data in a custom database table, not in WordPress post meta. Set the table name below, then configure its columns.', 'meta-box-builder' ) }
			</p>
			<DivRow
				key={ tableKey }
				htmlFor="table"
				label={ __( 'Table name', 'meta-box-builder' ) }
				description={ __( 'Use only lowercase letters, numbers, and underscores.', 'meta-box-builder' ) }
				required
			>
				<div className="og-input-group">
					<input
						type="text"
						size={ 16 }
						id="table"
						defaultValue={ getSetting( 'table' ) }
						onChange={ e => updateWithAutofill( 'table', e.target.value ) }
					/>
					<label>
						<input
							type="checkbox"
							defaultChecked={ !! getSetting( 'prefix', false ) }
							value={ true }
							onChange={ e => updateWithAutofill( 'prefix', e.target.checked ) }
						/>
						<span className="dashicons dashicons-yes-alt"></span>
						<Tooltip text={ __( 'Include the table prefix set in wp-config.php', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
							<span>{ __( 'Include prefix', 'meta-box-builder' ) }</span>
						</Tooltip>
					</label>
				</div>
			</DivRow>
			<hr />
			<p className="og-description">
				{ __( 'Add one column per custom field, using the field ID as the name. Skip the ID and support columns (author, dates); they are added automatically. Removing a column here does not delete it from the database - you must drop it yourself.', 'meta-box-builder' ) }
			</p>
			<ColumnsEditor
				name="columns"
				defaultValue={ getSetting( 'columns', {} ) }
				updateField={ updateWithAutofill }
			/>
		</div>
	);
};

export default Table;
