import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import AttendanceCalendar from "../../components/Layout/AttendanceCalendar";

const DashBoard = () => {
  const [auth] = useAuth();

  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");

  const [isCheckInEnabled, setIsCheckInEnabled] = useState(true);
  const [isCheckOutEnabled, setIsCheckOutEnabled] = useState(false);

  const handleCheckIn = async () => {
    try {
      const res = await axios.post(`/api/v1/auth/check-in`);
      if (res.data.success) {
        setCheckedIn(true);
        setCheckedOut(false);

        setCheckInTime(new Date().toLocaleString());
        setCheckOutTime("");

        toast.success(res.data.message);
        setIsCheckInEnabled(false);
        setIsCheckOutEnabled(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error during check-in:", error);
      toast.error("Failed to check in.");
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await axios.post(`/api/v1/auth/check-out`);
      if (res.data.success) {
        setCheckedOut(true);

        setCheckOutTime(new Date().toLocaleString());
        toast.success(res.data.message);
        setIsCheckOutEnabled(false);
        setIsCheckInEnabled(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error during check-out:", error);
      toast.error("Failed to check out.");
    }
  };

  useEffect(() => {
    if (auth?.user?._id) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/v1/auth/user/${auth?.user?._id}`);
      const { checkIn, checkOut } = res.data;
      if (checkIn) {
        setCheckedIn(true);
        setCheckInTime(new Date(checkIn).toLocaleString());
      } else {
        setCheckInTime("");
      }
      if (checkOut) {
        setCheckedOut(true);
        setCheckOutTime(new Date(checkOut).toLocaleString());
      } else {
        setCheckOutTime("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data.");
    }
  };

  return (
    <Layout>
      <div className="row ">
        <div className="col-md-3 mt-3 text-center">
          <button
            className="btn btn-success"
            onClick={handleCheckIn}
            disabled={!isCheckInEnabled}
          >
            Check In
          </button>
        </div>
        <div className="col-md-6">
          <div className="card text-center">
            <table className="table fixed-width-table ">
              <thead>
                <tr>
                  <th colSpan="2">{auth?.user?.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="2">{auth?.user?.email}</td>
                </tr>
                <tr>
                  <td> Check-In Time:</td>
                  <td>{checkedIn ? checkInTime : ""}</td>
                </tr>
                <tr>
                  <td>Check-Out Time:</td>
                  <td>{checkedOut ? checkOutTime : ""}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-3 mt-3 text-center">
          <button
            className="btn btn-success"
            onClick={handleCheckOut}
            disabled={!isCheckOutEnabled}
          >
            Check Out
          </button>
        </div>
      </div>
      <div className="container">
        <AttendanceCalendar />
      </div>
    </Layout>
  );
};

export default DashBoard;
