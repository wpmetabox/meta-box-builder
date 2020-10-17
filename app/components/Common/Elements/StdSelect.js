import React, { useEffect, useState } from 'react';
import { fields } from '../../../constants/constants';
import Select from '../Select';

const StdSelect = props => {
    const rootApiPath = MbbApp.rest + '/wp/v2/';
    const [ options, setOptions ] = useState( [] );

    useEffect( () => {
        // isUser field
        let path = 'users';
        if ( props.type === fields.taxonomy.general.type || props.type === fields.taxonomy_advanced.general.type ) {
            path = MbbApp.taxonomies[ 0 ].slug;
        }
        if ( props.type === fields.post.general.type ) {
            path = MbbApp.postTypes[ 0 ].slug;
        }
        fetch( `${ rootApiPath }${ path }` ).then( res => res.json() ).then( data => setOptions( data ) );
        return () => {
        };
    }, [] );
    return <Select { ...props } options={ options } label="Default value" />;
};
export default StdSelect;