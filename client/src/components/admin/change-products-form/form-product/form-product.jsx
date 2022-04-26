import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './form-product.scss';
import { useDispatch } from 'react-redux';
import { changeCatalogItem, removeFromDB } from '../../../../redux/actions';

const FormProduct = ({data}) => {
  const dispatch = useDispatch();
  const {_id, id, image, category, title, description, price, oldPrice, rating: {rate, count}} = data;
  const defaultForm = {
    _id: _id,
    id: id,
    title: title,
    price: price,
    oldPrice: oldPrice,
    description: description,
    category: category,
    image: image,
    rating: {
      rate: rate,
      count: count
    }
  }
  const [form, setForm] = useState(defaultForm);
  const [changeBtnStatus, setChangeBtnStatus] = useState(false);
  const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);

  const changeInputHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const deleteProduct = useCallback(async () => {
    const confirmed = window.confirm(`${title} - будет удален, продолжить?`)

    if (confirmed) {
      await axios.delete(`/api/admin/delete/${id}`, {id}, 
      {
        headers: {'Content-Type': 'application/json'}
      }).then(resp => {
        try {
          setDeleteBtnStatus(true)
          dispatch(removeFromDB(id))
        } catch (err) {
          console.log('error:', err)
        }
      })
    }
  }, [])

  const recoverProduct = useCallback(async () => {
    try {
      await axios.post('/api/admin/add', {...form},
      {
        headers: {'Content-Type': 'application/json'}
      })
      .then(resp => {
        setDeleteBtnStatus(false)
      })
    } catch (error) {
      console.log(error)
    }
  }, [form])

  const changeProduct = useCallback(async () => {
    axios.put(`/api/admin/change/${id}`, 
    {id, ...form}, 
    {
      headers: {'Content-Type': 'application/json'}
    }).then(resp => {
      setChangeBtnStatus(true)
      dispatch(changeCatalogItem(form))

      setTimeout(() => {
        setChangeBtnStatus(false)
      }, 4000)
    })
  }, [form])

  return (
    <form className="form-product" onSubmit={e => e.preventDefault()}>
      { deleteBtnStatus ?
      <div className="form-product__deleted">
        <button className="form-product__deleted-btn" onClick={recoverProduct}>Восстановить?</button>
      </div>  
      : null }
      <div className="form-product__input-field">
        <div className="form-product__input-field__image">
          <img src={image} alt={title} />
        </div>
        <label className="form-product__input-field" htmlFor="category">Ссылка на изображение</label>
        <input type="text" name="image" defaultValue={data.image} onChange={e => changeInputHandler(e)} />
      </div>
      <label className="form-product__input-field" htmlFor="category">Категория</label>
      <input type="text" name="category" id="category" defaultValue={category} onChange={e => changeInputHandler(e)} />
      <label className="form-product__input-field" htmlFor="title">Название</label>
      <input type="text" name="title" id="title" defaultValue={title} onChange={e => changeInputHandler(e)} />
      <label className="form-product__input-field" htmlFor="description">Описание</label>
      <input type="text" name="description" id="description" defaultValue={description} onChange={e => changeInputHandler(e)} />
      <label className="form-product__input-field" htmlFor="price">Цена</label>
      <input type="number" name="price" id="price" defaultValue={price} onChange={e => changeInputHandler(e)} />
      <label className="form-product__input-field" htmlFor="oldPrice">Старая цена</label>
      <input type="number" name="oldPrice" id="oldPrice" defaultValue={oldPrice} onChange={e => changeInputHandler(e)} />
      <div className="form-product__submit-field">
        <button type="submit" className="form-product__submit-field__complite" onClick={changeProduct}>{ !changeBtnStatus ? 'Изменить' : 'Готово!'}</button>
        <button type="submit" className="form-product__submit-field__delete" onClick={e => deleteProduct(e)}>Удалить</button>
      </div>
    </form>
  )
}

export default FormProduct;