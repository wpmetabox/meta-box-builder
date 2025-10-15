import { __ } from '@wordpress/i18n';
import useSettings from '../hooks/useSettings';
import AdminColumnsPosition from './AdminColumnsPosition';
import Input from './Input';
import PersistentPanelBodyWithToggle from './PersistentPanelBodyWithToggle';
import Toggle from './Toggle';
import ToggleGroup from './ToggleGroup';
import UpgradePanelBody from './UpgradePanelBody';
import AdminColumnsWidth from './AdminCloumnsWidth';

const AdminColumns = ( { field, componentId, defaultValue, updateField } ) => {
	const { getObjectType } = useSettings();
	const objectType = getObjectType();

	if ( !MbbApp.extensions.adminColumns ) {
		return !MbbApp.extensions.aio && (
			<UpgradePanelBody
				title={ __( 'Admin columns', 'meta-box-builder' ) }
				description={ __( 'Show this field as a column in the list table in the admin area.', 'meta-box-builder' ) }
				utm_source="field_settings"
				utm_medium="admin_columns"
			/>
		);
	}

	return (
		<PersistentPanelBodyWithToggle
			panelId="field-admin-columns"
			title={ __( 'Admin columns', 'meta-box-builder' ) }
			value={ !!defaultValue.enable }
			toggleValue={ value => updateField( 'admin_columns.enable', value ) }
			tooltip={ __( 'Show this field as a column in the list table in the admin area', 'meta-box-builder' ) }
		>
			<AdminColumnsPosition
				name="admin_columns.position"
				className="og-admin-columns-position"
				label={ __( 'Position', 'meta-box-builder' ) }
				tooltip={ __( 'Where to show the column in the table', 'meta-box-builder' ) }
				defaultValue={ defaultValue.position || { type: 'after', column: '' } }
				updateField={ updateField }
			/>
			<Input
				componentId={ `${ componentId }-title` }
				name="admin_columns.title"
				label={ __( 'Title', 'meta-box-builder' ) }
				description={ __( 'Leave empty to use the field name.', 'meta-box-builder' ) }
				defaultValue={ defaultValue.title || '' }
				updateField={ updateField }
			/>
			<Input
				componentId={ `${ componentId }-before` }
				name="admin_columns.before"
				label={ __( 'Content before', 'meta-box-builder' ) }
				description={ __( 'Custom HTML outputted before the column content.', 'meta-box-builder' ) }
				defaultValue={ defaultValue.before || '' }
				updateField={ updateField }
			/>
			<Input
				componentId={ `${ componentId }-after` }
				name="admin_columns.after"
				label={ __( 'Content after', 'meta-box-builder' ) }
				description={ __( 'Custom HTML outputted after the column content.', 'meta-box-builder' ) }
				defaultValue={ defaultValue.after || '' }
				updateField={ updateField }
			/>
			{
				objectType === 'post' && (
					<Toggle
						componentId={ `${ componentId }-searchable` }
						name="admin_columns.searchable"
						label={ __( 'Searchable', 'meta-box-builder' ) }
						tooltip={ __( 'Allow to search posts by field values', 'meta-box-builder' ) }
						defaultValue={ defaultValue.searchable || false }
						updateField={ updateField }
					/>
				)
			}
			{
				field.type === 'taxonomy' && objectType === 'post' && (
					<Toggle
						componentId={ `${ componentId }-filterable` }
						name="admin_columns.filterable"
						label={ __( 'Filterable', 'meta-box-builder' ) }
						tooltip={ __( 'Allow to filter posts by this taxonomy', 'meta-box-builder' ) }
						defaultValue={ defaultValue.filterable || false }
						updateField={ updateField }
					/>
				)
			}
			<ToggleGroup
				name="admin_columns.sort"
				label={ __( 'Sortable', 'meta-box-builder' ) }
				tooltip={ __( 'Whether to sort the column by field values', 'meta-box-builder' ) }
				options={ {
					'true': __( 'Yes', 'meta-box-builder' ),
					'numeric': __( 'Yes (as number)', 'meta-box-builder' ),
					'false': __( 'No', 'meta-box-builder' ),
				} }
				defaultValue={ defaultValue.sort || 'false' }
				updateField={ updateField }
			/>
			<ToggleGroup
				name="admin_columns.link"
				label={ __( 'Item link type', 'meta-box-builder' ) }
				tooltip={ __( 'The link for the items displayed in the admin column.', 'meta-box-builder' ) }
				options={ {
					'false': __( 'No link', 'meta-box-builder' ),
					'view': __( 'View', 'meta-box-builder' ),
					'edit': __( 'Edit', 'meta-box-builder' ),
				} }
				defaultValue={ defaultValue.link || 'false' }
				updateField={ updateField }
			/>
			<AdminColumnsWidth
				componentId={ `${ componentId }-width` }
				label={ __( 'Width', 'meta-box-builder' ) }
				description={ __( 'Set the column width.', 'meta-box-builder' ) }
				defaultValue={ defaultValue.width || { number: '', unit: '%' } }
				updateField={ updateField }
			/>
		</PersistentPanelBodyWithToggle >
	);
};

export default AdminColumns;
