import axios from "axios";

export const fetchData = async (path) => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return response?.data;
};
