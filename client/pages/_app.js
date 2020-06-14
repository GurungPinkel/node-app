import "bootstrap/dist/css/bootstrap.css";
import getCurrentUser from "../api/current-user";

const AppComponent = ({ Component, pageProps, currentUser }) => (
  <div>
    <Component {...pageProps} currentUser={currentUser} />
  </div>
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
