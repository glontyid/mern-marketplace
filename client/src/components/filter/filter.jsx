import React, {useState, useRef} from "react";
import './filter.scss';

const Filter = ({categories, productsFilter}) => {
  const [category, setCategory] = useState('all');
  const [searchPhrase, setSearchPhrase] = useState('');
  const searchInput = useRef(null);
  const checkbox = useRef(null);
  const select = useRef(null);

  function searchHandler() {
    setSearchPhrase(searchInput.current.value);
    productsFilter(category, searchInput.current.value, checkbox.current.checked)
  }

  function saleHandler() {
    productsFilter(category, searchInput.current.value, checkbox.current.checked)
  }

  function categoryHandler(option) {
    setCategory(option)
    productsFilter(option, searchInput.current.value, checkbox.current.checked)
  }

  return (
    <div className="filter">
      <div className="filter__category">
        <select onChange={e => categoryHandler(e.target.value)} ref={select}>
          <option value="all" defaultValue="all">all</option>
          {categories.map(category => <option value={category} key={category}>{category}</option>)}
        </select>
      </div>
      <div className="filter__search">
        <input type="text" ref={searchInput} placeholder="Поиск" onChange={() => searchHandler()} value={searchPhrase}/>
      </div>
      <div className="filter__sale">
        <input className="filter__sale-checkbox" type="checkbox" ref={checkbox} name="sale" id="sale" onChange={ e => saleHandler(e.target.checked) }/>
        <label htmlFor="sale">Товары со скидкой</label>
      </div>
    </div>
  )
}

export default Filter;