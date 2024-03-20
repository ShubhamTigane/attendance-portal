import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className=" text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>

          <NavLink
            to="/dashboard/admin/users"
            className="fw-semibold list-group-item list-group-item-action"
          >
            All Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/add-user"
            className="fw-semibold list-group-item list-group-item-action"
          >
            Add Employee
          </NavLink>
          
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
