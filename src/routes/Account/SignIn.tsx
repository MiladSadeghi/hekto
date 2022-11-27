import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { replace, useFormik } from "formik";
import { FC, ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";
import { auth, fireStoreDB } from "../../helper/firebase.config";
import "../../index.css";
import { AccountErrors, SignInSchema } from "../../Validation/account";
import Logos from "../Home/Logos";

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

  const navigate = useNavigate();

  async function onSubmit(
    { email, password }: { email: string; password: string },
    actions: any
  ) {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const docRef = doc(fireStoreDB, "users", user.user.uid);
      const docSnap = await getDoc(docRef);
      toast.success(`Welcome back ${docSnap.data()?.userName}`);
      navigate("/", { replace: true });
    } catch (error: any) {
      toast.error(AccountErrors(error.code));
    }
    actions.setSubmitting(false);
  }

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
              className="text-center bg-pink-cc w-full text-white font-Lato disabled:opacity-75 flex items-center justify-center h-[48px] rounded-[3px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <BarLoader color="#fff" height={3} width={150} />
              ) : (
                "Sign In"
              )}
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
