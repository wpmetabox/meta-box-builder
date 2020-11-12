import { useFormContext } from 'react-hook-form';
import { getConditionFieldIds, uniqid } from '../../utility/functions';
import DivRow from '../Common/DivRow';
const { useState } = wp.element;
const { Dashicon } = wp.components;
const { __ } = wp.i18n;

const ConditionalLogic = ( {
    defaultValue,
    name,
    fieldId
} ) => {
    const [ conditions, setConditions ] = useState( defaultValue || [] );
    const [ list, setList ] = useState( [] );


    const addCondition = () => {
        setConditions( prevConditions => prevConditions.concat( { name: 'ID', value: '', id: uniqid() } ) );
        setList( getConditionFieldIds( fieldId ) );
    };
    const removeCondition = id => setConditions( prevConditions => prevConditions.filter( conditon => conditon.id !== id ) );

    return (
        <DivRow
            className="og-include-exclude"
            label={ `<a href="https://metabox.io/plugins/meta-box-include-exclude/" target="_blank" rel="noopener norefferer">${ __( 'Advanced location conditions', 'meta-box-builder' ) }</a>` }
            tooltip={ __( 'More conditions on where to display the field group.', 'meta-box-builder' ) }
        >
            { conditions.length > 0 && <Intro /> }
            {
                conditions.map( ( condition, index ) => <Condition
                    fieldId={ fieldId }
                    conditionIdList={ list }
                    key={ condition.id }
                    condition={ condition }
                    baseName={ `${ name }[${ index }]` }
                    removeCondition={ removeCondition }
                /> )
            }
            <button type="button" className="button" onClick={ addCondition }>{ __( '+ Add Condition', 'meta-box-builder' ) }</button>
        </DivRow>
    );
};

const Intro = ( { name } ) => {
    const { register } = useFormContext();

    return (
        <div className="og-include-exclude__intro">
            <select name={ `${ name }[type]` } ref={ register }>
                <option value="show">{ __( 'Show', 'meta-box-builder' ) }</option>
                <option value="hide">{ __( 'Hide', 'meta-box-builder' ) }</option>
            </select>
            { __( 'when', 'meta-box-builder' ) }
            <select name={ `${ name }[relation]` } ref={ register }>
                <option value="OR">{ __( 'any', 'meta-box-builder' ) }</option>
                <option value="AND">{ __( 'all', 'meta-box-builder' ) }</option>
            </select>
            { __( 'conditions match', 'meta-box-builder' ) }
        </div>
    );
};

const Condition = ( { condition, baseName, removeCondition, conditionIdList } ) => {
    const { register } = useFormContext();

    return (
        <div className="og-include-exclude__rule og-attribute">
            <select className="og-include-exclude__value" name={ `${ baseName }[fieldId]` } ref={ register }>
                {
                    conditionIdList.map( item => (
                        <option value={ item } key={ item }>{ item }</option>
                    ) )
                }
            </select>
            <select name={ `${ baseName }[condition]` } className="og-include-exclude__name" ref={ register } defaultValue={ name } >
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
            <input type="text" placeholder={ __( 'Enter a value', 'meta-box-builder' ) } style={ { width: 120, height: 30 } } ref={ register } name={ `${ baseName }[value]` } defaultValue={ condition.value } />
            <button type="button" className="og-remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => removeCondition( condition.id ) }><Dashicon icon="dismiss" /></button>
        </div>
    );
};

export default ConditionalLogic;