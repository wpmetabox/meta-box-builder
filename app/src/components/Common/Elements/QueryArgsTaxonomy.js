import React, { useState } from 'react';
import Tooltip from '../Tooltip';
import AdvancedAdditionalItem from './AdvancedAdditionalItem.js';

const QueryArgs = props => {
  const [list, setList] = useState([]);
  const removeItem = index => {
    let newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  }

  return (
    <div className="og-attributes">
      <h4>
        <a href="https://developer.wordpress.org/reference/functions/get_terms/" target="_blank" rel="noreferrer noopener">Query args</a>
        <Tooltip content="Query arguments for getting taxonomy terms. Use the same arguments as get_terms()." />
      </h4>
      {
        list.map((item, index) => (
          <AdvancedAdditionalItem data={item} key={index} index={index} removeItem={removeItem}  name={`fields-${props.index}`} type='query_args' />
        ))
      }
      <button type="button" className="button" onClick={() => setList(list.concat({ key: '', label: '' }))}>+ Add Argument</button>
    </div>
  )
}

export default QueryArgs;