import React from 'react';
import './change-products-form.scss';
import FormProduct from './form-product/form-product';

const ChangeProductsForm = ({products}) => {
  return (
    <React.Fragment>
      <h2>Редактировать / удалить товар</h2>
      <div className="change-products-form">
        {products.map((product, index) => <FormProduct data={product} key={index} />)}
      </div>
    </React.Fragment>
  )
}

export default ChangeProductsForm;