import { Button, Flex, SelectControl } from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { trimStart } from 'lodash';
import { getFullOptions, maybeArrayToObject, uniqid } from '../functions';
import useAllFields from "../hooks/useAllFields";
import useSettings from "../hooks/useSettings";
import FieldInserter from './FieldInserter';
import PersistentPanelBodyWithAdd from './PersistentPanelBodyWithAdd';
import UpgradePanelBody from './UpgradePanelBody';

const ConditionalLogic = ( { defaultValue, updateField, panelId = 'field-conditional-logic' } ) => {
	const setting = defaultValue;
	const rules = maybeArrayToObject( setting.when, 'id' );

	// Convert `when` to an object if it's an array, only run once when initializing, just in case it's an empty array.
	useEffect( () => {
		if ( Array.isArray( setting.when ) ) {
			updateField( 'conditional_logic.when', {} );
		}
	}, [] );


	if ( !MbbApp.extensions.conditionalLogic ) {
		return <UpgradePanelBody title={ __( 'Conditional logic', 'meta-box-builder' ) } />;
	}

	const addRule = () => {
		const newRule = { name: '', operator: '=', value: '', id: uniqid() };
		updateField( `conditional_logic.when.${ newRule.id }`, newRule );

		// Make sure setting.type is always set.
		if ( setting.type === undefined ) {
			updateField( 'conditional_logic.type', 'visible' );
		}
	};

	const removeRule = id => {
		const newRules = { ...rules };
		delete newRules[ id ];

		updateField( 'conditional_logic.when', newRules );
	};

	return (
		<PersistentPanelBodyWithAdd
			panelId={ panelId }
			title={ __( 'Conditional logic', 'meta-box-builder' ) }
			empty={ Object.values( rules ).length === 0 }
			onAdd={ addRule }
		>
			<div className="mb-ruleset">
				{ Object.values( rules ).length > 0 && <Intro setting={ setting } updateField={ updateField } /> }
				{
					Object.values( rules ).map( rule => <Rule
						key={ rule.id }
						rule={ rule }
						removeRule={ removeRule }
						updateField={ updateField }
					/> )
				}

				<Button variant="secondary" size="compact" onClick={ addRule } text={ __( '+ Add Rule', 'meta-box-builder' ) } />
			</div>
		</PersistentPanelBodyWithAdd>
	);
};

const Intro = ( { setting, updateField } ) => {
	const update = key => value => updateField( `conditional_logic.${ key }`, value );

	return (
		<Flex gap={ 1 } align="center" className="mb-ruleset__intro">
			<SelectControl
				value={ setting.type || 'visible' }
				onChange={ update( 'type' ) }
				options={ [
					{ label: __( 'Visible', 'meta-box-builder' ), value: 'visible' },
					{ label: __( 'Hidden', 'meta-box-builder' ), value: 'hidden' },
				] }
				__nextHasNoMarginBottom
			/>
			{ __( 'when', 'meta-box-builder' ) }
			<SelectControl
				value={ setting.relation || 'and' }
				onChange={ update( 'relation' ) }
				options={ [
					{ label: __( 'all', 'meta-box-builder' ), value: 'and' },
					{ label: __( 'any', 'meta-box-builder' ), value: 'or' },
				] }
				__nextHasNoMarginBottom
			/>
			{ __( 'conditions match', 'meta-box-builder' ) }
		</Flex>
	);
};

