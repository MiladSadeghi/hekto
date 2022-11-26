import React, { FC, ReactElement } from "react";
import Logos from "../Home/Logos";
import "../../index.css";
import { useFormik } from "formik";
import { SignUpSchema } from "../../Validation/account";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireStoreDB } from "../../helper/firebase.config";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

const onSubmit = async (
  {
    email,
    password,
    userName,
  }: { email: string; password: string; userName: string },
  actions: any
) => {
  try {
    const registredUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(fireStoreDB, "users", registredUser.user.uid), {
      userName,
      uid: registredUser.user.uid,
    });
    actions.setSubmitting(false);
  } catch (error) {
    console.log(error);
    actions.setSubmitting(false);
  }
};

const SignUp: FC = (): ReactElement => {
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
      userName: "",
      password: "",
      cPassword: "",
      acceptTerms: false,
    },
    validationSchema: SignUpSchema,
    onSubmit,
  });

  return (
    <div>
      <>
        <div className="container mx-auto pt-28 pb-16 ">
          <div className="flex flex-col w-5/12 mx-auto p-14 shadow-[0_0_25px_10px_#f8f8fb] mb-16">
            <div className="text-center mb-5">
              <h5 className="font-JosefinSans font-bold text-3xl mb-1">
                Sign Up
              </h5>
            </div>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="email">Email Address</label>
                <p className="text-red-600 text-xs">{errors.email}</p>
              </div>
              <input
                className={`form-input ${
                  errors.email && touched.email && "border-red-600"
                }`}
                type="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              <div className="flex justify-between mb-2">
                <label htmlFor="email">Username</label>
                <p className="text-red-600 text-xs">{errors.userName}</p>
              </div>
              <input
                className={`form-input ${
                  errors.userName && touched.userName && "border-red-600"
                }`}
                type="text"
                id="userName"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              <div className="flex justify-between mb-2">
                <label htmlFor="email">Password</label>
                <p className="text-red-600 text-xs">{errors.password}</p>
              </div>
              <input
                className={`form-input ${
                  errors.password && touched.password && "border-red-600"
                }`}
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
              />
              <div className="flex justify-between mb-2">
                <label htmlFor="email">Repeat Password</label>
                <p className="text-red-600 text-xs">{errors.cPassword}</p>
              </div>
              <input
                className={`form-input ${
                  errors.cPassword && touched.cPassword && "border-red-600"
                }`}
                type="password"
                id="cPassword"
                value={values.cPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  value={String(values.acceptTerms)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-4 h-4 bg-gray-100 rounded border-gray-300  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="acceptTerms"
                  className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300 font-JosefinSans"
                >
                  I agree with the terms and conditions.
                </label>
              </div>
              <button
                type="submit"
                className="py-3 text-center bg-pink-cc w-full text-white font-Lato disabled:opacity-75"
                disabled={isSubmitting}
              >
                Sign Up
              </button>
              <div className="mt-5 text-center">
                <Link to={"/signin"} className="text-[#9096B2] text-base">
                  You have an Account? Login
                </Link>
              </div>
            </form>
          </div>
          <Logos />
        </div>
      </>
    </div>
  );
};

export default SignUp;
