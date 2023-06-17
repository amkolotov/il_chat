import React from 'react';
import './styles/main.scss'
import Login from "./pages/Login/Login";
import Rooms from "./pages/Rooms/Rooms";

const App = () => {

    const isAuth = true
    return (
        <>
            {
                isAuth ? <Rooms /> : <Login />
            }
        </>
    );
};

export default App;
