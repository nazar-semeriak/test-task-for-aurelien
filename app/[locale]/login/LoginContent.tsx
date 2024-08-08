"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Adresse email invalide").required("Requis"),
      password: Yup.string().min(6, "Au moins 6 caractères").required("Requis"),
    }),
    onSubmit: async (values) => {
      const result = await signIn("login", {
        redirect: false,
        identifier: values.email,
        password: values.password,
      });

      if (result?.error) {
        alert("Erreur de connexion : " + result.error);
      } else {
        window.location.href = "/activities"; // Adjust redirect as needed
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.password}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
