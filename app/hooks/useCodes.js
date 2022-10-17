import { useEffect, useState } from "@wordpress/element";
import dotProp from "dot-prop";
import { getFieldValue, request, ucwords } from "../functions";

export const useCodes = ( field ) => {
    const type = jQuery( `#fields-${ field._id }-type` ).val();
    if ( type === undefined ) return '';

    const [ settings, setSettings ] = useState( MbbApp.settings );
    const [ value, setValue ] = useState( '' );

    useEffect( () => {
        // Change Setting location
        jQuery( '#react-tabs-3 #settings-object_type' ).on( 'change', () => {
            setSettings( getFieldValue( 'settings' ) );
        } );
        // End Change Setting location

        //Get params fields
        const params = [];
        let object_id = '';
        const object_type = settings.object_type;
        switch ( object_type ) {
            case "setting":
                params.push( "'object_type' => 'setting'" );
                object_id = dotProp.get( settings, "settings_pages.0", "" );
                break;
            case "term":
                params.push( "'object_type' => 'term'" );
                object_id = dotProp.get( settings, "taxonomies.0", "" );
                break;
            case "comment":
                params.push( "'object_type' => 'comment'" );
                break;
        }
        //End get params fields.

        //Generate theme code
        request( 'theme-code-generate', {
            field: JSON.stringify( field ),
            type: ucwords( type ),
            object_id,
            object_type,
            params
        }, 'POST' ).then( setValue );
        //End Generate theme code
    }, [ settings ] );

    return value;
};