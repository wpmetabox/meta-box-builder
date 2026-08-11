import { __ } from '@wordpress/i18n';
import Input from '../../../../../../assets/app/controls/Input';
import useAutofill from '../../hooks/useAutofill';

const Labels = () => {
	const { getSetting, updateWithAutofill } = useAutofill();
	const singularName = getSetting( 'labels.singular_name', '' );
	const pluralName = getSetting( 'labels.name', '' );

	return (
		<div className="mb-content">
			<Input
				name="labels.add_new"
				componentId="labels-add-new"
				label={ __( 'Add new', 'meta-box-builder' ) }
				tooltip={ __( 'Label for adding a new singular item', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'labels.add_new', __( 'Add New', 'meta-box-builder' ) ) }
				updateField={ updateWithAutofill }
			/>
			<Input
				key={ `add-new-item-${ singularName }` }
				name="labels.add_new_item"
				componentId="labels-add-new-item"
				label={ __( 'Add new item', 'meta-box-builder' ) }
				tooltip={ __( 'Label for adding a new singular item', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'labels.add_new_item' ) }
				updateField={ updateWithAutofill }
			/>
			<Input
				key={ `edit-item-${ singularName }` }
				name="labels.edit_item"
				componentId="labels-edit-item"
				label={ __( 'Edit item', 'meta-box-builder' ) }
				tooltip={ __( 'Label for editing a singular item', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'labels.edit_item' ) }
				updateField={ updateWithAutofill }
			/>
			<Input
				key={ `search-items-${ pluralName }` }
				name="labels.search_items"
				componentId="labels-search-items"
				label={ __( 'Search items', 'meta-box-builder' ) }
				tooltip={ __( 'Label for searching items', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'labels.search_items' ) }
				updateField={ updateWithAutofill }
			/>
			<Input
				key={ `not-found-${ pluralName }` }
				name="labels.not_found"
				componentId="labels-not-found"
				label={ __( 'Not found', 'meta-box-builder' ) }
				tooltip={ __( 'Label used when no items are found', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'labels.not_found' ) }
				updateField={ updateWithAutofill }
			/>
			<Input
				key={ `all-items-${ pluralName }` }
				name="labels.all_items"
				componentId="labels-all-items"
				label={ __( 'All items', 'meta-box-builder' ) }
				tooltip={ __( 'Label to signify all items in a submenu link', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'labels.all_items' ) }
				updateField={ updateWithAutofill }
			/>
			<Input
				key={ `menu-name-${ pluralName }` }
				name="labels.menu_name"
				componentId="labels-menu-name"
				label={ __( 'Menu name', 'meta-box-builder' ) }
				tooltip={ __( 'Label for the menu name', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'labels.menu_name' ) }
				updateField={ updateWithAutofill }
			/>
			<Input
				key={ `item-updated-${ singularName }` }
				name="labels.item_updated"
				componentId="labels-item-updated"
				label={ __( 'Item updated', 'meta-box-builder' ) }
				tooltip={ __( 'Label used when an item is updated', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'labels.item_updated' ) }
				updateField={ updateWithAutofill }
			/>
			<Input
				key={ `item-added-${ singularName }` }
				name="labels.item_added"
				componentId="labels-item-added"
				label={ __( 'Item added', 'meta-box-builder' ) }
				tooltip={ __( 'Label used when an item is added', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'labels.item_added' ) }
				updateField={ updateWithAutofill }
			/>
			<Input
				key={ `item-deleted-${ singularName }` }
				name="labels.item_deleted"
				componentId="labels-item-deleted"
				label={ __( 'Item deleted', 'meta-box-builder' ) }
				tooltip={ __( 'Label used when an item is deleted', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'labels.item_deleted' ) }
				updateField={ updateWithAutofill }
			/>
		</div>
	);
};

export default Labels;
