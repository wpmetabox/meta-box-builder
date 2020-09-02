import React, { useState } from 'react';
import AdvancedAdditionalItem from './AdvancedAdditionalItem.js';

const OptionsWysiwyg= props => {
  const [list, setList] = useState([]);
  const removeItem = index => {
    let newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  }

  return (
    <div className="og-attributes">
      <h4><a href="https://developer.wordpress.org/reference/functions/wp_editor/" target="_blank" rel="noopener noreferrer">Editor options</a></h4>
      {
        list.map((item, index) => (
          <AdvancedAdditionalItem data={item} key={index} index={index} removeItem={removeItem}  name={`fields-${props.index}`} type='options' />
        ))
      }
      <button type="button" onClick={() => setList(list.concat({ key: '', label: '' }))}>+ Add Input</button>
    </div>
  )
}
export default OptionsWysiwyg;