import * as Yup from "yup";

//TRAD: change by translate i18n
export const Validations = {
  required: Yup.string().required("Requis"),
  email: Yup.string().email("Invalid email"),
  emailRequired: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  confirmPassword: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  username: Yup.string().min(4, "Too Short!").max(50, "Too Long!"),
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .matches(/^[a-zA-Z]+$/, "Names must be only letters"),
  birthdate: Yup.date()
    .min(new Date(1923, 0, 1), "Are you really this Old?")
    .max(new Date(), "You must be born before today"),
  phone: Yup.string(),

  website: Yup.string().url("Invalid website URL"),

  text: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  date: Yup.date(),
  hours: Yup.number().min(0).max(24),
  minutes: Yup.number().min(0).max(60),
  image: Yup.mixed(),
  number: Yup.number().min(0),
};
