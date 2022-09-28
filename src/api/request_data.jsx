const API_KEY = "51e3d67cbe329bdeb9071d6ccdc4eb6f";

const request_data = {
    Trending:`/trending/all/day?api_key=${API_KEY}&language=en-US`,
    TopRated:`/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    Romance:`/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
    Animation:`/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=16`,
    History:`/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=36`,
    War:`/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10752`,
    Adventure:`/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=12`,
    NetflixOriginals:`/discover/tv?api_key=${API_KEY}&with_networks=213`,
    Action:`/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
    Horror:`/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
    Comedy:`/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
    Documentaries:`/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
    search:`/search/movie?api_key=${API_KEY}&language=en-US`,
}

export default request_data;