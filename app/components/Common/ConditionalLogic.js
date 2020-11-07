import { useFormContext } from 'react-hook-form';
import { uniqid } from '../../utility/functions';
import DivRow from './DivRow';
import Select from './Select';

const { useState } = wp.element;
const { __ } = wp.i18n;
const { Dashicon } = wp.components;

const ConditionalLogic = ( {
    defaultValue,
    label,
    name,
    link = '',
    tooltip = '',
    keyPlaceholder = __( 'Select or enter a field', 'meta-box-builder' ),
    valuePlaceholder = __( 'Enter value', 'meta-box-builder' ),
} ) => {
    const [ list, setList ] = useState( defaultValue || [] );
    console.log( 'lll', list );
    const removeItem = id => setList( prevList => prevList.filter( item => item.uniqId !== id ) );
    if ( link ) {
        label = `<a href="${ link }" target="_blank" rel="noreferrer noopener">${ label }</a>`;
    }

    if ( !MbbApp.extensions.conditionalLogic ) {
        return null;
    }

    return (
        <DivRow label={ label } tooltip={ tooltip }>
            {
                list.map( ( item, i ) => (
                    <Item
                        key={ item.uniqId }
                        item={ item }
                        removeItem={ removeItem }
                        name={ name === 'custom_setting' ? `${ name }[${ i }]` : `${ name }-${ i }` }
                        keyPlaceholder={ keyPlaceholder }
                        valuePlaceholder={ valuePlaceholder }
                    />
                ) )
            }
            <input type='hidden' id={ name } name={ name } value={ list.length } />
            <button type="button" className="button" onClick={ () => setList( prevList => prevList.concat( { key: '', value: '', uniqId: uniqid() } ) ) }>{ __( '+ Add Rule', 'meta-box-builder' ) }</button>
        </DivRow>
    );
};

const Item = ( { name, item, removeItem, keyPlaceholder, valuePlaceholder } ) => {
    const { register } = useFormContext();


    return (
        <div className="og-conditional-logic">
            <div style={ { display: 'flex' } }>
                <Select
                    style={ { width: 90 } }
                    name={ `${ name }-visibility` }
                    options={
                        {
                            visible: "Visible",
                            hidden: "Hidden"
                        }
                    }
                    defaultValue="visible"
                />
                <span>when</span>
                <Select
                    style={ { width: 60 } }
                    name={ `${ name }-relation` }
                    options={ {
                        all: "All",
                        any: "Any",
                    } }
                    defaultValue="all"
                />
                <span>of these conditions match</span>
            </div>
            <div style={ { display: 'flex' } }>
                <Select
                    style={ { width: 180 } }
                    name={ `${ name }-fieldId` }
                    options={ { id: "All" } }
                    placeholder="Select or enter a field"
                    defaultValue=""
                />
                <Select
                    style={ { width: 90 } }
                    name={ `${ name }-condition` }
                    options={ {
                        equal: "=",
                        greater: ">",
                        smaller: "<",
                        eqGreater: ">=",
                        eqSmaller: "<=",
                        diff: "!=",
                        contain: "contains",
                        notContain: "not contains",
                        startWith: "starts with",
                        notStartWidth: "not starts with",
                        endWidth: "ends with",
                        notEndWidth: "ends with",
                        between: "between",
                        notBetween: "not between",
                        in: "in",
                        notIn: "not in",
                        match: "match",
                        notMatch: "not match",
                    } }
                    defaultValue="equal"
                />
                <input type="text" placeholder={ valuePlaceholder } style={ { width: 120, height: 30 } } ref={ register } name={ `${ name }-value` } defaultValue={ item.value } />
                <button style={ { height: 30 } } type="button" className="og-remove" title={ __( 'Remove', 'meta-box-builder' ) } onClick={ () => removeItem( item.uniqId ) }><Dashicon icon="dismiss" /></button>
            </div>

        </div>
    );
};

export default ConditionalLogic;