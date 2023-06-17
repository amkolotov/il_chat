import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import './rooms.scss'
import localstorageHelper from "../../utils/storageHandler";
import {v4} from "uuid";
// import {useAppDispatch} from "../../hooks/useAppDispatch";
// import userActionCreators from "../../store/reducers/userReducer/userActionCreators";
import {ReactComponent as ArrowSVG} from '../../img/arrow.svg'
import {ReactComponent as ExitSVG} from '../../img/exit.svg'
import Chat from "../Chat/Chat";

const Rooms = () => {
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

  const [roomId, setRoomId] = useState(0)

  const choiceRoom = (roomId) => {
    setRoomId(roomId)
  }

  return (
    <>
      {roomId
        ? <Chat/>
        : <>
          <div className='rooms-wrapper'>
            <div className="rooms-exit">
              <ExitSVG/>
            </div>
            <div className="rooms">
              <div className="rooms__title-wrapper">
                <h1 className="rooms__title">Выберите / создайте чат</h1>
              </div>

              <form onSubmit={onSubmit} className='login__form'>
                <div className="mb-3 rooms__relative rooms__name" onClick={() => choiceRoom(1)}>
                  <input type="text" className="form-control" placeholder="Первая комната" disabled/>
                  <div className="rooms__absolute" style={{paddingRight: 7}}>
                    <ArrowSVG/>
                  </div>
                </div>
                <div className="rooms__relative">
                  <input type="text" className="form-control" placeholder="Введите название чата"/>
                  <div className="rooms__absolute">
                    <button type="submit" className="btn btn-primary">Создать</button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default Rooms;