const Rule = ( { rule, removeRule, updateField } ) => {
	const { getPrefix } = useSettings();
	const [ suggestedValues, setSuggestedValues ] = useState( [] );

	const ignoreTypes = [ 'background', 'button', 'custom_html', 'divider', 'heading', 'tab', 'group' ];
	const fields = useAllFields().filter( field => !ignoreTypes.includes( field.type ) );

	const fieldIds = fields.map( field => [ field.id, `${ field.name } (${ field.id })` ] );
	const plainFieldIds = fields.map( field => field.id ).join( ',' ); // Used for dependency tracking only.

	const choiceFieldTypes = [ 'select', 'radio', 'checkbox_list', 'select_advanced', 'button_group', 'image_select', 'autocomplete' ];

	const updateOperator = e => updateField( `conditional_logic.when.${ rule.id }.operator`, e.target.value );

	const handleChangeName = ( inputRef, value ) => updateField( `conditional_logic.when.${ rule.id }.name`, value );
	const handleSelectName = ( inputRef, value ) => {
		inputRef.current.value = `${ getPrefix() || '' }${ value }`;
		updateField( `conditional_logic.when.${ rule.id }.name`, inputRef.current.value );
	};

	// Update suggested values when the rule name changes.
	useEffect( () => {
		const fieldId = trimStart( rule.name, getPrefix() || '' ); // Remove prefix from the input to get the field ID.
		const selectedField = fields.find( field => field.id === fieldId );
		if ( !selectedField || !choiceFieldTypes.includes( selectedField.type ) ) {
			setSuggestedValues( [] );
			return;
		}
		const options = getFullOptions( selectedField.options || '' ).map( option => [ option.value, `${ option.label } (${ option.value })` ] );
		setSuggestedValues( options );
	}, [ rule.name, plainFieldIds ] );

	const updateValue = ( inputRef, value ) => {
		inputRef.current.value = value;
		updateField( `conditional_logic.when.${ rule.id }.value`, value );
	};

	return (
		<div className="mb-ruleset__rule">
			<FieldInserter
				defaultValue={ rule.name }
				placeholder={ __( 'Enter or select a field ID', 'meta-box-builder' ) }
				items={ fieldIds }
				isID={ true }
				onChange={ handleChangeName }
				onSelect={ handleSelectName }
			/>
			<select className="mb-ruleset__operator" defaultValue={ rule.operator } onChange={ updateOperator }>
				<option value="=">{ __( '=', 'meta-box-builder' ) }</option>
				<option value=">">{ __( '>', 'meta-box-builder' ) }</option>
				<option value="<">{ __( '<', 'meta-box-builder' ) }</option>
				<option value=">=">{ __( '>=', 'meta-box-builder' ) }</option>
				<option value="<=">{ __( '<=', 'meta-box-builder' ) }</option>
				<option value="!=">{ __( '!=', 'meta-box-builder' ) }</option>
				<option value="contains">{ __( 'contains', 'meta-box-builder' ) }</option>
				<option value="not contains">{ __( 'not contains', 'meta-box-builder' ) }</option>
				<option value="starts with">{ __( 'starts with', 'meta-box-builder' ) }</option>
				<option value="not starts with">{ __( 'not starts with', 'meta-box-builder' ) }</option>
				<option value="ends with">{ __( 'ends with', 'meta-box-builder' ) }</option>
				<option value="not ends with">{ __( 'not ends with', 'meta-box-builder' ) }</option>
				<option value="between">{ __( 'between', 'meta-box-builder' ) }</option>
				<option value="not between">{ __( 'not between', 'meta-box-builder' ) }</option>
				<option value="in">{ __( 'in', 'meta-box-builder' ) }</option>
				<option value="not in">{ __( 'not in', 'meta-box-builder' ) }</option>
				<option value="match">{ __( 'match', 'meta-box-builder' ) }</option>
				<option value="not match">{ __( 'not match', 'meta-box-builder' ) }</option>
			</select>
			<FieldInserter
				defaultValue={ rule.value }
				placeholder={ __( 'Enter a value', 'meta-box-builder' ) }
				items={ suggestedValues }
				onChange={ updateValue }
				onSelect={ updateValue }
			/>
			<Button variant="link" isDestructive={ true } onClick={ () => removeRule( rule.id ) } text={ __( 'Remove', 'meta-box-builder' ) } />
		</div>
	);
};

export default ConditionalLogic;