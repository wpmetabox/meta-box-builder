import dotProp from 'dot-prop';
import { useFormContext } from 'react-hook-form';
import { ConditionalLogicContext } from '../../contexts/ConditionalLogicContext';
import { uniqid } from '../../functions';
import DivRow from '../Common/DivRow';

const { useState, useContext, useEffect } = wp.element;
const { Dashicon } = wp.components;
const { __ } = wp.i18n;

const ConditionalLogic = ( { defaultValue, name, componentId } ) => {
	const [ rules, setRules ] = useState( Object.values( dotProp.get( defaultValue, 'when', {} ) ) );

	const addRule = () => setRules( prevRules => prevRules.concat( { name: '', operator: '=', value: '', id: uniqid() } ) );
	const removeRule = id => setRules( prevRules => prevRules.filter( rule => rule.id !== id ) );

	return (
		<DivRow
			className="og-include-exclude"
			label={ `<a href="https://docs.metabox.io/extensions/meta-box-conditional-logic/" target="_blank" rel="noopener norefferer">${ __( 'Conditional Logic', 'meta-box-builder' ) }</a>` }
			tooltip={ __( 'Toggle the field based on other field values', 'meta-box-builder' ) }
		>
			{ rules.length > 0 && <Intro id={ componentId } name={ name } defaultValue={ defaultValue } /> }
			{
				rules.map( ( rule ) => <Rule
					key={ rule.id }
					id={ `${ componentId }-rules-${ rule.id }` }
					rule={ rule }
					baseName={ `${ name }[when][${ rule.id }]` }
					removeRule={ removeRule }
				/> )
			}
			<input type='hidden' id={ componentId } value={ JSON.stringify( rules ) } />
			<button type="button" className="button" onClick={ addRule }>{ __( '+ Add Rule', 'meta-box-builder' ) }</button>
		</DivRow>
	);
};

const Intro = ( { name, id, defaultValue } ) => {
	const { register } = useFormContext();

	return (
		<div className="og-include-exclude__intro">
			<select name={ `${ name }[type]` } id={ `${ id }-type` } ref={ register } defaultValue={ dotProp.get( defaultValue, 'type', 'visible' ) }>
				<option value="visible">{ __( 'Visible', 'meta-box-builder' ) }</option>
				<option value="hidden">{ __( 'Hidden', 'meta-box-builder' ) }</option>
			</select>
			{ __( 'when', 'meta-box-builder' ) }
			<select name={ `${ name }[relation]` } id={ `${ id }-relation` } ref={ register } defaultValue={ dotProp.get( defaultValue, 'relation', 'or' ) }>
				<option value="or">{ __( 'any', 'meta-box-builder' ) }</option>
				<option value="and">{ __( 'all', 'meta-box-builder' ) }</option>
			</select>
			{ __( 'conditions match', 'meta-box-builder' ) }
		</div>
	);
};

const Rule = ( { rule, baseName, removeRule, id } ) => {
	const { register } = useFormContext();
	const { conditionalLogic } = useContext( ConditionalLogicContext );

	return (
		<div className="og-include-exclude__rule og-attribute">
			<input type="hidden" name={ `${ baseName }[id]` } ref={ register } defaultValue={ rule.id } />
			<select
				name={ `${ baseName }[name]` }
				className="og-include-exclude__name"
				ref={ register }
				defaultValue={ rule.name || Object.values( conditionalLogic )[ 0 ].id }
			>
				{
					Object.values( conditionalLogic ).map( field => <option value={ field.id } key={ field.id }>{ field.name ? field.name : field.id }</option> )
				}
			</select>
			<select
				name={ `${ baseName }[operator]` }
				className="og-include-exclude__operator"
				ref={ register }
				defaultValue={ rule.operator }
			>
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
			<input defaultValue={ rule.value } type="text" placeholder={ __( 'Enter a value', 'meta-box-builder' ) } ref={ register } name={ `${ baseName }[value]` } />
			<button type="button" className="og-remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => removeRule( rule.id ) }><Dashicon icon="dismiss" /></button>
		</div>
	);
};

export default ConditionalLogic;