import API from "./api";

export const predictPCOS = async (data) => {
    return API.post("/predictions", data);
};