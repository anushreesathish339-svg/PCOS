import API from "./api";

export const getYoga = () => {
    return API.get("/yoga");
};