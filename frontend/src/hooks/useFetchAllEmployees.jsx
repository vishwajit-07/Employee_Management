import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmployees, setLoading, setError } from "../redux/employeeSlice";
import axios from "axios";

const useFetchEmployees = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmployees = async () => {
      dispatch(setLoading(true));
      dispatch(setError(null)); // Reset error before new request
      try {
        const res = await axios.get("http://localhost:5000/employee/get", {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setEmployees(res.data.employees));
        } else {
          // Handle no employees found
          dispatch(setError("No employees found for this user"));
        }
      } catch (err) {
        // Handle server errors
        dispatch(setError("No employee added yet!"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchEmployees();
  }, [dispatch]);
};

export default useFetchEmployees;