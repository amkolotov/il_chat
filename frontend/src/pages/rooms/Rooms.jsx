import React, {useEffect, useState} from "react";
import "./rooms.scss"
import {ReactComponent as ArrowSVG} from "../../img/arrow.svg"
import {ReactComponent as ExitSVG} from "../../img/exit.svg"
import CookieHandler from "../../utils/cookieHandler";
import {useForm} from "react-hook-form";
import Api from "../../services/Api";
import {useNavigate} from "react-router-dom";

const Rooms = () => {

  const navigate = useNavigate()

  const {register, handleSubmit, reset} = useForm();

  // const [roomId, setRoomId] = useState(0)
  const [rooms, setRooms] = useState([])

  const logout = () => {
    CookieHandler.deleteCookie("access")
    navigate("/login")
  }

  const fetchRooms = async () => {
    const successData = await Api.makeGetRequest("room/");
    if (successData?.results) {
      setRooms(successData.results)
    } else {
      logout()
    }
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  const onSubmit = async (roomData) => {
    const successData = await Api.makePostRequest(
      "room/",
      JSON.stringify(roomData),
      false,
      false
    );
    if (successData) {
      setRooms((prevState) => [...prevState, successData])
    }
    reset()
  };

  const choiceRoom = (roomId) => {
    navigate(`/chat/${roomId}`)
  }

  return (
    <>
      <div className="rooms-wrapper">
        <div className="rooms-header">
          <div className="rooms-header__exit" onClick={logout}>
            <ExitSVG/>
          </div>
        </div>
        <div className="rooms">
          <div className="rooms__title-wrapper">
            <h1 className="rooms__title">Выберите / создайте чат</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="login__form">
            {
              rooms.map(room => {
                return (
                  <div
                    key={room.id}
                    className="mb-3 rooms__relative rooms__name"
                    onClick={() => choiceRoom(room.id)}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder={room.name}
                      disabled
                    />
                    <div className="rooms__absolute" style={{paddingRight: 7}}>
                      <ArrowSVG/>
                    </div>
                  </div>
                )
              })
            }

            <div className="rooms__relative">
              <input
                type="text"
                className="form-control"
                placeholder="Введите название чата"
                {...register("name", {required: true})}
              />
              <div className="rooms__absolute">
                <button type="submit" className="btn btn-primary">Создать</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default Rooms;
