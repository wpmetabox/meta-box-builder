import React, { useState } from 'react';
import AdvancedAdditionalItem from './AdvancedAdditionalItem.js';

const Attributes = props => {
  const [list, setList] = useState([]);
  const removeItem = index => {
    let newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  }

  return (
    <div className="og-attributes">
      <h4><a href="https://docs.metabox.io/extensions/meta-box-builder/#custom-attributes" target="_blank" rel="noreferrer noopener">Custom attributes</a></h4>
      {
        list.map((item, index) => (
          <AdvancedAdditionalItem data={item} key={index} index={index} removeItem={removeItem} register={props.register} name={`fields-${props.index}`} type='attributes' />
        ))
      }
      <button type="button" onClick={() => setList(list.concat({ key: '', label: '' }))}>+ Add Attribute</button>
    </div>
  )
}

export default Attributes;