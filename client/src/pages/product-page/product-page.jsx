import React from 'react';
import Product from '../../components/product/product';
import AsideMenu from '../../components/aside/aside-menu';
import './product-page.scss';

const ProductPage = ({product, products}) => {
  return (
    <div className="product-page">
      <AsideMenu products={products} />
      <Product data={product} />
    </div>
  )
}

export default ProductPage;