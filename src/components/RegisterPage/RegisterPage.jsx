import React from "react";
import styles from "./RegisterPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth.js";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      alert("Failure to register");
    }

    window.localStorage.setItem("token", data.payload.token);
  };



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.register_form}>
        <h1 className={styles.register_heading}>Register Form</h1>
        <div className="mb-6">
          <label className={styles.name_label} htmlFor="name">
            Your name
          </label>
          <input
            className={styles.name_input}
            {...register("name", { required: "Enter your name" })}
            type="text"
            id="name"
            placeholder="John Silver"
            required
          ></input>
        </div>
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
        <button className={styles.submit_btn} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default RegisterPage;
