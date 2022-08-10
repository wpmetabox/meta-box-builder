import { useEffect, useState } from "@wordpress/element";
import dotProp from "dot-prop";

export const useCodes = ( field, settings ) => {
    const [ value, setValue ] = useState( `<?php rwmb_the_value( '${field.id}' ) ?>` );
    useEffect( ( ) => {
        if( settings.object_type === "setting" ) {
            const settings_page = dotProp.get( settings, "settings_pages.0", "" );

            setValue(
                `<?php \n\t $value = rwmb_meta( '${field.id}', ['object_type' => 'setting'], '${settings_page}'); \n\t echo $value; \n ?>`
            );
        }
    }, [ settings ] );

    return value;
}