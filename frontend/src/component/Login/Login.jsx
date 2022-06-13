import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Home from "../Home/Home";
import Nav from "../Nav/Nav";
import { formField } from "../styles";
import { BASE_URL } from "../URL";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState(null);
  const history = useHistory();

  //  #####   Login Handler   #####
  const loginHandler = () => {
    if (!email.trim() || !password.trim()) {
      alert("please fill details first");
      return;
    }
    axios
      .get(`${BASE_URL}/login/${email}/${password}`)
      .then((res) => {
        console.log(res);
        if (res && res.status && res.status == 200 && res.data) {
          setName(res.data.name);
          setIsLoggedIn(true);
          setEmail("");
          setPassword("");
        }
      })
      .catch((err) => {
        console.log(err);
        if (res && res.status && res.status == 401) {
          alert("Invalid Username or Password");
        } else if (res && res.status && res.status == 500) {
          alert("Server Down");
        } else if (
          res &&
          res.status &&
          res.data == "Please Register Yourself"
        ) {
          alert("Please Register Yourself");
        }
      });
  };

  //  #####   Logout Handler   #####

  const logoutHandler = () => {
    setName(null);
    setIsLoggedIn(false);
  };
  if (isLoggedIn && name) {
    return <Home logoutHandler={logoutHandler} name={name} />;
  }
  console.log("Login");
  return (
    <div>
      {/* <Nav /> */}
      <section className='h-screen'>
        <div className='flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6'>
          <div className='bg-white p-8 border border-gray-300 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 mx-auto'>
            <form>
              <h1 className='text-5xl my-8 text-center'>Login</h1>
              <div className='mb-6'>
                <input
                  value={email}
                  type='text'
                  className={formField}
                  placeholder='Email address'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='mb-6'>
                <input
                  value={password}
                  type='password'
                  className={formField}
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className='text-center lg:text-left'>
                <span
                  onClick={loginHandler}
                  type='button'
                  className='hover:cursor-pointer inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
                  Login
                </span>
                <p className='text-sm font-semibold mt-2 pt-1 mb-0'>
                  Don't have an account?
                  <Link
                    to='/register'
                    className='text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out'>
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
