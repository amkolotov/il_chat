import React from "react";
import "./login.scss"
import {useForm} from "react-hook-form";
import CookieHandler from "../../utils/cookieHandler";
import Api from "../../services/Api";
import {useNavigate} from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()

  const {register, handleSubmit} = useForm();

  const onSubmit = async (loginData) => {
    const successLoginData = await Api.makePostRequest(
      "token/",
      JSON.stringify(loginData),
      false,
      false
    );
    if (successLoginData) {
      CookieHandler.setCookie("access", successLoginData["access"]);
      navigate("/")
    }
  };

  return (
    <>
      <div className="login-bg"></div>
      <div className="login-wrapper">

        <div className="login">

          <div className="login__title-wrapper">
            <h1 className="login__title">Авторизация</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="login__form">

            <div className="mb-3">
              <input
                type="text"
                placeholder="Логин"
                className="form-control"
                {...register("username", {required: true})}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                placeholder="Пароль"
                className="form-control"
                {...register("password", {required: true})}
              />
            </div>

            <button type="submit" className="btn btn-primary">Войти</button>

          </form>

        </div>

      </div>
    </>
  )
};

export default Login;