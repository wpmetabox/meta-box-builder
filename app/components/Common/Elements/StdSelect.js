import React, {useState,useEffect} from 'react';
import Select from '../Select';
import {fields} from '../../../constants/constants'

const StdSelect = props => {
    const rootApiPath = MbbApp.rest + '/wp/v2/'
    const [options, setOptions] = useState([])
  
    // const idPostValue = props.name.replace('std','post_type')
    // const value = getValueById(idPostValue)
    // const getValueById = (id) => {
    //     const e = document.getElementById(id)
    //     console.log('eeee',e)
    //     if(e){
    //         return e.options[e.selectedIndex].value
    //     }

    //     return
    // }
    console.log('mmm',MbbApp)
    
    useEffect(() => {
          // isUser field
        let path = 'users' 
        if(props.type === fields.taxonomy.general.type || props.type === fields.taxonomy_advanced.general.type){
            path = MbbApp.taxonomies[0].slug
        }
        if(props.type === fields.post.general.type){
            path = MbbApp.postTypes[0].slug
        }
        fetch(`${rootApiPath}${path}`).then(res => res.json()).then(data => setOptions(data) )
        return () => {
        }
    }, [])
    return <Select {...props} options={options} label="Default value" />
} 
export default StdSelect;