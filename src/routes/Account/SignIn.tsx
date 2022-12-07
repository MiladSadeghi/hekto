import { sendPasswordResetEmail } from "firebase/auth";
import { useFormik } from "formik";
import { FC, ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../helper/firebase.config";
import "../../index.css";
import { useAppDispatch } from "../../redux/hook";
import { signIn } from "../../redux/slices/user";
import { AccountErrors, SignInSchema } from "../../Validation/account";
import Logos from "../Home/Logos";
import { motion } from "framer-motion";

const SignIn: FC = (): ReactElement => {
  document.title = "Hekto - Sign In";
  const dispatch = useAppDispatch();

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

  async function onSubmit(
    { email, password }: { email: string; password: string },
    actions: any
  ) {
    await dispatch(signIn({ email, password }));
    actions.setSubmitting(false);
  }

  const resetPassword = async () => {
    const wait = toast.loading("Please wait...");
    try {
      if (!errors.email) {
        await sendPasswordResetEmail(auth, values.email);
        toast.update(wait, {
          render: "Reset password link sent to your email!.",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        toast.update(wait, {
          render: "Email is invalid",
          type: "warning",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error: any) {
      toast.update(wait, {
        render: AccountErrors(error.code),
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: "100%",
        transition: { duration: 0.3 },
      }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="container mx-auto pt-28 pb-16 "
    >
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
          <p
            className="mb-6 font-Lato text-[#9096B2] text-[17px]"
            onClick={() => resetPassword()}
          >
            Forgot your password?
          </p>
          <button
            type="submit"
            className="text-center bg-pink-cc w-full text-white font-Lato disabled:opacity-75 flex items-center justify-center h-[48px] rounded-[3px]"
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
    </motion.div>
  );
};

export default SignIn;
