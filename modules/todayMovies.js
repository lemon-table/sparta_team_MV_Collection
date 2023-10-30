// 오늘의 영화 구현
const todayMovies = document.querySelector("#todayMovieList");
const todayMoviesBtn = document.querySelector("#todayMovieListBtn");

// 오늘의 영화 리스트 가져오기 (5건만)
const getTodayMovieList = async () => {
    const result = await getTodayMovies();

    for (const [key, value] of Object.entries(result)) {
        //console.log(key,value.id, value.poster_path);

        let classNm = key == 0 ? "carousel-item active" : "carousel-item";
        let classNm2 = key == 0 ? "class=active" : "";

        let temp_html =
            `
            <div class="${classNm}">
                <img id ="${value.id}"src="https://image.tmdb.org/t/p/w500${value.poster_path}" class="d-block w-100"
                    alt="..."  style="cursor:pointer">
            </div>
            `;
        
        let temp_html2 = 
            `
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${Number(key)}" ${classNm2}
            aria-current="true" aria-label="Slide ${(Number(key)+1)}"></button>
            `;
        
        if(key<5){
            todayMoviesBtn.insertAdjacentHTML('beforeend', temp_html2);
            todayMovies.insertAdjacentHTML('beforeend', temp_html);

        }else break;

    }
}

// 이미지 클릭 이벤트 처리
const movieImage = document.querySelector("#todayMovieList");
movieImage.addEventListener('click', function(evnet) {
    location.href=`detail.html?movieId=${evnet.target.id}`;

});

getTodayMovieList();

// 오늘의 영화 5초 간격으로 자동 넘김
setInterval(() => document.querySelector("#todayNext").click() , 5000);
