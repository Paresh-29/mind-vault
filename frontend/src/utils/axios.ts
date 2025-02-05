
import axios from "axios";

const apiWithAuth = axios.create({
    baseURL: "http://localhost:3000/api/v1/",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

const apiWithoutAuth = axios.create({
    baseURL: "http://localhost:3000/api/v1/",
});

export { apiWithAuth, apiWithoutAuth };
