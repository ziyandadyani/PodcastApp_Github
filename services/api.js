export const fetchShows = async () => {
  const result = fetch("https://podcast-api.netlify.app")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong. Try again later.");
      }
      return response;
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
  return result;
};
