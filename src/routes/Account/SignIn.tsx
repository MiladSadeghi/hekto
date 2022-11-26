import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import React, { FC, ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../helper/firebase.config";
import "../../index.css";
import { SignInSchema } from "../../Validation/account";
import Logos from "../Home/Logos";

const onSubmit = async (
  { email, password }: { email: string; password: string },
  actions: any
) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
    actions.setSubmitting(false);
  } catch (error) {
    console.log(error);
    actions.setSubmitting(false);
  }
};

const SignIn: FC = (): ReactElement => {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit,
  });

  return (
    <>
      <div className="container mx-auto pt-28 pb-16 ">
        <div className="flex flex-col w-5/12 mx-auto p-14 shadow-[0_0_25px_10px_#f8f8fb] mb-16">
          <div className="text-center mb-5">
            <h5 className="font-JosefinSans font-bold text-3xl mb-1">Login</h5>
            <p className="text-[17px] text-[#9096B2] font-Lato">
              Please login using account detail bellow.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mb-2">
              <label htmlFor="signin-email">Email Address</label>
              <p className="text-red-600 text-xs">{errors.email}</p>
            </div>
            <input
              className={`form-input ${
                errors.email && touched.email && "border-red-600"
              }`}
              type="email"
              value={values.email}
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="flex justify-between mb-2">
              <label htmlFor="signin-pass">Password</label>
              <p className="text-red-600 text-xs">{errors.password}</p>
            </div>
            <input
              className={`form-input ${
                errors.password && touched.password && "border-red-600"
              }`}
              type="password"
              value={values.password}
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p className="mb-6 font-Lato text-[#9096B2] text-[17px]">
              Forgot your password?
            </p>
            <button
              type="submit"
              className="py-3 text-center bg-pink-cc w-full text-white font-Lato disabled:opacity-75"
              disabled={isSubmitting}
            >
              Sign In
            </button>
            <div className="text-center mt-5">
              <Link to={"/signup"} className="text-base text-[#9096B2] ">
                Don’t have an Account? Create account
              </Link>
            </div>
          </form>
        </div>
        <Logos />
      </div>
    </>
  );
};

export default SignIn;
