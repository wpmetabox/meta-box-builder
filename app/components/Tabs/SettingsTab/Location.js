import { useFormContext } from 'react-hook-form';
import Checkbox from '../../Common/Checkbox';
import DivRow from '../../Common/DivRow';
import ReactSelect from '../../Common/ReactSelect';
const { __ } = wp.i18n;

export const Location = ( { objectType, updateObjectType, postTypes, updatePostTypes, defaultValues } ) => {
	const { register } = useFormContext();
	return <>
		<DivRow label={ __( 'Location', 'meta-box-builder' ) } className="og-location" tooltip={ __( 'Select where to display the field group', 'meta-box-builder' ) }>
			<select name="object_type" ref={ register } defaultValue={ objectType } onChange={ updateObjectType }>
				<option value="post">{ __( 'Post type', 'meta-box-builder' ) }</option>
				{ MbbApp.extensions.termMeta && <option value="term">{ __( 'Taxonomy', 'meta-box-builder' ) }</option> }
				{ MbbApp.extensions.userMeta && <option value="user">{ __( 'User', 'meta-box-builder' ) }</option> }
				{ MbbApp.extensions.commentMeta && <option value="comment">{ __( 'Comment', 'meta-box-builder' ) }</option> }
				{ MbbApp.extensions.settingsPage && <option value="setting">{ __( 'Settings page', 'meta-box-builder' ) }</option> }
				{ MbbApp.extensions.blocks && <option value="block">{ __( 'Block', 'meta-box-builder' ) }</option> }
			</select>
			{
				'post' === objectType &&
				<>
					<input type="hidden" name="post_types" ref={ register } value={ JSON.stringify( postTypes ) } />
					<ReactSelect
						label={ __( 'Post types', 'meta-box-builder' ) }
						multiple={ true }
						options={ MbbApp.postTypes.map( item => ( { value: item.slug, label: `${ item.name } (${ item.slug })` } ) ) }
						defaultValue={ postTypes }
						onChange={ updatePostTypes }
					/>
				</>
			}
			{
				'term' === objectType &&
				<ReactSelect
					label={ __( 'Taxonomies', 'meta-box-builder' ) }
					multiple={ true }
					options={ MbbApp.taxonomies.map( item => ( { value: item.slug, label: `${ item.name } (${ item.slug })` } ) ) }
				/>
			}
			{
				'setting' === objectType &&
				<ReactSelect
					label={ __( 'Settings pages', 'meta-box-builder' ) }
					multiple={ true }
					options={ MbbApp.settingsPages.map( item => ( { value: item.id, label: `${ item.title } (${ item.slug })` } ) ) }
				/>
			}
		</DivRow>
		{
			'post' === objectType && postTypes.includes( 'attachment' ) &&
			<Checkbox label={ __( 'Show in media modal', 'meta-box-builder' ) } name="media_modal" defaultValue={ defaultValues.media_modal } />
		}
	</>;
};