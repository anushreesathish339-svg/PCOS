import API from "./api";

export const getPredictionHistory = () => {
    return API.get("/predictions");
};

export const deletePrediction = (id) => {
    return API.delete(`/predictions/${id}`);
};