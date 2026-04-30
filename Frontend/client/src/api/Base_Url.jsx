// const Base_Url = import.meta.env.VITE_API_URL;
// console.log('meta',import.meta.env);
// // console.log("base_URL",Base_Url);

// export default Base_Url;
// export const SERVER_URL = import.meta.env.VITE_SERVER_URL;
// console.log('server_url',SERVER_URL);


// Environment Variables
const Base_Url = import.meta.env.VITE_API_URL;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// Debug Logs (only for development)
if (import.meta.env.DEV) {
  console.log("META ENV:", import.meta.env);
  console.log("API BASE URL:", Base_Url);
  console.log("SERVER URL:", SERVER_URL);
}

// Export
export default Base_Url;
export { SERVER_URL };