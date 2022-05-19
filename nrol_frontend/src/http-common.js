import axios from "axios";
export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json",
        "x-access-token": "Bearer 6fb34616d5f56092e25631132d1c2fe6a7eef7f3c6bdc4824e314d09d6989b0c"
    }
});