import "./App.css";
import {
  Link,
  Switch,
  Route,
  withRouter,
  BrowserRouter,
} from "react-router-dom";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import Nav from "./component/Nav/Nav";
import Home from "./component/Home/Home";
import { useState } from "react";

function App() {
  return (
    <main className='bg-gray-200 h-screen'>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/' component={Home} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
