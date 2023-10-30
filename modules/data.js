// api 호출
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZGYwYjdjMmFkYmJlYTMzYjI4OTQxNjVkYTI5ZDZkMiIsInN1YiI6IjY1MmYyNDZjMDI0ZWM4MDBhZWNkYWYzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5AaXP579jQK1soL_hem5RkpHL82xYvSc9plICc5ulpU",
  },
};

/**
 * 오늘의 영화 API 호출
 * @return array => todayMovies.results
 */
const getTodayMovies = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=ko-KR",
    options
  );

  const todayMovies = await response.json();

  return todayMovies.results;
};

/**
 * 모든 영화 API 호출
 * @param
 * @return array => allMovies.results
 */
const getAllMovies = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1",
    options
  );

  const allMovies = await response.json();

  return allMovies.results;
};

/**
 * 영화 상세정보 API 호출
 * @param number => id
 * @return array => movieDetail.results
 */
const getMovieDetail = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
    options
  );

  const movieDetail = await response.json();

  return movieDetail;
};
