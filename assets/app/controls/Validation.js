import { Button } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { maybeArrayToObject, uniqid } from '../functions';
import DivRow from './DivRow';
import PersistentPanelBodyWithAdd from './PersistentPanelBodyWithAdd';

const Validation = ( { defaultValue, name, updateField, ...rest } ) => {
	const rules = maybeArrayToObject( defaultValue, 'id' );

	const addRule = () => {
		const newRule = { name: 'required', value: true, message: '', id: uniqid() };
		updateField( name, {
			...rules,
			[ newRule.id ]: newRule,
		} );
	};

	const removeRule = id => {
		const newRules = { ...rules };
		delete newRules[ id ];
		updateField( name, newRules );
	};

	return (
		<PersistentPanelBodyWithAdd
			panelId="field-validation"
			title={ __( 'Validation', 'meta-box-builder' ) }
			empty={ Object.values( rules ).length === 0 }
			onAdd={ addRule }
		>
			<DivRow className="mb-ruleset" { ...rest }>
				{
					Object.values( rules ).map( rule => <Rule
						key={ rule.id }
						rule={ rule }
						removeRule={ removeRule }
						updateField={ updateField }
					/> )
				}
				<Button variant="secondary" size="compact" onClick={ addRule } text={ __( '+ Add Rule', 'meta-box-builder' ) } />
			</DivRow>
		</PersistentPanelBodyWithAdd>
	);
};

const Rule = ( { rule, removeRule, updateField } ) => {
	const update = key => e => updateField( `validation.${ rule.id }.${ key }`, e.target.value );
	const updateName = e => {
		updateField( `validation.${ rule.id }.name`, e.target.value );
		if ( [ 'required', 'email', 'url', 'date', 'dateISO', 'number', 'digits', 'creditcard', 'phoneUS' ].includes( e.target.value ) ) {
			updateField( `validation.${ rule.id }.value`, true );
		} else {
			updateField( `validation.${ rule.id }.value`, '' );
		}
	};

	return (
		<div className="mb-ruleset__rule">
			<select className="mb-ruleset__name" defaultValue={ rule.name } onChange={ updateName }>
				<option value="required">{ __( 'Required', 'meta-box-builder' ) }</option>
				<option value="minlength">{ __( 'Min length', 'meta-box-builder' ) }</option>
				<option value="maxlength">{ __( 'Max length', 'meta-box-builder' ) }</option>
				<option value="rangelength">{ __( 'Range length', 'meta-box-builder' ) }</option>
				<option value="min">{ __( 'Min value', 'meta-box-builder' ) }</option>
				<option value="max">{ __( 'Max value', 'meta-box-builder' ) }</option>
				<option value="range">{ __( 'Range', 'meta-box-builder' ) }</option>
				<option value="step">{ __( 'Step', 'meta-box-builder' ) }</option>
				<option value="email">{ __( 'Email', 'meta-box-builder' ) }</option>
				<option value="url">{ __( 'URL', 'meta-box-builder' ) }</option>
				<option value="date">{ __( 'Date', 'meta-box-builder' ) }</option>
				<option value="dateISO">{ __( 'ISO date', 'meta-box-builder' ) }</option>
				<option value="number">{ __( 'Decimal number', 'meta-box-builder' ) }</option>
				<option value="digits">{ __( 'Digits only', 'meta-box-builder' ) }</option>
				<option value="creditcard">{ __( 'Credit card number', 'meta-box-builder' ) }</option>
				<option value="phoneUS">{ __( 'US phone number', 'meta-box-builder' ) }</option>
				<option value="accept">{ __( 'MIME types', 'meta-box-builder' ) }</option>
				<option value="extension">{ __( 'File extensions', 'meta-box-builder' ) }</option>
				<option value="equalTo">{ __( 'Equals to another field', 'meta-box-builder' ) }</option>
				<option value="remote">{ __( 'Remote', 'meta-box-builder' ) }</option>
			</select>
			{
				[ 'minlength', 'maxlength', 'min', 'max', 'step', 'accept', 'extension', 'equalTo', 'remote' ].includes( rule.name ) &&
				<input defaultValue={ rule.value } type="text" placeholder={ __( 'Enter a value', 'meta-box-builder' ) } onChange={ update( 'value' ) } />
			}
			{
				[ 'rangelength', 'range' ].includes( rule.name ) &&
				<input defaultValue={ rule.value } type="text" placeholder={ __( 'Ex. 2,6', 'meta-box-builder' ) } title={ __( 'Separate values by a comma', 'meta-box-builder' ) } onChange={ update( 'value' ) } />
			}
			<input defaultValue={ rule.message } type="text" placeholder={ __( 'Custom error message', 'meta-box-builder' ) } onChange={ update( 'message' ) } />
			<Button variant="link" isDestructive={ true } onClick={ () => removeRule( rule.id ) } text={ __( 'Remove', 'meta-box-builder' ) } />
		</div>
	);
};

export default Validation;