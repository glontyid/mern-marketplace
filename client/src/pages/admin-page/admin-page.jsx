import React, { useState, useCallback } from "react";
import axios from 'axios';
import './admin-page.scss';
import { useDispatch } from "react-redux";
import { addToDB } from "../../redux/actions";

const AdminPage = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    id:'', 
    title:'',
    price: 0,
    oldPrice: 0,
    description:'',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0,
    }
  });

  const changeInputHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const sumbitHandler = useCallback(async () => {
    try {
      await axios.post('/api/admin/add', {...form},
      {
        headers: {'Content-Type': 'application/json'}
      })
      .then(resp => {
        dispatch(addToDB(form))
      })
    } catch (error) {
      console.log(error)
    }
  }, [form])

  return(
    <div className="admin-page">
      <form className="admin-page__form" onSubmit={(e) => e.preventDefault()}>
        <div className="admin-page__form-input-wrapper">
          <label htmlFor="id">id</label>
          <input type="text" id="id" name="id" onChange={ e => changeInputHandler(e) } />
        </div>
        <div className="admin-page__form-input-wrapper">
          <label htmlFor="id">title</label>
          <input type="text" id="id" name="title" onChange={ e => changeInputHandler(e) } />
        </div>
        <div className="admin-page__form-input-wrapper">
          <label htmlFor="price">price</label>
          <input type="number" id="price" name="price" onChange={ e => changeInputHandler(e) } />
        </div>
        <div className="admin-page__form-input-wrapper">
          <label htmlFor="oldPrice">oldPrice</label>
          <input type="number" id="oldPrice" name="oldPrice" onChange={ e => changeInputHandler(e) } />
        </div>
        <div className="admin-page__form-input-wrapper">
          <label htmlFor="description">description</label>
          <input type="text" id="description" name="description" onChange={ e => changeInputHandler(e) } />
        </div>
        <div className="admin-page__form-input-wrapper">
          <label htmlFor="category">category</label>
          <input type="text" id="category" name="category" onChange={ e => changeInputHandler(e) } />
        </div>
        <div className="admin-page__form-input-wrapper">
          <label htmlFor="image">image</label>
          <input type="text" id="image" name="image" onChange={ e => changeInputHandler(e) } />
        </div>
        <button type="submit" className="admin-page__form-submit" onClick={sumbitHandler}>Добавить</button>
      </form>
    </div>
  )
}

export default AdminPage;