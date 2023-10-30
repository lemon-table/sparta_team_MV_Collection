// 메인페이지 영화 리스트 및 검색기능

const getMovies = async () => {
  let result = await getAllMovies();

  let cardList = document.querySelector(".movieBox");
  cardList.innerHTML = null;

  const title = document.querySelector("#searchBox");

  // 검색기능. if문 활용하여 정의된 것을 필터를 통해 매칭후 맞으면 결과값 도출.

  if (title.value !== undefined && title.value !== "") {
    result = result.filter((obj) => {
      if (obj.title.search(title.value) !== -1) {
        return true;
      }
    });
  }

  let allMovies = document.querySelector(".movieBox");
  result.forEach((infoMovie) => {
    // console.log(result.id, result.title, infoMovie.overview, infoMovie.vote_average, infoMovie.poster_path)
    let temp_html = `
    <a href="./detail.html?movieId=${infoMovie.id}">
    <div class="col">
    <div class="card">
        <img src="https://image.tmdb.org/t/p/w500/${infoMovie.poster_path}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${infoMovie.title}</h5>
            <p class="card-text">${infoMovie.overview}</p>
        </div>
    </div>
    </div>
    </a>
`;
    allMovies.insertAdjacentHTML("beforeend", temp_html);
  });
};
getMovies();
