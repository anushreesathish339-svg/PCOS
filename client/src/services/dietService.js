import API from "./api";

export const getDiet = () => {
    return API.get("/diet");
};