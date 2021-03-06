import NextHead from "next/head";
import HeaderComponent from "../components/header";
const Home = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <>
      <NextHead>
        <title> Change Me! | I am title </title>
        <meta
          name="description"
          content="Change Me! I am Description meta tag"
        ></meta>
      </NextHead>
      <HeaderComponent currentUser={currentUser} />
      <div>
        <h1> Home </h1>
      </div>
    </>
  );
};
Home.getInitialProps = async (context, client, currentUser) => {
  return currentUser;
};
export default Home;
