import React, { useState } from "react";
import styles from "./LoginPage.module.scss";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, fetchLogin } from "../../redux/slices/auth.js";
import Modal from "../Modal/Modal.jsx";

const LoginPage = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.auth.loading);
  const [modalActive, setModalActive] = useState(false);

  const { register, handleSubmit } = useForm({
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
    setModalActive(true);
  };

  console.log(isAuth);
  return (
    <section className={styles.login_page_content}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>
        <h1 className={styles.login_heading}>Login</h1>
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
        {userStatus ? (
          <div className={styles.btn_container}>
            <button disabled className={styles.login_btn}>
              <span className={styles.login_btn_inner_disabled}>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-5 h-5 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </span>
            </button>
          </div>
        ) : (
          <div className={styles.btn_container}>
            <button className={styles.login_btn}>
              <span className={styles.login_btn_inner}>Login</span>
            </button>
          </div>
        )}
      </form>
      <Modal active={modalActive} setActive={setModalActive}>
        <p className={styles.modal_text}>You have successfully login!</p>
        <p className={styles.modal_text}>
          To add a film to the collection go to the page:
        </p>
        <Link className={styles.show_collection_button} to="/addmovie">
          Add a movie
        </Link>
        <p className={styles.modal_text}>
          To see your collection go to the page:
        </p>
        <Link className={styles.show_collection_button} to="/collection">
          Collection
        </Link>
      </Modal>
    </section>
  );
};

export default LoginPage;
