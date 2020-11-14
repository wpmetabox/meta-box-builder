import { useFormContext } from 'react-hook-form';
import { Context } from '../../context/ConditionalList/ConditionalContext';
import { uniqid } from '../../utility/functions';
import DivRow from '../Common/DivRow';

const { useState, useContext, useEffect } = wp.element;
const { Dashicon } = wp.components;
const { __ } = wp.i18n;

const ConditionalLogic = ( {
    defaultValue,
    name,
    componentId
} ) => {
    const [ conditions, setConditions ] = useState( defaultValue?.list || [] );
    const [ list, setList ] = useState( [] );
    const state = useContext( Context );

    useEffect( () => {
        setList( Object.values( state ).map( item => `${ item.label } ( ${ item.id } )` ) );
    }, [ state ] );


    const addCondition = () => {
        setConditions( prevConditions => prevConditions.concat( { name: 'ID', value: '', id: uniqid() } ) );
    };
    const removeCondition = id => setConditions( prevConditions => prevConditions.filter( conditon => conditon.id !== id ) );

    return (
        <DivRow
            className="og-include-exclude"
            label={ `<a href="https://metabox.io/plugins/meta-box-include-exclude/" target="_blank" rel="noopener norefferer">${ __( 'Advanced location conditions', 'meta-box-builder' ) }</a>` }
            tooltip={ __( 'More conditions on where to display the field group.', 'meta-box-builder' ) }
        >
            { conditions.length > 0 && <Intro id={ componentId } name={ name } defaultValue={ defaultValue } /> }
            {
                conditions.map( ( condition, index ) => <Condition
                    id={ `${ componentId }-${ index }` }
                    conditionIdList={ list }
                    defaultValue={ defaultValue?.list && defaultValue?.list[ index ] || {} }
                    key={ condition.id }
                    condition={ condition }
                    baseName={ `${ name }[logic][${ index }]` }
                    removeCondition={ removeCondition }
                /> )
            }
            <input type='hidden' id={ componentId } value={ conditions.length } />
            <button type="button" className="button" onClick={ addCondition }>{ __( '+ Add Condition', 'meta-box-builder' ) }</button>
        </DivRow>
    );
};

const Intro = ( { name, id, defaultValue } ) => {
    const { register } = useFormContext();

    return (
        <div className="og-include-exclude__intro">
            <select defaultValue={ defaultValue?.type || 'show' } id={ `${ id }-type` } name={ `${ name }[type]` } ref={ register }>
                <option value="show">{ __( 'Show', 'meta-box-builder' ) }</option>
                <option value="hide">{ __( 'Hide', 'meta-box-builder' ) }</option>
            </select>
            { __( 'when', 'meta-box-builder' ) }
            <select defaultValue={ defaultValue?.type || 'OR' } id={ `${ id }-relation` } name={ `${ name }[relation]` } ref={ register }>
                <option value="OR">{ __( 'any', 'meta-box-builder' ) }</option>
                <option value="AND">{ __( 'all', 'meta-box-builder' ) }</option>
            </select>
            { __( 'conditions match', 'meta-box-builder' ) }
        </div>
    );
};


const Condition = ( { condition, baseName, removeCondition, conditionIdList, id, defaultValue } ) => {
    const { register } = useFormContext();

    return (
        <div className="og-include-exclude__rule og-attribute">
            <select defaultValue={ defaultValue.name || conditionIdList[ 0 ] } id={ `${ id }-name` } className="og-include-exclude__value" name={ `${ baseName }[name]` } ref={ register }>
                {
                    conditionIdList.map( item => (
                        <option value={ item } key={ item }>{ item }</option>
                    ) )
                }
            </select>
            <select defaultValue={ defaultValue.operator || '=' } id={ `${ id }-operator` } name={ `${ baseName }[operator]` } className="og-include-exclude__name" ref={ register } defaultValue={ name } >
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
            <input defaultValue={ defaultValue.value || '' } id={ `${ id }-value` } type="text" placeholder={ __( 'Enter a value', 'meta-box-builder' ) } style={ { width: 120, height: 30 } } ref={ register } name={ `${ baseName }[value]` } defaultValue={ condition.value } />
            <button type="button" className="og-remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => removeCondition( condition.id ) }><Dashicon icon="dismiss" /></button>
        </div>
    );
};

export default ConditionalLogic;