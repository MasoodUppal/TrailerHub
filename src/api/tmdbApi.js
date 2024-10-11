import axiosClient from "./axiosclient";

export const movieType = {
  popular: "popular",
  upcoming: "upcoming",
  top_rated: "top_rated",
};

export const category = {
  movie: "movie",
  tv: "tv",
};

const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = "movie/" + movieType[type];
    return axiosClient.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + "/" + id + "/videos";
    return axiosClient.get(url, { params: {} });
  },
};

export default tmdbApi;
