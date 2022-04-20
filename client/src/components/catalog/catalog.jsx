import React, {useState} from 'react';
import CatalogItem from './catalog-item/catalog-item';
import './catalog.scss';
import Filter from '../filter/filter';
import { unique } from '../../helpers/helpers';

const Catalog = ({products}) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const categories = unique(products.map(item => item.category))

  function productsFilter(category, phrase, sale) {
    setFilteredProducts(
      products
      .filter(item => {
        return category !== 'all' ? item.category.toLowerCase() === category : item
      })
      .filter(item => {
        return phrase.length ? item.title.toLowerCase().indexOf(phrase) > -1 : item
      })
      .filter(item => {
        return sale ? +item.oldPrice > +item.price : item
      })
    )
  }

  return (
    <div className="catalog-wrapper">
      <Filter 
        categories={categories}
        productsFilter={productsFilter}
      />
      <div className="catalog">
        {
        filteredProducts.map((product, index) => {
          return <CatalogItem data={product} key={index}/>
        })
        }
      </div>
    </div>
  )
}

export default Catalog
