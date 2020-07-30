import React, { useState } from 'react';
import AdvancedAdditionalItem from './AdvancedAdditionalItem.js';

const JsOptions = props => {
    const [list, setList] = useState([]);
    const removeItem = index => {
      let newList = [...list];
      newList.splice(index, 1);
      setList(newList);
    }

    return (
      <div className="og-attributes">
        <h4><a href="https://select2.org/configuration" target="_blank" rel="noreferrer noopener">Select2 options</a></h4>
        {
          list.map((item, index) => (
            <AdvancedAdditionalItem data={item} key={index} index={index} removeItem={removeItem} register={props.register} name={`fields-${props.index}`} type='js_options' />
          ))
        }
        <button type="button" onClick={() => setList(list.concat({ key: '', label: '' }))}>+ Add Option</button>
      </div>
    )
}
export default JsOptions;