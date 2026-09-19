import API from "./api";

export const addCycle = (data) => {
    return API.post("/cycles", data);
};

export const getCycles = () => {
    return API.get("/cycles");
};