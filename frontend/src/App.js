import React from "react";
import "./styles/main.scss"
import {Route, Routes} from "react-router-dom";
import Rooms from "./pages/rooms/Rooms";
import Chat from "./pages/chat/Chat";
import Login from "./pages/login/Login";
import {ProtectedLayout} from "./components/auth/ProtectedLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedLayout/>} >
        <Route path="" element={<Rooms/>} />
        <Route path="/chat/:id" element={<Chat/>} />
      </Route>
      <Route path="/login" element={<Login/>} />
    </Routes>
  );
};

export default App;
