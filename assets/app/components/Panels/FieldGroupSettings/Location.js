import { __ } from "@wordpress/i18n";
import DivRow from '../../../controls/DivRow';
import ReactSelect from '../../../controls/ReactSelect';
import Select from '../../../controls/Select';
import Toggle from "../../../controls/Toggle";
import { ensureArray } from '../../../functions';
import useSettings from "../../../hooks/useSettings";

const Location = () => {
	const { getObjectType, updateObjectType, getPostTypes, updatePostTypes, getSetting, updateSetting } = useSettings();
	const objectType = getObjectType();
	const postTypes = getPostTypes();

	const settingsPages = ensureArray( getSetting( 'settings_pages', [] ) );
	const selectedSettingsPage = MbbApp.settingsPages.find( p => settingsPages.includes( p.id ) );
	const tabs = selectedSettingsPage ? selectedSettingsPage.tabs : [];

	return (
		<>
			<DivRow label={ __( 'Rule', 'meta-box-builder' ) } htmlFor="settings-object_type" className="mb-location" tooltip={ __( 'Where to display the field group', 'meta-box-builder' ) }>
				<select id="settings-object_type" defaultValue={ objectType } onChange={ e => updateObjectType( e.target.value ) }>
					<option value="post">{ __( 'Post type', 'meta-box-builder' ) }</option>
					{ MbbApp.extensions.termMeta && <option value="term">{ __( 'Taxonomy', 'meta-box-builder' ) }</option> }
					{ MbbApp.extensions.userMeta && <option value="user">{ __( 'User', 'meta-box-builder' ) }</option> }
					{ MbbApp.extensions.commentMeta && <option value="comment">{ __( 'Comment', 'meta-box-builder' ) }</option> }
					{ MbbApp.extensions.settingsPage && <option value="setting">{ __( 'Settings page', 'meta-box-builder' ) }</option> }
					{ MbbApp.extensions.blocks && <option value="block">{ __( 'Block', 'meta-box-builder' ) }</option> }
				</select>
				{
					'post' === objectType &&
					<ReactSelect
						wrapper={ false }
						options={ MbbApp.postTypes.map( item => ( { value: item.slug, label: `${ item.name } (${ item.slug })` } ) ) }
						defaultValue={ postTypes }
						updateField={ ( name, values ) => updatePostTypes( values ) }
					/>
				}
				{
					'term' === objectType &&
					<ReactSelect
						name="taxonomies"
						wrapper={ false }
						options={ MbbApp.taxonomies.map( item => ( { value: item.slug, label: `${ item.name } (${ item.slug })` } ) ) }
						defaultValue={ ensureArray( getSetting( 'taxonomies', [] ) ) }
						updateField={ updateSetting }
					/>
				}
				{
					'setting' === objectType &&
					<ReactSelect
						name="settings_pages"
						wrapper={ false }
						options={ MbbApp.settingsPages.map( item => ( { value: item.id, label: `${ item.title } (${ item.id })` } ) ) }
						defaultValue={ ensureArray( getSetting( 'settings_pages', [] ) ) }
						updateField={ updateSetting }
					/>
				}
			</DivRow>
			{
				'post' === objectType && postTypes.includes( 'attachment' ) &&
				<Toggle
					label={ __( 'Show in media modal', 'meta-box-builder' ) }
					defaultValue={ !!getSetting( 'media_modal', false ) }
					name="media_modal"
					updateField={ updateSetting }
				/>
			}
			{
				'setting' === objectType && Object.keys( tabs ).length > 0 &&
				<Select
					label={ __( 'Tab', 'meta-box-builder' ) }
					tooltip={ __( 'Select a tab in the settings page that the field group belongs to', 'meta-box-builder' ) }
					options={ tabs }
					defaultValue={ getSetting( 'tab', '' ) }
					componentId="settings-tab"
					name="tab"
					updateField={ updateSetting }
				/>
			}
		</>
	);
};

export default Location;