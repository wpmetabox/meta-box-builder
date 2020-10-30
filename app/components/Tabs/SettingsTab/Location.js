import Checkbox from '../../Common/Checkbox';
import ReactSelect from '../../Common/ReactSelect';
import Select from '../../Common/Select';
const { __ } = wp.i18n;

let objectTypes = {
	post: __( 'Post', 'meta-box-builder' )
};
if ( MbbApp.extensions.termMeta ) {
	objectTypes.term = __( 'Term', 'meta-box-builder' );
}
if ( MbbApp.extensions.userMeta ) {
	objectTypes.user = __( 'User', 'meta-box-builder' );
}
if ( MbbApp.extensions.commentMeta ) {
	objectTypes.comment = __( 'Comment', 'meta-box-builder' );
}
if ( MbbApp.extensions.settingsPage ) {
	objectTypes.setting = __( 'Settings Page', 'meta-box-builder' );
}
if ( MbbApp.extensions.blocks ) {
	objectTypes.block = __( 'Block', 'meta-box-builder' );
}
export const Location = ( { objectType, updateObjectType, postTypes, updatePostTypes } ) => {
	return <>
		<h3>{ __( 'Location', 'meta-box-builder' ) }</h3>
		<Select
			label={ __( 'Object type', 'meta-box-builder' ) }
			options={ objectTypes }
			defaultValue={ objectType }
			onChange={ updateObjectType }
		/>
		{
			'post' === objectType &&
			<ReactSelect
				label={ __( 'Post types', 'meta-box-builder' ) }
				multiple={ true }
				options={ MbbApp.postTypes.map( item => ( { value: item.slug, label: `${ item.name } (${ item.slug })` } ) ) }
				defaultValue={ postTypes }
				onChange={ updatePostTypes }
			/>
		}
		{
			'post' === objectType && postTypes.includes( 'attachment' ) &&
			<Checkbox label={ __( 'Show in media modal', 'meta-box-builder' ) } name="media_modal" />
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
	</>;
};