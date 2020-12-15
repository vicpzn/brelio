// to slide/close the burger menu
const slide = document.querySelector(".slide");
const close = document.querySelector(".close");

function openSlideMenu() {
  document.getElementById("menu").style.width = "150px";
  document.getElementById("content").style.marginLeft = "150px";
}

function closeSlideMenu() {
  document.getElementById("menu").style.width = "0";
  document.getElementById("content").style.marginLeft = "0";
}

// slide.addEventListener("click", openSlideMenu);
// close.addEventListener("click", closeSlideMenu);

//client-page
const writeComment = document.querySelector("#write-comment");
const commentBtn = document.querySelector("#comments-btn");
let commentsList = document.querySelector("#comments-table tbody");
const clientId = document.querySelector("#client-id");

function fetchComments(array) {
  commentsList.innerHTML = "";
  console.log(array);
  array.forEach((element) => {
    commentsList.innerHTML += `<tr><td>${element}</td></tr>`;
  });
}

function sendComment() {
  commentBtn.addEventListener("click", async () => {
    const comments = writeComment.value;
    const id = clientId.textContent;
    writeComment.value = "";
    try {
      let arrayOfComments = await axios.patch(
        `http://localhost:4848/api/edit/clients/${id}`,
        {
          comments: `${comments}`,
        }
      );
      fetchComments(arrayOfComments);
    } catch (err) {
      console.error(err);
    }
  });
}

sendComment();
