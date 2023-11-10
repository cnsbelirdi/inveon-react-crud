import axios from "axios";

export default axios.create({
  baseURL: "https://65476b95902874dff3ac4502.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
  },
});
