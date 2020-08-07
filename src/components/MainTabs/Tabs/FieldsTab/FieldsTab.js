import React, { useState, useEffect, useContext, useCallback } from 'react';
import FieldMenu from './FieldMenu';
import { fields } from '../../../../constants/constants';
import {
  getDataCopiedItem,
  updateSelectedList,
} from '../../../../utility/functions';
import SearchResultList from './SearchResultList';
import SelectedList from './SelectedList';

const FieldsTab = (props) => {
  const [selectedList, setSelectedList] = useState({ id: 'root', items: [] });
  const [searchParam, setSearchParam] = useState('');

  const addItem = (type) => {
    const id = `${type}_${uniqid()}`;
    const data = {
      ...fields[type],
      general: { ...fields[type].general, id },
    };
    const newList = {
      ...selectedList,
      items: [...selectedList.items, { id, type, data, items: [] }],
    }
    setSelectedList(newList);
    updateSelectedList(newList);
  };

  // useEffect(() => {
  //  setSelectedList(state.tree);
  // }, [state.updatedTime])

  const changeSelectedList = useCallback(params => setSelectedList(params), []);

  const removeItem = (id) => {
    let newList = [...selectedList];
    const index = newList.map((item) => item.data.general.id).indexOf(id);
    newList.splice(index, 1);
    setSelectedList(newList);
  };

  const copyItem = (type, id) => {
    let item = { type };
    item.data = getDataCopiedItem(type, id);
    if (item.data.general.id !== undefined) {
      item.data.general.id += `_${uniqid()}`;
    }
    if (item.data.general.name !== undefined) {
      item.data.general.name += ' Copy';
    }
    let newList = [...selectedList];
    const index = newList.map((item) => item.data.general.id).indexOf(id);
    newList.splice(index + 1, 0, item);
    setSelectedList(newList);
  };

  const changePosition = (id, direction) => {
    let newList = [...selectedList];
    const index = newList.map((item) => item.data.general.id).indexOf(id);
    const itemChange = newList[index];
    if (direction === 'up') {
      if (0 === index) {
        return;
      }
      newList[index] = newList[index - 1];
      newList[index - 1] = itemChange;
    } else {
      if (index === selectedList.length - 1) {
        return;
      }
      newList[index] = newList[index + 1];
      newList[index + 1] = itemChange;
    }

    setSelectedList(newList);
  };

  console.log('zzzz', selectedList)


  return (
    <div className="og-fields-wrapper">
      <div className="og-sidebar">
        <input
          type="search"
          className="og-search"
          placeholder="Enter field type here"
          onChange={(e) => setSearchParam(e.target.value)}
        />
        {searchParam ? (
          <SearchResultList onSelectField={addItem} searchParam={searchParam} />
        ) : (
            <FieldMenu onSelectField={addItem} />
          )}
      </div>

      <div className="og-main">
        {selectedList.items.length === 0 && (
          <p>
            No fields. Select fields on the left to add them to this field
            group.
          </p>
        )}
        <ul>
          {
            selectedList.items.map((item,index) => (
              <SelectedList
                key={item.id}
                id={"root"}
                item={item}
                index={index}
                register={props.register}
                changeSelectedList={changeSelectedList}
              />
            ))
          }
        </ul>
      </div>
    </div>
  );
};

const uniqid = () => Math.random().toString(36).substr(2);

export default FieldsTab;

// map((item) => (
//   <FieldSelected
//     register={props.register}
//     data={item.data}
//     key={item.data.general.id}
//     index={item.data.general.id}
//     removeItem={removeItem}
//     copyItem={copyItem}
//     changePosition={changePosition}
//   />
// ))
