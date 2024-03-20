import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const [auth] = useAuth();

  return (
    <div className="home-page">
      <Layout>
        <div className="container mt-3">
          <h1 className="mb-4">HomePage</h1>
          <h2 className="text-md-start mb-4">Welcome {auth?.user?.name} </h2>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
