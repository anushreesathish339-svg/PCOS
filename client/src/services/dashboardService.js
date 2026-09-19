import API from "./api";

export const getDashboard = () => {
    return API.get("/dashboard");
};

export const getMemberCount = () => {
    return API.get("/users/count");
};
