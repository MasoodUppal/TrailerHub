//create a new file called apiconfig.js,paste the following code with api and tokken there to run the project build succesfully
const apiconfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "get your api key from tmdb",
  autherizationTokken: "get your token from tmdb",
  //   originalimages:()
  originalImg: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Img: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiconfig;
