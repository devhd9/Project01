import React from "react";
import "./Home.css";

//  #####  Home Page  #####
const Home = ({ name, logoutHandler }) => {
  return (
    // <div className='border border-grey-800'>>
    <>
      {name && (
        <div className='flex'>
          <span
            className='ml-auto mr-8 inline-block px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out'
            onClick={logoutHandler}>
            Logout
          </span>
        </div>
      )}
      <div className='glassCss mt-32 mx-auto App w-6/12 py-8'>
        {name ? (
          <h1 className='text-6xl text-purple-700'>Welcome {name} </h1>
        ) : (
          <h1 className='text-6xl text-blue-700'>Please Login</h1>
        )}
      </div>
    </>
  );
};

export default Home;
