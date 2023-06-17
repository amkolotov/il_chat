import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import './login.scss'
import localstorageHelper from "../../utils/storageHandler";
import {v4} from "uuid";
// import {useAppDispatch} from "../../hooks/useAppDispatch";
// import userActionCreators from "../../store/reducers/userReducer/userActionCreators";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    img: ''
  })
  // const dispatch = useAppDispatch()

  const onChangeHandler = (event) => {
    const name = event.target.getAttribute('name')
    const value = event.target.value

    setFormData(prev => ({
      ...prev,
      [`${name}`]: value
    }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (formData.username) {
      const id = v4()
      localstorageHelper.setMany([
        {key: 'username', value: formData.username},
        {key: 'img', value: formData.img ?? 'empty'},
        {key: 'id', value: id}
      ])
      // dispatch(userActionCreators.logIn({
      //     id,
      //     imageUrl: formData.img,
      //     name: formData.username,
      // }))
      console.log({
        id,
        imageUrl: formData.img,
        name: formData.username,
      })
    } else {
      // dispatch(userActionCreators.logIn({
      //     id: v4(),
      //     imageUrl: '',
      //     name: 'Anonymous',
      // }))
      console.log({
        id: v4(),
        imageUrl: '',
        name: 'Anonymous',
      })
    }
    setFormData({
      username: '',
      img: ''
    })
  }

  useEffect(() => {
    const [username, img, id] = localstorageHelper.getMany(['username', 'img', 'id'])
    if (username && id) {
      // dispatch(userActionCreators.logIn({
      //     name: username,
      //     id,
      //     imageUrl: img === 'empty' ? '' : img
      // }))
      console.log({
        name: username,
        id,
        imageUrl: img === 'empty' ? '' : img
      })
    }

  }, [])

  return (
    <>
    <div className="login-bg"></div>
    <div className='login-wrapper'>
      <div className="login">
        <div className="login__title-wrapper">
          <h1 className="login__title">Авторизация</h1>
        </div>

        <form onSubmit={onSubmit} className='login__form'>
          <div className="mb-3">
            <input type="text" value={formData.username} onChange={onChangeHandler} name='username' placeholder='Логин'
                   className="form-control"/>
          </div>
          <div className="mb-3">
            <input type="password" value={formData.password} onChange={onChangeHandler} name='password'
                   placeholder='Пароль' className="form-control"/>
          </div>
          <button type="submit" className="btn btn-primary">Войти</button>

        </form>
      </div>
    </div>
      </>
  );
};

export default Login;