import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';
import StoryItem from './history/story-item';
import './profile.scss';

const Profile = () => {
  const {userId} = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [form, setForm] = useState({
    email:'', 
    password:'',
    gender: '',
    fullName: '',
    age: null
  });

  useEffect(() => {
    axios.get(`/api/profile/get/${userId}`, userId, {headers: {contentType: 'application/json'}})
    .then(response => {
      setForm({
        email: response.data.email, 
        password: response.data.password, 
        gender: response.data.gender, 
        fullName: response.data.fullName, 
        age: response.data.age
      })

      console.log(response.data)

      axios.get(`/api/profile/history`, {params: {cart: response.data.cart}}, {headers: {contentType: 'application/json'}})
      .then(resp => {
        setCart(resp.data)
      })

      setIsLoaded(true)
    })
  }, [userId]);

  const changeInputHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const changeProfile = useCallback(async () => {
    try {
      await axios.put(`api/profile/change/${userId}/`, {userId, ...form},
      {
        headers: {'Content-Type': 'application/json'}
      })
      .then(() => {
        statusHandler('done')
      })
    } catch (error) {
      statusHandler('error')
    }
  }, [userId, form])

  function statusHandler(status) {
    setFormStatus(status)

    setTimeout(() => {
      setFormStatus('')
    }, 4000)
  }

  return (
    <div className="profile">
      { isLoaded ?
      <React.Fragment>
        <h2>Профиль</h2>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form__input-field">
            <label htmlFor="fullName">Имя</label>
            <input type="text" name="fullName" onChange={ e => changeInputHandler(e) } value={form.fullName}/>
          </div>
          <div className="form__input-field">
            <label htmlFor="age">Возраст</label>
            <input type="number" name="age" onChange={ e => changeInputHandler(e) } value={form.age}/>
          </div>
          <div className="form__input-field">
            <label htmlFor="gender">Пол</label>
            <select type="text" name="gender" defaultValue={form.gender} onChange={ e => changeInputHandler(e) }>
              <option value="male">Муж</option>
              <option value="female">Жен</option>
            </select>
          </div>
          <div className="form__input-field">
            <label htmlFor="email">Почта</label>
            <input type="email" name="email" onChange={ e => changeInputHandler(e) } value={form.email}/>
          </div>
          <div className="form__input-field">
            <label htmlFor="password">Пароль</label>
            <input type="password" name="password" onChange={ e => changeInputHandler(e) }/>
          </div>
          <div className="form__submit-field">
            <button type='submit' onClick={changeProfile}>Применить</button>
            { formStatus === 'done' ? <span className="form__submit-field__done">Готово!</span> : false }
            { formStatus === 'error' ? <span className="form__submit-field__error">Ошибка!</span> : false }
          </div>
        </form>

        <div className="profile__story">
          <h3>История покупок</h3>
          <div className="profile__story-items">
            {
            cart.length 
            ?
            cart.map(item => {
              return <StoryItem key={item._id} data={item}/>
            })
            : 
            'Вы ещё не покупали товары'
            }
          </div>
        </div>
      </React.Fragment>
      : false }
    </div>
  )
}

export default Profile
