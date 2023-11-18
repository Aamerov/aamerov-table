import * as yup from "yup";

export const userSchema = yup.object().shape({
  id: yup.number().required("Provide a Number ID and a String Title"),
  title: yup.string().required("Provide a Number ID and a String Title"),
});
