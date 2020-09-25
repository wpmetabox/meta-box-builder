import React, { useState, useEffect, useContext, useCallback } from 'react';
import FieldMenu from './FieldsTab/FieldMenu';
import { fields } from '../../constants/constants';
import {
  getDataCopiedItem,
  updateSelectedList,
} from '../../utility/functions';
import SearchResultList from './FieldsTab/SearchResultList';
import SelectedItem from './FieldsTab/SelectedItem';

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
              <SelectedItem
                key={item.id + index}
                id={"root"}
                item={item}
                index={index}
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
