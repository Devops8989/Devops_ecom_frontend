import axios from "axios";
// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000/api",
// });
// export default API;

const API = axios.create({
  baseURL: "http://localhost:5000", // point to backend container
});

export default API;
