// 리뷰 기능
class Review {
  constructor(movieId, name, password, review) {
    this.movieId = movieId;
    this.name = name;
    this.password = password;
    this.review = review;
    this.uuid = self.crypto.randomUUID();
  }
}

const urlParam = new URLSearchParams(location.search);
const paramMovieId = urlParam.get("movieId"); // 찾고자 하는 영화 id를 지정

/**
 * 영화 리뷰 가져오기
 * @param {Number} movieId
 */
const getReviews = (movieId) => {
  const keys = Object.keys(window.localStorage);
  const reviewDiv = document.querySelector(".userReviewDiv");
  reviewDiv.innerHTML = "";

  keys.forEach((key) => {
    const movieObject = JSON.parse(window.localStorage.getItem(key));

    if (movieObject.movieId === movieId) {
      const appendHtml = `
                          <div>
                            <div class="row g-3 align-items-center">
                                <div class="col-auto">
                                <label for="inputPassword6" class="col-form-label">사용자</label>
                                </div>
                                <div class="col-auto">
                                ${movieObject.name}
                                </div>
                                <div class="col-auto">
                                    <label for="inputPassword6" class="col-form-label">비밀번호</label>
                                </div>
                                <div class="col-auto">
                                    <input type="password" id="oldPassword-${movieObject.uuid}" class="form-control" aria-describedby="passwordHelpInline">
                                </div>
                            </div>
                            <div class="mb-3" style="margin-top: 20px;">
                                <textarea class="form-control" id="newReview-${movieObject.uuid}" rows="3">${movieObject.review}</textarea>
                            </div>
                            <button type="button" class="btn btn-dark" onclick="updateReview('${movieObject.uuid}')">수정</button>
                            <button type="button" class="btn btn-dark" onclick="deleteReview('${movieObject.uuid}')">삭제</button>
                        </div>
                         `;

      reviewDiv.insertAdjacentHTML("beforeend", appendHtml);
    }
  });
};

/**
 * 영화 리뷰 저장하기
 */
const saveReview = () => {
  const newReview = new Review(
    paramMovieId,
    document.querySelector("#newName").value,
    document.querySelector("#newPassword").value,
    document.querySelector("#newReview").value
  );

  window.localStorage.setItem(newReview.uuid, JSON.stringify(newReview));
  window.location.reload();
  alert("등록이 완료 되었습니다.");
};

/**
 * 영화 리뷰 업데이트
 */
const updateReview = (uuid) => {
  const movieObject = JSON.parse(window.localStorage.getItem(uuid));
  const inputPassword = document.querySelector(`#oldPassword-${uuid}`);

  if (movieObject.password === inputPassword.value) {
    movieObject.review = document.querySelector(`#newReview-${uuid}`).value;

    window.localStorage.setItem(movieObject.uuid, JSON.stringify(movieObject));
  } else {
    alert("비밀번호가 일치하지 않습니다.");

    return;
  }

  window.location.reload();
  alert("수정이 완료 되었습니다.");
};

/**
 * 영화 리뷰 삭제
 */
const deleteReview = (uuid) => {
  const movieObject = JSON.parse(window.localStorage.getItem(uuid));
  const inputPassword = document.querySelector(`#oldPassword-${uuid}`).value;

  if (inputPassword === "" || inputPassword === undefined) {
    alert("비밀번호를 입력해주세요.");
    return;
  }

  if (movieObject.password !== inputPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  if (!confirm("정말로 삭제하시겠습니까??")) return;

  localStorage.removeItem(uuid);

  window.location.reload();
  alert("삭제가 완료 되었습니다.");
};

getReviews(paramMovieId);

//deleteReview();
