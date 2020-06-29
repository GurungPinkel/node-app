import NextHead from "next/head";
import SignUpForm from "../../components/signup/sign-up-form";
const SignUp = () => {
  return (
    <>
      <NextHead>
        <title> Change Me! | Sign Up </title>
        <meta
          name="description"
          content="Change Me! I am Description meta tag"
        ></meta>
      </NextHead>
      <SignUpForm />
    </>
  );
};

export default SignUp;
