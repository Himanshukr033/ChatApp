import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import ChatProvider from "./Context/ChatProvider";
import PrivateRoutes from './utils/PrivateRoutes'
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <ChatProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoutes />}>
                <Route element={<Chat />} path="/" exact/>                
            </Route>
        </Routes>
      </ChatProvider>
    </BrowserRouter>
  );
}
