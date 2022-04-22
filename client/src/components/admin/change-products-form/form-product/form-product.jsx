import React from 'react';
import './form-product.scss';

const FormProduct = ({data}) => {
  const {image, category, title, description, price, oldPrice} = data;

  return (
    <form className="form-product" onSubmit={e => e.preventDefault()}>
      <div className="form-product__input-field">
        <div className="form-product__input-field__image">
          <img src={image} alt={title} />
        </div>
        <label className="form-product__input-field" htmlFor="category">Ссылка на изображение</label>
        <input type="text" name="image" defaultValue={data.image} />
      </div>
      <label className="form-product__input-field" htmlFor="category">Категория</label>
      <input type="text" name="category" id="category" defaultValue={category} />
      <label className="form-product__input-field" htmlFor="title">Название</label>
      <input type="text" name="title" id="title" defaultValue={title} />
      <label className="form-product__input-field" htmlFor="description">Описание</label>
      <input type="text" name="description" id="description" defaultValue={description} />
      <label className="form-product__input-field" htmlFor="price">Цена</label>
      <input type="number" name="price" id="price" defaultValue={price} />
      <label className="form-product__input-field" htmlFor="oldPrice">Старая цена</label>
      <input type="number" name="oldPrice" id="oldPrice" defaultValue={oldPrice} />
      <div className="form-product__submit-field">
        <button type="submit" className="form-product__submit-field__complite">Изменить</button>
        <button type="submit" className="form-product__submit-field__delete">Удалить</button>
      </div>
    </form>
  )
}

export default FormProduct;