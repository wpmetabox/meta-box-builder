import React, { useState, useEffect } from 'react';
import FieldMenu from './FieldMenu';
import FieldSelected from './FieldSelected';
import { fields } from '../../../../constants/constants';
import { getDataCopiedItem, updateSelectedList, getSelectedList } from '../../../../utility/functions';
import SearchResultList from './SearchResultList';
import Node from './Node';
import List from './List';

const FieldsTab = (props) => {
  const [selectedList, setSelectedList] = useState({ id: "root", items: [] });
  const [searchParam, setSearchParam] = useState('');

  useEffect(() => {
    updateSelectedList(selectedList)
    return
  }, [selectedList])

  const addItem = (type) => {
    const id = `${type}_${uniqid()}`
    const data = {
      ...fields[type],
      general: { ...fields[type].general, id },
    };
    setSelectedList({ ...selectedList, items: [...selectedList.items, { id, type, data, items: [] }] });
  };

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
    const index = newList.map(item => item.data.general.id).indexOf(id);
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

  const changeSelectedList = () => {
    const newSelectedList = getSelectedList();
    setSelectedList(newSelectedList);
  }

  console.log('zzz', selectedList)

  return (
    <div className="og-fields-wrapper">
      <div className="og-sidebar">
        <input
          type="search"
          className="og-search"
          placeholder="Enter field type here"
          onChange={(e) => setSearchParam(e.target.value)}
        />
        {
          searchParam
            ? <SearchResultList onSelectField={addItem} searchParam={searchParam} />
            : <FieldMenu onSelectField={addItem} />
        }
      </div>

      <div className="og-main">
        {selectedList.items.length === 0 && <p>No fields. Select fields on the left to add them to this field group.</p>}
        <List id={selectedList.id} items={selectedList.items} changeSelectedList={changeSelectedList} />
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