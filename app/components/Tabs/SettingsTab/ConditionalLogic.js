import dotProp from 'dot-prop';
import { useFormContext } from 'react-hook-form';
import { uniqid } from '../../../utility/functions';
import DivRow from '../../Common/DivRow';

const { useState } = wp.element;
const { Dashicon } = wp.components;
const { __ } = wp.i18n;

export const ConditionalLogic = ( { defaultValues } ) => {
    const [ rules, setRules ] = useState( dotProp.get( defaultValues, 'when', [] ) );

    const addRule = () => setRules( prevRules => prevRules.concat( { name: '', operator: '=', value: '', id: uniqid() } ) );
    const removeRule = id => setRules( prevRules => prevRules.filter( rule => rule.id !== id ) );

    return (
        <DivRow
            className="og-include-exclude"
            label={ `<a href="https://docs.metabox.io/extensions/meta-box-contitional-logic/" target="_blank" rel="noopener norefferer">${ __( 'Conditional Logic', 'meta-box-builder' ) }</a>` }
            tooltip={ __( 'Toggle the field group on other field values', 'meta-box-builder' ) }
        >
            { rules.length > 0 && <Intro defaultValues={ defaultValues } /> }
            {
                rules.map( ( rule, index ) => <Rule
                    key={ rule.id }
                    rule={ rule }
                    baseName={ `conditional_logic[when][${ index }]` }
                    removeRule={ removeRule }
                /> )
            }
            <button type="button" className="button" onClick={ addRule }>{ __( '+ Add Rule', 'meta-box-builder' ) }</button>
        </DivRow>
    );
};

const Intro = ( { defaultValues } ) => {
    const { register } = useFormContext();

    return (
        <div className="og-include-exclude__intro">
            <select name="conditional_logic[type]" ref={ register } defaultValue={ dotProp.get( defaultValues, 'type', 'visible' ) }>
                <option value="visible">{ __( 'Visible', 'meta-box-builder' ) }</option>
                <option value="hidden">{ __( 'Hidde ', 'meta-box-builder' ) }</option>
            </select>
            { __( 'when', 'meta-box-builder' ) }
            <select name="conditional_logic[relation]" ref={ register } defaultValue={ dotProp.get( defaultValues, 'relation', 'OR' ) }>
                <option value="or">{ __( 'any', 'meta-box-builder' ) }</option>
                <option value="and">{ __( 'all', 'meta-box-builder' ) }</option>
            </select>
            { __( 'rules match', 'meta-box-builder' ) }
        </div>
    );
};

const Rule = ( { rule, baseName, removeRule } ) => {
    const { register } = useFormContext();

    return (
        <div className="og-include-exclude__rule og-attribute">
            <input type="hidden" name={ `${ baseName }[id]` } ref={ register } defaultValue={ rule.id } />
            <input
                type="text"
                name={ `${ baseName }[name]` }
                className="og-include-exclude__name"
                ref={ register }
                placeholder={ __( 'Enter field ID', 'meta-box-builder' ) }
                defaultValue={ rule.name }
            />
            <select name={ `${ baseName }[operator]` } className="og-include-exclude__operator" ref={ register } defaultValue={ rule.operator }>
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
            <input type="text" name={ `${ baseName }[value]` } placeholder={ __( 'Enter a value', 'meta-box-builder' ) } ref={ register } defaultValue={ rule.value } />
            <button type="button" className="og-remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => removeRule( rule.id ) }><Dashicon icon="dismiss" /></button>
        </div>
    );
};
