// 상세화면
//import { getTodayMovies } from "./data.js";
//import { getAllMovies } from "./data.js";
//import { getMovieDetail } from "./data.js";

const resultArr = [];
const urlSearch = new URLSearchParams(location.search);
const movieIdToFind = urlSearch.get("movieId"); // 찾고자 하는 영화 id를 지정

// 오늘의 영화
const getMovies = async () => {
  const result = await getTodayMovies();

  for (const [key, value] of Object.entries(result)) {
    let movieObj = {};

    //console.log(`${key}: ${value}`);

    //console.log(result[key]['id']);
    movieObj.id = result[key]["id"];
    movieObj.original_title = result[key]["original_title"];
    movieObj.overview = result[key]["overview"];
    movieObj.poster_path = result[key]["poster_path"];
    movieObj.title = result[key]["title"];
    movieObj.vote_average = result[key]["vote_average"];
    movieObj.release_date = result[key]["release_date"];

    resultArr.push({ ...movieObj });
  }

  //console.log(result);
};

// 영화 검색 리스트
const getAllMovieList = async () => {
  const result = await getAllMovies();

  for (const [key, value] of Object.entries(result)) {
    let movieObj = {};

    //console.log(`${key}: ${value}`);

    //console.log(result[key]['id']);
    movieObj.id = result[key]["id"];
    movieObj.original_title = result[key]["original_title"];
    movieObj.overview = result[key]["overview"];
    movieObj.poster_path = result[key]["poster_path"];
    movieObj.title = result[key]["title"];
    movieObj.vote_average = result[key]["vote_average"];
    movieObj.release_date = result[key]["release_date"];

    resultArr.push({ ...movieObj });
  }

  //console.log(result);
  //console.log(...resultArr);
};

// resultArr 배열의 객체 중에서 특정 id를 가진 객체를 검색하여 반환
function findMovieById(id) {
  const foundMovie = resultArr.find((movie) => movie.id === Number(id));
  return foundMovie;
}

// Promise를 사용하여 모든 작업이 완료된 후 결과를 출력
async function process() {
  await getMovies();
  await getAllMovieList();
  console.log(resultArr);

  const detImage = document.getElementById("detImage");
  const title = document.getElementById("title");
  const overview = document.getElementById("overview");
  const release_date = document.getElementById("release_date");
  const vote_average = document.getElementById("vote_average");

  const foundMovie = findMovieById(movieIdToFind);

  // 검색 id 존재 여부 확인
  if (foundMovie) {
    const newImgPath =
      "https://image.tmdb.org/t/p/w400/" + foundMovie["poster_path"];
    detImage.setAttribute("src", newImgPath);

    const inputTitle =
      foundMovie["title"] + "(" + foundMovie["original_title"] + ")";
    const inputDate = "개봉일 : " + foundMovie["release_date"];
    const inputOverview = foundMovie["overview"];
    const inputAverage = "평점 : " + foundMovie["vote_average"];

    title.innerHTML = inputTitle;
    release_date.innerHTML = inputDate;
    overview.innerHTML = inputOverview;
    vote_average.innerHTML = inputAverage;

    console.log("찾은 영화 정보:", foundMovie);
  } else {
    alert("해당 id를 가진 영화를 찾을 수 없습니다.");
  }
}

// process 함수를 호출하여 작업 실행
process();
