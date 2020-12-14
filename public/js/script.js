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

slide.addEventListener("click", openSlideMenu);
close.addEventListener("click", closeSlideMenu);
