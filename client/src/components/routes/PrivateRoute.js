import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/features/authSlice";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      dispatch(showLoading());

      // Correct axios request structure for GET with headers
      const { data } = await axios.get("/api/v1/user/get-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(hideLoading());

      if (data.success) {
        dispatch(setUser(data.data)); // Set user data in Redux store
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
      dispatch(hideLoading());
      navigate("/login"); // Redirect to login if error occurs
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]); // Only fetch user if it's not already in the Redux state

  return user ? children : null; // Render children if user is authenticated
};

export default PrivateRoute;
