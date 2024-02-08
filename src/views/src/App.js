import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/home";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";

export default class App extends Component {
  render() {
    return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/*' element={<Home />} />
      </Routes>
    );
  }
}