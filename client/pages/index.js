const Home = ({ currentUser }) => {
  return (
    <div>
      <h1> Home </h1>
      <h2>{currentUser.email}</h2>
    </div>
  );
};
Home.getInitialProps = async (context, client, currentUser) => {
  const { res } = context;
  if (!currentUser && res) {
    res.writeHead(301, {
      Location: "/signin",
    });
    res.end();
  }
  return {};
};
export default Home;
