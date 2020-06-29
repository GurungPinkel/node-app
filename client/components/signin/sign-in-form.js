import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import AuthenticationApi from "../../api/authentication";
import Toast from "../toast";
import styles from "./sign-in-form..module.scss";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isFormValidated, setIsFormValidated] = useState(false);

  const facebookLoginUrl = `${process.env.FACEBOOK_LOGIN_HOST_URL}?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URL}`;

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const toastCloseHandler = () => {
    setErrors([]);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    AuthenticationApi(`/api/user/signin`, {
      data: { email, password },
    })
      .then(() => {
        Router.push("/");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setErrors(err.response.data.errors || []);
        }
      });
  };
  return (
    <>
      {errors.length > 0 ? (
        <Toast messages={errors} onClose={toastCloseHandler} type="error" />
      ) : null}
      <div className={styles.SignInForm}>
        <div className={`title_lg`}>
          <center>Sign In </center>
        </div>
        <form
          onSubmit={formSubmitHandler}
          className={styles.signInFormContainer}
        >
          <div className={styles.formElement}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={emailChangeHandler}
            />
            <input
              type="password"
              name="password"
              autoComplete="on"
              placeholder="Password"
              value={password}
              onChange={passwordChangeHandler}
            />
            <button type="submit" className={`signinButton`}>
              Sign In
            </button>
          </div>
          <Link href="/reset-password">
            <a className={`bold link textCenter decoration`}>
              Forgot Passowrd?
            </a>
          </Link>
          <div className={styles.dottedLine}></div>
          <div className={styles.facebookLoginButton}>
            <a
              href={facebookLoginUrl}
              className={`signinButton fbSigninButton`}
            >
              Login with Facebook
            </a>
          </div>
          <Link href="/signup">
            <a className={`bold link textCenter decoration`}>
              New user? Sign Up
            </a>
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
