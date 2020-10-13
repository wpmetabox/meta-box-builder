import React, { useState } from 'react';
import AdvancedAdditionalItem from './AdvancedAdditionalItem.js';

const Attributes = props => {
  const [list, setList] = useState([]);
  const removeItem = id => {
    setList(prevList => prevList.filter(item => item.unixId !== id));
  }

  return (
    <div className="og-attributes">
      <h4><a href="https://docs.metabox.io/extensions/meta-box-builder/#custom-attributes" target="_blank" rel="noreferrer noopener">Custom attributes</a></h4>
      {
        list.map((item, index) => (
          <AdvancedAdditionalItem data={item} key={item.unixId} index={index} removeItem={removeItem} name={`fields-${props.index}`} type='attributes' />
        ))
      }
      <button type="button" className="button" onClick={() => setList(prevList => prevList.concat({ key: '', label: '', unixId: Math.random().toString(36).slice(-5) }))}>+ Add Attribute</button>
    </div>
  )
}

export default Attributes;