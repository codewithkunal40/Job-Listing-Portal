import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/features/authSlice";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch(showLoading());

        const { data } = await axios.get("/api/v1/user/get-user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        dispatch(hideLoading());

        if (data.success) {
          dispatch(setUser(data.data));
        } else {
          localStorage.clear();
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        localStorage.clear();
        dispatch(hideLoading());
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [user, dispatch, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Optional: Add a loading indicator
  }

  return user ? children : null; // Render children if user is authenticated
};

export default PrivateRoute;
