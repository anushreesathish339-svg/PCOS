const axios = require("axios");

const predictPCOS = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.ML_SERVICE_URL || "http://127.0.0.1:5001"}/predict`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            }
        );

        return response.data;
    } catch (error) {
        const details = error.response?.data;
        const serviceError = new Error(
            details?.message || "Prediction service is unavailable"
        );
        serviceError.statusCode = error.response?.status || 503;
        serviceError.details = details;
        throw serviceError;
    }
};

const getModelMetrics = async () => {
    const response = await axios.get(
        `${process.env.ML_SERVICE_URL || "http://127.0.0.1:5001"}/metrics`,
        { timeout: 10000 }
    );
    return response.data;
};

module.exports = {
    predictPCOS,
    getModelMetrics,
};
