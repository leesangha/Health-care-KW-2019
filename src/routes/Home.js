import React, { useEffect } from "react";
import "./Home.scss";
import Recommendation from "../components/Recommendation";
import DateAnalytic from "../components/DateAnalytic";
import Header from "../components/Header";
import AddButton from "../components/AddButton";

function Home({ isLogin, history }) {
  useEffect(() => {
    if (!isLogin) {
      history.push("/Login");
    }
  });

  return (
    <>
      <Header />
      <AddButton />
      <section>
        <DateAnalytic />
        <Recommendation />
      </section>
    </>
  );
}

export default Home;
