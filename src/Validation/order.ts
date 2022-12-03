import * as yup from "yup";

export const OrderCompleteSchema = yup.object().shape({
  firstName: yup.string().when("firstName", (val: any) => {
    if (val) {
      return yup.string().required("Required").min(2, "Its to short").max(25, "Its to long")
    } else {
      return yup.string().optional()
    }
  }),
  lastName: yup.string().required("Required").min(5, "Its to short").max(35, "Its to long"),
  address: yup.string().required("Required").min(10, "Enter a valid Address!"),
  apt: yup.string().optional().when("apt", (val: any) => {
    if (val) {
      return yup.string().required("Required").min(5, "Its to short").max(25, "Its to long")
    } else {
      return yup.string().optional()
    }
  }),
  city: yup.string().required("Required").min(3, "Not valid"),
  state: yup.string().required("Required").min(2, "Not valid"),
  postalCode: yup.number().required().min(4, "Not valid")
}, [
  ["firstName", "firstName"],
  ["apt", "apt"],
])