import { default as axios } from "axios";

const API_Key = "eba0388c934688725105b53c98cf82ca";

export const getTrending = () => {
  return axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_Key}&language=en-US&page=1`
  );
};

export const searchFilms = (query) => {
  return axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&query=${query}&language=en-US&page=1&include_adult=false`
  );
};

export const movieDetails = (paramsId) => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${paramsId}?api_key=${API_Key}&language=en-US&page=1`
  );
};

export const getCast = (paramsCastId) => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${paramsCastId}/credits?api_key=${API_Key}&language=en-US&page=1`
  );
};

export const getReviews = (paramsReviewsId) => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${paramsReviewsId}/reviews?api_key=${API_Key}&language=en-US&page=1`
  );
};
