let windowH = $(window).height();
let topBtn = $("#topBtn");
var scrollEls = $("html, body");

let scrollTop = () => {
  $(scrollEls).animate({
    scrollTop: 0
  }, 500);
}
topBtn.click(() => scrollTop());

$(window).scroll(() => {
  let scrollPos = $(document).scrollTop();
  if (scrollPos - windowH > 0) {
    topBtn.fadeIn();
  } else {
    topBtn.fadeOut();
  }
  
})