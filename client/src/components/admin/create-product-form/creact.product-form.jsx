import React, { useState, useCallback, useId } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import './create-product-form.scss';
import { addToDB } from "../../../redux/actions";
import { adminFormValidator } from "../../../helpers/helpers";

const CreateProductForm = () => {
  const [formStatus, setFormStatus] = useState(false);
  const dispatch = useDispatch();
  const id = useId();
  const defaultForm = {
    id: id, 
    title: '',
    price: 0,
    oldPrice: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0,
    }
  }
  const [form, setForm] = useState(defaultForm);
  let validForm = adminFormValidator(form.title, form.category, form.price, form.description, form.image);

  const changeInputHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const sumbitHandler = useCallback(async () => {
    if (validForm) {
        try {
        await axios.post('/api/admin/add', {...form},
        {
          headers: {'Content-Type': 'application/json'}
        })
        .then(resp => {
          dispatch(addToDB(form))
          statusHandler('done')
        })
      } catch (error) {
        statusHandler(error)
        console.log(error)
      }
    } else {
      statusHandler('error')
    }
  }, [form, dispatch])

  function statusHandler(status) {
    setFormStatus(status)

    if (status === 'done') {
      setForm(defaultForm)
    }

    setTimeout(() => {
      setFormStatus('')
    }, 4000)
  }


  return (
    <form className="admin-page__form" onSubmit={(e) => e.preventDefault()}>
      <h2>Добавить новый товар</h2>
      <div className="admin-page__form-input-wrapper">
        <label htmlFor="title">Название</label>
        <input type="text" id="title" name="title" onChange={ e => changeInputHandler(e) } placeholder="Рубашка" value={form.title} required/>
      </div>
      <div className="admin-page__form-input-wrapper">
        <label htmlFor="price">Цена</label>
        <input type="number" id="price" name="price" onChange={ e => changeInputHandler(e) } placeholder="250" value={form.price} required/>
      </div>
      <div className="admin-page__form-input-wrapper">
        <label htmlFor="oldPrice">Старая цена</label>
        <input type="number" id="oldPrice" name="oldPrice" onChange={ e => changeInputHandler(e) } placeholder="300" value={form.oldPrice} />
      </div>
      <div className="admin-page__form-input-wrapper">
        <label htmlFor="description">Описание</label>
        <input type="text" id="description" name="description" onChange={ e => changeInputHandler(e) } placeholder="прямиком из турции" value={form.description} required/>
      </div>
      <div className="admin-page__form-input-wrapper">
        <label htmlFor="category">Категория</label>
        <input type="text" id="category" name="category" onChange={ e => changeInputHandler(e) } placeholder="Одежда" value={form.category} required/>
      </div>
      <div className="admin-page__form-input-wrapper">
        <label htmlFor="image">Ссылка на изображение</label>
        <input type="text" id="image" name="image" onChange={ e => changeInputHandler(e) } placeholder="https://image.jpg" value={form.image} required/>
      </div>
      <div className="admin-page__form-submit">
        { formStatus === 'done' ? <span className="admin-page__form-submit__done">Готово!</span> : false }
        { formStatus === 'error' ? <span className="admin-page__form-submit__error">Ошибка! Проверьте правильно ли заполнены поля формы.</span> : false }
        <button type="submit" className="admin-page__form-submit__btn" onClick={sumbitHandler}>Добавить</button>
      </div>
    </form>
  )
}

export default CreateProductForm