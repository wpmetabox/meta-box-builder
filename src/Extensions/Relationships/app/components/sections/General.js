import { __ } from "@wordpress/i18n";
import AdminColumnsPosition from "../../../../../../app/controls/AdminColumnsPosition";
import Checkbox from "../../../../../../app/controls/Checkbox";
import Input from "../../../../../../app/controls/Input";
import Select from "../../../../../../app/controls/Select";
import ToggleGroup from "../../../../../../app/controls/ToggleGroup";
import useSettings from "../../../../../../app/hooks/useSettings";

const General = ( { id } ) => {
	const { getSetting, updateSetting } = useSettings();
	return (
		<>
			<ToggleGroup
				name={ `${ id }.object_type` }
				label={ __( 'Object type', 'meta-box-builder' ) }
				options={ MbbApp.object_types }
				defaultValue={ getSetting( `${ id }.object_type`, 'post' ) }
				updateField={ updateSetting }
			/>
			{
				getSetting( `${ id }.object_type`, 'post' ) === 'post' && (
					<Select
						name={ `${ id }.post_type` }
						label={ __( 'Post type', 'meta-box-builder' ) }
						options={ MbbApp.post_types }
						defaultValue={ getSetting( `${ id }.post_type`, 'post' ) }
						updateField={ updateSetting }
					/>
				)
			}
			{
				getSetting( `${ id }.object_type` ) === 'term' && (
					<Select
						name={ `${ id }.taxonomy` }
						label={ __( 'Taxonomy', 'meta-box-builder' ) }
						options={ MbbApp.taxonomies }
						defaultValue={ getSetting( `${ id }.taxonomy`, 'category' ) }
						updateField={ updateSetting }
					/>
				)
			}
			<Input
				name={ `${ id }.empty_message` }
				label={ __( 'Empty message', 'meta-box-builder' ) }
				description={ __( 'The message displayed when there\'s no connections', 'meta-box-builder' ) }
				defaultValue={ getSetting( `${ id }.empty_message` ) }
				updateField={ updateSetting }
			/>
			{
				getSetting( `${ id }.object_type`, 'post' ) === 'post' && (
					<Checkbox
						name={ `${ id }.admin_filter` }
						label={ __( 'Show admin filter', 'meta-box-builder' ) }
						description={ __( 'Show a dropdown filter by this relationship in the admin table list.', 'meta-box-builder' ) }
						defaultValue={ getSetting( `${ id }.admin_filter` ) }
						updateField={ updateSetting }
					/>
				)
			}
			<Checkbox
				name={ `${ id }.admin_column.enable` }
				label={ __( 'Show as an admin column', 'meta-box-builder' ) }
				description={ __( 'Show this connection as a column in the table list in the admin.', 'meta-box-builder' ) }
				defaultValue={ getSetting( `${ id }.admin_column.enable` ) }
				updateField={ updateSetting }
			/>
			{
				getSetting( `${ id }.admin_column.enable` ) && (
					<>
						<AdminColumnsPosition
							name={ `${ id }.admin_column.position` }
							label={ __( 'Column position', 'meta-box-builder' ) }
							className="og-admin-columns-position"
							description={ __( 'Specify where to show the column in the table', 'meta-box-builder' ) }
							defaultValue={ getSetting( `${ id }.admin_column.position`, {} ) }
							updateField={ updateSetting }
						/>
						<Input
							name={ `${ id }.admin_column.title` }
							label={ __( 'Column title', 'meta-box-builder' ) }
							description={ __( 'Leave empty to use the meta box title', 'meta-box-builder' ) }
							defaultValue={ getSetting( `${ id }.admin_column.title` ) }
							updateField={ updateSetting }
						/>
						<Select
							name={ `${ id }.admin_column.link` }
							label={ __( 'Item link type', 'meta-box-builder' ) }
							description={ __( 'The link for the items displayed in the admin column', 'meta-box-builder' ) }
							options={ {
								view: __( 'View', 'meta-box-builder' ),
								edit: __( 'Edit', 'meta-box-builder' ),
								false: __( 'No link', 'meta-box-builder' ),
							} }
							defaultValue={ getSetting( `${ id }.admin_column.link`, 'view' ) }
							updateField={ updateSetting }
						/>
					</>
				)
			}
		</>
	);
};

export default General;