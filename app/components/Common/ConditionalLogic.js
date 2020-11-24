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
    const handleDefaultValues = () => {
        return defaultValue?.rules?.map( item => ( { ...item, id: uniqid() } ) );
    };
    const [ conditions, setConditions ] = useState( handleDefaultValues() || [] );
    const [ listId, setListId ] = useState( [] );
    const state = useContext( Context );

    useEffect( () => {
        setListId( Object.values( state ).map( item => item.label ? `${ item.label } ( ${ item.id } )` : item.id ) );
    }, [ state ] );


    const addCondition = () => {
        setConditions( prevConditions => prevConditions.concat( { name: 'ID', value: '', id: uniqid() } ) );
    };
    const removeCondition = id => setConditions( prevConditions => prevConditions.filter( conditon => conditon.id !== id ) );

    return (
        <DivRow
            className="og-field"
            label={ `<a href="https://docs.metabox.io/extensions/meta-box-conditional-logic/" target="_blank" rel="noopener norefferer">${ __( 'Conditional Logic', 'meta-box-builder' ) }</a>` }
            tooltip={ __( 'Show hide the field based on other field value.', 'meta-box-builder' ) }
        >
            { conditions.length > 0 && <Intro id={ componentId } name={ name } defaultValue={ defaultValue } /> }
            {
                conditions.map( ( condition ) => <Condition
                    id={ `${ componentId }-rules-${ condition.id }` }
                    conditionIdList={ listId }
                    key={ condition.id }
                    condition={ condition }
                    baseName={ `${ name }[rules][${ condition.id }]` }
                    removeCondition={ removeCondition }
                /> )
            }
            <input type='hidden' id={ componentId } value={ JSON.stringify( conditions ) } />
            <button type="button" className="button" onClick={ addCondition }>{ __( '+ Add Condition', 'meta-box-builder' ) }</button>
        </DivRow>
    );
};

const Intro = ( { name, id, defaultValue } ) => {
    const { register } = useFormContext();

    return (
        <div className="og-include-exclude__intro">
            <select defaultValue={ defaultValue?.type || 'show' } id={ `${ id }-type` } name={ `${ name }[type]` } ref={ register } style={ { width: 'auto' } }>
                <option value="show">{ __( 'Show', 'meta-box-builder' ) }</option>
                <option value="hide">{ __( 'Hide', 'meta-box-builder' ) }</option>
            </select>
            { __( 'when', 'meta-box-builder' ) }
            <select defaultValue={ defaultValue?.relation || 'OR' } id={ `${ id }-relation` } name={ `${ name }[relation]` } ref={ register } style={ { width: 'auto' } } >
                <option value="OR">{ __( 'any', 'meta-box-builder' ) }</option>
                <option value="AND">{ __( 'all', 'meta-box-builder' ) }</option>
            </select>
            { __( 'conditions match', 'meta-box-builder' ) }
        </div>
    );
};


const Condition = ( { condition, baseName, removeCondition, conditionIdList, id } ) => {
    const { register } = useFormContext();
    return (
        <div className="og-include-exclude__rule og-attribute">
            <select defaultValue={ condition.name || conditionIdList[ 0 ] } id={ `${ id }-name` } className="og-include-exclude__value" name={ `${ baseName }[name]` } ref={ register }>
                {
                    conditionIdList.map( item => (
                        <option value={ item } key={ item }>{ item }</option>
                    ) )
                }
            </select>
            <select defaultValue={ condition.operator || '=' } id={ `${ id }-operator` } name={ `${ baseName }[operator]` } className="og-include-exclude__name" ref={ register }  >
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
            <input defaultValue={ condition.value || '' } id={ `${ id }-value` } type="text" placeholder={ __( 'Enter a value', 'meta-box-builder' ) } style={ { width: 120, height: 30 } } ref={ register } name={ `${ baseName }[value]` } />
            <button type="button" className="og-remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => removeCondition( condition.id ) }><Dashicon icon="dismiss" /></button>
        </div>
    );
};

export default ConditionalLogic;