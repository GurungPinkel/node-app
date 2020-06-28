import NextHead from "next/head";
import SignInForm from "../../components/signin/sign-in-form";
import styles from "./signin.module.scss";

const SignIn = () => {
  const facebookLoginUrl = `${process.env.FACEBOOK_LOGIN_HOST_URL}?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URL}`;

  return (
    <>
      <NextHead>
        <title> Change Me! | Sign In </title>
        <meta
          name="description"
          content="Change Me! I am Description meta tag"
        ></meta>
      </NextHead>
      <div className={styles.SignIn}>
        <SignInForm />
        {/*<h1> Sign In </h1>
        <a href={facebookLoginUrl} className="facebook-login-button">
          Login with Facebook
        </a> */}
      </div>
    </>
  );
};
export default SignIn;
