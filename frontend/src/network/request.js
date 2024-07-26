// Import the axios library to handle HTTP requests
import axios from "axios";

// Define an asynchronous function to handle HTTP requests
const request = async (httpConfig) => {
  // Retrieve the authentication token from localStorage
  const token = localStorage.getItem("token");

  try {
    // Make the HTTP request using axios
    const response = await axios({
      // Set the URL for the request
      url: httpConfig.url,
      // Set the HTTP method (GET, POST, etc.) for the request
      method: httpConfig.method,
      // Include the request body data if provided (for POST, PUT, etc.)
      ...(httpConfig.data && { data: httpConfig.data }),
      // Include the Authorization header if a token is present
      ...(token && {
        headers: {
          Authorization: `Bearer: ${token}`, // Bearer token for authentication
        },
      }),
      // Include query parameters if provided
      ...(httpConfig.params && { params: httpConfig.params }),
    });

    // Return a success response with the data from the HTTP request
    return { success: true, data: response.data };
  } catch (error) {
    // Log any errors that occur during the HTTP request
    console.log(error);
    // Return an error response with a message from the server or a default message
    return {
      success: false,
      data: error.response.data.message ?? "Something went wrong!!!",
    };
  }
};

// Export the request function for use in other parts of the application
export default request;
