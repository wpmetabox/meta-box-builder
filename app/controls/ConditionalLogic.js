import { Button, Flex, SelectControl } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { maybeArrayToObject, uniqid } from '../functions';
import useAllFields from "../hooks/useAllFields";
import useSettings from "../hooks/useSettings";
import FieldInserter from './FieldInserter';

const ConditionalLogic = ( { defaultValue, updateField } ) => {
	const setting = defaultValue;

	const [ rules, setRules ] = useState( maybeArrayToObject( setting.when, 'id' ) );
	const addRule = () => setRules( prev => {
		const newRule = { name: '', operator: '=', value: '', id: uniqid() };
		const newRules = { ...prev, [ newRule.id ]: newRule };
		updateField( 'conditional_logic.when', newRules );
		return newRules;
	} );
	const removeRule = id => setRules( prev => {
		const newRules = { ...prev };
		delete newRules[ id ];
		updateField( 'conditional_logic.when', newRules );
		return newRules;
	} );

	return (
		<div className="og-include-exclude">
			{ Object.values( rules ).length > 0 && <Intro setting={ setting } updateField={ updateField } /> }
			{
				Object.values( rules ).map( rule => <Rule
					key={ rule.id }
					rule={ rule }
					removeRule={ removeRule }
					updateField={ updateField }
				/> )
			}

			<Button variant="secondary" onClick={ addRule } text={ __( '+ Add Rule', 'meta-box-builder' ) } />
		</div>
	);
};

const Intro = ( { setting, updateField } ) => {
	const update = key => value => updateField( `conditional_logic.${ key }`, value );

	return (
		<Flex gap={ 1 } align="center" className="og-include-exclude__intro">
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
				value={ setting.relation || 'or' }
				onChange={ update( 'relation' ) }
				options={ [
					{ label: __( 'any', 'meta-box-builder' ), value: 'or' },
					{ label: __( 'all', 'meta-box-builder' ), value: 'and' },
				] }
				__nextHasNoMarginBottom
			/>
			{ __( 'conditions match', 'meta-box-builder' ) }
		</Flex>
	);
};

const Rule = ( { rule, removeRule, updateField } ) => {
	const { getPrefix } = useSettings();

	const ignoreTypes = [ 'background', 'button', 'custom_html', 'divider', 'heading', 'tab', 'group' ];
	const fields = useAllFields()
		.filter( field => !ignoreTypes.includes( field.type ) )
		.map( field => [ field.id, `${ field.name } (${ field.id })` ] );

	const update = key => e => updateField( `conditional_logic.when.${ rule.id }.${ key }`, e.target.value );
	const handleChangeName = ( inputRef, value ) => updateField( `conditional_logic.when.${ rule.id }.name`, value );
	const handleSelectName = ( inputRef, value ) => {
		inputRef.current.value = `${ getPrefix() || '' }${ value }`;
		updateField( `conditional_logic.when.${ rule.id }.name`, inputRef.current.value );
	};

	return (
		<div className="og-include-exclude__rule">
			<FieldInserter
				defaultValue={ rule.name }
				placeholder={ __( 'Enter or select a field ID', 'meta-box-builder' ) }
				items={ fields }
				isID={ true }
				onChange={ handleChangeName }
				onSelect={ handleSelectName }
			/>
			<select className="og-include-exclude__operator" defaultValue={ rule.operator } onChange={ update( 'operator' ) }>
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
			<input defaultValue={ rule.value } type="text" placeholder={ __( 'Enter a value', 'meta-box-builder' ) } onChange={ update( 'value' ) } />
			<Button variant="link" isDestructive={ true } onClick={ () => removeRule( rule.id ) } text={ __( 'Remove', 'meta-box-builder' ) } />
		</div>
	);
};

export default ConditionalLogic;