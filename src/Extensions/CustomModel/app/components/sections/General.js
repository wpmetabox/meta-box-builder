import { __ } from '@wordpress/i18n';
import Checkbox from '../../../../../../assets/app/controls/Checkbox';
import DashiconPicker from '../../../../../../assets/app/controls/DashiconPicker';
import FontAwesome from '../../../../../../assets/app/controls/Fontawesome';
import Input from '../../../../../../assets/app/controls/Input';
import Select from '../../../../../../assets/app/controls/Select';
import ToggleGroup from '../../../../../../assets/app/controls/ToggleGroup';
import useAutofill from '../../hooks/useAutofill';

const getMenuType = getSetting => {
	const showInMenu = getSetting( 'show_in_menu', true );

	if ( false === showInMenu || 'false' === showInMenu ) {
		return 'none';
	}

	if ( 'string' === typeof showInMenu && 'true' !== showInMenu ) {
		return 'submenu';
	}

	return 'top';
};

const getMenuParent = getSetting => {
	const showInMenu = getSetting( 'show_in_menu', true );

	if ( 'string' === typeof showInMenu && ! [ 'true', 'false' ].includes( showInMenu ) ) {
		return showInMenu;
	}

	return 'index.php';
};

const General = () => {
	const { getSetting, updateWithAutofill } = useAutofill();
	const menuType = getMenuType( getSetting );
	const menuParent = getMenuParent( getSetting );
	const singularName = getSetting( 'labels.singular_name', '' );
	const slugKey = getSetting( '_slug_changed' ) ? 'slug-manual' : singularName;
	const tableKey = getSetting( '_table_changed' ) ? 'table-manual' : singularName;
	const capabilityOptions = Object.fromEntries( ( MbbApp.capabilities || [] ).map( cap => [ cap, cap ] ) );

	const updateMenuType = ( name, value ) => {
		if ( 'top' === value ) {
			updateWithAutofill( 'show_in_menu', true );
			return;
		}

		if ( 'none' === value ) {
			updateWithAutofill( 'show_in_menu', false );
			return;
		}

		updateWithAutofill( 'show_in_menu', menuParent );
	};

	const updateMenuParent = ( name, value ) => {
		updateWithAutofill( 'show_in_menu', value );
	};

	return (
		<div className="mb-content">
			<Input
				name="labels.name"
				componentId="labels-name"
				label={ __( 'Plural name', 'meta-box-builder' ) }
				tooltip={ __( 'General name for the model, usually plural', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'labels.name' ) }
				updateField={ updateWithAutofill }
				required
			/>
			<Input
				name="labels.singular_name"
				componentId="labels-singular-name"
				label={ __( 'Singular name', 'meta-box-builder' ) }
				tooltip={ __( 'Name for one item of this model', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'labels.singular_name' ) }
				updateField={ updateWithAutofill }
				required
			/>
			<Input
				key={ slugKey }
				name="slug"
				componentId="slug"
				label={ __( 'Slug', 'meta-box-builder' ) }
				tooltip={ __( 'Model slug. Use only lowercase letters, numbers, underscores and dashes', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'slug' ) }
				updateField={ updateWithAutofill }
				required
			/>
			<hr />
			<Input
				key={ tableKey }
				name="table"
				componentId="table"
				label={ __( 'Custom table', 'meta-box-builder' ) }
				tooltip={ __( 'The custom table used to store model data', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'table' ) }
				updateField={ updateWithAutofill }
				required
			/>
			<Checkbox
				name="prefix"
				componentId="prefix"
				label={ __( 'Table prefix', 'meta-box-builder' ) }
				description={ __( 'Include the table prefix set in wp-config.php', 'meta-box-builder' ) }
				defaultValue={ !! getSetting( 'prefix', false ) }
				updateField={ updateWithAutofill }
			/>
			<Select
				name="capability"
				componentId="capability"
				label={ __( 'Required capability', 'meta-box-builder' ) }
				tooltip={ __( 'The capability to access the menu and create/edit/delete models', 'meta-box-builder' ) }
				options={ capabilityOptions }
				defaultValue={ getSetting( 'capability', 'edit_posts' ) }
				updateField={ updateWithAutofill }
			/>
			<hr />
			<ToggleGroup
				key={ menuType }
				name="menu_type"
				componentId="menu-type"
				label={ __( 'Menu type', 'meta-box-builder' ) }
				options={ {
					top: __( 'Top-level menu', 'meta-box-builder' ),
					submenu: __( 'Submenu', 'meta-box-builder' ),
					none: __( 'Do not show in the admin menu', 'meta-box-builder' ),
				} }
				defaultValue={ menuType }
				updateField={ updateMenuType }
			/>
			{
				'top' === menuType &&
				<Select
					name="menu_position"
					componentId="menu-position"
					label={ __( 'Show model menu after', 'meta-box-builder' ) }
					options={ MbbApp.menu_positions || {} }
					defaultValue={ getSetting( 'menu_position', '' ) }
					placeholder={ __( 'Let WordPress decide automatically', 'meta-box-builder' ) }
					updateField={ updateWithAutofill }
				/>
			}
			{
				'submenu' === menuType &&
				<Select
					key={ menuParent }
					name="menu_parent"
					componentId="menu-parent"
					label={ __( 'Parent menu', 'meta-box-builder' ) }
					options={ MbbApp.menu_parents || {} }
					defaultValue={ menuParent }
					updateField={ updateMenuParent }
				/>
			}
			{
				'top' === menuType &&
				<ToggleGroup
					key={ getSetting( 'icon_type', 'dashicons' ) }
					name="icon_type"
					componentId="icon-type"
					label={ __( 'Menu icon type', 'meta-box-builder' ) }
					options={ {
						dashicons: __( 'Dashicons', 'meta-box-builder' ),
						font_awesome: __( 'Font Awesome', 'meta-box-builder' ),
						svg: __( 'SVG', 'meta-box-builder' ),
						custom: __( 'Custom URL', 'meta-box-builder' ),
					} }
					defaultValue={ getSetting( 'icon_type', 'dashicons' ) }
					updateField={ updateWithAutofill }
				/>
			}
			{
				'top' === menuType && 'dashicons' === getSetting( 'icon_type', 'dashicons' ) &&
				<DashiconPicker
					name="icon"
					componentId="icon"
					label={ __( 'Menu icon', 'meta-box-builder' ) }
					defaultValue={ ( getSetting( 'icon', 'admin-post' ) || 'admin-post' ).replace( /^dashicons-/, '' ) }
					updateField={ updateWithAutofill }
				/>
			}
			{
				'top' === menuType && 'svg' === getSetting( 'icon_type' ) &&
				<Input
					name="icon_svg"
					componentId="icon-svg"
					label={ __( 'Menu icon SVG', 'meta-box-builder' ) }
					description={ __( 'Must be in base64 encoded format.', 'meta-box-builder' ) }
					defaultValue={ getSetting( 'icon_svg' ) }
					updateField={ updateWithAutofill }
				/>
			}
			{
				'top' === menuType && 'custom' === getSetting( 'icon_type' ) &&
				<Input
					name="icon_custom"
					componentId="icon-custom"
					label={ __( 'Menu icon URL', 'meta-box-builder' ) }
					defaultValue={ getSetting( 'icon_custom' ) }
					updateField={ updateWithAutofill }
				/>
			}
			{
				'top' === menuType && 'font_awesome' === getSetting( 'icon_type' ) &&
				<FontAwesome
					name="font_awesome"
					componentId="font-awesome"
					label={ __( 'Menu icon', 'meta-box-builder' ) }
					description={ __( 'Enter <a target="_blank" href="https://fontawesome.com/search?o=r&m=free">FontAwesome</a> icon class here. Supports FontAwesome free version only.', 'meta-box-builder' ) }
					defaultValue={ getSetting( 'font_awesome' ) }
					updateField={ updateWithAutofill }
				/>
			}
		</div>
	);
};

export default General;
