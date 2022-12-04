import React, { FC, ReactElement } from "react";
import Logos from "../Home/Logos";
import "../../index.css";
import { useFormik } from "formik";
import { AccountErrors, SignUpSchema } from "../../Validation/account";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../helper/firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BarLoader } from "react-spinners";
import { createUserData, getWishlistAndCart } from "../../helper/firebase.data";
import { useAppSelector } from "../../redux/hook";
import { TUserData } from "../../types/public.types";

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

  const navigate = useNavigate();
  const { uid } = useAppSelector((state) => state.user);

  async function onSubmit(
    {
      email,
      password,
      userName,
    }: { email: string; password: string; userName: string },
    actions: any
  ) {
    try {
      const guestData: TUserData = await getWishlistAndCart(uid);
      const registredUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      createUserData(
        registredUser.user.uid,
        "user",
        guestData.wishlist,
        guestData.cart,
        userName
      );
      toast.success("Your register complete.");
      navigate("/", { replace: true });
    } catch (error: any) {
      toast.error(AccountErrors(error.code));
    }
    actions.setSubmitting(false);
  }

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
                  I agree with the{" "}
                  <span
                    className={`${
                      errors.acceptTerms || touched.acceptTerms
                        ? "text-red-600"
                        : "text-blue-800"
                    }`}
                  >
                    terms and conditions
                  </span>
                  .
                </label>
              </div>
              <button
                type="submit"
                className="text-center bg-pink-cc w-full text-white font-Lato disabled:opacity-75 flex items-center justify-center h-[48px] rounded-[3px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <BarLoader color="#fff" height={3} width={150} />
                ) : (
                  "Sign Up"
                )}
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
