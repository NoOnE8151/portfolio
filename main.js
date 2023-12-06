//navigation bar toggle
const barIcon = document.querySelector("#barIcon");
const navbar = document.querySelector("#navbar");

barIcon.addEventListener("click", function () {
  navbar.classList.toggle("navbarListActive");
  barIcon.classList.toggle("barIconActive");
})

//more infor dropdown
const dropDown = document.querySelector("#dropDown");
const bioData = document.querySelector("#bioDataList");
const dropDownArrow = document.querySelector("#dropDownArrow");

dropDown.addEventListener("mouseup", function() {
  bioData.classList.toggle("bioDataListActive");
  dropDown.classList.toggle("dropDownActive");
  dropDownArrow.classList.toggle("dropDownArrowActive");
  })
  
 //no projects popup
 function popUp() {
   alert("i don't have any project yet!");
 }
