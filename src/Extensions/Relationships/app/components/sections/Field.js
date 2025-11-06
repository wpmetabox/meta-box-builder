import { Notice } from "@wordpress/components";
import { RawHTML } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import Checkbox from "../../../../../../assets/app/controls/Checkbox";
import Input from "../../../../../../assets/app/controls/Input";
import KeyValue from "../../../../../../assets/app/controls/KeyValue";
import Textarea from "../../../../../../assets/app/controls/Textarea";
import useSettings from "../../../../../../assets/app/hooks/useSettings";

const Field = ( { id } ) => {
	const { getSetting, updateSetting } = useSettings();

	const otherSideId = id === 'from' ? __( 'to', 'meta-box-builder' ) : __( 'from', 'meta-box-builder' );

	return (
		<>
			<Notice status="warning" isDismissible={ false }>
				<RawHTML>
					{ sprintf( __( 'These settings apply to the field that is displayed on the other side ("%s") of the relationship - where you can select entries for this field.', 'meta-box-builder' ), `<strong>${ otherSideId }</strong>` ) }
				</RawHTML>
			</Notice>
			<Input
				name={ `${ id }.field.name` }
				label={ __( 'Label', 'meta-box-builder' ) }
				defaultValue={ getSetting( `${ id }.field.name` ) }
				description={ __( 'The name of the field. Some page builders use this name to select the field to display.', 'meta-box-builder' ) }
				updateField={ updateSetting }
			/>
			<Input
				name={ `${ id }.field.label_description` }
				label={ __( 'Label description', 'meta-box-builder' ) }
				description={ __( 'Display below the field label', 'meta-box-builder' ) }
				defaultValue={ getSetting( `${ id }.field.label_description` ) }
				updateField={ updateSetting }
			/>
			<Input
				name={ `${ id }.field.desc` }
				label={ __( 'Input description', 'meta-box-builder' ) }
				description={ __( 'Display below the field input', 'meta-box-builder' ) }
				defaultValue={ getSetting( `${ id }.field.desc` ) }
				updateField={ updateSetting }
			/>
			<Input
				name={ `${ id }.field.placeholder` }
				label={ __( 'Placeholder', 'meta-box-builder' ) }
				defaultValue={ getSetting( `${ id }.field.placeholder` ) }
				updateField={ updateSetting }
			/>
			<Checkbox
				name={ `${ id }.field.add_new` }
				label={ __( 'Add new', 'meta-box-builder' ) }
				defaultValue={ getSetting( `${ id }.field.add_new` ) }
				updateField={ updateSetting }
			/>
			<KeyValue
				name={ `${ id }.field.query_args` }
				label={ __( 'Query args', 'meta-box-builder' ) }
				description={ __( 'Query arguments for getting items.', 'meta-box-builder' ) }
				defaultValue={ getSetting( `${ id }.field.query_args` ) }
				updateField={ updateSetting }
			/>
			<Input
				name={ `${ id }.field.max_clone` }
				label={ __( 'Max items', 'meta-box-builder' ) }
				description={ __( 'Set to 1 to set 1-n relationship or 1-1 relationship. Leave empty for unlimited items, e.g. n-n relationship.', 'meta-box-builder' ) }
				type="number"
				defaultValue={ getSetting( `${ id }.field.max_clone` ) }
				updateField={ updateSetting }
			/>
			<Input
				name={ `${ id }.field.add_button` }
				label={ __( 'Add more text', 'meta-box-builder' ) }
				description={ __( 'Custom text for the the "+ Add more" button. Leave empty to use the default text.', 'meta-box-builder' ) }
				defaultValue={ getSetting( `${ id }.field.add_button` ) }
				updateField={ updateSetting }
			/>
			<Textarea
				name={ `${ id }.field.before` }
				label={ __( 'Before', 'meta-box-builder' ) }
				description={ __( 'Custom HTML displayed before the field output', 'meta-box-builder' ) }
				defaultValue={ getSetting( `${ id }.field.before` ) }
				updateField={ updateSetting }
			/>
			<Textarea
				name={ `${ id }.field.after` }
				label={ __( 'After', 'meta-box-builder' ) }
				description={ __( 'Custom HTML displayed after the field output', 'meta-box-builder' ) }
				defaultValue={ getSetting( `${ id }.field.after` ) }
				updateField={ updateSetting }
			/>
			<Input
				name={ `${ id }.field.class` }
				label={ __( 'Custom CSS class', 'meta-box-builder' ) }
				defaultValue={ getSetting( `${ id }.field.class` ) }
				updateField={ updateSetting }
			/>
		</>
	);
};

export default Field;