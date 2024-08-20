import axios from "axios";

export const getFromTMDb = async (url) => {
    const options = {
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + process.env.TMDb_API_KEY,
        },
    };
    const response = await axios.get(url, options);
    return response.data;
};
