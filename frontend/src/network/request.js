import axios from "axios";

const request = async (httpConfig) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios({
      url: httpConfig.url,
      method: httpConfig.method,
      ...(httpConfig.data && { data: httpConfig.data }),
      ...(token && {
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      }),
      ...(httpConfig.params && { params: httpConfig.params }),
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: error.message ?? "Something went wrong!!!" };
  }
};

export default request;
