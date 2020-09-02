import React from 'react';
import { fieldTypes } from '../../../../constants/constants';

const SearchResultList = (props) => {
  const getSearchResult = (param) => {
    let searchResult = [];
    Object.values(fieldTypes).forEach(list => {
      Object.keys(list).forEach(item => {
        if (list[item].toLowerCase().includes(param.toLowerCase())) {
          searchResult.push({ type: item, title: list[item] });
        }
      })
    })

    return searchResult;
  }

  const listItems = getSearchResult(props.searchParam);

  return (
    <div className="og-search-results">
      {listItems.map((item, index) => <button type="button" className="button" onClick={() => props.onSelectField(item.type)} key={index}>{item.title}</button>)}
    </div>
  )
}

export default SearchResultList;