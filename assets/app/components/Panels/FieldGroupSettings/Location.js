import { Icon } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { external } from '@wordpress/icons';
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

	let locationText = [];
	if ( !MbbApp.extensions.termMeta ) {
		locationText.push( 'terms' );
	}
	if ( !MbbApp.extensions.userMeta ) {
		locationText.push( 'users' );
	}
	// Translators: %s is a list of object types (terms, users).
	locationText = locationText.length > 0 ? sprintf( __( 'create custom fields for %s', 'meta-box-builder' ), locationText.join( ', ' ) ) : '';

	let entities = [];
	if ( !MbbApp.extensions.settingsPage ) {
		entities.push( 'settings pages' );
	}
	if ( !MbbApp.extensions.blocks ) {
		entities.push( 'custom blocks' );
	}
	if ( !MbbApp.extensions.frontendForm ) {
		entities.push( 'frontend forms' );
	}
	// Translators: %s is a list of entities that Meta Box can create (settings pages, custom blocks, frontend forms).
	entities = entities.length > 0 ? sprintf( __( 'create %s', 'meta-box-builder' ), entities.join( ', ' ) ) : '';

	let upgradeText = [ locationText, entities ].filter( Boolean ).join( __( ', or ', 'meta-box-builder' ) );

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
				{
					!MbbApp.extensions.aio &&
					<div className="mb-upgrade-text og-description">
						{ sprintf( __( 'Wanna %s?', 'meta-box-builder' ), upgradeText ) }
						&nbsp;
						<a href="https://metabox.io/aio/?utm_source=field_group_settings&utm_medium=location&utm_campaign=builder" target="_blank">
							{ __( 'Upgrade now', 'meta-box-builder' ) }
							<Icon icon={ external } size={ 14 } />
						</a>
					</div>
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