import "bootstrap/dist/css/bootstrap.css";

const AppComponent = ({ Component, pageProps, currentUser }) => (
  <div>
    {/* <Header currentUser={currentUser} /> */}
    {/* <h1> { currentUser.email} </h1> */}
    <Component {...pageProps} />
  </div>
);
export default AppComponent;
