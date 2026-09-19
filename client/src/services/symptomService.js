import API from "./api";

export const addSymptoms = (data) => {
    return API.post("/symptoms", data);
};

export const getSymptoms = () => {
    return API.get("/symptoms");
};

export const deleteSymptoms = (id) => {
    return API.delete(`/symptoms/${id}`);
};