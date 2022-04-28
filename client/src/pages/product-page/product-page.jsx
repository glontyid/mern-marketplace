import React from 'react';
import Product from '../../components/product/product';
import AsideMenu from '../../components/aside/aside-menu';
import './product-page.scss';

const ProductPage = ({products}) => {
  return (
    <div className="product-page">
      <AsideMenu products={products} />
      <Product />
    </div>
  )
}

export default ProductPage;