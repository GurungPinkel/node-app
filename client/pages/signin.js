const SignIn = () => {
  const facebookLoginUrl = `${process.env.FACEBOOK_LOGIN_HOST_URL}?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URL}`;

  return (
    <div>
      <h1> Sign In </h1>
      <a href={facebookLoginUrl} className="facebook-login-button">
        Login with Facebook
      </a>
    </div>
  );
};
export default SignIn;
