import React, { useState, useCallback, memo } from 'react';
import FieldMenu from './FieldsTab/FieldMenu';
import { fields } from '../../constants/constants';
import {
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
            selectedList.items.map((item, index) => (
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

export default memo(FieldsTab);
