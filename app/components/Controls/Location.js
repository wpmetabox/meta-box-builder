import dotProp from 'dot-prop';
import Checkbox from './Checkbox';
import DivRow from './DivRow';
import ReactSelect from './ReactSelect';
const { __ } = wp.i18n;

const Location = ( { objectType, setObjectType, postTypes, setPostTypes, settings } ) => (
	<>
		<DivRow label={ __( 'Location', 'meta-box-builder' ) } className="og-location" tooltip={ __( 'Select where to display the field group', 'meta-box-builder' ) }>
			<select name="settings[object_type]" defaultValue={ objectType } onChange={ e => setObjectType( e.target.value ) }>
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
					name="settings[post_types][]"
					options={ MbbApp.postTypes.map( item => ( { value: item.slug, label: `${ item.name } (${ item.slug })` } ) ) }
					defaultValue={ postTypes }
					onChange={ items => setPostTypes( items ? items.map( item => item.value ) : [] ) }
				/>
			}
			{
				'term' === objectType &&
				<ReactSelect
					wrapper={ false }
					name="settings[taxonomies][]"
					options={ MbbApp.taxonomies.map( item => ( { value: item.slug, label: `${ item.name } (${ item.slug })` } ) ) }
					defaultValue={ dotProp.get( settings, 'taxonomies', [] ) }
				/>
			}
			{
				'setting' === objectType &&
				<ReactSelect
					wrapper={ false }
					name="settings[settings_pages][]"
					options={ MbbApp.settingsPages.map( item => ( { value: item.id, label: `${ item.title } (${ item.id })` } ) ) }
					defaultValue={ dotProp.get( settings, 'settings_pages', [] ) }
				/>
			}
		</DivRow>
		{
			'post' === objectType && postTypes.includes( 'attachment' ) &&
			<Checkbox label={ __( 'Show in media modal', 'meta-box-builder' ) } name="settings[media_modal]" defaultValue={ dotProp.get( settings, 'media_modal', false ) } />
		}
	</>
);

export default Location;