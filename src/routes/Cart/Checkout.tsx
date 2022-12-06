import { useFormik } from "formik";
import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { clearUserCart } from "../../redux/slices/user";
import { Product } from "../../types/IProducts.interface";
import { ICartProps } from "../../types/user.types";
import { OrderCompleteSchema } from "../../Validation/order";

const Checkout: React.FC<ICartProps> = ({
  cartProducts,
  cart,
  totalCartPrice,
}): React.ReactElement => {
  document.title = "Hekto - Checkout";
  const productTotalPrice = (id: string, price: string | undefined): string => {
    const cartItem = cart.find((item: any) => item.productID === id);
    return String(cartItem!.quantity * Number(price));
  };
  const dispatch = useAppDispatch();

  const { values, handleChange, handleSubmit, errors, isValid } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      apt: "",
      city: "",
      state: "",
      postalCode: 0,
    },
    validationSchema: OrderCompleteSchema,
    onSubmit,
  });

  const { uid } = useAppSelector((state) => state.user);

  function onSubmit(actions: any) {
    dispatch(
      clearUserCart({
        uid,
        successMessage: "Order Complete",
        orderComplete: true,
      })
    );
    actions.setSubmitting = false;
  }

  return (
    <div>
      <div className="bg-[#F6F5FF] py-16">
        <div className="container mx-auto flex">
          <h1 className="font-JosefinSans font-bold text-3xl text-[#101750]">
            Checkout
          </h1>
        </div>
      </div>
      <div className="container mx-auto mt-24 mb-28">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-9">
            <div className="w-full bg-[#F8F8FD] py-20 px-8">
              <h5 className="font-JosefinSans text-xl text-navy-blue font-bold mb-7">
                Shipping Address
              </h5>
              <form id="form1" onSubmit={handleSubmit} className="gap-6">
                <div className="w-full gap-6 flex">
                  <input
                    type="text"
                    className={`w-1/2 py-3 bg-[#F8F8FD] border-b-2 border-[#BFC6E0] px-2 focus:bg-[#fff] outline-none duration-300 ease-in-out ${
                      errors.firstName ? "border-red-500" : "border-[#BFC6E0]"
                    }`}
                    placeholder="First name (optional)"
                    title={`${errors.firstName || ""}`}
                    id="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className={`w-1/2 py-3 bg-[#F8F8FD] border-b-2 border-[#BFC6E0] px-2 focus:bg-[#fff] outline-none duration-300 ease-in-out ${
                      errors.lastName ? "border-red-500" : "border-[#BFC6E0]"
                    }`}
                    placeholder="Last name"
                    title={`${errors.lastName || ""}`}
                    id="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  className={`w-full my-4 py-3 bg-[#F8F8FD] border-b-2 border-[#BFC6E0] px-2 focus:bg-[#fff] outline-none duration-300 ease-in-out ${
                    errors.address ? "border-red-500" : "border-[#BFC6E0]"
                  }`}
                  title={`${errors.address || ""}`}
                  id="address"
                  value={values.address}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Apartment,suite,e.t.c (optional)"
                  className={`w-full my-4 py-3 bg-[#F8F8FD] border-b-2 border-[#BFC6E0] px-2 focus:bg-[#fff] outline-none duration-300 ease-in-out ${
                    errors.apt ? "border-red-500" : "border-[#BFC6E0]"
                  }`}
                  title={`${errors.apt || ""}`}
                  id="apt"
                  value={values.apt}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="City"
                  className={`w-full py-3 bg-[#F8F8FD] border-b-2 border-[#BFC6E0] px-2 focus:bg-[#fff] outline-none duration-300  ease-in-out my-4 ${
                    errors.city ? "border-red-500" : "border-[#BFC6E0]"
                  }`}
                  id="city"
                  title={`${errors.city || ""}`}
                  value={values.city}
                  onChange={handleChange}
                />
                <div className="w-full gap-6 flex my-4">
                  <input
                    type="text"
                    className={`w-1/2 py-3 bg-[#F8F8FD] border-b-2 border-[#BFC6E0] px-2 focus:bg-[#fff] outline-none duration-300 ease-in-out ${
                      errors.state ? "border-red-500" : "border-[#BFC6E0]"
                    }`}
                    placeholder="State"
                    id="state"
                    title={`${errors.state || ""}`}
                    value={values.state}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    className={`w-1/2 py-3 bg-[#F8F8FD] border-b-2 border-[#BFC6E0] px-2 focus:bg-[#fff] outline-none duration-300 ease-in-out ${
                      errors.postalCode ? "border-red-500" : "border-[#BFC6E0]"
                    }`}
                    placeholder="Postal code"
                    id="postalCode"
                    title={`${errors.postalCode || ""}`}
                    value={values.postalCode}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="col-span-3">
            <div className="relative w-full h-[60%]">
              <div className="overflow-y-auto absolute h-full w-full">
                {cartProducts.map((product: Product) => (
                  <div
                    className="flex py-3 border-b border-[#E1E1E4]"
                    key={product.id}
                  >
                    <div className="w-[87px]">
                      <img
                        className="w-full rounded-sm"
                        src={
                          product.imagesByColor
                            ? product.imagesByColor[product.colors!![0].name][0]
                            : product.images[0]
                        }
                        alt={product.title}
                      />
                    </div>
                    <div className="ml-2 flex items-center justify-between w-full">
                      <div>
                        <h5 className="line-clamp-1 font-JosefinSans text-sm w-[170px]">
                          {product.title}
                        </h5>
                        <p className="font-JosefinSans text-xs text-[#A1A8C1]">
                          Qt:
                          <span className="text-sm ml-1">
                            {
                              cart.find(
                                (item: any) => item.productID === product.id
                              )!.quantity
                            }
                          </span>
                        </p>
                        <p>
                          {(() => {
                            const color = cart.find(
                              (item) => item.productID === product.id
                            )?.color;
                            if (color) {
                              return (
                                <p className="font-JosefinSans text-xs text-[#A1A8C1]">
                                  Color:
                                  <span className="text-sm">{color}</span>
                                </p>
                              );
                            }
                          })()}
                        </p>
                      </div>
                      <p className="font-JosefinSans text-navy-blue text-sm">
                        $
                        {productTotalPrice(
                          product.id,
                          product.price ? product.price : product.discount
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="py-10 px-5 bg-[#F4F4FC] w-full rounded-sm mt-5">
              <div className="flex items-center justify-between font-JosefinSans border-b border-gray-300 pb-2">
                <p className="font-semibold text-lg font-Lato text-navy-blue">
                  Totals:
                </p>
                <p className="text-base font-Lato text-navy-blue">
                  ${totalCartPrice}
                </p>
              </div>
              <p className="flex font-Lato text-xs text-[#8A91AB] items-center mt-4">
                <IoIosCheckmarkCircle className="text-green-600 mr-2" />
                Shipping & taxes calculated at checkout
              </p>
              <button
                className="bg-green-500 text-white font-bold font-Lato text-sm mt-6 w-full rounded-sm py-3 disabled:opacity-75"
                disabled={!isValid}
                type="submit"
                form="form1"
              >
                Complete Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
