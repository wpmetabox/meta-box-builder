import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import FieldInserter from '../../controls/FieldInserter';
import { uniqid } from "../../functions";
import useFieldIds from '../../hooks/useFieldIds';
import useSettings from "../../hooks/useSettings";

const ConditionalLogic = () => {
	const name = 'settings[conditional_logic]';

	const { getSetting } = useSettings();
	const setting = getSetting( 'conditional_logic', {} );

	const [ rules, setRules ] = useState( Object.values( setting.when || {} ) );
	const addRule = () => setRules( prev => [ ...prev, { name: '', operator: '=', value: '', id: uniqid() } ] );
	const removeRule = id => setRules( prev => prev.filter( rule => rule.id !== id ) );

	const ids = useFieldIds( state => state.ids );
	const fields = Array.from( new Set( Object.values( ids ) ) );

	return (
		<>
			{ rules.length > 0 && <Intro name={ name } setting={ setting } /> }
			{
				rules.map( rule => <Rule
					key={ rule.id }
					rule={ rule }
					fields={ fields }
					name={ `${ name }[when][${ rule.id }]` }
					removeRule={ removeRule }
				/> )
			}
			<button type="button" className="button" onClick={ addRule }>{ __( '+ Add Rule', 'meta-box-builder' ) }</button>
		</>
	);
};

const Intro = ( { name, setting } ) => (
	<div className="og-include-exclude__intro">
		<select name={ `${ name }[type]` } defaultValue={ setting.type || 'visible' }>
			<option value="visible">{ __( 'Visible', 'meta-box-builder' ) }</option>
			<option value="hidden">{ __( 'Hidden', 'meta-box-builder' ) }</option>
		</select>
		{ __( 'when', 'meta-box-builder' ) }
		<br />
		<select name={ `${ name }[relation]` } defaultValue={ setting.relation || 'or' }>
			<option value="or">{ __( 'any', 'meta-box-builder' ) }</option>
			<option value="and">{ __( 'all', 'meta-box-builder' ) }</option>
		</select>
		{ __( 'conditions match', 'meta-box-builder' ) }
	</div>
);

const Rule = ( { rule, fields, name, removeRule } ) => (
	<div className="og-include-exclude__rule">
		<input type="hidden" name={ `${ name }[id]` } defaultValue={ rule.id } />
		<FieldInserter name={ `${ name }[name]` } defaultValue={ rule.name } placeholder={ __( 'Enter or select a field ID', 'meta-box-builder' ) } items={ fields } isID={ true } />
		<select name={ `${ name }[operator]` } className="og-include-exclude__operator" defaultValue={ rule.operator }>
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
		<input defaultValue={ rule.value } type="text" placeholder={ __( 'Enter a value', 'meta-box-builder' ) } name={ `${ name }[value]` } />
		<a href="#" className="og-include-exclude__remove" onClick={ () => removeRule( rule.id ) }>{ __( 'Remove', 'meta-box-builder' ) }</a>
	</div>
);

export default ConditionalLogic;