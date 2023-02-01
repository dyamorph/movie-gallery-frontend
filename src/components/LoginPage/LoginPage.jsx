import React from "react";
import styles from "./LoginPage.module.scss";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin, selectIsAuth } from "../../redux/slices/auth.js";

const LoginPage = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values));

    if (!data.payload) {
      alert("Failure to login");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to={"/collection"} />;
  }
  console.log(isAuth);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>
        <h1 className={styles.login_heading}>Login Form</h1>
        <div className="mb-6">
          <label className={styles.email_label} htmlFor="email">
            Your email
          </label>
          <input
            className={styles.email_input}
            {...register("email", { required: "Enter your email" })}
            type="email"
            id="email"
            placeholder="name@example.com"
            required
          ></input>
        </div>
        <div className="mb-6">
          <label className={styles.password_label} htmlFor="password">
            Your password
          </label>
          <input
            className={styles.password_input}
            {...register("password", { required: "Enter your password" })}
            type="password"
            id="password"
            required
          ></input>
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              className={styles.remember_input}
              id="remember"
              type="checkbox"
              value=""
              required
            ></input>
          </div>
          <label className={styles.remember_label} htmlFor="remember">
            Remember me
          </label>
        </div>
        <button className={styles.submit_btn} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginPage;