import React from "react";
import { useState } from "react";
import { formField } from "../styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BASE_URL } from "../URL";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [cPass, setCPass] = useState("");
  const [cPassError, setCPassError] = useState(null);
  const history = useHistory();

  //  #####  Submit Handler  #####

  const submitHandler = (v, err) => {
    if (cPass != v?.password) {
      setCPassError("Password Doesn't Match");
      return;
    }
    axios
      .post(`${BASE_URL}/register`, {
        ...v,
      })
      .then((res) => {
        if (res && res.status && res.status == 201) {
          alert("You have been registered successfully");
          history.replace("/login");
        }
      })
      .catch((err) => {
        if (res && res.status && res.status == 500) {
          alert("Server Down, Please Try Few Minutes");
        }
        if (res && res.status && res.status == 409) {
          alert("Your email address is already registered");
        }
      });
  };
  const { errors, values, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues: {},
      validationSchema: Yup.object({
        name: Yup.string()
          .max(25, "Name cannot be longer than 25 characters")
          .min(2, "Name should have atleast 2 characters")
          .required("Required"),
        email: Yup.string()
          .email("Invalid email address")
          .max(30, "Email cannot contain more than 30 characters")
          .min(5, "Email must have atleast 5 characters")
          .required("Required"),
        phoneNumber: Yup.string()
          .min(10, "Phone number must contain 10 digits")
          .max(10, "Phone number must contain 10 digits")
          .required("Required"),
        password: Yup.string()
          .required("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      }),
      onSubmit: (values) => submitHandler(values),
      validate: () => {},
    });
  const cPassHandler = (e) => {
    const value = e.target.value;
    setCPass(value);
    if (value != values.password) {
      setCPassError("Password Doesn't Match");
    }
  };
  if (cPassError) {
    if (cPass === values.password) {
      setCPassError(null);
    }
  }

  return (
    <div>
      <div className='flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6'>
        <div className='bg-white p-8 border border-gray-300 mx-auto xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0'>
          <form onSubmit={handleSubmit}>
            <h1 className='text-5xl my-8 text-center'>Register</h1>
            <div className='mb-6'>
              <input
                type='text'
                name='name'
                className={formField}
                value={values.name}
                placeholder='Name'
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && <p className='text-red-600'> {errors.name} </p>}
            </div>
            <div className='mb-6'>
              <input
                type='text'
                name='email'
                className={formField}
                value={values.email}
                placeholder='Email address'
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && (
                <p className='text-red-600'> {errors.email} </p>
              )}
            </div>
            <div className='mb-6'>
              <input
                type='text'
                name='phoneNumber'
                className={formField}
                value={values.phoneNumber}
                placeholder='Phone Number'
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.phoneNumber && (
                <p className='text-red-600'> {errors.phoneNumber} </p>
              )}
            </div>
            <div className='mb-6'>
              <input
                type='password'
                name='password'
                className={formField}
                value={values.password}
                placeholder='Password'
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && (
                <p className='text-red-600'> {errors.password} </p>
              )}
            </div>
            <div className='mb-6'>
              <input
                type='password'
                name='confirmPassword'
                className={formField}
                value={cPass}
                placeholder='Confirm Password'
                onChange={(e) => cPassHandler(e)}
              />
              {cPassError ? (
                <p className='text-red-600'> {cPassError} </p>
              ) : (
                <></>
              )}
            </div>
            <div>
              <button
                type='button'
                onClick={handleSubmit}
                className='hover:cursor-pointer inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
