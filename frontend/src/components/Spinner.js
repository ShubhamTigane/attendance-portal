import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = ({ path = "/login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate(`${path}`);
    return () => clearInterval(interval);
  }, [count, navigate, path]);

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
