import "../scss/index.scss";
import "react-datepicker/dist/react-datepicker.min.css";
import getCurrentUser from "../api/current-user";

const AppComponent = ({ Component, pageProps, currentUser }) => (
  <Component {...pageProps} currentUser={currentUser} />
);

AppComponent.getInitialProps = async (appContext) => {
  const client = getCurrentUser(appContext.ctx);

  const { data } = await client.get("/api/user/currentuser");

  // need this if we want other getInitialProps method to execute
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }
  return {
    pageProps,
    ...data,
  };
};
export default AppComponent;
