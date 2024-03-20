import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 m-1 p-2">
            <AdminMenu />
          </div>
        </div>
        <div className="col-md-3 m-3 p-3">
          <div className="card border border-dark-subtle  p-3">
            <h5>Admin name :{auth?.user?.name} </h5>
            <h5>Admin email :{auth?.user?.email} </h5>
            <h5>Admin role :{auth?.user?.role} </h5>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
