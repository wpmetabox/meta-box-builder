import { useFormContext } from "react-hook-form";
import DivRow from "./DivRow";

const { useState, useEffect } = wp.element;

const ConditionalLogic = ( { name, label, type, className, defaultValue, ...rest } ) => {
    const [ value, setValue ] = useState( defaultValue );

    useEffect( () => {
        if ( defaultValue ) {
            document.getElementById( name ).closest( '.og-item' ).querySelectorAll( `.${ rest.setting }-setting` ).forEach( item => item.style.display = 'flex' );
        }

    }, [ defaultValue ] );

    const toggleSettings = e => {
        if ( !rest.setting ) {
            return;
        }

        const displayValue = value ? 'none' : 'flex';
        e.target.closest( '.og-item' ).querySelectorAll( `.${ rest.setting }-setting` ).forEach( item => item.style.display = displayValue );
        setValue( prev => !prev );
    };

    const { register } = useFormContext();
    return <DivRow label={ label } className={ className } htmlFor={ name } { ...rest }>
        <input type="checkbox" id={ name } name={ name } onClick={ toggleSettings } ref={ register } defaultChecked={ defaultValue } />
    </DivRow>;
};
export default ConditionalLogic;