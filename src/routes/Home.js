import React, { useEffect } from "react";
import "./Home.scss";
import Recommendation from "../components/Recommendation";
import DateAnalytic from "../components/DateAnalytic";
import Header from "../components/Header";

function Home({ isLogin, history }) {
  useEffect(() => {
    if (!isLogin) {
      history.push("/Login");
    }
  });

  return (
    <>
      <Header />
      <section className="homepage">
        <DateAnalytic />
        <Recommendation />
      </section>
    </>
  );
}

export default Home;
