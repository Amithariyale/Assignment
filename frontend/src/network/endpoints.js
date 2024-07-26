// Define the base URL for the API
const baseUrl = "http://localhost:8080";

// Define an object to hold various API endpoints
const Endpoints = {
  signup: `${baseUrl}/auth/signup`, // Endpoint for user sign-up
  login: `${baseUrl}/auth/login`, // Endpoint for user login
};

// Export the Endpoints object for use in other parts of the application
export default Endpoints;
